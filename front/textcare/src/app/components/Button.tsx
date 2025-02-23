import Link from "next/link";
import React from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  href,
  onClick,
  children,
  disabled = false,
  style = {},
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  const baseStyles: React.CSSProperties = {
    padding: "12px 24px",
    gap: "10px",
    borderRadius: "24px",
    border: "1px solid #f5b38e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "700",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#F5B38E",
      color: "#433534",
    },
    secondary: {
      backgroundColor: "#FF594D",
      color: "#F5F5F5",
    },
  };

  const appliedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return href ? (
    <Link href={href} style={appliedStyles} passHref legacyBehavior>
      <a style={appliedStyles}>{children}</a>
    </Link>
  ) : (
    <button
      onClick={onClick}
      style={appliedStyles}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
