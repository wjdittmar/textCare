"use client";

import React from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";

export default function SearchPage() {
  const apiUrl = baseApiUrl + "/v1/cmt/search";

  const { selectedConditions, toggleCondition } = useOnboarding();

  return (
    <>
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

      <Button
        disabled={selectedConditions.length === 0}
        style={{ marginTop: "auto" }}
        href="/onboarding/conditions/confirm"
      >
        Continue ({selectedConditions.length} selected)
      </Button>
    </>
  );
}
