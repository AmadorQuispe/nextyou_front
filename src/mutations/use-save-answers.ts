import api from "@/service/api";
import type { Answer, AnswerCreationData } from "@/types/questionnaire";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveAnswers() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (answers: AnswerCreationData[]) => {
      const token = await getToken();
      const response = await api.post<Answer[]>("/answers/batch", answers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusUser"] });
    },
  });
}
