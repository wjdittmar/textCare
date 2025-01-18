"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProvidersProvider } from "../context/ProvidersContext";
import React from "react";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProvidersProvider>
        <div className="page-container">
          <div className="centered-div">{children}</div>
        </div>
      </ProvidersProvider>
    </QueryClientProvider>
  );
}
