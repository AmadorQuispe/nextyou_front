import api from "@/service/api";
import type { AuthSession } from "@/types/auth";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useStatusUser() {
  const { getToken } = useAuth();
  return useQuery<AuthSession>({
    queryKey: ["statusUser"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<AuthSession>("/auth/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    staleTime: 0,
  });
}
