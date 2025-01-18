"use client";

import { ProvidersProvider } from "../context/ProvidersContext";
import { ProgressTracker } from "../components/ProgressTracker";
import React from "react";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
    "Step 4: Filler",
  ];

  return (
    <ProvidersProvider>
      <div className="page-container">
        <div className="centered-div">
          <div className="providerBox">
            <ProgressTracker steps={steps} currentStepIndex={0} />
            {children}
          </div>
        </div>
      </div>
    </ProvidersProvider>
  );
}
