import { transformKeysToCamel } from "@/lib/transform-keys";
import api from "@/service/api";
import type { Journal, UpdateJournal } from "@/types/journal";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export function useUpdateJournal() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (journal: UpdateJournal) => {
      const token = await getToken();
      const response = await api.put<Journal>(
        `/journals/${journal.id}`,
        journal,
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
