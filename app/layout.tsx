import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PortalNav } from "@/components/PortalNav";
import { FeedbackButton } from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: "biohack.tools — Peptide Protocol Tools",
  description:
    "Tools for informed peptide use. Learn, plan your protocol, prepare your order, and track your injections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PortalNav />
          {children}
          <FeedbackButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
