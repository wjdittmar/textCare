import React from "react";
import { OptionButton } from "@/app/components/OptionButton";

type MultipleChoiceProps = {
  onSelect: (option: string) => void;
};

export const MultipleChoice = ({ onSelect }: MultipleChoiceProps) => {
  const options = ["Yes", "No", "I don't know"];
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null,
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const styles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  };

  return (
    <div style={styles}>
      {options.map((option) => (
        <OptionButton
          key={option}
          label={option}
          isSelected={selectedOption === option}
          onSelect={() => handleSelect(option)}
        />
      ))}
    </div>
  );
};
