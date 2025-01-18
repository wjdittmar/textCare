"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { Card } from "../../components/Card";
import Link from "next/link";

export default function ChooseProviderPage() {
  const { providers, selectedProvider, setSelectedProvider, isLoading, error } =
    useProvidersContext();

  if (isLoading) return <p>Loading providers...</p>;
  if (error) return <p>Failed to load providers: {error.message}</p>;

  return (
    <>
      <h3>Choose your doctor</h3>
      <p style={{ padding: "10px 0px" }}>
        Your doctor will lead your care team and be your go-to care provider.
        Choose yours from the options below.
      </p>
      <div style={{ minHeight: "44px" }}>
        {
          <Link
            className="buttonLink"
            href="/providers/confirm"
            style={{
              backgroundColor: "#F5B38E",
              color: "#433534",
            }}
          >
            Choose a Doctor for Me
          </Link>
        }
      </div>
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
      <div style={{ minHeight: "44px" }}>
        {selectedProvider && (
          <Link
            className="buttonLink"
            href="/providers/confirm"
            style={{
              backgroundColor: "#FF594D",
              color: "#F5F5F5",
            }}
          >
            Choose this Doctor
          </Link>
        )}
      </div>
    </>
  );
}
