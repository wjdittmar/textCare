"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { ProgressTracker } from "../../components/ProgressTracker";
import { Card } from "../../components/Card";
import Link from "next/link";

export default function ChooseProviderPage() {
  const { providers, selectedProvider, setSelectedProvider, isLoading, error } =
    useProvidersContext();

  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
  ];

  if (isLoading) return <p>Loading providers...</p>;
  if (error) return <p>Failed to load providers: {error.message}</p>;

  return (
    <div className="providerBox">
      <ProgressTracker steps={steps} currentStepIndex={0} />
      <h3>Choose your doctor</h3>
      <ul className="provider">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            provider={provider}
            isSelected={selectedProvider?.id === provider.id}
            onSelect={() => setSelectedProvider(provider)}
          />
        ))}
      </ul>
      {selectedProvider && (
        <Link
          className="buttonLink"
          href="/providers/confirm"
          style={{
            backgroundColor: "#FF594D",
          }}
        >
          Choose this Doctor
        </Link>
      )}
    </div>
  );
}
