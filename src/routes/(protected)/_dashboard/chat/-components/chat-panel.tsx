import { useState, useRef, useEffect } from "react";
import { ChatMessage, type Message } from "./chat-message";
import { ChatInput } from "./chat-input";

export const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simula la respuesta IA
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "future",
          text: "Desde el futuro, esa decisión cambió mucho tu vida.",
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className='w-full max-w-2xl mx-auto h-full flex flex-col'>
      <div
        className={`flex-1 ${
          hasMessages
            ? "overflow-y-auto px-4 py-6 space-y-4"
            : "flex items-center justify-center"
        }`}>
        {hasMessages ? (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} />
            ))}
            <div ref={bottomRef} />
          </>
        ) : (
          <div className='text-center text-gray-500 px-4'>
            <h2 className='text-2xl font-semibold mb-2'>Hola 👋</h2>
            <p className='text-sm'>
              Pregúntale a tu Yo del Futuro sobre tus dudas, decisiones o
              reflexiones.
            </p>
          </div>
        )}
      </div>

      <div className='px-4 py-4  border-gray-200 bg-white'>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};
