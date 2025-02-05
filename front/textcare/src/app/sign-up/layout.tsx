"use client";

import { ReactNode } from "react";
import { FormProvider } from "@/app/context/FormContext";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <FormProvider>
      <div style={{ width: "50%", maxWidth: "550px" }}>{children}</div>
    </FormProvider>
  );
}
