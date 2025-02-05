import Link from "next/link";
import { ProgressTracker } from "./ProgressTracker";

export const Header = ({
  includeBack = false,
  backHref = "",
  currentStep = 1,
}) => {
  const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: includeBack ? "#333" : "#ccc",
    textDecoration: "none",
    cursor: includeBack ? "pointer" : "not-allowed",
    transition: "color 0.2s ease",
    marginLeft: "-6px", // to account for the width of the button and align it to the left
  };

  const arrowStyle = {
    marginRight: "0.5rem",
  };

  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
    "Step 4: Filler",
  ];

  // TODO update header to bring in step from onboarding context

  return (
    <>
      {includeBack ? (
        <div>
          <Link href={backHref} style={backButtonStyle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" stroke="#0d5e52"></path>
            </svg>
          </Link>
        </div>
      ) : (
        <span style={backButtonStyle}>
          <span style={arrowStyle}>&lt;</span>
        </span>
      )}
      <ProgressTracker steps={steps} currentStepIndex={currentStep} />
    </>
  );
};
