"use client";

import { useProvidersContext } from "../../../context/ProvidersContext";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ChooseProviderPage() {
  const { providers, selectedProvider, setSelectedProvider, isLoading, error } =
    useProvidersContext();
  const router = useRouter();
  const [isChoosing, setIsChoosing] = useState(false); // don't update UI if they select choose for me

  // save to local storage to reload it if user refreshes
  useEffect(() => {
    if (selectedProvider) {
      localStorage.setItem(
        "selectedProvider",
        JSON.stringify(selectedProvider),
      );
    }
  }, [selectedProvider]);

  useEffect(() => {
    const savedProvider = localStorage.getItem("selectedProvider");
    if (savedProvider) {
      setSelectedProvider(JSON.parse(savedProvider));
    }
  }, [setSelectedProvider]);

  const chooseRandomProvider = () => {
    if (providers.length > 0) {
      const randomProvider =
        providers[Math.floor(Math.random() * providers.length)];
      setIsChoosing(true);
      setSelectedProvider(randomProvider);
      router.push("/onboarding/providers/confirm");
    }
  };

  if (isLoading) return <p>Loading providers...</p>;
  if (error) return <p>Failed to load providers: {error.message}</p>;

  return (
    <>
      <Header includeBack={true} backHref="/onboarding/providers/info" />
      <div className="sectionHeader">
        <h3>Choose your doctor</h3>
        <p>
          Your doctor will lead your care team and be your go-to care provider.
          Choose yours from the options below.
        </p>
      </div>
      <Button variant="primary" onClick={chooseRandomProvider}>
        Choose a Doctor for Me
      </Button>
      <ul className="provider">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            provider={provider}
            isSelected={!isChoosing && selectedProvider?.id === provider.id} // Suppress updates during selection
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
        {selectedProvider && !isChoosing && (
          <Button href="/onboarding/providers/confirm" variant="secondary">
            Choose this Doctor
          </Button>
        )}
      </div>
    </>
  );
}
