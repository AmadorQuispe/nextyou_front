import { SignIn, useAuth } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

export function LoginPage() {
  const { getToken } = useAuth();
  getToken().then((token) => {
    console.log(token);
  });
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div>
        <SignIn />
      </div>
    </div>
  );
}
