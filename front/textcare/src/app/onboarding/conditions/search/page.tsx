"use client";

import { AutoComplete } from "@/app/components/AutoComplete";
import { Header } from "@/app/components/Header";
export default function SearchPage() {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const apiUrl = baseApiUrl + "/v1/icd10";

  return (
    <div>
      <Header
        currentStep={2}
        includeBack={true}
        backHref="/onboarding/providers/confirm"
      />

      <AutoComplete apiURL={apiUrl} />
    </div>
  );
}
