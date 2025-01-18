import React from "react";

export const ProgressTracker = ({ steps, currentStepIndex }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0px",
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <span id="checkmark"></span>
          {index < steps.length - 1 && (
            <div
              style={{
                height: "2px",
                width: "80px",
                background: `linear-gradient(
                  to left,
                  ${index < currentStepIndex ? "#6079A1" : "#e0e0e0"} 50%,
                  ${index === currentStepIndex ? "#6079A1" : "#e0e0e0"} 50%
                )`,
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
