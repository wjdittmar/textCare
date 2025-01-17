import React from "react";

export const ProgressTracker = ({ steps, currentStepIndex }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "space-evenly",
        marginTop: "15px",
        padding: "10px 0px",
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Checkmark */}
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor:
                index <= currentStepIndex ? "#4CAF50" : "#e0e0e0",
              color: index <= currentStepIndex ? "#fff" : "#000",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              style={{
                height: "4px",
                width: "40px",
                background: `linear-gradient(
                  to right,
                  ${index < currentStepIndex ? "#4CAF50" : "#e0e0e0"} 50%,
                  ${index === currentStepIndex ? "#4CAF50" : "#e0e0e0"} 50%
                )`,
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
