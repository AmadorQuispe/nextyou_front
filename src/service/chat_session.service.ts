import type { ChatSession } from "@/types/chat";
import api from "./api";

export async function getChatSessions() {
  const response = await api.get<ChatSession[]>("/chat_sessions");
  return response.data;
}

export async function getChatSessionById(id: string) {
  const response = await api.get<ChatSession>(`/chat_sessions/${id}?tree=true`);
  return response.data;
}

export async function createChatSession(data: Pick<ChatSession, "title">) {
  const response = await api.post<ChatSession>("/chat_sessions", data);
  return response.data;
}
