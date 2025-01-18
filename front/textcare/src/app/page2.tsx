"use client";

import styles from "./globals.css";
import Link from "next/link";

import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ProgressTracker } from "./components/ProgressTracker";
import { Card } from "./components/Card";
import {
  useProvidersContext,
  ProvidersProvider,
} from "./context/ProvidersContext";

const queryClient = new QueryClient();

const fetchProviders = async () => {
  const response = await fetch(
    "http://localhost:4000/v1/providers?location=San Rafael, California",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer PTGBFCQDCVTZBLIQNFRTCCSE4Q`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }

  return response.json();
};
function ProvidersList() {
  // Manually set the auth token (replace this with dynamic retrieval later)

  // Use React Query's useQuery to fetch providers
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchProviders,
  });

  const { setProviders, selectedProvider, setSelectedProvider } =
    useProvidersContext();

  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
  ];

  return (
    <>
      <div className="providerBox">
        <ProgressTracker steps={steps} currentStepIndex={0} />
        <h3>Choose your doctor</h3>
        <p>
          Your doctor will lead your care team and be your go-to care provider.
          Choose yours from the options below.{" "}
        </p>
        <Link className="buttonLink" href="/providers/confirm">
          Choose a Doctor for me
        </Link>
        <ul className="provider">
          {data?.providers.map((provider: any) => (
            <Card
              key={provider.id}
              provider={provider}
              isSelected={selectedProvider?.id === provider.id}
              onSelect={() => setSelectedProvider(provider)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProvidersProvider>
        <div className="page-container">
          <div className="centered-div">
            <ProvidersList />
          </div>
        </div>
      </ProvidersProvider>
    </QueryClientProvider>
  );
}
