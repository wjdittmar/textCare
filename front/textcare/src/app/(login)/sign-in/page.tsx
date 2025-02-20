"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { baseApiUrl } from "@/lib/apiConfig";

export default function SignInPage() {
  const router = useRouter();
  const { username } = useAuth();
  const [password, setPassword] = useState("");
  const endpoint = `${baseApiUrl}/v1/tokens/authentication`;

  const styles = {
    padding: "25px 0px",
    display: "flex",
    flexDirection: "column",
    minWidth: "500px",
  };

  useEffect(() => {
    if (!username) {
      router.push("/welcome");
    }
  }, [username, router]);

  if (!username) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(() => {
            window.alert(
              "Login failed! Please check your username and password and try again.",
            );

            throw new Error("Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          router.push("/onboarding/providers/info");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div style={styles}>
      <h1>Sign In</h1>
      <p>Welcome, {username}!</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={!password.trim()}
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
