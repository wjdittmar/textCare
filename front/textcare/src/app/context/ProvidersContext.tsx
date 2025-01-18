"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const fetchProviders = async () => {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = baseApiUrl + "/v1/providers?location=San Rafael, California";
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer PTGBFCQDCVTZBLIQNFRTCCSE4Q`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }

  return response.json();
};

const ProvidersContext = createContext(null);

export const ProvidersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 120000,
  });

  const [providers, setProviders] = useState([]);

  // TODO on backend add limit on query
  useEffect(() => {
    if (data?.providers) {
      setProviders(data.providers.slice(0, -1));
    }
  }, [data]);

  return (
    <ProvidersContext.Provider
      value={{
        providers,
        selectedProvider,
        setSelectedProvider,
        error,
        isLoading,
        isFetching,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

export const useProvidersContext = () => {
  const context = useContext(ProvidersContext);
  if (!context) {
    throw new Error(
      "useProvidersContext must be used within a ProvidersProvider",
    );
  }
  return context;
};
