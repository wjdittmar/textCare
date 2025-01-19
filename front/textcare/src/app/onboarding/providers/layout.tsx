"use client";

import { ProvidersProvider } from "../../context/ProvidersContext";
import React from "react";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvidersProvider>{children}</ProvidersProvider>;
}
