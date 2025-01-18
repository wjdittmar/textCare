export const Card = ({ provider, isSelected, onSelect }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      style={{
        border: isSelected ? "1px solid #F5B38E" : "1px solid gray",
        cursor: "pointer",
      }}
    >
      <li key={provider.id}>
        <h4>{provider.name}</h4>
        <p className="small">Specialty: {provider.specialization}</p>
        <p className="small">Education: {provider.education}</p>
        {/* placeholder */}
        <a style={{ color: "#FF594D", fontWeight: "bold" }}> More about me </a>
      </li>
    </div>
  );
};
