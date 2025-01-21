export const SelectableInput = ({ text, isSelected, onSelect }) => {
  return (
    <div
      className={`selectable-input ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      style={{
        // Placeholder for styling
        border: isSelected ? "1px solid #ccc" : "1px solid transparent",
        cursor: "pointer",
        padding: "8px",
        margin: "4px 0",
      }}
    >
      <p>{text}</p>
    </div>
  );
};
