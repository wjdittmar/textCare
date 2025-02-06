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
  firstName: z.string().min(1, "Legal first name is required"),
  lastName: z.string().min(1, "Legal last name is required"),
  birthday: z.string().min(1, "Birthday is required"),
  state: z.string().min(1, "State is required"),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function AccountPage() {
  const { updateFormData, formData } = useFormContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      birthday: formData.birthday || "",
      state: formData.state || "",
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

        <Button type="submit">Next</Button>
      </form>
    </>
  );
}
