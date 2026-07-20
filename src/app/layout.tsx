import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jignesh Prajapati | Mobile Photography Portfolio",
  description: "Personal photography showcase capturing landscapes, streetscapes, and daily moments with Samsung Galaxy S21 FE & S24 Ultra.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jignesh-photofolio.vercel.app"),
  openGraph: {
    title: "Jignesh Prajapati | Mobile Photography Portfolio",
    description: "Explore the mobile photography showcases, city street scenes, and nature highlights of Jignesh Prajapati.",
    url: "https://jignesh-photofolio.vercel.app",
    siteName: "JP Portfolio",
    images: [
      {
        url: "/photos/WhatsApp%20Image%202026-07-16%20at%205.59.35%20PM.jpeg",
        width: 1200,
        height: 630,
        alt: "Jignesh Prajapati Mobile Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jignesh Prajapati | Mobile Photography Portfolio",
    description: "Personal mobile photography captures and cinematic reels by Jignesh Prajapati.",
    images: ["/photos/WhatsApp%20Image%202026-07-16%20at%205.59.35%20PM.jpeg"],
  },
  verification: {
    google: "google5f0fd429c7e0fd9d",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="bg-bg-primary text-text-light font-sans min-h-full flex flex-col">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
