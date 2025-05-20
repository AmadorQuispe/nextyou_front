import { QuestionItem } from "./question-item";
import type { Questionnaire } from "@/types/questionnaire";

interface Props {
  questionnaire: Questionnaire;
}

export function QuestionnaireStep({ questionnaire }: Props) {
  const sortedQuestions = [...questionnaire.questions].sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className='space-y-8'>
      {sortedQuestions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
