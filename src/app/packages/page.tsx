import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BUSINESS_CONFIG } from "@/config/business";
import { Calendar, Compass, FileText, CheckCircle2, FileCheck, Award, Shield, Clock, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Event Packages & Custom Proposals",
  description:
    "Learn about tailored event packages and custom wedding proposals curated by Hindavi Wedding Family in Pune & Maharashtra.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: `Event Packages & Custom Proposals | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Learn about tailored event packages and custom wedding proposals curated by Hindavi Wedding Family in Pune & Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/packages`,
  },
};

const PROPOSAL_CONSIDERATIONS = [
  {
    icon: <Calendar className="w-5 h-5 text-coral" />,
    title: "Ceremony Count & Ritual Scope",
    description:
      "Whether your celebration comprises an intimate one-day wedding or a 3-day multi-ceremony saga (Haldi, Mehendi, Sangeet, Muhurat, and Reception).",
  },
  {
    icon: <Compass className="w-5 h-5 text-coral" />,
    title: "Venue Dimensions & Technical Rigging",
    description:
      "Indoor heritage banquet halls versus vast open-lawn properties requiring independent structural trussing, acoustic zoning, and heavy generator backups.",
  },
  {
    icon: <FileText className="w-5 h-5 text-coral" />,
    title: "Floral & Decor Complexity",
    description:
      "Custom sacred mandap architectural styling, fresh imported florals, entrance tunnel installations, and bespoke tablescapes tailored to your color theme.",
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
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hello-images/gallery_reception.jpg"
            alt="Illustrative luxury wedding reception banquet celebration"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold">
            <span>Tailored Investment Model</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
            Custom Wedding Packages
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light">
            Every love story is unique. We curate bespoke packages customized to your venue, guest size, and celebration vision.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. THE BESPOKE PROPOSAL PHILOSOPHY + EMBEDDED FORM
          ======================================================== */}
      <Section background="white" className="!py-6 sm:!py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Why Bespoke Custom Packages */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
              Customized Packages
            </span>

            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal leading-tight">
              Why We Tailor Every Package &amp; Proposal
            </h2>
            <div className="w-14 h-1 bg-coral rounded-full" />

            <p className="font-sans text-charcoal/80 text-sm leading-relaxed">
              Standardized packages often force families into compromises—either paying for unnecessary items or finding critical ceremony elements missing as unexpected costs later.
            </p>

            <p className="font-sans text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              At {BUSINESS_CONFIG.displayName}, every package is completely custom-built for you. Fill out your tentative guest count, wedding season, and budget parameters on the right to receive an itemized, transparent proposal with no hidden surprises.
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start space-x-2 text-xs text-charcoal/80">
                <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                <span>Zero rigid packages — 100% customized to your ritual traditions.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-charcoal/80">
                <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                <span>Transparent itemized line items across planning, staging &amp; decor.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-charcoal/80">
                <CheckCircle2 className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                <span>Direct consultation &amp; venue feasibility audit included.</span>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md border border-blush/60 mt-4">
              <Image
                src="/hello-images/service_planning.jpg"
                alt="Wedding planning and consultation moodboards"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Custom Package Enquiry Form (Same API Call to Web3Forms) */}
          <div className="lg:col-span-7">
            <EnquiryForm
              headingTitle="Request Your Custom Package"
              headingSubtitle="Select your guest count, tentative timeline & estimated budget for an itemized package quotation."
            />
          </div>
        </div>
      </Section>

      {/* ========================================================
          3. WHAT INFORMS YOUR TAILORED QUOTATION
          ======================================================== */}
      <Section background="blush-light" className="!py-6 sm:!py-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-semibold">
            Parameters
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal mt-1">
            What Informs Your Tailored Quotation
          </h2>
          <div className="w-12 h-1 bg-coral mx-auto my-3 rounded-full" />
          <p className="font-sans text-charcoal/70 text-xs sm:text-sm max-w-xl mx-auto">
            Our itemized proposals reflect honest, realistic production budgets tailored to your exact event scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPOSAL_CONSIDERATIONS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-blush/60 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-10 h-10 rounded-full bg-blush-50 border border-coral/30 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================================================
          4. FOUR-STEP PROPOSAL JOURNEY
          ======================================================== */}
      <Section background="white" className="!py-6 sm:!py-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-semibold">
            Roadmap
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal mt-1">
            How We Structure Your Custom Proposal
          </h2>
          <div className="w-12 h-1 bg-coral mx-auto my-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROPOSAL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-5 bg-blush-50/70 rounded-2xl border border-blush/60 space-y-2 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <span className="font-serif text-3xl text-coral font-light block">
                {step.step}
              </span>
              <h4 className="font-serif text-base text-charcoal font-medium">
                {step.title}
              </h4>
              <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================================================
          5. REQUIRED DOCUMENTS CHECKLIST (EXACT REFERENCE 3D CARD STYLE)
          ======================================================== */}
      <Section background="blush-light" className="!py-8 sm:!py-12 border-t border-blush/40">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-blush/60 p-6 sm:p-8 shadow-[0_10px_30px_rgba(242,136,123,0.08)] space-y-6">
            {/* Header with 3D Glossy Coral/Red Icon */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFE4E6] via-[#FECDD3] to-[#F43F5E] p-0.5 shadow-[0_4px_12px_rgba(244,63,94,0.3)] flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full rounded-[14px] bg-gradient-to-tr from-[#E11D48] to-[#FDA4AF] flex items-center justify-center text-white shadow-inner">
                  <FileCheck className="w-6 h-6 text-white drop-shadow-sm fill-white/20" />
                </div>
              </div>
              <div>
                <h3 className="font-sans text-lg sm:text-xl font-extrabold text-charcoal tracking-tight">
                  Required Documents Checklist
                </h3>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60">
                  Keep digital or physical copies ready for prompt proposal &amp; contract confirmation
                </p>
              </div>
            </div>

            {/* Document list matching uploaded screenshot */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3.5 group">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/50 flex items-center justify-center flex-shrink-0 text-[#0284C7] shadow-[0_2px_6px_rgba(2,132,199,0.2)] mt-0.5">
                    <FileText className="w-4 h-4 fill-[#0284C7]/20" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-sans text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                      Identity Proof (Aadhaar / PAN / Passport)
                    </h4>
                    <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
                      Primary family signatory identification for agreement and legal booking registration.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider px-2.5 py-1 rounded-full bg-coral/15 text-coral-dark border border-coral/30 flex-shrink-0">
                  Mandatory
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3.5 group">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/50 flex items-center justify-center flex-shrink-0 text-[#0284C7] shadow-[0_2px_6px_rgba(2,132,199,0.2)] mt-0.5">
                    <FileText className="w-4 h-4 fill-[#0284C7]/20" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-sans text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                      Venue Booking Letter &amp; Setup Hours Agreement
                    </h4>
                    <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
                      Resort/lawn agreement confirming check-in, generator points, and sound curfew terms.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider px-2.5 py-1 rounded-full bg-coral/15 text-coral-dark border border-coral/30 flex-shrink-0">
                  Mandatory
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3.5 group">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/50 flex items-center justify-center flex-shrink-0 text-[#0284C7] shadow-[0_2px_6px_rgba(2,132,199,0.2)] mt-0.5">
                    <FileText className="w-4 h-4 fill-[#0284C7]/20" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-sans text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                      Family Muhurat &amp; Ceremony Timeline
                    </h4>
                    <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
                      Priest consultation sheet with auspicious timings for mandap rituals and reception entrance.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider px-2.5 py-1 rounded-full bg-charcoal/5 text-charcoal/70 border border-charcoal/10 flex-shrink-0">
                  Recommended
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3.5 group">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/50 flex items-center justify-center flex-shrink-0 text-[#0284C7] shadow-[0_2px_6px_rgba(2,132,199,0.2)] mt-0.5">
                    <FileText className="w-4 h-4 fill-[#0284C7]/20" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-sans text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                      Estimated Guest Count &amp; Seating Breakdown
                    </h4>
                    <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
                      Preliminary guest headcount to calculate mandap seating, catering area, and audio coverage.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider px-2.5 py-1 rounded-full bg-charcoal/5 text-charcoal/70 border border-charcoal/10 flex-shrink-0">
                  Recommended
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <EnquiryCTASection
        title="Ready for an Honest, Transparent Proposal?"
        subtitle="Connect with our event team to review your dates and begin shaping your bespoke celebration."
      />
    </>
  );
}
