"use client";

import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { MultipleChoice } from "@/app/components/MultipleChoice";
import { AnchorLink } from "@/app/components/AnchorLink";

export default function InfoPage() {
  const styles = {
    display: "flex",
    flexDirection: "column",
    flex: "1",
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
        <MultipleChoice />
      </div>
      {/*         TODO is this the right way to get the button at the bottom?*/}
      <Button
        href="/onboarding/conditions/search"
        variant="secondary"
        style={{ marginTop: "auto" }}
      >
        + Medical Conditions
      </Button>
    </div>
  );
}
