"use client";

import styles from "./globals.css";
import Link from "next/link";

import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function EntryPoint() {
  return (
    <>
      <Link className="buttonLink" href="/providers/choose">
        Start Here
      </Link>
    </>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page-container">
        <div className="centered-div">
          <EntryPoint />
        </div>
      </div>
    </QueryClientProvider>
  );
}
