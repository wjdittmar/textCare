"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { client } from "../lib/queryClient";
import { fetchProviders } from "./context/ProvidersContext";

export default function Home() {
  useEffect(() => {
    client.prefetchQuery({
      queryKey: ["providers"],
      queryFn: fetchProviders,
    });
  }, []);

  return (
    <div className="page-container">
      <div className="centered-div">
        <Link className="buttonLink" href="/providers/choose">
          Start Here
        </Link>
      </div>
    </div>
  );
}
