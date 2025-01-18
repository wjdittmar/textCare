"use client";

import { ProvidersProvider } from "../context/ProvidersContext";
import React from "react";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersProvider>
      <div className="page-container">
        <div className="centered-div">
          <div className="providerBox">{children}</div>
        </div>
      </div>
    </ProvidersProvider>
  );
}
