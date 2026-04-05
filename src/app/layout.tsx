import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { LayoutChrome } from "@/components/layout-chrome";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spanish Literary Association | VIT Vellore",
  description: "Official website for the Spanish Literary Association at VIT Vellore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
