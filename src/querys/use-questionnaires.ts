import api from "@/service/api";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

type Params = {
  withAnswer?: boolean;
};

export function useQuestionnaires<T>(params?: Params) {
  const { getToken } = useAuth();
  const queryKey = params?.withAnswer
    ? ["questionnaires", "with_answer"]
    : ["questionnaires"];
  const path = params?.withAnswer
    ? "/questionnaires?with_answer=true"
    : "/questionnaires";

  return useQuery<T[]>({
    queryKey: queryKey,
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get<T[]>(path, {
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
