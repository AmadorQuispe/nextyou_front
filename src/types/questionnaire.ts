export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  position: number;
  questions: Question[];
}

export interface Question {
  id: string;
  questionnaire_id: string;
  prompt: string;
  helper: string;
  position: number;
  created_at: string;
  updated_at: string | null;
}

export interface QuestionWithAnswer extends Question {
  answer: Answer | null;
}

export interface QuestionnaireWithAnswer
  extends Omit<Questionnaire, "questions"> {
  questions: QuestionWithAnswer[];
}

export type FormData = {
  [questionId: string]: string;
};

export interface Answer {
  id: string;
  question_id: string;
  content: string;
  created_at: string;
  updated_at: string | null;
}

export type AnswerCreationData = Pick<Answer, "question_id" | "content">;
