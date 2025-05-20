import { Button } from "@/components/ui/button";
import type { FormData, Questionnaire } from "@/types/questionnaire";

interface SummaryProps {
  data: FormData;
  questionnaires: Questionnaire[];
  onBack: () => void;
  onBackToStep: (questionnaireId: string) => void;
  onSubmit: () => void;
}

export function Summary({
  data,
  questionnaires,
  onBack,
  onBackToStep,
  onSubmit,
}: SummaryProps) {
  return (
    <div className='flex flex-col gap-4 bg-accent/1 rounded-md p-4'>
      <h2 className=' text-primary font-bold'>Resumen de tus respuestas</h2>

      {questionnaires.map((questionnaire) => (
        <div
          key={questionnaire.id}
          className='border border-primary/10 rounded-md'>
          <div className='flex justify-between items-center border-b border-primary/10 p-4'>
            <h3 className='text-primary font-semibold '>
              {questionnaire.title}
            </h3>
            <Button
              type='button'
              variant={"link"}
              onClick={() => onBackToStep(questionnaire.id)}>
              Editar este paso
            </Button>
          </div>

          {questionnaire.questions.map((question) => (
            <div key={question.id} className='p-4'>
              <h4 className='font-medium'>{question.prompt}</h4>
              <p className='text-sm text-gray-500'>
                {data[question.id] || "Sin respuesta"}
              </p>
            </div>
          ))}
        </div>
      ))}

      <div className='space-x-2 flex justify-end'>
        <Button type='button' variant={"outline"} onClick={onBack}>
          Volver a editar
        </Button>

        <Button type='button' onClick={onSubmit} className='btn btn-success'>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
