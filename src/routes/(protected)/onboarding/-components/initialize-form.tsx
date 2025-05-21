import type {
  AnswerCreationData,
  FormData,
  Questionnaire,
} from "@/types/questionnaire";
import { MultiStepForm } from "./multi-step-form";
import { useQuestionnaires } from "@/querys/use-questionnaires";
import { useSaveAnswers } from "@/mutations/use-save-answers";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";

export function InitializeForm() {
  const { data: questionnaires, isLoading } =
    useQuestionnaires<Questionnaire>();
  const { mutate: saveAnswers } = useSaveAnswers();
  const handleFormSubmit = (data: FormData) => {
    const answers: AnswerCreationData[] = Object.entries(data).map(
      ([questionId, content]) => ({
        question_id: questionId,
        content,
      })
    );

    saveAnswers(answers, {
      onSuccess: () => {
        toast.success("Tus respuestas han sido guardadas");
      },
    });
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && questionnaires && (
        <MultiStepForm
          questionnaires={questionnaires}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
