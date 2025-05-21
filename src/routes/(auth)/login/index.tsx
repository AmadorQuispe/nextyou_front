import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

export function LoginPage() {
  /*   const { isSignedIn, isLoaded } = useAuth();
  const { navigate } = useRouter();

  if (isSignedIn) {
    navigate({ to: "/home", replace: true });
  } */

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div>{<SignIn />}</div>
      {/* {!isLoaded && <Loader />} */}
    </div>
  );
}
