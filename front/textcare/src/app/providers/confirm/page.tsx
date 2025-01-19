"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { Header } from "@/app/components/Header";
import { getPicturePath } from "@/lib/stringUtils";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";

export default function ConfirmPage() {
  const { selectedProvider, setSelectedProvider } = useProvidersContext();
  const [isLoading, setIsLoading] = useState(true);
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
  // TODO persist the selected provider

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      {/* do we want to support a back button here? assuming we do, so won't persist selected pcp until they select next */}
      <Header includeBack={true} backHref="/providers/choose" />

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
      <Button href="" variant="secondary">
        Next
      </Button>
    </div>
  );
}
