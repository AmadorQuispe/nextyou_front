import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/page")({
  component: ChatPage,
});

function ChatPage() {
  return (
    <div>
      <button className='p-2 px-8 rounded-2xl bg-amber-500'>Send</button>
    </div>
  );
}
