import { createFileRoute } from "@tanstack/react-router";
import { ChatPanel } from "./-components/chat-panel";

export const Route = createFileRoute("/(protected)/_dashboard/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='h-full'>
      <ChatPanel />
    </div>
  );
}
