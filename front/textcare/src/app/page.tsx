"use client";

import styles from "./globals.css";

import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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

  // Render the providers list
  return (
    <>
      <div className="providerBox">
        <div className="progress">
          <hr />
        </div>
        <h3>Choose your doctor</h3>
        <p>
          Your doctor will lead your care team and be your go-to care provider.
          Choose yours from the options below.{" "}
        </p>
        <button>
          <h4>Choose a Doctor for Me</h4>{" "}
        </button>
        <ul className="provider">
          {data?.providers.map((provider: any) => (
            <div className="card">
              <li key={provider.id}>
                <h4>{provider.name}</h4>
                <p className="small">Specialty: {provider.specialization}</p>
                <p className="small"> Education {provider.education}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page-container">
        <div className="centered-div">
          <ProvidersList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
