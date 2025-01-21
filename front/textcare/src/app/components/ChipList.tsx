import React, { useState } from "react";
import { Chip } from "@/app/components/Chip";

export const ChipList = ({ initialChips, onChipsChange }) => {
  const [chips, setChips] = useState(initialChips);

  const handleDelete = (chip) => {
    const updatedChips = chips.filter((c) => c !== chip);
    setChips(updatedChips);
    if (onChipsChange) onChipsChange(updatedChips);
  };

  return (
    <div className="chip-list" style={{ height: "100%" }}>
      {chips.map((chip) => (
        <Chip key={chip} label={chip} onDelete={() => handleDelete(chip)} />
      ))}
    </div>
  );
};
