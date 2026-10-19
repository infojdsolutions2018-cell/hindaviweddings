/**
 * Centralized Business Configuration for Hindavi Wedding Family
 * Source of truth: Hindavi Wedding Family Project Specification (Owner-provided details)
 * 
 * Rules:
 * - Verified owner details only.
 * - Phone number is marked for reconfirmation before production launch.
 * - Do not invent unconfirmed services, prices, or claims.
 */

export const BUSINESS_CONFIG = {
  name: "Hindavi Wedding Family",
  displayName: "Hindavi Weddings & Events",
  category: "Event Planner",
  tagline: "Bespoke Wedding Planning, Event Production & Decor Design",
  /**
   * Configurable canonical website URL.
   * Uses NEXT_PUBLIC_SITE_URL or defaults to local development URL.
   * Note for launch: set NEXT_PUBLIC_SITE_URL to the verified custom domain.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  specializations: [
    "Wedding Planning",
    "Event Production",
    "Event Decor Design",
  ] as const,
  eventSpecialties: [
    { title: "Haldi Ceremony", description: "Vibrant yellow floral decor, marigold backdrops, brass urli setups, and festive ritual ambiance." },
    { title: "Wedding (Lagna)", description: "Sacred Vedic mandap architecture, floral canopies, traditional seating, and seamless ceremonial choreography." },
    { title: "Engagement", description: "Romantic floral arches, customized stage backdrops, ambient illumination, and bespoke couple seating." },
    { title: "Engagement Ceremony", description: "Curated ritual setups, exchange of rings staging, family welcoming aesthetics, and acoustic arrangements." },
    { title: "Entrance Decor", description: "Grand floral tunnels, royal entryway arches, brass diyas, lantern pathways, and dramatic welcoming vistas." },
    { title: "Sangeet Night", description: "High-energy concert stage fabrication, intelligent moving-head lighting, LED backdrops, and acoustic design." },
    { title: "Ring Ceremony", description: "Intimate contemporary styling, modern geometric structures, delicate pastel florals, and mood lighting." },
    { title: "Romantic Proposal", description: "Magical fairy-light installations, candlelit pathways, floral lettering, and unforgettable private settings." },
  ] as const,
  contact: {
    email: "hindaviweddings1191@gmail.com",
    /**
     * Note: Phone number supplied by owner earlier.
     * Flagged for owner reconfirmation before production launch / click-to-call activation.
     */
    phone: "9359108383",
    phoneNeedsReconfirmation: false,
    displayPhone: "+91 93591 08383",
    whatsappUrl: "https://wa.me/919359108383",
    address: {
      line1: "Haveli, Salunke Vihar Flat No 03",
      line2: "Above Ganpati Jewellers, Dhayariphata, Lane Number 10B, Dhayari",
      city: "Pune",
      state: "Maharashtra",
      postalCode: "411041",
      country: "India",
      fullText:
        "Haveli, Salunke Vihar Flat No 03, Above Ganpati Jewellers, Dhayariphata, Lane Number 10B, Dhayari, Pune, Maharashtra 411041, India",
    },
  },
  socials: {
    instagram: {
      label: "Instagram",
      handle: "@hindavi_weddings_events",
      url: "https://www.instagram.com/hindavi_weddings_events/",
    },
    threads: {
      label: "Threads",
      handle: "@hindavi_weddings_events",
      url: "https://www.threads.com/@hindavi_weddings_events",
    },
  },
  brandColors: {
    ivory: "#F8F0E8",
    burgundy: "#6F1829",
    antiqueGold: "#C6A15B",
    warmCharcoal: "#454038",
    white: "#FFFFFF",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
