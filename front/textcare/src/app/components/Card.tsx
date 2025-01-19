import { getPicturePath } from "@/lib/stringUtils";
export const Card = ({ provider, isSelected, onSelect }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      style={{
        border: isSelected ? "1px solid #F5B38E" : "1px solid white",
        cursor: "pointer",
        display: "flex",
      }}
    >
      <img
        height={64}
        width={64}
        alt="provider_small"
        src={getPicturePath(provider.name, "small")}
      />
      <li key={provider.id} style={{ width: "65%" }}>
        <h4>{provider.name}</h4>
        <p className="small">Specialty: {provider.specialization}</p>
        <p className="small">Education: {provider.education}</p>
        {/* placeholder */}
        <a style={{ color: "#FF594D", fontWeight: "bold" }}> More about me </a>
      </li>
      <span
        id="checkmark"
        className={`${isSelected ? "selected" : "notSelected"}`}
      />
    </div>
  );
};
