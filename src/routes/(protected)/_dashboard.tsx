import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./-components/app-sidebar";

export const Route = createFileRoute("/(protected)/_dashboard")({
  beforeLoad: async ({ context }) => {
    const token = await context.authentication.getToken();
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
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
