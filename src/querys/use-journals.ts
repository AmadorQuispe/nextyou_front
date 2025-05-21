import { transformKeysToCamel } from "@/lib/transform-keys";
import api from "@/service/api";
import type { Journal } from "@/types/journal";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useJournals() {
  const { getToken } = useAuth();

  return useQuery<Journal[]>({
    queryKey: ["questionnaires"],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<Journal[]>("/journals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return transformKeysToCamel(response.data);
    },
    retry: 2,
    staleTime: 0,
  });
}
