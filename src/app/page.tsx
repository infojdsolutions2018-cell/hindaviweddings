import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { Divider } from "@/components/ui/Divider";

export default function HomePage() {
  return (
    <>
      {/* ========================================================
          SECTION B: LUXURY EDITORIAL HERO (Compact & Elegant)
          ======================================================== */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        {/* Editorial Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_wedding.jpg"
            alt="Illustrative luxury Indian wedding floral mandap setup with warm golden illumination"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-105 animate-in fade-in duration-1000"
          />
          {/* Multi-layered luxury gradients for flawless text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/40" />
          <div className="absolute inset-0 bg-burgundy/25 mix-blend-multiply" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold-light text-[11px] uppercase tracking-[0.25em] font-sans font-semibold mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <span>Pune & Maharashtra</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-4 drop-shadow-md">
            Crafting Unforgettable <br className="hidden sm:inline" />
            <span className="italic text-gold-light font-normal font-serif">
              Celebrations of Love
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-ivory-100/95 max-w-xl mx-auto leading-relaxed mb-6 font-light">
            Welcome to {BUSINESS_CONFIG.displayName}. We curate bespoke wedding
            planning, full-scale event production, and exquisite decor design
            grounded in timeless cultural elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/contact" size="sm" variant="primary" className="w-full sm:w-auto shadow-xl">
              Plan Your Event
            </Button>
            <Button
              href="/gallery"
              size="sm"
              variant="outline"
              className="w-full sm:w-auto !border-gold/70 !text-gold-light hover:!bg-gold hover:!text-charcoal-dark backdrop-blur-xs"
            >
              Explore Our Work
            </Button>
          </div>

          <div className="mt-14 pt-8 border-t border-white/15 max-w-md mx-auto text-center">
            <span className="text-[11px] text-ivory-300 uppercase tracking-widest font-sans">
              * Photography shown represents illustrative aesthetic concepts
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: BRAND INTRODUCTION & PHILOSOPHY
          ======================================================== */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border-4 border-ivory">
              <Image
                src="/images/service_decor.jpg"
                alt="Illustrative handcrafted mandap and floral artistry concept"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
            {/* Floating Editorial Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-burgundy text-white p-6 rounded-sm shadow-xl max-w-xs border border-gold/30">
              <span className="font-serif text-2xl font-light text-gold-light block">
                Pune & Beyond
              </span>
              <span className="font-sans text-xs uppercase tracking-wider text-ivory-200 block mt-1">
                Serving Maharashtra
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
                Our Essence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark leading-tight">
                An atmosphere of grace, intention, and meticulous artistry.
              </h2>
            </div>

            <Divider variant="ornate" centered={false} />

            <p className="font-sans text-charcoal-muted text-base sm:text-lg leading-relaxed">
              At {BUSINESS_CONFIG.displayName}, we collaborate closely with
              families to transform once-in-a-lifetime milestones into indelible
              memories. Based in Pune, our ethos unites authentic cultural
              reverence with modern event orchestration.
            </p>

            <p className="font-sans text-charcoal-muted text-sm sm:text-base leading-relaxed">
              From the architectural safety of outdoor trussing to the delicate
              placement of sacred floral garlands, our team oversees every phase
              with transparent communication and heartfelt dedication.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-ivory-200">
              <div>
                <span className="font-serif text-2xl text-burgundy block font-medium">
                  Coordination
                </span>
                <span className="font-sans text-xs text-charcoal-light">
                  Seamless itineraries and vendor alignment
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl text-burgundy block font-medium">
                  Fabrication
                </span>
                <span className="font-sans text-xs text-charcoal-light">
                  Structural integrity and technical staging
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl text-burgundy block font-medium">
                  Bespoke Decor
                </span>
                <span className="font-sans text-xs text-charcoal-light">
                  Mandaps, florals, and mood lighting
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          SECTION D: CURATED SERVICES SHOWCASE
          ======================================================== */}
      <Section background="ivory">
        <SectionHeading
          eyebrow="Specializations"
          title="What We Orchestrate"
          subtitle="Three core disciplines verified with the Hindavi Wedding Family team, engineered to elevate every ceremony."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Wedding Planning */}
          <ServiceCard
            title="Wedding Planning"
            description="Comprehensive ceremony curation, master itineraries, vendor liaison, and day-of management so you cherish every ritual."
            imageUrl="/images/service_planning.jpg"
            imageAlt="Illustrative wedding planning stationery and consultation palette"
            categoryLabel="Full Planning"
            features={[
              "Ceremony timelines & ritual coordination",
              "Curated vendor contract liaison",
              "Master run-sheet distribution",
              "On-day team presence & family support",
            ]}
            href="/services/wedding-planning"
            isDraft={true}
          />

          {/* Service 2: Event Production */}
          <ServiceCard
            title="Event Production"
            description="Technical staging, architectural trussing, ambient audio-visual systems, and seamless logistics coordination across venues."
            imageUrl="/images/service_production.jpg"
            imageAlt="Illustrative open-air stage production and ambient lighting"
            categoryLabel="Technical & Staging"
            features={[
              "Structural rigging & stage fabrication",
              "Specialty lighting & sound architecture",
              "Power management & safety supervision",
              "Timely installation & post-event strike",
            ]}
            href="/services/event-production"
            isDraft={true}
          />

          {/* Service 3: Event Decor Design */}
          <ServiceCard
            title="Event Decor Design"
            description="Sacred mandap aesthetics, fresh floral installations, thematic guest entrances, and candlelit tablescapes tailored for romance."
            imageUrl="/images/service_decor.jpg"
            imageAlt="Illustrative royal floral mandap and traditional brass decor"
            categoryLabel="Bespoke Aesthetics"
            features={[
              "Custom mandap architecture styling",
              "Artisanal fresh floral curation",
              "Thematic photo zones & archways",
              "Ambient lighting & tablescape styling",
            ]}
            href="/services/event-decor-design"
            isDraft={true}
          />
        </div>
      </Section>

      {/* ========================================================
          SECTION E: FEATURED EDITORIAL GALLERY PREVIEW
          ======================================================== */}
      <Section background="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-dark mt-2">
              Atmosphere & Aesthetic Visions
            </h2>
          </div>
          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-burgundy hover:text-burgundy-600 font-sans text-xs uppercase tracking-widest font-semibold"
          >
            <span>View Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GalleryCard
            title="Sacred Mandap Architecture"
            category="Decor Design"
            imageUrl="/images/service_decor.jpg"
            altText="Illustrative royal mandap floral setup"
            isPlaceholder={true}
          />
          <GalleryCard
            title="Haldi Courtyard Atmosphere"
            category="Traditional Rituals"
            imageUrl="/images/gallery_haldi.jpg"
            altText="Illustrative marigold Haldi courtyard design"
            isPlaceholder={true}
          />
          <GalleryCard
            title="Reception Dinner Banquet"
            category="Event Production"
            imageUrl="/images/gallery_reception.jpg"
            altText="Illustrative banquet table setting with chandeliers"
            isPlaceholder={true}
          />
        </div>

        <div className="mt-8 p-4 rounded-sm bg-ivory-50 border border-ivory-200 text-center">
          <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
            * <strong>Authenticity Policy:</strong> The visuals above illustrate
            spatial design and lighting concepts. Only owner-approved,
            client-consented event photography will be published prior to
            production deployment.
          </p>
        </div>
      </Section>

      {/* ========================================================
          SECTION F: FOUR-STAGE COLLABORATIVE PROCESS
          ======================================================== */}
      <Section background="subtle">
        <SectionHeading
          eyebrow="Proposed Workflow"
          title="From Initial Vision to Celebration"
          subtitle="A structured, transparent roadmap ensuring every celebration is orchestrated with clarity and peace of mind."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 relative group hover:border-gold/60 transition-colors shadow-xs">
            <span className="font-serif text-5xl text-gold/30 font-normal absolute top-4 right-4 group-hover:text-gold/50 transition-colors">
              01
            </span>
            <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold block mb-2">
              Phase One
            </span>
            <h3 className="font-serif text-xl text-charcoal-dark mb-3">
              Initial Consultation
            </h3>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              We discuss your envisioned dates, guest size, preferred venues,
              and ceremony customs to build a clear foundation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 relative group hover:border-gold/60 transition-colors shadow-xs">
            <span className="font-serif text-5xl text-gold/30 font-normal absolute top-4 right-4 group-hover:text-gold/50 transition-colors">
              02
            </span>
            <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold block mb-2">
              Phase Two
            </span>
            <h3 className="font-serif text-xl text-charcoal-dark mb-3">
              Concept & Planning
            </h3>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              Establishing milestone timelines, budgeting parameters, vendor
              options, and structural technical layouts.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 relative group hover:border-gold/60 transition-colors shadow-xs">
            <span className="font-serif text-5xl text-gold/30 font-normal absolute top-4 right-4 group-hover:text-gold/50 transition-colors">
              03
            </span>
            <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold block mb-2">
              Phase Three
            </span>
            <h3 className="font-serif text-xl text-charcoal-dark mb-3">
              Design & Coordination
            </h3>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              Finalizing floral palettes, mandap styling, lighting simulations,
              and master schedules with all family stakeholders.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-sm border border-ivory-200 relative group hover:border-gold/60 transition-colors shadow-xs">
            <span className="font-serif text-5xl text-gold/30 font-normal absolute top-4 right-4 group-hover:text-gold/50 transition-colors">
              04
            </span>
            <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold block mb-2">
              Phase Four
            </span>
            <h3 className="font-serif text-xl text-charcoal-dark mb-3">
              Event Execution
            </h3>
            <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
              On-ground presence ensuring seamless arrivals, punctual rituals,
              and coordinated production from start to finish.
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================================
          SECTION G: CLOSING EDITORIAL CTA
          ======================================================== */}
      <section className="relative py-20 sm:py-28 bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/hero_wedding.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
            Let&apos;s Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            Begin Planning Your Milestone Event
          </h2>
          <Divider variant="ornate" centered={true} />
          <p className="font-sans text-ivory-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Share your celebration dates, envisioned aesthetic, and guest count.
            Our planning team is ready to curate every dimension of your special
            day.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl">
              Submit an Enquiry
            </Button>
            <a
              href={`mailto:${BUSINESS_CONFIG.contact.email}`}
              className="text-ivory-200 hover:text-white text-xs uppercase tracking-widest font-semibold font-sans py-3 px-6 transition-colors border border-white/20 rounded-sm w-full sm:w-auto"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
