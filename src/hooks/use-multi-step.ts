import { useState } from "react";

export function useMultiStep<T>(stepsData: T[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= stepsData.length - 1) return prev;
      return prev + 1;
    });
  };

  const prevStep = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    currentStep: stepsData[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === stepsData.length - 1,
    totalSteps: stepsData.length,
    nextStep,
    prevStep,
    goToStep,
  };
}
