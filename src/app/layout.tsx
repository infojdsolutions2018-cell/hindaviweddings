import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { BUSINESS_CONFIG } from "@/config/business";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_CONFIG.displayName} | Wedding Planning & Event Production`,
    template: `%s | ${BUSINESS_CONFIG.displayName}`,
  },
  description:
    "Hindavi Wedding Family offers bespoke wedding planning, event production, and decor design services based in Pune, Maharashtra.",
  keywords: [
    "Wedding Planner in Pune",
    "Best Wedding Decorator in Pune",
    "Hindavi Weddings & Events",
    "Hindavi Wedding Family Pune",
    "Event Production and Trussing Pune",
    "Event Decor Design Pune",
    "Royal Mandap Decor Pune",
    "Sacred Vedic Mandap Setup",
    "Haldi Ceremony Decor Pune",
    "Sangeet Stage Production Pune",
    "Luxury Wedding Planning Maharashtra",
    "Wedding Planner Dhayari Pune",
    "Wedding Event Management Karad Satara",
    "Destination Wedding Planner Mahabaleshwar Lonavala",
    "Maharashtrian Wedding Planner Lagna Sohala",
    "Wedding Light and Sound Production Pune",
    "Open Lawn Wedding Decor Pune",
  ],
  authors: [{ name: BUSINESS_CONFIG.name }],
  creator: BUSINESS_CONFIG.name,
  publisher: BUSINESS_CONFIG.name,
  metadataBase: new URL(BUSINESS_CONFIG.siteUrl),
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/logo.jpg",
    apple: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS_CONFIG.displayName} | Wedding Planning & Event Production`,
    description:
      "Bespoke wedding planning, event production, and decor design in Pune, Maharashtra.",
    siteName: BUSINESS_CONFIG.displayName,
    url: BUSINESS_CONFIG.siteUrl,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.displayName} | Wedding Planning & Event Production`,
    description:
      "Bespoke wedding planning, event production, and decor design in Pune, Maharashtra.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-charcoal antialiased selection:bg-blush-200 selection:text-coral-dark">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
