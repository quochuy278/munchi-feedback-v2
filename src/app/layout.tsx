import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Munchi Feedback",
  icons:{
     icon: './favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
