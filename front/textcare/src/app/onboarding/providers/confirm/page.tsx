"use client";

import { useProvidersContext } from "@/app/context/ProvidersContext";
import { Header } from "@/app/components/Header";
import { getPicturePath } from "@/lib/stringUtils";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { baseApiUrl } from "@/lib/apiConfig";

export default function ConfirmPage() {
  const { selectedProvider, setSelectedProvider } = useProvidersContext();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const endpoint = `${baseApiUrl}/v1/users/me/pcp`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedProvider) {
      const savedProvider = localStorage.getItem("selectedProvider");
      if (savedProvider) {
        setSelectedProvider(JSON.parse(savedProvider)); // Update context with persisted provider
      }
    }
    setIsLoading(false);
  }, [selectedProvider, setSelectedProvider]);

  // TODO improve performance of reloading from local storage, it takes too long right now
  if (isLoading) {
    return <p>Loading provider...</p>;
  }

  const handleNextClick = async () => {
    if (!selectedProvider) {
      setError("No provider selected.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer LDBQTEDKOL5TK44GWFRGROGNDU`,
        },

        body: JSON.stringify({ provider_id: Number(selectedProvider.id) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update PCP.");
      }

      router.push("/onboarding/conditions/aware");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      {/* do we want to support a back button here? assuming we do, so won't persist selected pcp until they select next */}
      <Header includeBack={true} backHref="/onboarding/providers/choose" />

      {selectedProvider ? (
        <div>
          <h3>Great! Dr. {selectedProvider.name} will now be your provider.</h3>
          <div style={{ padding: "150px 0px", margin: "auto", width: "58%" }}>
            <img
              src={getPicturePath(selectedProvider.name, "large")}
              alt={`Dr. ${selectedProvider.name}`}
            />
            <h4 style={{ textAlign: "center" }}>
              {" "}
              Dr. {selectedProvider.name}{" "}
            </h4>
            <p>Specialty: {selectedProvider.specialization}</p>
            <p>Education: {selectedProvider.education}</p>
          </div>
        </div>
      ) : (
        <p>No provider selected. Go back and choose one.</p>
      )}
      <Button
        onClick={handleNextClick}
        variant="secondary"
        style={{ marginTop: "auto" }}
      >
        Next
      </Button>
    </div>
  );
}
