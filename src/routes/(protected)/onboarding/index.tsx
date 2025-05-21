import { createFileRoute, redirect, Navigate } from "@tanstack/react-router";
import { SignOutButton } from "@clerk/clerk-react";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useStatusUser } from "@/querys/use-status-user";
import { InitializeForm } from "./-components/initialize-form";

export const Route = createFileRoute("/(protected)/onboarding/")({
  beforeLoad: async ({ context }) => {
    const token = await context.authentication.getToken();
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isLoading: isSessionLoading } = useStatusUser();

  return (
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
      {isSessionLoading && <Loader />}
      {!isSessionLoading && session?.answers_count === 0 && <InitializeForm />}
      {session && session.answers_count > 0 && <Navigate to={"/home"} />}
    </main>
  );
}
