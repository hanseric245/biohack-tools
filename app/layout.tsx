import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peptide Dosage Calculator — biohack.tools",
  description:
    "Calculate your exact draw volume for precise peptide dosing. Input vial amount, bacteriostatic water, syringe type, and dose to get syringe unit marks instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
