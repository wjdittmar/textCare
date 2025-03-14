"use client";

import React, { useRef, useState } from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { useAutoCompleteToggle } from "@/lib/hooks";

export default function SearchPage() {
  const apiUrl = baseApiUrl + "/v1/cmt/search";

  const { selectedConditions, toggleCondition } = useOnboarding();
  const [showConditions, setShowConditions] = useState(true);

  const refs = useRef<{
    inputRef: HTMLInputElement | null;
    optionsRef: HTMLDivElement | null;
  } | null>(null);

  useAutoCompleteToggle(refs, setShowConditions);

  return (
    <>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/providers/confirm"
      />

      <AutoComplete
        apiURL={apiUrl}
        selectedItems={selectedConditions}
        toggleItem={toggleCondition}
        parseResponse={(data) =>
          data.cmtCodes.map((item: any) =>
            item.patient_friendly_name.toLowerCase(),
          )
        }
        ref={refs}
        showOptions={showConditions}
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
