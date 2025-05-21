import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./-components/app-sidebar";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Loader } from "@/components/ui/loader";
import { useStatusUser } from "@/querys/use-status-user";

export const Route = createFileRoute("/(protected)/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: session, isLoading: isSessionLoading } = useStatusUser(); // TanStack Query
  const navigate = useNavigate();

  // 0.- Mostrar loading mientras se carga Clerk o los datos del backend
  const isLoading = !isLoaded || isSessionLoading;

  // 1.- Redirige a login si no ha iniciado sesión
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: "/login", replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  // 2.- Redirige si ya inició sesión y no tiene respuestas
  useEffect(() => {
    if (isSignedIn && session?.answers_count === 0) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isSignedIn, session, navigate]);

  // 3.- Mostrar loader mientras carga auth o session
  if (isLoading) {
    return <Loader />;
  }

  // 4.- Si está firmado y tiene respuestas, renderiza layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
