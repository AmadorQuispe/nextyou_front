import { createFileRoute } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export const Route = createFileRoute("/(auth)/login/page")({
  component: LoginPage,
});

export function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <SignIn />
    </div>
  );
}
