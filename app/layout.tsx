import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdelhamed Mohamed - Software Engineer & Founder",
  description: "Software Engineer and Founder of Oblien. Building innovative solutions with modern technologies.",
  keywords: ["Abdelhamed Mohamed", "Software Engineer", "Oblien", "Web Developer", "Tech Founder"],
  authors: [{ name: "Abdelhamed Mohamed" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Abdelhamed Mohamed - Software Engineer & Founder",
    description: "Software Engineer and Founder of Oblien. Building innovative solutions with modern technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelhamed Mohamed - Software Engineer & Founder",
    description: "Software Engineer and Founder of Oblien. Building innovative solutions with modern technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
