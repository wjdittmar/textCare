"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormContext } from "@/app/context/FormContext";
import { Header } from "@/app/components/Header";
import { LabeledInput } from "@/app/components/LabeledInput";
import { Button } from "@/app/components/Button";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a symbol",
    ),
});

type PasswordData = z.infer<typeof passwordSchema>;

export default function AccountPage() {
  const { updateFormData, formData } = useFormContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: formData.password || "",
    },
  });

  const onSubmit = (data: PasswordData) => {
    updateFormData(data);
    router.push("/sign-up/consent");
  };

  return (
    <>
      <Header currentStep={2} includeBack={true} backHref="/sign-up/account" />
      <h2>Create a password</h2>
      <div>
        Your password must contain:
        <ul>
          <li>At least 8 characters</li>
          <li>An uppercase letter (A–Z) and a lowercase letter (a–z)</li>
          <li>A number (0–9) and a symbol (e.g. $, #, @, !, %)</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput
          label="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <Button type="submit">Create Account</Button>
      </form>
    </>
  );
}
