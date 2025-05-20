import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

interface Props {
  isFirstStep: boolean;
  isLastStep: boolean;
  questionIds: string[];
  onPrevious: () => void;
  onNext: () => void;
}

export function StepNavigation({
  isFirstStep,
  isLastStep,
  questionIds,
  onPrevious,
  onNext,
}: Props) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(questionIds);
    if (valid) {
      onNext();
    }
  };

  return (
    <div className='flex justify-between mt-8'>
      {!isFirstStep && (
        <Button type='button' onClick={onPrevious}>
          Anterior
        </Button>
      )}
      <Button type='button' onClick={handleNext}>
        {isLastStep ? "Revisar respuestas" : "Siguiente"}
      </Button>
    </div>
  );
}
