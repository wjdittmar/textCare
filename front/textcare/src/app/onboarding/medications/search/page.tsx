"use client";

import React, { useRef, useState } from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { useAutoCompleteToggle } from "@/lib/hooks";

export default function SearchPage() {
  const apiUrl = baseApiUrl + "/v1/medications/search";

  const { selectedMedications, toggleMedication } = useOnboarding();
  const [showMedications, setShowMedications] = useState(true);

  const refs = useRef<{
    inputRef: HTMLInputElement | null;
    optionsRef: HTMLDivElement | null;
  } | null>(null);

  useAutoCompleteToggle(refs, setShowMedications);

  return (
    <>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/conditions/confirm"
      />

      <AutoComplete
        apiURL={apiUrl}
        selectedItems={selectedMedications}
        toggleItem={toggleMedication}
        placeholder="Search medications..."
        parseResponse={(data) =>
          data.medications.map((item) => item.medication_name.toLowerCase())
        }
        ref={refs}
        showOptions={showMedications}
      />

      <Button
        disabled={selectedMedications.length === 0}
        style={{ marginTop: "10px", flex: "0 0 6%" }}
        href="/onboarding/conditions/confirm"
      >
        Continued ({selectedMedications.length} selected)
      </Button>
    </>
  );
}
