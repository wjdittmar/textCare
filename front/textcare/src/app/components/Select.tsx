export const Select = ({
  value,
  onChange,
  className = "",
  style = {},
  children,
  ...rest
}) => {
  const defaultStyles = {
    padding: "8px",
    border: "1px solid black",
    display: "block",
    width: "100%",
    margin: "10px 0px",
    borderRadius: "4px",
    fontSize: "16px",
    outline: "none",
  };

  const combinedStyles = { ...defaultStyles, ...style };

  return (
    <select
      value={value}
      onChange={onChange}
      className={className}
      style={combinedStyles}
      {...rest}
    >
      {children}
    </select>
  );
};
