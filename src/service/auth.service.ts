import type { AuthSession } from "@/types/auth";
import api from "./api";

export async function establishSession(token: string) {
  const response = await api.post<AuthSession>(
    `/auth/session`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
