import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Leria Portfolio",
  description: "Modern Next.js Lucas Leria Portfolio. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Lucas Leria", "Leria","Portfolio", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Lucas Leria" }],
  openGraph: {
    title: "Lucas Leria Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "",
    siteName: "Lucas_Leria_Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}