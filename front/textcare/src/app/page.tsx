"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { client } from "../lib/queryClient";
import { fetchProviders } from "./context/ProvidersContext";
import { Input } from "./components/Input";

export default function Home() {
  useEffect(() => {
    client.prefetchQuery({
      queryKey: ["providers"],
      queryFn: fetchProviders,
    });
  }, []);

  const styles = {
    height: "100vh",
    padding: "25px 0px",
    display: "flex",
    flexDirection: "column",
    minWidth: "768px",
  };

  const imageStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  };

  return (
    <div className="page-container">
      <div style={styles}>
        <img
          style={imageStyle}
          src="/landing.png"
          width="400px"
          height="395px"
        />
        <h1> Virtual care, available now </h1>
        <p>
          {" "}
          Chat with a licensed clinician from wherever you are, on your schedule{" "}
        </p>
        <form>
          <label> Email address </label>
          <Input />
        </form>
        <Link
          className="buttonLink"
          href="/onboarding/providers/info"
          style={{ marginTop: "auto" }}
        >
          Start Here
        </Link>
      </div>
    </div>
  );
}
