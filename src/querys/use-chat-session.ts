import api from "@/service/api";
import type { ChatSession } from "@/types/chat";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

type Params = {
  id?: string;
  tree?: boolean;
};

export function useChatSession({ id, tree = true }: Params) {
  const { getToken } = useAuth();
  return useQuery<ChatSession>({
    queryKey: ["chatSession"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<ChatSession>(
        `/chat_sessions/${id}?tree=${tree}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    retry: 2,
    staleTime: 0,
    enabled: !!id,
  });
}
