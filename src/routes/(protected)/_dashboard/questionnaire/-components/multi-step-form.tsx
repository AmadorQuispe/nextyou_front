import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormData, Questionnaire } from "@/types/questionnaire";
import { useMultiStep } from "@/hooks/use-multi-step";
import { createFormSchema } from "../-adapter/form-schema";
import { QuestionnaireStep } from "./questionnaire-step";
import { StepNavigation } from "./step-navigation";
import { Summary } from "./summary";
import { QuestionnaireProgress } from "./questionnaire-progress";
import { useQuery } from "@tanstack/react-query";
import { getAnswers } from "@/service/questionnaire.service";

interface MultiStepFormProps {
  questionnaires: Questionnaire[];
  onSubmit: (data: FormData) => void;
}

export function MultiStepForm({
  questionnaires,
  onSubmit,
}: MultiStepFormProps) {
  const sortedQuestionnaires = [...questionnaires].sort(
    (a, b) => a.position - b.position
  );

  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
  } = useMultiStep(sortedQuestionnaires);

  const { data: answers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAnswers(),
  });

  const [showSummary, setShowSummary] = useState(false);

  const formSchema = createFormSchema(sortedQuestionnaires);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit((data) => {
    if (isLastStep) {
      setShowSummary(true);
    } else {
      onSubmit(data);
    }
  });

  const handleNextStep = () => {
    if (isLastStep) {
      setShowSummary(true);
    } else {
      nextStep();
    }
  };

  const goToQuestionnaireStep = (id: string) => {
    const index = sortedQuestionnaires.findIndex((q) => q.id === id);
    if (index !== -1) {
      setShowSummary(false);
      goToStep(index);
    }
  };

  const handleFinish = () => {
    onSubmit(methods.getValues());
  };

  useEffect(() => {
    if (answers && answers.length > 0) {
      const data = Object.fromEntries(
        answers.map((a) => [a.question_id, a.content])
      );
      methods.reset(data);
    }
  }, [answers]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl mt-4 mx-auto px-6 py-8 bg-card rounded-md'>
        <QuestionnaireProgress
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
          steps={sortedQuestionnaires.map((q) => q.title)}
        />

        {showSummary ? (
          <Summary
            data={methods.getValues()}
            questionnaires={sortedQuestionnaires}
            onBack={() => setShowSummary(false)}
            onBackToStep={goToQuestionnaireStep}
            onSubmit={handleFinish}
          />
        ) : (
          <>
            <QuestionnaireStep questionnaire={currentStep} />

            <StepNavigation
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              questionIds={currentStep.questions.map((q) => q.id)}
              onPrevious={prevStep}
              onNext={handleNextStep}
            />
          </>
        )}
      </form>
    </FormProvider>
  );
}
