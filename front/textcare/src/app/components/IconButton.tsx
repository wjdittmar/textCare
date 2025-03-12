import React from "react";
import Link from "next/link";

interface IconButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

export const IconButton = ({
  href,
  onClick,
  children,
  disabled = false,
  style = {},
  type = "button",
}: IconButtonProps) => {
  const baseStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  return href ? (
    <Link href={href} passHref legacyBehavior>
      <a style={baseStyles}>{children}</a>
    </Link>
  ) : (
    <button
      onClick={onClick}
      style={baseStyles}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
