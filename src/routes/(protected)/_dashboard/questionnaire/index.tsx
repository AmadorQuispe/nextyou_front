import { getQuestionnaireWithAnswer } from "@/service/questionnaire.service";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/_dashboard/questionnaire/")({
  component: QuestionnairePage,
});

function QuestionnairePage() {
  const { data: questionnaires } = useQuery({
    queryKey: ["questionnaires", "with_answer=true"],
    queryFn: () => getQuestionnaireWithAnswer(),
  });
  return (
    <>
      <div className='max-w-3xl w-full mx-auto flex flex-col gap-4 bg-accent/1 rounded-md p-4'>
        <h2 className=' text-primary font-bold'>Tus respuestas</h2>

        {questionnaires?.map((questionnaire) => (
          <div
            key={questionnaire.id}
            className='border border-primary/10 rounded-md'>
            <div className='flex justify-between items-center border-b border-primary/10 p-4'>
              <h3 className='text-primary font-semibold '>
                {questionnaire.title}
              </h3>
              {/* <Button type='button' variant={"link"}>
                Editar este paso
              </Button> */}
            </div>

            {questionnaire.questions.map((question) => (
              <div key={question.id} className='p-4'>
                <h4 className='font-medium'>{question.prompt}</h4>
                <p className='text-sm text-gray-500'>
                  {question.answer?.content || "Sin respuesta"}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
