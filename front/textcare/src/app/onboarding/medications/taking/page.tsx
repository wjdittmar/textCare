"use client";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { MultipleChoice } from "@/app/components/MultipleChoice";
import { useState } from "react";

export default function InfoPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const styles = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  };

  const getButtonHref = () => {
    if (selectedOption === "No") {
      return "/onboarding/medications/search";
    }
    return "/onboarding/medications/search";
  };

  return (
    <div style={styles}>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/conditions/search"
      />
      <div className="sectionHeader">
        <h3>Are you currently taking any medications?</h3>
      </div>
      <div>
        <MultipleChoice onSelect={setSelectedOption} />
      </div>
      <Button
        href={getButtonHref()}
        variant="secondary"
        style={{ marginTop: "auto" }}
        disabled={!selectedOption}
      >
        {selectedOption === "No" ? "Continue" : "+ Medications"}
      </Button>
    </div>
  );
}
