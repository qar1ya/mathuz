import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "MathUz",
  description: "DTM va Milliy Sertifikat uchun math platforma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}