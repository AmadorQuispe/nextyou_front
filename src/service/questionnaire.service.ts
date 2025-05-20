import type {
  Answer,
  AnswerCreationData,
  Questionnaire,
} from "@/types/questionnaire";
import api from "./api";

export async function getQuestionnaires(): Promise<Questionnaire[]> {
  const response = await api.get<Questionnaire[]>("/questionnaires");
  return response.data;
}

export async function createAnswers(answers: AnswerCreationData[]) {
  const response = await api.post<Answer[]>("/answers/batch", answers);
  return response.data;
}

export async function getAnswers() {
  const response = await api.get<Answer[]>("/answers");
  return response.data;
}
