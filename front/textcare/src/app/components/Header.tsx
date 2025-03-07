import Link from "next/link";
import { ProgressTracker } from "./ProgressTracker";

export const Header = ({
  includeBack = false,
  backHref = "",
  currentStep = 1,
}) => {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 8%",
  };

  const backButtonStyle: React.CSSProperties = {
    display: "block",
    alignItems: "center",
    textDecoration: "none",
    cursor: includeBack ? "pointer" : "not-allowed",
    pointerEvents: includeBack ? "auto" : "none",
    opacity: includeBack ? 1 : 0.5,
    transition: "color 0.2s ease",
    marginLeft: "-6px", // to align flush with left
    marginBottom: "10px",
  };

  const arrowColor = includeBack ? "#0d5e52" : "#ccc";

  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
    "Step 4: Filler",
  ];

  return (
    <div style={styles}>
      {includeBack ? (
        <Link href={backHref} style={backButtonStyle}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={"#0d5e52"}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m15 18-6-6 6-6" stroke={arrowColor} />
          </svg>
        </Link>
      ) : (
        <div style={backButtonStyle}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={"#0d5e52"}
            strokeWidth="2"
          >
            <path d="m15 18-6-6 6-6" stroke={arrowColor} />
          </svg>
        </div>
      )}
      <ProgressTracker steps={steps} currentStepIndex={currentStep} />
    </div>
  );
};
