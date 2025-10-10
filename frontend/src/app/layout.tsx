import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavbar from "../components/BottomNavbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zynk | Charge. Connect. Go. ",
  description: "All in one place for EV owners in Sri Lanka",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zynk",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Zynk",
    title: "Zynk | Charge. Connect. Go.",
    description: "All in one place for EV owners in Sri Lanka",
  },
  twitter: {
    card: "summary",
    title: "Zynk | Charge. Connect. Go.",
    description: "All in one place for EV owners in Sri Lanka",
  },
};

export const viewport: Viewport = {
  width: 393,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* iOS PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Zynk" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#00BC74" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.svg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
