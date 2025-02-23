import { LabeledInput } from "./LabeledInput";
import { useEffect, useState } from "react";

type LabeledPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
};

export const LabeledPhoneInput: React.FC<LabeledPhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  name,
}) => {
  const [displayValue, setDisplayValue] = useState("");
  useEffect(() => {
    if (!value) setDisplayValue("");
  }, [value]);

  const handlePhoneChange = (e) => {
    const rawInput = e.target.value.replace(/\D/g, ""); // Remove non-digits
    const maxLength = 10;

    const trimmedInput = rawInput.slice(0, maxLength);

    let formatted = "";
    if (trimmedInput.length > 0)
      formatted += `(${trimmedInput.substring(0, 3)}`;
    if (trimmedInput.length > 3)
      formatted += `) ${trimmedInput.substring(3, 6)}`;
    if (trimmedInput.length > 6)
      formatted += `-${trimmedInput.substring(6, 10)}`;

    setDisplayValue(formatted);

    onChange(trimmedInput);
  };

  return (
    <>
      <LabeledInput
        label="Phone Number"
        name={name}
        value={displayValue}
        onBlur={onBlur}
        onChange={handlePhoneChange}
        placeholder="(123) 456-7890"
        maxLength={14}
      />
    </>
  );
};
