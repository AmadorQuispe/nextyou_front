/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./chat-box";
import { ChatInput } from "./chat-input";
import { useStreamingChat } from "@/hooks/use-streaming-chat";
import { useNavigate } from "@tanstack/react-router";
import { useChatSession } from "@/querys/use-chat-session";

interface ChatPanelProps {
  sessionId: string;
}

export function ChatPanel({ sessionId }: ChatPanelProps) {
  const navigate = useNavigate();
  const {
    response,
    sendMessage,
    sessionIdJustCreated,
    markSessionRedirected,
    resetSession,
  } = useStreamingChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [hasRedirected, setHasRedirected] = useState(false);

  const { data: chatSession } = useChatSession({
    id: sessionId === "new" ? undefined : sessionId,
  });

  useEffect(() => {
    if (chatSession?.chat_messages) {
      setMessages(chatSession.chat_messages);
    }
  }, [chatSession]);

  useEffect(() => {
    if (response) {
      setMessages((msgs) => {
        if (msgs.length && msgs[msgs.length - 1].sender === "ai") {
          const newMsgs = [...msgs];
          newMsgs[newMsgs.length - 1] = {
            ...newMsgs[newMsgs.length - 1],
            content: response,
          };
          return newMsgs;
        }
        return [...msgs, { id: "streaming", sender: "ai", content: response }];
      });
    }
  }, [response]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (sessionId === "new" && sessionIdJustCreated && !hasRedirected) {
      setHasRedirected(true);
      navigate({ to: `/chat/${sessionIdJustCreated}`, replace: true });
      markSessionRedirected();
    }
  }, [sessionId, sessionIdJustCreated, hasRedirected]);

  useEffect(() => {
    if (sessionId === "new") {
      resetSession();
      setMessages([]);
    }
  }, [sessionId]);

  const handleSend = async (text: string) => {
    setMessages((msgs) => [
      ...msgs,
      { id: `user-${Date.now()}`, sender: "user", content: text },
    ]);
    sendMessage({
      sessionId: sessionId === "new" ? undefined : sessionId,
      content: text,
    });
  };

  const hasMessages = messages && messages.length > 0;

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
            {messages.map((msg, i) => (
              <ChatBox
                key={`${msg.id}-${i}`}
                sender={msg.sender}
                text={msg.content}
              />
            ))}
            <div ref={bottomRef} />
          </>
        ) : (
          <div className='text-center px-4'>
            <h2 className='text-2xl font-semibold mb-2'>Hola 👋</h2>
            <p className='text-sm'>
              Pregúntale a tu Yo del Futuro sobre tus dudas, decisiones o
              reflexiones.
            </p>
          </div>
        )}
      </div>
      <div className='px-4 py-4 border-gray-200 bg-white'>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
