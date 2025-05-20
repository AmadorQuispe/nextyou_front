import type {
  Answer,
  AnswerCreationData,
  Questionnaire,
  QuestionnaireWithAnswer,
} from "@/types/questionnaire";
import api from "./api";

export async function getQuestionnaires(): Promise<Questionnaire[]> {
  const response = await api.get<Questionnaire[]>("/questionnaires");
  return response.data;
}

export async function getQuestionnaireWithAnswer() {
  const response = await api.get<QuestionnaireWithAnswer[]>(
    "/questionnaires?with_answer=true"
  );
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
