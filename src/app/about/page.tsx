import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Divider } from "@/components/ui/Divider";
import { BUSINESS_CONFIG } from "@/config/business";
import { Calendar, Layers, Palette, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hindavi Wedding Family, our ethos, and our family-rooted dedication to crafting authentic weddings and events in Karad, Maharashtra.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Learn about Hindavi Wedding Family, our ethos, and our family-rooted dedication to crafting authentic weddings and events in Karad, Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ========================================================
          1. IMMERSIVE EDITORIAL HERO
          ======================================================== */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hello-images/hero_about.jpg"
            alt="Illustrative regal palace wedding celebration in Maharashtra"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold">
            <span>Pune &amp; Maharashtra</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
            Our Story &amp; Heritage
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light">
            Crafting milestone weddings with cultural reverence, architectural
            mastery, and personalized family care.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. ASYMMETRICAL BRAND STORY SECTION
          ======================================================== */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
              The Hindavi Ethos
            </span>

            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-charcoal leading-tight">
              Honoring traditions while orchestrating timeless celebrations.
            </h2>
            <div className="w-16 h-1 bg-coral rounded-full" />

            <p className="font-sans text-charcoal/80 text-base leading-relaxed">
              At {BUSINESS_CONFIG.displayName}, we view each wedding not merely
              as an event, but as the sacred convergence of two families and
              their heritage. Operating from Pune and across Maharashtra, our mission is to alleviate
              planning stress while amplifying beauty and genuine celebration.
            </p>

            <p className="font-sans text-charcoal/80 text-sm sm:text-base leading-relaxed">
              We approach every project with quiet precision: safeguarding
              ceremonial customs, engineering safe venue infrastructure, and
              curating floral and lighting landscapes that leave guests
              spellbound.
            </p>

            {/* Business Profile Notice */}
            <div className="p-6 rounded-2xl bg-blush-50/80 border border-blush/60 space-y-2 mt-4">
              <span className="font-sans text-xs uppercase tracking-wider text-coral font-bold block">
                Official Business Profile
              </span>
              <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                Operating headquarters: {BUSINESS_CONFIG.contact.address.fullText}.
                Founder profiles and expanded heritage milestones will be updated
                following owner review. We adhere strictly to verified business
                data without fabricated claims.
              </p>
            </div>
          </div>

          {/* Framed Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-blush-100">
              <Image
                src="/hello-images/service_planning.jpg"
                alt="Illustrative consultation aesthetic and bespoke wedding stationery"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-white text-charcoal p-6 rounded-2xl shadow-xl max-w-xs border border-blush/60">
              <span className="font-sans text-lg font-bold uppercase text-coral block">
                Bespoke Curation
              </span>
              <span className="font-sans text-xs text-charcoal/70 block mt-1">
                Every detail orchestrated with intention
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          3. OUR THREE PILLARS (VERIFIED SPECIALIZATIONS)
          ======================================================== */}
      <Section background="ivory">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
            Our Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark mt-2">
            The Three Pillars of Hindavi
          </h2>
          <Divider variant="ornate" centered={true} />
          <p className="font-sans text-charcoal-muted text-sm sm:text-base max-w-2xl mx-auto">
            Our service architecture unites creative artistry with reliable
            production and attentive personal coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy/15 flex items-center justify-center text-burgundy">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal-dark">
              Wedding Planning
            </h3>
            <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
              We orchestrate master timelines, manage vendor coordination, and
              provide on-day liaison so your family remains fully present in
              the moment.
            </p>
            <Link
              href="/services/wedding-planning"
              className="inline-flex items-center text-xs font-semibold text-burgundy hover:text-burgundy-600 pt-2"
            >
              <span>Explore Planning</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold-50 border border-gold/25 flex items-center justify-center text-gold-dark">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal-dark">
              Event Production
            </h3>
            <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
              From open-lawn structural trussing and stage fabrication to
              synchronized acoustic and lighting arrays, we engineer safe,
              breathtaking environments.
            </p>
            <Link
              href="/services/event-production"
              className="inline-flex items-center text-xs font-semibold text-burgundy hover:text-burgundy-600 pt-2"
            >
              <span>Explore Production</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 border border-burgundy/15 flex items-center justify-center text-burgundy">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal-dark">
              Event Decor Design
            </h3>
            <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
              Sacred mandaps, thematic guest entrances, artisanal floral
              installations, and candlelight styling curated to tell your
              distinctive romantic story.
            </p>
            <Link
              href="/services/event-decor-design"
              className="inline-flex items-center text-xs font-semibold text-burgundy hover:text-burgundy-600 pt-2"
            >
              <span>Explore Decor</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ========================================================
          4. PROPOSED PLANNING ROADMAP
          ======================================================== */}
      <Section background="white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
            Execution Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark mt-2">
            The Journey With Us
          </h2>
          <Divider variant="ornate" centered={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-ivory-50 rounded-sm border border-ivory-200 space-y-3">
            <span className="font-serif text-3xl text-gold font-light block">01</span>
            <h4 className="font-serif text-lg text-charcoal-dark">Discovery</h4>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              Understanding your preferred dates, guest expectations, ceremony
              rituals, and aesthetic vision.
            </p>
          </div>

          <div className="p-6 bg-ivory-50 rounded-sm border border-ivory-200 space-y-3">
            <span className="font-serif text-3xl text-gold font-light block">02</span>
            <h4 className="font-serif text-lg text-charcoal-dark">Design</h4>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              Curating 3D spatial concepts, floral color palettes, and
              structural engineering blueprints.
            </p>
          </div>

          <div className="p-6 bg-ivory-50 rounded-sm border border-ivory-200 space-y-3">
            <span className="font-serif text-3xl text-gold font-light block">03</span>
            <h4 className="font-serif text-lg text-charcoal-dark">Coordination</h4>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              Aligning vendor teams, power logistics, master run-sheets, and
              family coordinators.
            </p>
          </div>

          <div className="p-6 bg-ivory-50 rounded-sm border border-ivory-200 space-y-3">
            <span className="font-serif text-3xl text-gold font-light block">04</span>
            <h4 className="font-serif text-lg text-charcoal-dark">Execution</h4>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              On-site supervision ensuring rituals begin smoothly and
              celebrations transition flawlessly.
            </p>
          </div>
        </div>
      </Section>

      <EnquiryCTASection
        title="Begin Your Wedding Journey With Us"
        subtitle="Let our specialists guide your celebration with care, elegance, and dedicated coordination."
      />
    </>
  );
}
