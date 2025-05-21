import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MultiStepForm } from "./-components/multi-step-form";
import type {
  AnswerCreationData,
  FormData,
  Questionnaire,
} from "@/types/questionnaire";
import { toast } from "sonner";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useQuestionnaires } from "@/querys/use-questionnaires";
import { useSaveAnswers } from "@/mutations/use-save-answers";

export const Route = createFileRoute("/(protected)/onboarding/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
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
        navigate({ to: "/home" });
      },
    });
  };
  if (!isSignedIn) {
    navigate({ to: "/login", replace: true });
  }
  return (
    <>
      <main className='max-w-2xl mx-auto px-6 bg-card rounded-md'>
        <header className='sticky top-0 bg-sidebar h-16'>
          <nav className='flex justify-end items-center px-4 h-full'>
            <SignOutButton>
              <Button
                variant='ghost'
                className='text-primary font-semibold text-md'>
                Abandonar
                <ExitIcon className='w-4 h-4' />
              </Button>
            </SignOutButton>
          </nav>
        </header>
        {isLoading && <Loader />}
        {!isLoading && questionnaires && (
          <MultiStepForm
            questionnaires={questionnaires}
            onSubmit={handleFormSubmit}
          />
        )}
      </main>
    </>
  );
}
