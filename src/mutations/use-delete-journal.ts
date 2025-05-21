import api from "@/service/api";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export function useDeleteJournal() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      await api.delete(`/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
}
