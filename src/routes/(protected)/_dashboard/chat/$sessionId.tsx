import { createFileRoute } from "@tanstack/react-router";
import { ChatPanel } from "./-components/chat-panel";

export const Route = createFileRoute("/(protected)/_dashboard/chat/$sessionId")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { sessionId } = Route.useParams();

  return (
    <div className='h-full flex'>
      <ChatPanel sessionId={sessionId} />
    </div>
  );
}
