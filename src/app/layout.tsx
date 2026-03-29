import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { ScrollSmoothProvider } from "@/components/scroll-smooth-provider";
import { PageTransition } from "@/components/page-transition";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <ScrollSmoothProvider />
        <SiteNavbar />
        <main className="flex-1 py-10">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
