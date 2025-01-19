"use client";

import { Button } from "@/app/components/Button";
import { Header } from "@/app/components/Header";
export default function InfoPage() {
  return (
    <div>
      <Header />
      <div className="sectionHeader">
        <h3>Meet the team behind your care</h3>
        <p>
          Your care team includes different healthcare providers, and a doctor
          dedicated to YOU who will follow your health journey.
        </p>
      </div>
      {/* in production would use CDN / image optimization/
          would also get a cropped version of the image to avoid negative offset
          /*/}
      <img
        src={`/providers_info.png`}
        alt="provider info"
        height="424"
        width="375"
        style={{ marginLeft: "-20px" }}
      />
      <Button href="/onboarding/providers/choose" variant="secondary">
        Next
      </Button>
    </div>
  );
}
