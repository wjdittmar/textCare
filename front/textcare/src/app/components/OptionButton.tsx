import React from "react";

export const OptionButton = ({ label, isSelected, onSelect }) => {
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    border: "1px solid #121212",
    padding: "12px 16px",
    cursor: "pointer",
    backgroundColor: isSelected ? "" : "#FFFFFF",
    color: "#000",
    fontWeight: 500,
    width: "100%",
    justifyContent: "flex-start",
  };

  const imgStyle = {
    marginRight: "8px",
  };

  return (
    <button style={buttonStyle} onClick={() => onSelect(label)}>
      <img
        style={imgStyle}
        height="24"
        width="24"
        src={isSelected ? "/enabled_selected.png" : "/enabled_unselected.png"}
        alt={isSelected ? "selected" : "unselected"}
      />
      {label}
    </button>
  );
};
