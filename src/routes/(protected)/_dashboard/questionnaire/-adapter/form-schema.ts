import type { Questionnaire } from "@/types/questionnaire";
import { z } from "zod";

export const createStepSchema = (questionnaire: Questionnaire) => {
  const schemaFields: Record<string, z.ZodType> = {};

  questionnaire.questions.forEach((question) => {
    const fieldId = `${question.id}`;
    schemaFields[fieldId] = z.string().min(1, {
      message: "Por favor, responde a esta pregunta.",
    });
  });

  return z.object(schemaFields);
};
