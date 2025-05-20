import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./-components/app-sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { establishSession } from "@/service/auth.service";

export const Route = createFileRoute("/(protected)/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  if (isLoaded && !isSignedIn) {
    navigate({ to: "/login", replace: true });
  }

  useEffect(() => {
    if (isSignedIn) {
      const setupSession = async () => {
        const token = await getToken();
        if (token) {
          const session = await establishSession(token);
          setIsNewUser(session.answers_count === 0);
        }
      };
      setupSession();
    }
  }, [isSignedIn, getToken]);
  if (isSignedIn && isNewUser) {
    navigate({ to: "/onboarding" });
  }
  return (
    <>
      {isLoaded && !isSignedIn && <div>Cargando</div>}

      {isSignedIn && (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* <header className='sticky top-0 bg-sidebar flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <span>Cual será mi futuro?</span>
              </div>
            </header> */}
            <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
}
