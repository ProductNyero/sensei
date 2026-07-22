import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sensei",
  description: "A priority-ranked to-do list with a Pomodoro-style focus timer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-black">{children}</body>
    </html>
  );
}
