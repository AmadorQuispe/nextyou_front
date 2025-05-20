import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm } from "./-components/multi-step-form";
import {
  createAnswers,
  getQuestionnaires,
} from "@/service/questionnaire.service";
import type { AnswerCreationData, FormData } from "@/types/questionnaire";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(protected)/_dashboard/questionnaire/")({
  component: QuestionnairePage,
});

function QuestionnairePage() {
  const { data: questionnaires, isLoading } = useQuery({
    queryKey: ["questionnaires"],
    queryFn: () => getQuestionnaires(),
  });

  const { mutate: createAnswersSubmit } = useMutation({
    mutationFn: createAnswers,
  });

  const handleFormSubmit = (data: FormData) => {
    const answers: AnswerCreationData[] = Object.entries(data).map(
      ([questionId, content]) => ({
        question_id: questionId,
        content,
      })
    );
    createAnswersSubmit(answers, {
      onSuccess: () => {
        toast.success("Respuestas guardadas");
      },
    });
  };
  return (
    <>
      {isLoading && <div>Cargando</div>}
      {!isLoading && questionnaires && (
        <MultiStepForm
          questionnaires={questionnaires}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
