import * as React from "react";
import {
  AudioWaveform,
  Bot,
  MessageSquarePlus,
  NotebookPen,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavHistories } from "./nav-histories";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppLogo } from "./app-logo";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Nueva conversación",
      url: "/chat/new",
      icon: MessageSquarePlus,
    },
    {
      title: "Mi diario",
      url: "/journal",
      icon: NotebookPen,
    },
    {
      title: "Mi cuestionario",
      url: "/questionnaire",
      icon: Bot,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <AppLogo name={"NextYou"} version='1.0' logo={<AudioWaveform />} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavHistories />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
