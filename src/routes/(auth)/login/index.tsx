import { Loader } from "@/components/ui/loader";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

export function LoginPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { navigate } = useRouter();

  if (isSignedIn) {
    navigate({ to: "/home", replace: true });
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div>{isLoaded && <SignIn />}</div>
      {!isLoaded && <Loader />}
    </div>
  );
}
