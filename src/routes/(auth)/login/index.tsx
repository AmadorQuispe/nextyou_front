import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

export function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <SignIn />
    </div>
  );
}
