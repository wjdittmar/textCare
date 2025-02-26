import { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "TextCare",
  description: "System design implementation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <div className="centered-div">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </div>
      </body>
    </html>
  );
}
