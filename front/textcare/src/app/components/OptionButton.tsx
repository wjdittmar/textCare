import React from "react";

export const OptionButton = ({ label, isSelected, onSelect }) => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: isSelected ? "#FFDECC" : "#FFFFFF",
    borderRadius: "8px",
    border: "1px solid #F5B38E",
    paddingLeft: "10px",
  };

  const buttonStyle = {
    padding: "12px 16px",

    cursor: "pointer",
    backgroundColor: isSelected ? "#FFDECC" : "#FFFFFF",
    color: "#000",
    border: "none",
    justifyContent: "start",
    fontWeight: "500",
    flex: "1",
  };

  return (
    <div style={divStyle}>
      {isSelected && (
        <img
          height="24px"
          width="24px"
          src="/enabled_selected.png"
          alt="selected"
        />
      )}
      {!isSelected && (
        <img
          height="24px"
          width="24px"
          src="/enabled_unselected.png"
          alt="selected"
        />
      )}
      <button style={buttonStyle} onClick={() => onSelect(label)}>
        {label}
      </button>
    </div>
  );
};
