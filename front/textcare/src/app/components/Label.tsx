import React from "react";

interface LabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  style,
  className = "",
}) => {
  const defaultStyles = {
    fontWeight: "700",
    fontSize: "12px",
  };

  const combinedStyles = { ...defaultStyles, ...style };

  return (
    <span style={combinedStyles} className={className}>
      {children}
    </span>
  );
};
