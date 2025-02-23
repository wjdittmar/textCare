"use client";

import React from "react";
import { OnboardingProvider } from "@/app/context/OnboardingContext";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="centered-div">
        <div className="onboardingBox">{children}</div>
      </div>
    </OnboardingProvider>
  );
}
