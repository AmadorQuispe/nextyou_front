import { transformKeysToCamel } from "@/lib/transform-keys";
import api from "@/service/api";
import type { Journal } from "@/types/journal";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export function useCreateJournal() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (content: string) => {
      const token = await getToken();
      const response = await api.post<Journal>(
        "/journals",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return transformKeysToCamel(response.data);
    },
  });
}
