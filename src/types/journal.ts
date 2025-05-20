export interface Journal {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export type UpdateJournal = Pick<Journal, "content" | "id">;
