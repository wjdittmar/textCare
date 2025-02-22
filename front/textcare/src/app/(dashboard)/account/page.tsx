"use client";

import { Button } from "@/app/components/Button";
import { baseApiUrl } from "@/lib/apiConfig";
import { apiClient } from "@/lib/api";

export default function AccountPage() {
  const endpoint = `${baseApiUrl}/v1/users/me/`;

  const handleNextClick = async () => {
    try {
      /* const resp = await fetch("http://localhost/api/v1/users/me");
       * console.log(resp); */
      const response = await apiClient("http://localhost/api/v1/users/me", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update PCP.");
      }
    } catch (err: any) {
      console.error(err);
      //setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <Button
      onClick={handleNextClick}
      variant="secondary"
      style={{ marginTop: "auto" }}
    >
      Nexts
    </Button>
  );
}
