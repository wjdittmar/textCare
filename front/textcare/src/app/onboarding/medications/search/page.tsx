"use client";

import React, { useRef, useState } from "react";
import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { useAutoCompleteToggle } from "@/lib/hooks";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";
export default function SearchPage() {
  const router = useRouter();

  const apiUrl = baseApiUrl + "/v1/medications/search";

  const { selectedMedications, toggleMedication, selectedProvider } =
    useOnboarding();
  const [showMedications, setShowMedications] = useState(true);

  const refs = useRef<{
    inputRef: HTMLInputElement | null;
    optionsRef: HTMLDivElement | null;
  } | null>(null);

  useAutoCompleteToggle(refs, setShowMedications);

  const endpoint = `${baseApiUrl}/v1/users/me/completeProfileAndOnboarding`;

  const handleNextClick = async () => {
    try {
      const response = await apiClient(endpoint, {
        method: "POST",
        body: JSON.stringify({ provider_id: Number(selectedProvider.id) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update PCP.");
      }
      router.push("/home");
    } catch (err: any) {
      console.error(err);
    }
  };

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
        onClick={handleNextClick}
        variant="secondary"
      >
        Continue
      </Button>
    </>
  );
}
