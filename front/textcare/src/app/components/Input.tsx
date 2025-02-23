import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder = "",
      className = "",
      ...rest
    },
    ref,
  ) => {
    const styles = {
      padding: "8px",
      border: "1px solid black",
      display: "block",
      width: "100%",
      margin: "10px 0px",
      borderRadius: "4px",
      fontSize: "16px",
      outline: "none",
    };

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`base-input ${className}`}
        style={styles}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
