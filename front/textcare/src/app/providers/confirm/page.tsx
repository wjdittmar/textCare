"use client";

import { useProvidersContext } from "../../context/ProvidersContext";
import { Header } from "@/app/components/Header";
import { getPicturePath } from "@/lib/stringUtils";
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

  // need to call the API to update the member's PCP

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Header includeBack={true} backHref="/providers/choose" />

      {selectedProvider ? (
        <div>
          <h3>Great! Dr. {selectedProvider.name} will now be your provider.</h3>
          <div style={{ padding: "150px 0px", margin: "auto", width: "58%" }}>
            <img src={getPicturePath(selectedProvider.name, "large")} />
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
