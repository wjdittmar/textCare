"use client";

import React, { useRef } from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const apiUrl = baseApiUrl + "/v1/medications/search";

  const { selectedConditions, toggleCondition } = useOnboarding();
  const [showConditions, setShowConditions] = useState(true);

  const refs = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: React.ChangeEvent<MouseEvent>) {
      console.log(event.target);
      if (refs.current) {
        const { inputRef, optionsRef } = refs.current;
        if (
          optionsRef &&
          !optionsRef.contains(event.target) &&
          showConditions
        ) {
          setShowConditions(false);
        }
        if (inputRef && inputRef.contains(event.target) && !showConditions) {
          setShowConditions(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConditions]);

  return (
    <>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/conditions/confirm"
      />

      <AutoComplete
        apiURL={apiUrl}
        selectedConditions={selectedConditions}
        toggleCondition={toggleCondition}
        placeholder="Search medications..."
        parseResponse={(data) =>
          data.medications.map((item: any) =>
            item.medication_name.toLowerCase(),
          )
        }
        ref={refs}
        showOptions={showConditions}
      />

      <Button
        disabled={selectedConditions.length === 0}
        style={{ marginTop: "10px", flex: "0 0 6%" }}
        href="/onboarding/conditions/confirm"
      >
        Continued ({selectedConditions.length} selected)
      </Button>
    </>
  );
}
