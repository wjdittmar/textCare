"use client";

import React from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { useConditions } from "@/app/context/ConditionsContext"; // Import our context hook

export default function SearchPage() {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = baseApiUrl + "/v1/icd10";

  // Use context to get selectedConditions and toggleCondition function
  const { selectedConditions, toggleCondition } = useConditions();

  return (
    <div>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/providers/confirm"
      />

      <AutoComplete
        apiURL={apiUrl}
        selectedConditions={selectedConditions} // Pass current selection from context
        toggleCondition={toggleCondition} // Pass toggle function from context
      />

      {/* Example button showing how many conditions are selected */}
      <button disabled={selectedConditions.length === 0}>
        Continue ({selectedConditions.length} selected)
      </button>
    </div>
  );
}
