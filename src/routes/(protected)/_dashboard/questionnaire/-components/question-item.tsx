import { Textarea } from "@/components/ui/textarea";
import type { Question } from "@/types/questionnaire";
import { useFormContext } from "react-hook-form";

interface Props {
  question: Question;
}

export function QuestionItem({ question }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='mb-6'>
      <label htmlFor={question.id} className='block text-lg font-medium mb-2'>
        {question.prompt}
      </label>
      {question.helper && (
        <p className='text-gray-500 text-sm mb-2'>{question.helper}</p>
      )}
      <Textarea
        id={question.id}
        {...register(question.id)}
        placeholder='Tu respuesta aquí...'
      />
      {errors[question.id] && (
        <p className='mt-1 text-sm text-red-600'>
          {errors[question.id]?.message as string}
        </p>
      )}
    </div>
  );
}
