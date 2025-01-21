export const Chip = ({ label, onDelete, className = "" }) => {
  const styles = {
    display: "flex",
    textAlign: "center",
    backgroundColor: "#DBE1EC",
    borderRadius: "20px",
    alignItems: "center",
    width: "50%",
  };
  const buttonStyle = {
    backgroundColor: "#8199BF",
    border: "none",
    color: "#FFFFFF",
  };
  return (
    <div style={styles} className={`chip ${className}`}>
      <span>{label}</span>
      <button style={buttonStyle} className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};
