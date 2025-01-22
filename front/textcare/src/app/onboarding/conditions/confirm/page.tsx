"use client";

import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { ChipList } from "@/app/components/ChipList";
import { useConditions } from "@/app/context/ConditionsContext";

export default function ConfirmPage() {
  const { selectedConditions, setConditions } = useConditions();

  const handleChipsChange = (updatedChips) => {
    setConditions(updatedChips);
  };

  return (
    <>
      <Header currentStep={2} includeBack={false} />
      <div className="sectionHeader">
        <h3>Confirm your medical conditions</h3>
      </div>
      <ChipList
        initialChips={selectedConditions}
        onChipsChange={handleChipsChange}
      />
      <Button href="/onboarding/conditions/search" variant="primary">
        + Medical Conditions
      </Button>
      <Button href="" variant="secondary" style={{ marginTop: "auto" }}>
        Next
      </Button>
    </>
  );
}
