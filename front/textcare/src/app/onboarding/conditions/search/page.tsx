"use client";

import React from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { useConditions } from "@/app/context/ConditionsContext";
export default function SearchPage() {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = baseApiUrl + "/v1/icd10";

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
        selectedConditions={selectedConditions}
        toggleCondition={toggleCondition}
      />

      <button
        disabled={selectedConditions.length === 0}
        style={{ marginTop: "auto" }}
      >
        Continue ({selectedConditions.length} selected)
      </button>
    </div>
  );
}
