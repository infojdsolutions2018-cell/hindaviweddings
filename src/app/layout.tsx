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
    "Hindavi Wedding Family offers bespoke wedding planning, event production, and decor design services based in Karad, Maharashtra.",
  keywords: [
    "Wedding Planning",
    "Event Production",
    "Event Decor Design",
    "Karad Weddings",
    "Hindavi Wedding Family",
    "Hindavi Weddings & Events",
    "Maharashtra Wedding Planner",
    "Mandap Decor Karad",
  ],
  authors: [{ name: BUSINESS_CONFIG.name }],
  creator: BUSINESS_CONFIG.name,
  publisher: BUSINESS_CONFIG.name,
  metadataBase: new URL(BUSINESS_CONFIG.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS_CONFIG.displayName} | Wedding Planning & Event Production`,
    description:
      "Bespoke wedding planning, event production, and decor design in Karad, Maharashtra.",
    siteName: BUSINESS_CONFIG.displayName,
    url: BUSINESS_CONFIG.siteUrl,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.displayName} | Wedding Planning & Event Production`,
    description:
      "Bespoke wedding planning, event production, and decor design in Karad, Maharashtra.",
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
      <body className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal antialiased selection:bg-gold-100 selection:text-burgundy">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
