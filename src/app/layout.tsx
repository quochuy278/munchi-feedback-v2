import "./globals.css";
import type { Metadata } from "next";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Munchi Feedback",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
