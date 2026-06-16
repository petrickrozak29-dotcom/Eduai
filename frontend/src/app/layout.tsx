import type { Metadata } from "next";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduPath AI - Adaptive Learning Platform untuk SMA",
  description: "Platform pembelajaran adaptif berbasis Artificial Intelligence untuk siswa SMA. Belajar sesuai potensimu, berkembang bersama AI.",
  keywords: ["edupath", "ai", "pembelajaran", "adaptif", "sma", "artificial intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
