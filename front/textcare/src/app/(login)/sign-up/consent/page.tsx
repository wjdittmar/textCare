"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/context/FormContext";
import { Header } from "@/app/components/Header";
import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { useAuth } from "@/app/context/AuthContext";

export default function ConsentPage() {
  const router = useRouter();
  const { formData } = useFormContext();
  const endpoint = `${baseApiUrl}/v1/users`;
  const { username } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAccept = async () => {
    setIsSubmitting(true);
    setError("");

    // TODO: use shared types with backend
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: username,
      password: formData.password,
      address_line_one: formData.addressLineOne,
      address_line_two: formData.addressLineTwo,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      phone_number: formData.phoneNumber,
      sex_at_birth: formData.sex,
      birthday: formData.birthday,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
        setIsSubmitting(false);
      } else {
        setSuccess(true);

        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
    } catch (err: any) {
      setError("An error occurred during registration");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header currentStep={4} includeBack={true} backHref="/sign-up/password" />
      <h2>Terms and Conditions</h2>
      <p>
        We comply with HIPAA regulations and secure data with industry best
        practices.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {success ? (
        <p style={{ color: "green" }}>Success! Redirecting...</p>
      ) : (
        <Button onClick={handleAccept} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "I Accept"}
        </Button>
      )}
    </>
  );
}
