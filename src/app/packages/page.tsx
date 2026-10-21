import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { Calendar, FileText, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Event Packages & Custom Proposals",
  description:
    "Learn about tailored event packages and custom wedding proposals curated by Hindavi Wedding Family in Karad, Maharashtra.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: `Event Packages & Custom Proposals | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Learn about tailored event packages and custom wedding proposals curated by Hindavi Wedding Family in Karad, Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/packages`,
  },
};

const PROPOSAL_CONSIDERATIONS = [
  {
    icon: <Calendar className="w-5 h-5 text-gold-dark" />,
    title: "Ceremony Count & Ritual Scope",
    description:
      "Whether your celebration comprises an intimate one-day wedding or a 3-day multi-ceremony saga (Haldi, Mehendi, Sangeet, Muhurat, and Reception).",
  },
  {
    icon: <Compass className="w-5 h-5 text-gold-dark" />,
    title: "Venue Dimensions & Technical Rigging",
    description:
      "Indoor heritage banquet halls versus vast open-lawn properties requiring independent structural trussing, acoustic zoning, and heavy generator backups.",
  },
  {
    icon: <FileText className="w-5 h-5 text-gold-dark" />,
    title: "Floral & Decor Complexity",
    description:
      "Custom sacred mandap architectural styling, imported exotic florals, entrance tunnel installations, and bespoke tablescapes tailored to your color theme.",
  },
];

const PROPOSAL_STEPS = [
  {
    step: "01",
    title: "Consultation & Vision Alignment",
    detail: "We listen to your preferred dates, venue ideas, guest numbers, and ceremony customs.",
  },
  {
    step: "02",
    title: "Site Feasibility & Scope Mapping",
    detail: "Our production team surveys the venue infrastructure and drafts technical layouts.",
  },
  {
    step: "03",
    title: "Itemized Tailored Proposal",
    detail: "You receive a transparent, customized scope covering planning, staging, and decor.",
  },
  {
    step: "04",
    title: "Contract & Date Reservation",
    detail: "Final deliverables and payment schedules are confirmed in a signed agreement.",
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* ========================================================
          1. EDITORIAL PACKAGES HERO
          ======================================================== */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery_reception.jpg"
            alt="Illustrative luxury wedding reception banquet celebration"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.25em] font-sans font-bold">
            <span>Tailored Investment Model</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]">
            Curated Event Proposals
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Every love story is unique. We build tailored investment proposals
            aligned with your venue scale, ceremony traditions, and design aspirations.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. THE BESPOKE PROPOSAL PHILOSOPHY
          ======================================================== */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
              Our Pricing Principles
            </span>

            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-charcoal leading-tight">
              Why We Create Custom Proposals Instead of Generic Packages
            </h2>
            <div className="w-16 h-1 bg-coral rounded-full" />

            <p className="font-sans text-charcoal/80 text-base leading-relaxed">
              Standardized packages often force families into compromises—either
              paying for unnecessary services or finding critical ceremony items
              missing as unexpected extras later.
            </p>

            <p className="font-sans text-charcoal/80 text-sm sm:text-base leading-relaxed">
              At {BUSINESS_CONFIG.displayName}, we reject cookie-cutter formulas.
              In accordance with our project standards, we do not publish
              fabricated tier prices. Instead, we invest time in understanding
              your exact guest size, venue logistics, and decor vision to provide
              a transparent, realistic proposal with no hidden surprises.
            </p>

            <div className="pt-2">
              <Button href="/contact" size="lg" variant="primary">
                Request Your Custom Proposal
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border-4 border-ivory">
              <Image
                src="/images/service_planning.jpg"
                alt="Illustrative wedding planning consultation documents"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          3. WHAT INFORMS YOUR TAILORED QUOTATION
          ======================================================== */}
      <Section background="ivory">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
            Parameters
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark mt-2">
            What Informs Your Tailored Quotation
          </h2>
          <Divider variant="ornate" centered={true} />
          <p className="font-sans text-charcoal-muted text-sm sm:text-base max-w-2xl mx-auto">
            Our itemized proposals reflect honest, realistic production budgets
            tailored to your exact event scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPOSAL_CONSIDERATIONS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-sm border border-ivory-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif text-2xl text-charcoal-dark">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================================================
          4. FOUR-STEP PROPOSAL JOURNEY
          ======================================================== */}
      <Section background="white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
            Roadmap
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark mt-2">
            How We Structure Your Proposal
          </h2>
          <Divider variant="ornate" centered={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPOSAL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-ivory-50 rounded-sm border border-ivory-200 space-y-3"
            >
              <span className="font-serif text-4xl text-gold font-light block">
                {step.step}
              </span>
              <h4 className="font-serif text-lg text-charcoal-dark font-medium">
                {step.title}
              </h4>
              <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <EnquiryCTASection
        title="Ready for an Honest, Transparent Proposal?"
        subtitle="Connect with our event team to review your dates and begin shaping your bespoke celebration."
      />
    </>
  );
}
