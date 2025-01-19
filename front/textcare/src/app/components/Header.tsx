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
        <Link href={backHref} style={backButtonStyle}>
          <span style={arrowStyle}>&lt;</span>
        </Link>
      ) : (
        <span style={backButtonStyle}>
          <span style={arrowStyle}>&lt;</span>
        </span>
      )}
      <ProgressTracker steps={steps} currentStepIndex={currentStep} />
    </>
  );
};
