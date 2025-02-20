"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormContext } from "@/app/context/FormContext";
import { Header } from "@/app/components/Header";
import { LabeledInput } from "@/app/components/LabeledInput";
import { Button } from "@/app/components/Button";
import { LabeledPhoneInput } from "@/app/components/LabeledPhoneInput";
import { Select } from "@/app/components/Select";

const step1Schema = z.object({
  firstName: z.string().min(1, "Legal first name is required"),
  lastName: z.string().min(1, "Legal last name is required"),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine((val) => {
      const date = new Date(val);
      return (
        !isNaN(date.getTime()) &&
        date <= new Date() &&
        date >= new Date("1900-01-01")
      );
    }, "Must be between 1900-01-01 and today"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  sex: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function AccountPage() {
  const { updateFormData, formData } = useFormContext();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      birthday: formData.birthday || "",
      phoneNumber: formData.phoneNumber || "",
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    router.push("/sign-up/profile");
  };

  return (
    <>
      <Header currentStep={1} includeBack={true} backHref="/welcome" />
      <h2>Welcome to TextCare</h2>
      <p>
        Please fill out the information below as it would appear on an official
        ID.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput label="Legal first name" {...register("firstName")} />
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors.firstName.message}</p>
        )}

        <LabeledInput label="Legal last name" {...register("lastName")} />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}

        <LabeledInput
          label="Birthday - MM/DD/YYYY"
          type="date"
          {...register("birthday")}
        />
        {errors.birthday && (
          <p style={{ color: "red" }}>{errors.birthday.message}</p>
        )}
        <label>Sex assigned at birth</label>
        <Select {...register("sex")}>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="intersex">Intersex</option>
          <option value="">Prefer not to say</option>
        </Select>
        {/* this pattern allows the component to control the display (XXX)-(XXX)-(XXXX) and then pass back the parsed value to hookform */}
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => <LabeledPhoneInput {...field} />}
        />
        {errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
        )}

        <Button type="submit">Next</Button>
      </form>
    </>
  );
}
