"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProvidersProvider } from "../context/ProvidersContext";
import { ProgressTracker } from "../components/ProgressTracker";
import React from "react";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    "Step 1: Choose Doctor",
    "Step 2: Medical Info",
    "Step 3: Confirmation",
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ProvidersProvider>
        <div className="page-container">
          <div className="centered-div">
            <div className="providerBox">
              <ProgressTracker steps={steps} currentStepIndex={0} />
              {children}
            </div>
          </div>
        </div>
      </ProvidersProvider>
    </QueryClientProvider>
  );
}
