"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConditionsContextType {
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  setConditions: (conditions: string[]) => void;
}

const ConditionsContext = createContext<ConditionsContextType | undefined>(
  undefined,
);

export const ConditionsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

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
    <ConditionsContext.Provider
      value={{ selectedConditions, toggleCondition, setConditions }}
    >
      {children}
    </ConditionsContext.Provider>
  );
};

export const useConditions = (): ConditionsContextType => {
  const context = useContext(ConditionsContext);
  if (!context) {
    throw new Error("useConditions must be used within a ConditionsProvider");
  }
  return context;
};
