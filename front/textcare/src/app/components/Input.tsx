export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  ...rest
}) => {
  const styles = {
    padding: "8px",
    border: "none",
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
      {...rest}
    />
  );
};
