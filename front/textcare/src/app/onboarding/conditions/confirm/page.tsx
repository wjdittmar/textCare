"use client";
import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
import { ChipList } from "@/app/components/ChipList";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { apiClient } from "@/lib/api";
import { baseApiUrl } from "@/lib/apiConfig";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
  const { selectedConditions, setConditions, selectedProvider } =
    useOnboarding();
  const router = useRouter();

  const hasConditions = selectedConditions.length > 0;

  const handleChipsChange = (updatedChips) => {
    setConditions(updatedChips);
  };

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
        backHref="/onboarding/conditions/search"
      />

      <div className="sectionHeader">
        <h3>Medical Conditions</h3>
        <p className="helper-text">
          {hasConditions
            ? "Review your selected conditions"
            : "You haven't selected any conditions."}
        </p>
      </div>

      <ChipList
        initialChips={selectedConditions}
        onChipsChange={handleChipsChange}
      />

      <Button
        onClick={handleNextClick}
        variant="secondary"
        style={{ marginTop: "auto" }}
      >
        Continue
      </Button>
    </>
  );
}
