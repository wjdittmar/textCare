"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const fetchProviders = async () => {
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
  });

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (data?.providers) {
      setProviders(data.providers);
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
