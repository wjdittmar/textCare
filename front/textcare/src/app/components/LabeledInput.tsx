import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import React from "react";

interface LabeledInputProps extends React.ComponentProps<typeof Input> {
  label: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  ...inputProps
}) => {
  return (
    <>
      <Label> {label}</Label>
      <Input {...inputProps} />
    </>
  );
};
