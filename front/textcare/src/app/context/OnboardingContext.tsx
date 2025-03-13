"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Provider } from "@/types/provider";

interface OnboardingContextType {
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  setConditions: (conditions: string[]) => void;
  selectedMedications: string[];
  toggleMedication: (medication: string) => void;
  setMedications: (medications: string[]) => void;

  selectedProvider: Provider;
  setSelectedProvider: (provider: Provider) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
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

  const toggleMedication = (medication: string) => {
    setSelectedMedications((prev) =>
      prev.includes(medication)
        ? prev.filter((c) => c !== medication)
        : [...prev, medication],
    );
  };

  const setMedications = (medications: string[]) => {
    setSelectedMedications(medications);
  };

  return (
    <OnboardingContext.Provider
      value={{
        selectedConditions,
        toggleCondition,
        setConditions,
        selectedProvider,
        setSelectedProvider,
        selectedMedications,
        toggleMedication,
        setMedications,
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
