"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import Link from "next/link";

export default function ChooseProviderPage() {
  const { providers, selectedProvider, setSelectedProvider, isLoading, error } =
    useProvidersContext();

  if (isLoading) return <p>Loading providers...</p>;
  if (error) return <p>Failed to load providers: {error.message}</p>;

  return (
    <>
      <div className="sectionHeader">
        <h3>Choose your doctor</h3>
        <p>
          Your doctor will lead your care team and be your go-to care provider.
          Choose yours from the options below.
        </p>
      </div>
      <Button href="/providers/confirm" variant="primary">
        Choose a Doctor for Me
      </Button>
      <ul className="provider">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            provider={provider}
            isSelected={selectedProvider?.id === provider.id}
            onSelect={() => {
              if (selectedProvider?.id !== provider.id) {
                setSelectedProvider(provider);
              } else {
                setSelectedProvider(null);
              }
            }}
          />
        ))}
      </ul>
      <div style={{ minHeight: "44px" }}>
        {selectedProvider && (
          <Button href="/providers/confirm" variant="secondary">
            Choose this Doctor
          </Button>
        )}
      </div>
    </>
  );
}
