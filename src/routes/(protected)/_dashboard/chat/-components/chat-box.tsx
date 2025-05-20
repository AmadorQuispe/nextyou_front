interface ChatMessageProps {
  sender: "user" | "ai";
  text: string;
}

export function ChatBox({ sender, text }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap
          ${isUser ? "bg-primary text-white" : "bg-primary/20 text-gray-800"}`}>
        {text}
      </div>
    </div>
  );
}
