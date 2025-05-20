import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MultiStepForm } from "./-components/multi-step-form";
import {
  createAnswers,
  getQuestionnaires,
} from "@/service/questionnaire.service";
import type { AnswerCreationData, FormData } from "@/types/questionnaire";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export const Route = createFileRoute("/(protected)/onboarding/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
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
        navigate({ to: "/home" });
      },
    });
  };
  if (!isSignedIn) {
    navigate({ to: "/login", replace: true });
  }
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
