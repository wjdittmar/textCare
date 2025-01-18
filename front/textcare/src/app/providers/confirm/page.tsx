"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { Header } from "@/app/components/Header";
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
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Header includeBack={true} backHref="/providers/choose" />

      {selectedProvider ? (
        <div>
          <h3>Great! Dr. {selectedProvider.name} will now be your provider.</h3>
          <div style={{ padding: "150px 0px", margin: "auto", width: "58%" }}>
            <img src="/placeholder_selected_provider.png" />
            <h4 style={{ textAlign: "center" }}>
              {" "}
              Dr. {selectedProvider.name}{" "}
            </h4>
            <p>Specialty: {selectedProvider.specialization}</p>
            <p>Education: {selectedProvider.education}</p>
          </div>
        </div>
      ) : (
        <p>No provider selected. Go back and choose one.</p>
      )}
    </div>
  );
}
