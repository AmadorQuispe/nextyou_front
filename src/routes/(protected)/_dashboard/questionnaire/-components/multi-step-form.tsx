import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  prompt: string;
  helper?: string;
};

type Step = {
  step: number;
  title: string;
  questions: Question[];
};

type QuestionnaireData = {
  questionnaire: Step[];
};

type Props = {
  data: QuestionnaireData;
  initialValues?: Record<string, string>;
};

export default function MultiStepForm({ data, initialValues = {} }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] =
    useState<Record<string, string>>(initialValues);

  const steps = data.questionnaire;
  const currentStep = steps[stepIndex];

  const updateField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const next = () =>
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    console.log("Final data:", formData);
    // Aquí podrías usar un callback o un API request
  };

  return (
    <div className='max-w-3xl mt-4 mx-auto px-6 py-8 bg-card  rounded-md'>
      <h2 className='text-xl font-bold text-foreground mb-4'>
        {currentStep.title}
      </h2>

      <div className='space-y-6'>
        {currentStep.questions.map((q) => (
          <div key={q.id} className='space-y-2'>
            <Label
              htmlFor={q.id}
              className='text-base font-medium text-foreground'>
              {q.prompt}
            </Label>
            {q.helper && (
              <p className='text-sm text-muted-foreground'>{q.helper}</p>
            )}
            <Textarea
              id={q.id}
              value={formData[q.id] || ""}
              onChange={(e) => updateField(q.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-8'>
        <Button variant='ghost' onClick={back} disabled={stepIndex === 0}>
          Atrás
        </Button>

        {stepIndex < steps.length - 1 ? (
          <Button onClick={next}>Siguiente</Button>
        ) : (
          <Button onClick={handleSubmit}>Finalizar</Button>
        )}
      </div>

      <div className='mt-6 flex items-center justify-center gap-2'>
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-2 rounded-full",
              i === stepIndex ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
