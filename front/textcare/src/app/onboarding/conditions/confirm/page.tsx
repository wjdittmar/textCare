"use client";

import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { ChipList } from "@/app/components/ChipList";
import { useConditions } from "@/app/context/ConditionsContext"; // Import the context hook

export default function ConfirmPage() {
  // Access the selected conditions and the setConditions function
  const { selectedConditions, setConditions } = useConditions();

  const handleChipsChange = (updatedChips) => {
    // Directly set the conditions in the context
    setConditions(updatedChips);
  };

  return (
    <>
      <Header currentStep={2} includeBack={false} />
      <div className="sectionHeader">
        <h3>Confirm your medical conditions</h3>
      </div>
      <ChipList
        initialChips={selectedConditions} // Populate ChipList from context
        onChipsChange={handleChipsChange} // Sync ChipList changes with context
      />
      <Button href="/onboarding/conditions/search" variant="primary">
        + Medical Conditions
      </Button>
      <Button href="" variant="secondary">
        Next
      </Button>
    </>
  );
}
