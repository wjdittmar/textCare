import React from "react";

interface ProgressTrackerProps {
  steps: string[];
  currentStepIndex: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  currentStepIndex,
}) => {
  const progressPercentage =
    steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#e0e0e0",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progressPercentage}%`,
          height: "100%",
          backgroundColor: "#6079A1",
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
};
