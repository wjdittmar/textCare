"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/lib/queryClient";
import { fetchProviders } from "@/app/context/ProvidersContext";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";
import { baseApiUrl } from "@/lib/apiConfig";

export default function Home() {
  useEffect(() => {
    client.prefetchQuery({
      queryKey: ["providers"],
      queryFn: fetchProviders,
    });
  }, []);

  const [inputUsername, setInputUsername] = useState("");
  const { setUsername } = useAuth();
  const router = useRouter();
  const endpoint = `${baseApiUrl}/v1/users/exists`;
  const styles = {
    padding: "25px 0px",
    display: "flex",
    flexDirection: "column",
    minWidth: "500px",
  };

  const imageStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  const handleNextClick = async () => {

    setUsername(inputUsername);

    try {

      const response = await fetch(
        `${endpoint}?email=${encodeURIComponent(inputUsername)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to check user existence");
      }

      const { exists } = await response.json();

      if (exists) {
        router.push("/sign-in");
      } else {
        router.push("/sign-up/account");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);

      router.push("/sign-up/account");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextClick();
  };

  return (
    <div style={styles}>
      <img
        style={imageStyle}
        src="/landing.png"
        width="400px"
        height="395px"
        alt="Landing"
      />
      <h1>Virtual care, available now</h1>
      <p>
        Chat with a licensed clinician from wherever you are, on your schedule.
      </p>
      <form onSubmit={handleFormSubmit}>
        <label>Email address</label>
        <Input
          placeholder="alice@curai.com"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <Button
          disabled={!inputUsername.trim()}
          onClick={handleNextClick}
          style={{ marginTop: "auto", width: "100%" }}
          variant="primary"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
