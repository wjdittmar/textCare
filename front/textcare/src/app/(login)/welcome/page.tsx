"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/lib/queryClient";
import { fetchProviders } from "@/app/context/ProvidersContext";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";

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
    router.push("/sign-in");
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
        />
        <h1> Virtual care, available now </h1>
        <p>
          {" "}
          Chat with a licensed clinician from wherever you are, on your schedule{" "}
        </p>
        <form onSubmit={handleFormSubmit}>
          <label> Email address </label>
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
