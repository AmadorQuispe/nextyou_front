interface Props {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function QuestionnaireProgress({
  currentStep,
  totalSteps,
  steps,
}: Props) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className='mb-8'>
      <div className='flex justify-between mb-2'>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-md font-medium ${
              index <= currentStep ? "text-primary" : "text-primary/80"
            }`}
            style={{
              width: `${100 / totalSteps}%`,
              textAlign:
                index === 0
                  ? "left"
                  : index === totalSteps - 1
                    ? "right"
                    : "center",
            }}>
            {step}
          </div>
        ))}
      </div>

      <div className='h-2 bg-primary/20 rounded-full'>
        <div
          className='h-full bg-primary rounded-full transition-all duration-300 ease-in-out'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className='mt-2 text-sm text-primary text-right'>
        Paso {currentStep + 1} de {totalSteps}
      </div>
    </div>
  );
}
