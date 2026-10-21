import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Specializations",
  description:
    "Explore the bespoke wedding planning, event production, and decor design services offered by Hindavi Wedding Family in Pune and Maharashtra.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services & Specializations | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Explore the bespoke wedding planning, event production, and decor design services offered by Hindavi Wedding Family in Pune and Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/services`,
  },
};

const SERVICES_DATA = [
  {
    title: "Wedding Planning & Coordination",
    slug: "wedding-planning",
    eyebrow: "Comprehensive Choreography",
    tagline: "End-to-end ceremony orchestration so your family can be fully present.",
    imageUrl: "/images/service_planning.jpg",
    imageAlt: "Illustrative wedding consultation invitations and moodboards",
    description:
      "Planning a wedding involves harmonizing dozens of ceremonial customs, venue contracts, and family expectations. Our planning service acts as your personal advocate, designing master run-sheets, coordinating vendor arrivals, and managing on-day rituals with grace.",
    highlights: [
      "Master ceremony timeline & ritual sequencing",
      "Vendor recommendations & contract coordination",
      "Day-of management team & guest guidance",
      "Family coordination support for traditional customs",
    ],
    alignImage: "right" as const,
  },
  {
    title: "Event Production & Fabrication",
    slug: "event-production",
    eyebrow: "Technical Infrastructure",
    tagline: "Precision structural fabrication and synchronized lighting architecture.",
    imageUrl: "/images/service_production.jpg",
    imageAlt: "Illustrative open-air stage production and ambient lighting",
    description:
      "Behind every breathtaking visual is solid engineering. We specialize in safe outdoor trussing, custom-built stages, sound architecture that envelops without overpowering, and backup power coordination across private estates and open-lawn banquet venues in Maharashtra.",
    highlights: [
      "Architectural trussing & custom stage fabrication",
      "Specialty intelligent lighting & sound arrays",
      "Venue site survey & electrical load management",
      "Punctual assembly and prompt post-event strike",
    ],
    alignImage: "left" as const,
  },
  {
    title: "Event Decor Design & Styling",
    slug: "event-decor-design",
    eyebrow: "Bespoke Spatial Aesthetics",
    tagline: "Artisanal floral installations, sacred mandaps, and romantic candlelit environments.",
    imageUrl: "/images/service_decor.jpg",
    imageAlt: "Illustrative royal wedding mandap with cascading florals and brass lamps",
    description:
      "Every love story has its own aesthetic voice. Our decor design studio curates sacred mandap architecture, fragrant floral installations of fresh marigold and velvet roses, thematic entrance gateways, and bespoke tablescapes that transport your guests into an enchanting sanctuary.",
    highlights: [
      "Custom mandap architecture tailored to your traditions",
      "Fresh artisanal floral curation & backdrops",
      "Entrance gateways, photobooths, and aisle styling",
      "Ambient tablescape dressing, glassware & candlelight",
    ],
    alignImage: "right" as const,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ========================================================
          1. EDITORIAL SERVICES HERO
          ======================================================== */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service_production.jpg"
            alt="Illustrative luxury event production and staging setup"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.25em] font-sans font-bold">
            <span>Specialized Capabilities</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]">
            Our Wedding &amp; Event Services
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Three core disciplines orchestrated by {BUSINESS_CONFIG.displayName},
            tailored to elevate every chapter of your celebration.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. ALTERNATING EDITORIAL SERVICE SECTIONS
          ======================================================== */}
      <div className="space-y-0">
        {SERVICES_DATA.map((srv, index) => {
          const isImageLeft = srv.alignImage === "left";
          const isIvoryBg = index % 2 === 1;

          return (
            <Section
              key={srv.slug}
              background={isIvoryBg ? "ivory" : "white"}
              className="border-b border-ivory-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 relative ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[16/11] rounded-sm overflow-hidden shadow-2xl border-4 border-ivory group">
                    <Image
                      src={srv.imageUrl}
                      alt={srv.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    <div className="absolute bottom-3 right-3">
                      <span className="text-[10px] text-white/90 uppercase tracking-widest font-sans bg-charcoal/60 backdrop-blur-xs px-2.5 py-1 rounded-xs">
                        Illustrative Concept
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
                      {srv.eyebrow}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark leading-tight">
                      {srv.title}
                    </h2>
                    <p className="font-serif italic text-lg text-gold-dark font-medium">
                      {srv.tagline}
                    </p>
                  </div>

                  <Divider variant="ornate" centered={false} />

                  <p className="font-sans text-charcoal-muted text-sm sm:text-base leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="font-sans text-xs uppercase tracking-wider text-charcoal-dark font-semibold block">
                      Core Offerings:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {srv.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2.5 font-sans text-xs text-charcoal-light"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center space-x-4">
                    <Button href={`/services/${srv.slug}`} variant="primary" size="md">
                      <span>View Details & Process</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                    <span className="text-[11px] text-charcoal-muted italic">
                      * Inclusions subject to owner confirmation
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      {/* ========================================================
          3. CELEBRATION & EVENT SPECIALTIES
          ======================================================== */}
      <Section background="ivory" className="border-t border-b border-ivory-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
              Event Milestones & Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-dark leading-tight">
              Bespoke Decor & Production Across Every Ritual
            </h2>
            <Divider variant="ornate" centered={true} />
            <p className="font-sans text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              From intimate family ceremonies to high-voltage milestone parties, explore our specialized styling and coordination services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_CONFIG.eventSpecialties.map((spec, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-sm border border-gold/30 hover:border-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-mono tracking-widest text-gold-dark uppercase block">
                    {`0${i + 1} —`}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-dark group-hover:text-burgundy transition-colors">
                    {spec.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
                    {spec.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-ivory-100 flex items-center justify-between text-xs text-burgundy font-medium">
                  <span className="font-sans">Curated Styling</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================================
          4. TRANSPARENCY NOTICE & CTA
          ======================================================== */}
      <Section background="subtle">
        <div className="max-w-3xl mx-auto text-center space-y-4 p-8 bg-white/80 rounded-sm border border-gold/40">
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal-dark">
            Custom Proposals Without Pressure
          </h3>
          <p className="font-sans text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-xl mx-auto">
            Every celebration requires unique parameters. We present honest,
            customized proposals tailored to your celebration scale, venue
            specifications, and aesthetic wishes.
          </p>
        </div>
      </Section>

      <EnquiryCTASection />
    </>
  );
}
