"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Provider } from "@/types/provider";

interface OnboardingContextType {
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  setConditions: (conditions: string[]) => void;

  selectedProvider: Provider;
  setSelectedProvider: (provider: Provider) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState({} as Provider);

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  const setConditions = (conditions: string[]) => {
    setSelectedConditions(conditions);
  };

  return (
    <OnboardingContext.Provider
      value={{
        selectedConditions,
        toggleCondition,
        setConditions,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within a OnboardingProvider");
  }
  return context;
};
