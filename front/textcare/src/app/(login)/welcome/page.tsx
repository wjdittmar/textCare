"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/queryClient";
import { fetchProviders } from "@/app/context/ProvidersContext";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { useAuth } from "@/app/context/AuthContext";
import { baseApiUrl } from "@/lib/apiConfig";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function Home() {
  useEffect(() => {
    client.prefetchQuery({
      queryKey: ["providers"],
      queryFn: fetchProviders,
    });
  }, []);

  const { setUsername } = useAuth();
  const router = useRouter();
  const endpoint = `${baseApiUrl}/v1/users/exists`;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

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

  const onSubmit = async (data: EmailFormData) => {
    setUsername(data.email);

    try {
      const response = await fetch(
        `${endpoint}?email=${encodeURIComponent(data.email)}`,
      );

      if (!response.ok) throw new Error("Failed to check user existence");
      const { exists } = await response.json();

      router.push(exists ? "/sign-in" : "/sign-up/account");
    } catch (error) {
      console.error("Error checking user existence:", error);
      router.push("/sign-up/account");
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email address</label>
        <Input
          placeholder="dexter@lab.com"
          {...register("email")}
          error={errors.email?.message}
        />
        {errors.email && (
          <p style={{ color: "red", marginTop: 4 }}>{errors.email.message}</p>
        )}

        <Button
          disabled={!isValid}
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
