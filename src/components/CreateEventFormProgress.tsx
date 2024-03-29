import React from 'react';

export default function CreateEventFormProgress({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: number;
}) {
  return (
    <div>
      {Array.from(Array(steps).keys()).map((num) => (
        <div className="flex flex-col items-center" key={num}>
          <div
            className={`h-8 w-8  border-primary border rounded-full ${
              currentStep === num && 'border-4 bg-surface-0'
            } ${currentStep < num && 'border-1 border-dashed'} ${
              currentStep > num && 'bg-primary'
            }`}
          ></div>
          {num < steps - 1 && <div className="w-0.5 h-8 bg-primary"></div>}
        </div>
      ))}
    </div>
  );
}
