export type Message = {
  id: number;
  sender: "user" | "future";
  text: string;
};

interface ChatMessageProps {
  sender: Message["sender"];
  text: string;
}

export const ChatMessage = ({ sender, text }: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap
          ${isUser ? "bg-blue-600 text-white" : "bg-cyan-100 text-gray-800"}`}>
        {text}
      </div>
    </div>
  );
};
