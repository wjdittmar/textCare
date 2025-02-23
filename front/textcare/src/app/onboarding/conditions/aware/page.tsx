"use client";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { MultipleChoice } from "@/app/components/MultipleChoice";
import { AnchorLink } from "@/app/components/AnchorLink";
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
      return "/onboarding/conditions/confirm";
    }
    return "/onboarding/conditions/search";
  };

  return (
    <div style={styles}>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/providers/confirm"
      />
      <div className="sectionHeader">
        <h3>Do you have any medical conditions we should be aware of?</h3>
        <AnchorLink> Why are we asking this? </AnchorLink>
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
        {selectedOption === "No" ? "Continue" : "+ Medical Conditions"}
      </Button>
    </div>
  );
}
