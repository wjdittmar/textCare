import Link from "next/link";

export const Button = ({
  href,
  onClick,
  children,
  disabled,
  style,
  variant,
  type,
}) => {
  const baseStyles = {
    padding: " 12px 24px 12px 24px",
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
      background: "#FFDECC",
    },
    secondary: {
      backgroundColor: "#FFDECC",
      color: "#F5F5F5",
      background: "#FF594D",
    },
  };

  const appliedStyles = {
    ...baseStyles,
    ...variantStyles[variant || "primary"],
  };

  return href ? (
    <Link href={href} style={appliedStyles}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      style={appliedStyles}
      disabled={disabled}
      {...(type ? { type } : {})}
    >
      {children}
    </button>
  );
};
