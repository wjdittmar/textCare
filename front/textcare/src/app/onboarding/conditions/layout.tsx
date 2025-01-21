"use client";

import { ReactNode } from "react";
import { ConditionsProvider } from "@/app/context/ConditionsContext";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ConditionsProvider>{children}</ConditionsProvider>;
}
