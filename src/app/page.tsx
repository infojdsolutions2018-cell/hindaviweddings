import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { HeroRotation } from "@/components/ui/HeroRotation";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";

export default function HomePage() {
  return (
    <>
      {/* ========================================================
          HERO: ROTATING EDITORIAL LUXURY BANNER
          ======================================================== */}
      <HeroRotation />

      {/* ========================================================
          SHAADI SQUAD STYLE MANIFESTO / INTRODUCTION
          "WE ARE THE NEW AGE WEDDING PLANNERS"
          ======================================================== */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-coral font-sans font-bold">
            Who We Are
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-charcoal leading-snug">
            We Are The New Age Wedding Planners
          </h2>
          <div className="w-16 h-1 bg-coral mx-auto rounded-full" />
          
          <div className="font-sans text-charcoal/80 text-base sm:text-lg leading-relaxed space-y-4 pt-2 font-normal">
            <p>
              A wedding is, more than anything, a shining memory. It is a grand production,
              with the couple playing the protagonists, while every element serves to elevate their joy.
            </p>
            <p>
              Hindavi Wedding Family works behind the scenes, ensuring flawless choreography and absolute serenity.
              From sacred Vedic mandap architecture to ambient evening illumination, not a single petal, drape, or detail is out of place.
            </p>
            <p className="font-medium text-charcoal italic font-serif text-lg sm:text-xl pt-2">
              “Let us begin creating your story—your gateway to the rest of your lives.”
            </p>
          </div>

          <div className="pt-4">
            <Button href="/about" size="sm" variant="secondary" className="!px-6">
              Read Our Story
            </Button>
          </div>
        </div>
      </Section>

      {/* ========================================================
          SERVICES: 3-COLUMN EDITORIAL SHOWCASE
          ======================================================== */}
      <Section background="blush-light">
        <SectionHeading
          eyebrow="Specializations"
          title="What We Orchestrate"
          subtitle="Three core disciplines engineered to elevate your celebration with seamless grace."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Wedding Planning"
            description="Comprehensive ceremony curation, master itineraries, vendor liaison, and day-of management so you cherish every ritual."
            imageUrl="/other-images/wedding_planning.jpg"
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

          <ServiceCard
            title="Event Production"
            description="Technical staging, architectural trussing, ambient audio-visual systems, and seamless logistics coordination across venues."
            imageUrl="/other-images/event_production.jpg"
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

          <ServiceCard
            title="Event Decor Design"
            description="Sacred mandap aesthetics, fresh floral installations, thematic guest entrances, and candlelit tablescapes tailored for romance."
            imageUrl="/other-images/event_decor_design.jpg"
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
          PORTFOLIO ALBUMS: SHAADI SQUAD "OUR WORK" STYLE
          ======================================================== */}
      <Section background="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
              Our Work
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
              Atmosphere &amp; Aesthetic Visions
            </h2>
          </div>
          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-coral hover:text-coral-dark font-sans text-xs uppercase tracking-widest font-bold group"
          >
            <span>View All Works</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GalleryCard
            title="Sacred Mandap Architecture"
            category="Decor Design"
            imageUrl="/other-images/our_work_mandap.jpg"
            altText="Illustrative royal mandap floral setup"
            isPlaceholder={true}
          />
          <GalleryCard
            title="Haldi Courtyard Atmosphere"
            category="Traditional Rituals"
            imageUrl="/other-images/our_work_haldi.jpg"
            altText="Illustrative marigold Haldi courtyard design"
            isPlaceholder={true}
          />
          <GalleryCard
            title="Reception Dinner Banquet"
            category="Event Production"
            imageUrl="/other-images/our_work_reception.jpg"
            altText="Illustrative banquet table setting with chandeliers"
            isPlaceholder={true}
          />
        </div>
      </Section>

      {/* ========================================================
          TESTIMONIALS: SHAADI SQUAD CELEBRITY-STYLE EDITORIAL QUOTES
          ======================================================== */}
      <Section background="blush" className="relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.3em] text-charcoal/70 font-sans font-bold">
              Kind Words
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-charcoal">
              Testimonials
            </h2>
            <div className="w-16 h-1 bg-coral mx-auto rounded-full" />
          </div>

          {/* Featured Quote Carousel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl shadow-sm border border-white/60 space-y-3 flex flex-col justify-between">
              <p className="font-serif text-base sm:text-lg text-charcoal italic leading-relaxed">
                “The people responsible for making the most memorable occasion of our lives peaceful, joyous, and beyond beautiful.”
              </p>
              <div className="pt-3 border-t border-blush/40">
                <strong className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal">
                  Aditya &amp; Snehal
                </strong>
                <span className="font-sans text-[11px] text-charcoal/60">
                  Pune Heritage Wedding
                </span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl shadow-sm border border-white/60 space-y-3 flex flex-col justify-between">
              <p className="font-serif text-base sm:text-lg text-charcoal italic leading-relaxed">
                “Every detail was meticulously executed without stress. We felt like family throughout the entire three-day celebration!”
              </p>
              <div className="pt-3 border-t border-blush/40">
                <strong className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal">
                  Rohan &amp; Pooja
                </strong>
                <span className="font-sans text-[11px] text-charcoal/60">
                  Destination Wedding, Mahabaleshwar
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <Button href="/contact" size="sm" variant="primary">
              Connect With Us
            </Button>
          </div>
        </div>
      </Section>

      {/* ========================================================
          PROCESS / WORKFLOW: 4-STAGE ROADMAP
          ======================================================== */}
      <Section background="white">
        <SectionHeading
          eyebrow="How We Work"
          title="From Initial Vision to Celebration"
          subtitle="A structured, transparent roadmap ensuring every celebration is orchestrated with clarity and peace of mind."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blush-50/60 p-8 rounded-xl border border-blush/40 relative group hover:border-coral transition-all shadow-xs">
            <span className="font-serif text-5xl text-coral/25 font-normal absolute top-4 right-4 group-hover:text-coral/50 transition-colors">
              01
            </span>
            <span className="text-xs uppercase tracking-widest text-coral font-sans font-bold block mb-2">
              Phase One
            </span>
            <h3 className="font-sans text-lg font-bold uppercase text-charcoal mb-2">
              Consultation
            </h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              We discuss your envisioned dates, guest size, preferred venues,
              and ceremony customs to build a clear foundation.
            </p>
          </div>

          <div className="bg-blush-50/60 p-8 rounded-xl border border-blush/40 relative group hover:border-coral transition-all shadow-xs">
            <span className="font-serif text-5xl text-coral/25 font-normal absolute top-4 right-4 group-hover:text-coral/50 transition-colors">
              02
            </span>
            <span className="text-xs uppercase tracking-widest text-coral font-sans font-bold block mb-2">
              Phase Two
            </span>
            <h3 className="font-sans text-lg font-bold uppercase text-charcoal mb-2">
              Concept &amp; Planning
            </h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              Establishing milestone timelines, budgeting parameters, vendor
              options, and structural technical layouts.
            </p>
          </div>

          <div className="bg-blush-50/60 p-8 rounded-xl border border-blush/40 relative group hover:border-coral transition-all shadow-xs">
            <span className="font-serif text-5xl text-coral/25 font-normal absolute top-4 right-4 group-hover:text-coral/50 transition-colors">
              03
            </span>
            <span className="text-xs uppercase tracking-widest text-coral font-sans font-bold block mb-2">
              Phase Three
            </span>
            <h3 className="font-sans text-lg font-bold uppercase text-charcoal mb-2">
              Design &amp; Styling
            </h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              Finalizing floral palettes, mandap styling, lighting simulations,
              and master schedules with all family stakeholders.
            </p>
          </div>

          <div className="bg-blush-50/60 p-8 rounded-xl border border-blush/40 relative group hover:border-coral transition-all shadow-xs">
            <span className="font-serif text-5xl text-coral/25 font-normal absolute top-4 right-4 group-hover:text-coral/50 transition-colors">
              04
            </span>
            <span className="text-xs uppercase tracking-widest text-coral font-sans font-bold block mb-2">
              Phase Four
            </span>
            <h3 className="font-sans text-lg font-bold uppercase text-charcoal mb-2">
              Execution
            </h3>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              On-ground presence ensuring seamless arrivals, punctual rituals,
              and coordinated production from start to finish.
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================================
          CLOSING EDITORIAL BANNER (Distinct luxury dark backdrop)
          ======================================================== */}
      <EnquiryCTASection
        eyebrow="Let's Connect"
        title="Begin Planning Your Wedding"
        subtitle="Share your celebration dates, envisioned aesthetic, and guest count. Our planning team is ready to curate every dimension of your special day."
      />
    </>
  );
}
