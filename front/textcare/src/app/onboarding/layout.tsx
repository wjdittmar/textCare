"use client";

import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-container">
      <div className="centered-div">
        <div className="onboardingBox">{children}</div>
      </div>
    </div>
  );
}