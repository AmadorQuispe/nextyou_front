export interface ChatSession {
  id: string;
  title: string;
  started_at: string;
  ended_at?: string;
  chat_messages?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  send_at?: string;
}
