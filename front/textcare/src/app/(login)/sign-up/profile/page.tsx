"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormContext } from "@/app/context/FormContext";
import { Header } from "@/app/components/Header";
import { LabeledInput } from "@/app/components/LabeledInput";
import { Select } from "@/app/components/Select";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";

const step1Schema = z.object({
  addressLineOne: z.string().min(1, "Address is required"),
  addressLineTwo: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function ProfilePage() {
  const { updateFormData, formData } = useFormContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      addressLineOne: formData.addressLineOne || "",
      addressLineTwo: formData.addressLineTwo || "",
      city: formData.city || "",
      state: formData.state || "",
      zipCode: formData.zipCode || "",
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    router.push("/sign-up/password");
  };

  return (
    <>
      <Header currentStep={1} includeBack={true} backHref="/welcome" />
      <h2>Welcome to TextCare</h2>
      <p>Provide a few quick details now to get started.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput label="Address line 1" {...register("addressLineOne")} />
        {errors.addressLineOne && (
          <p style={{ color: "red" }}>{errors.addressLineOne.message}</p>
        )}

        <LabeledInput label="Address line 2" {...register("addressLineTwo")} />
        {errors.addressLineTwo && (
          <p style={{ color: "red" }}>{errors.addressLineTwo.message}</p>
        )}
        <LabeledInput label="City" {...register("city")} />
        {errors.city && <p style={{ color: "red" }}>{errors.city.message}</p>}

        <Label>State</Label>
        <Select {...register("state")}>
          <option value="">Select a state</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </Select>
        {errors.state && <p style={{ color: "red" }}>{errors.state.message}</p>}

        <LabeledInput label="Zip Code" {...register("zipCode")} />
        {errors.zipCode && (
          <p style={{ color: "red" }}>{errors.zipCode.message}</p>
        )}
        <Button type="submit">Next</Button>
      </form>
    </>
  );
}
