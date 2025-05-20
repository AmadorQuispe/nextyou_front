import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/clerk-react";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SignedIn>
          <SidebarMenuButton
            asChild
            className='!p-0 group-data-[collapsible=icon]:!p-0 flex w-full'>
            <UserButton showName={true} />
          </SidebarMenuButton>
        </SignedIn>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
