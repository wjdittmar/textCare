"use client";

import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
export default function InfoPage() {
  return (
    <div>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/providers/confirm"
      />
      <div className="sectionHeader">
        <h3>Do you have any medical conditions we should be aware of?</h3>
      </div>

      <Button href="" variant="secondary">
        + Medical Conditions
      </Button>
    </div>
  );
}
