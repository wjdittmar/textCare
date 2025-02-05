"use client";

import { useFormContext } from "@/app/context/FormContext";
import { useForm } from "react-hook-form";
import { Header } from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { LabeledInput } from "@/app/components/LabeledInput";
import { Select } from "@/app/components/Select";
import { Label } from "@/app/components/Label";
export default function accountPage() {
  const { updateFormData, formData } = useFormContext();
  const router = useRouter();

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    router.push("/step2");
  };
  const { register, handleSubmit } = useForm<Step1Data>({
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      birthday: formData.birthday || "",
    },
  });

  return (
    <>
      <Header currentStep={1} includeBack={true} backHref="/welcome" />
      <h2> Welcome to TextCare </h2>
      <p>
        Please fill out the information below as it would appear on an official
        ID
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput
          label="Legal first name"
          {...register("firstName", { required: true })}
        />
        <LabeledInput
          label="Legal last name"
          {...register("lastName", { required: true })}
        />
        <LabeledInput
          label="Birthday - MM/DD/YYYY"
          type="date"
          {...register("birthday", { required: true })}
        />
        <Label> State </Label>
        <Select {...register("state", { required: true })}>
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
        <button type="submit">Next</button>
      </form>
    </>
  );
}
