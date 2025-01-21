import React, { useState } from "react";
import { OptionButton } from "@/app/components/OptionButton";

export const MultipleChoice = () => {
  const options = ["Yes", "No", "I don't know"];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const styles = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  return (
    <div style={styles}>
      {options.map((option) => (
        <OptionButton
          key={option}
          label={option}
          isSelected={selectedOption === option}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
