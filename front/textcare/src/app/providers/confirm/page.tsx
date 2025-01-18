"use client";

import Link from "next/link";
import { useProvidersContext } from "../../context/ProvidersContext";

export default function ConfirmPage() {
  const { selectedProvider } = useProvidersContext();

  const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "#333",
    textDecoration: "none",
    margin: "20px 0px",
    cursor: "pointer",
    transition: "color 0.2s ease",
  };

  const arrowStyle = {
    fontWeight: "bold",
    marginRight: "0.5rem",
  };

  return (
    <div>
      {/* Back Button */}
      <Link href="/providers/choose" style={backButtonStyle}>
        <span style={arrowStyle}>&lt;</span>
      </Link>

      {selectedProvider ? (
        <div>
          <h3>
            {" "}
            Great! Dr. {selectedProvider.name} will now be your provider.{" "}
          </h3>

          <p>Specialty: {selectedProvider.specialization}</p>
          <p>Education: {selectedProvider.education}</p>
        </div>
      ) : (
        <p>No provider selected. Go back and choose one.</p>
      )}
    </div>
  );
}
