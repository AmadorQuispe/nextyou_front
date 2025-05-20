import type { Journal, UpdateJournal } from "@/types/journal";
import api from "./api";
import { transformKeysToCamel } from "@/lib/transform-keys";

export async function getMyJournals(): Promise<Journal[]> {
  const response = await api.get<Journal[]>("/journals");
  return transformKeysToCamel(response.data);
}

export async function createJournal(content: string): Promise<Journal> {
  const response = await api.post<Journal>("/journals", { content });
  return transformKeysToCamel(response.data);
}

export async function updateJournal(journal: UpdateJournal): Promise<Journal> {
  const response = await api.put<Journal>(`/journals/${journal.id}`, journal);
  return transformKeysToCamel(response.data);
}

export async function deleteJournal(id: string): Promise<void> {
  await api.delete(`/journals/${id}`);
}
