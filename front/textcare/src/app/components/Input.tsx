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
      {...rest}
    />
  );
};
