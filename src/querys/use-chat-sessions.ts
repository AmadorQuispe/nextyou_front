import api from "@/service/api";
import type { ChatSession } from "@/types/chat";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useChatSessions() {
  const { getToken } = useAuth();

  return useQuery<ChatSession[]>({
    queryKey: ["chatSessions"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<ChatSession[]>("/chat_sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    retry: 2,
    staleTime: 0,
  });
}
