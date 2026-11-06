import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ArrowLeft, ShieldCheck, FileCheck, Layers, Clock, Users, Award, Shield, FileText } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

interface ServiceData {
  title: string;
  slug: string;
  category: string;
  summary: string;
  heroImage: string;
  imageAlt: string;
  inclusions: string[];
  workflow: string[];
  keyBenefits?: {
    title: string;
    description: string;
  }[];
  requiredDocuments?: {
    title: string;
    description: string;
    isMandatory?: boolean;
  }[];
}

const SERVICE_REGISTRY: Record<string, ServiceData> = {
  "wedding-planning": {
    title: "Wedding Planning & Coordination",
    slug: "wedding-planning",
    category: "Full Service Planning",
    heroImage: "/hello-images/wedding_planning.jpg",
    imageAlt: "Illustrative wedding stationery, planning notebook, and consultation palette",
    summary:
      "A complete planning partnership guiding you through budget allocation, vendor discovery, timeline drafting, and on-ground coordination during your wedding celebrations.",
    inclusions: [
      "Initial consultation and ceremony structure roadmap",
      "Curated vendor recommendations and liaising",
      "Detailed master run-sheet and itinerary distribution",
      "On-day team presence managing arrivals, rituals, and transitions",
    ],
    workflow: [
      "1. Discovery & Envisioning",
      "2. Vendor & Budget Alignment",
      "3. Production Milestones & Timeline",
      "4. Final Rehearsal & Event Day Execution",
    ],
    keyBenefits: [
      {
        title: "Zero-Stress Family Experience",
        description: "Our on-ground planners handle guest hospitality, schedule shifts, and logistics so both families cherish every ritual without friction.",
      },
      {
        title: "Vendor Quality & Cost Transparency",
        description: "Direct access to pre-screened caterers, photographers, pandits, and makeup artists with itemized, negotiated commercial terms.",
      },
      {
        title: "Synchronized Micro-Timeline",
        description: "Minute-by-minute itinerary keeping Haldi, Sangeet, Muhurat, and Reception transitions seamlessly on clock.",
      },
      {
        title: "Dedicated On-Site Command Team",
        description: "A seasoned floor management team equipped with walkie-talkies and emergency toolkits present from setup to strike.",
      },
    ],
    requiredDocuments: [
      {
        title: "Government ID Proofs of Bride & Groom",
        description: "Aadhaar Card, Passport, or Voter ID for official guest records, venue verification, and hotel bookings.",
        isMandatory: true,
      },
      {
        title: "Venue Booking Confirmation & Permitted Timelines",
        description: "Copy of the resort/hall agreement indicating check-in, stage hand-over, music curfew, and generator slots.",
        isMandatory: true,
      },
      {
        title: "Preliminary Guest List & Room Distribution Chart",
        description: "Tentative count of outstation vs local attendees for hospitality planning and seating arrangements.",
        isMandatory: false,
      },
      {
        title: "Family Muhurat & Ritual Reference Sheet",
        description: "Auspicious timing guidelines provided by your family pandit for uninterrupted ceremony sequencing.",
        isMandatory: false,
      },
    ],
  },
  "event-production": {
    title: "Event Production & Fabrication",
    slug: "event-production",
    category: "Technical Production",
    heroImage: "/hello-images/event_production.jpg",
    imageAlt: "Illustrative open-air stage production, structural rigging, and ambient lighting",
    summary:
      "Professional structural engineering, trussing, ambient audio-visual systems, and synchronized stage setups built to host your guests flawlessly.",
    inclusions: [
      "Stage framing, backdrop structural support, and safe anchoring",
      "Intelligent lighting arrays and atmospheric acoustics",
      "Generator and power backup line coordination",
      "Controlled setup timelines and post-event strike management",
    ],
    workflow: [
      "1. Site Survey & Technical Feasibility",
      "2. CAD/Structural Layout Blueprint",
      "3. Rigging, AV Testing & Safety Verification",
      "4. Live Event Operation & Breakdown",
    ],
    keyBenefits: [
      {
        title: "Structural Safety & Certified Rigging",
        description: "Heavy-duty aluminum box trussing and anchored framework tested to withstand outdoor wind forces and high load points.",
      },
      {
        title: "Immersive Concert-Grade Lighting",
        description: "Sharpy beams, warm LED wash lights, and DMX-programmed intelligent lighting tailored to match ceremony moods.",
      },
      {
        title: "Zero-Latency Acoustic Engineering",
        description: "Calibrated line-array audio systems delivering crystal-clear vocal chants during Vedic rituals and punchy sound for Sangeet.",
      },
      {
        title: "Redundant Backup Power Systems",
        description: "Silent dual-generator routing ensuring zero blackout risk during prime pheras or celebrity performances.",
      },
    ],
    requiredDocuments: [
      {
        title: "Venue Technical NOC & Electrical Load Clearance",
        description: "Venue authorization permitting external sound, trussing weight limits, and dedicated high-voltage generator entry.",
        isMandatory: true,
      },
      {
        title: "Local Police & Sound Permission Clearances",
        description: "Standard municipal sound license for amplified music or outdoor evening speakers in Maharashtra.",
        isMandatory: true,
      },
      {
        title: "Venue Dimensional Blueprint / CAD Layout",
        description: "Architectural floorplan detailing stage dimensions, fire exits, and pillar clearances for fabrication accuracy.",
        isMandatory: false,
      },
      {
        title: "Performer / Artist Tech Rider (If Applicable)",
        description: "Input channel list, monitor preferences, and instrument needs for live musicians or DJ sets.",
        isMandatory: false,
      },
    ],
  },
  "event-decor-design": {
    title: "Event Decor Design & Styling",
    slug: "event-decor-design",
    category: "Decor & Floral Design",
    heroImage: "/hello-images/event_decor_design.jpg",
    imageAlt: "Illustrative royal wedding mandap with cascading roses and traditional brass lamps",
    summary:
      "Bespoke spatial design bringing together sacred mandaps, breathtaking entrance archways, floral installations, and delicate color stories.",
    inclusions: [
      "Custom mandap architecture tailored to ceremony customs",
      "Artisanal fresh floral curation and installation",
      "Thematic guest entrance and memorable photo backdrops",
      "Table styling, linens, and candlelit ambiance",
    ],
    workflow: [
      "1. Aesthetic Moodboard & Color Palette Selection",
      "2. Floral & Fabric Sourcing Plan",
      "3. Mandap & Stage Rendering Review",
      "4. Day-of Artisanal Setup & Floral Styling",
    ],
    keyBenefits: [
      {
        title: "Authentic Custom Mandap Styling",
        description: "From royal Vedic wooden pavilions to open-lawn floral arches, designed respectfully around traditional Maharashtrian rituals.",
      },
      {
        title: "Farm-Fresh Seasonal Florals",
        description: "Daily sourced exotic roses, fresh marigolds, tuberoses, and orchids conditioned for prolonged freshness under stage lights.",
      },
      {
        title: "Photogenic Focal Installations",
        description: "Handcrafted photo galleries, welcome tunnels, and floral swings designed as show-stopping Instagram backdrops.",
      },
      {
        title: "Curated Texture & Color Palettes",
        description: "Fine silk draping, raw linen tablescapes, brass samai lamps, and ambient fairy lights unified in bespoke color harmony.",
      },
    ],
    requiredDocuments: [
      {
        title: "Venue Decor Guidelines & Restrictions",
        description: "Confirmation on permissible fixing methods (nailing, tape, hanging points) and flower disposal regulations.",
        isMandatory: true,
      },
      {
        title: "Couple Outfit Color Swatches & Aesthetic Moodboard",
        description: "Color palette references of bridal lehenga and groom sherwani to ensure decor background complements your attire.",
        isMandatory: false,
      },
      {
        title: "Special Customs & Floral Quantity Requirements",
        description: "List of specific garlands (Varmala), traditional pooja flowers, and entrance blessing petals required by the family.",
        isMandatory: false,
      },
      {
        title: "Fire Safety & Havan Clearance for Mandap",
        description: "Venue approval regarding holy fire (Homa/Havan Kund) smoke sensors and safety clearance distances.",
        isMandatory: true,
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICE_REGISTRY).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = SERVICE_REGISTRY[params.slug];
  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${BUSINESS_CONFIG.displayName}`,
      description: service.summary,
      url: `${BUSINESS_CONFIG.siteUrl}/services/${service.slug}`,
      type: "article",
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICE_REGISTRY[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Editorial Image Hero */}
      <section className="relative min-h-[42vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 text-center space-y-2.5 sm:space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center space-x-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-gold-light hover:text-white font-sans font-semibold mb-1 sm:mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="gold" size="sm">
              {service.category}
            </Badge>
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] sm:leading-tight">
            {service.title}
          </h1>

          <p className="font-sans text-xs sm:text-base text-ivory-100 max-w-2xl mx-auto leading-relaxed font-light">
            {service.summary}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <Section background="white" className="!py-6 sm:!py-14">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-16">
          {/* Scope and Inclusions */}
          <div className="bg-ivory-50 p-5 sm:p-10 rounded-xl sm:rounded-2xl border border-blush/60 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <h2 className="font-serif text-xl sm:text-3xl text-charcoal leading-snug">
                Proposed Scope &amp; Inclusions
              </h2>
              <Badge variant="neutral" size="sm">
                Subject to confirmation
              </Badge>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {service.inclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2.5 sm:space-x-3 font-sans text-xs sm:text-sm text-charcoal/90"
                >
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-coral" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-blush/40 flex items-center space-x-2 text-[11px] sm:text-xs text-charcoal/70 font-sans">
              <ShieldCheck className="w-4 h-4 text-coral shrink-0" />
              <span>
                Final inclusions, quantities, and milestones are customized per
                venue scale and family traditions.
              </span>
            </div>
          </div>

          {/* ========================================================
              KEY BENEFITS & FEATURES (EXACT REFERENCE 3D CARD STYLE)
              ======================================================== */}
          {service.keyBenefits && service.keyBenefits.length > 0 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-blush/60 p-4 sm:p-8 shadow-[0_10px_30px_rgba(242,136,123,0.08)] space-y-4 sm:space-y-6">
              {/* Header with 3D Glossy Icon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#38BDF8] p-0.5 shadow-[0_4px_12px_rgba(56,189,248,0.35)] flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-gradient-to-tr from-[#38BDF8] to-[#E0F2FE] flex items-center justify-center text-white shadow-inner">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm fill-white/20" />
                  </div>
                </div>
                <div>
                  <h3 className="font-sans text-base sm:text-xl font-extrabold text-charcoal tracking-tight">
                    Key Benefits &amp; Features
                  </h3>
                  <p className="font-sans text-[11px] sm:text-sm text-charcoal/60">
                    Curated advantages tailored for this service tier
                  </p>
                </div>
              </div>

              {/* Pill List matching uploaded screenshot */}
              <div className="space-y-2.5 sm:space-y-3">
                {service.keyBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-2.5 sm:gap-3.5 group"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#22C55E] to-[#15803D] flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(34,197,94,0.4)] mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white/20" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="font-sans text-[11px] sm:text-xs text-charcoal/70 leading-relaxed font-normal">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              REQUIRED DOCUMENTS CHECKLIST (EXACT REFERENCE 3D CARD STYLE)
              ======================================================== */}
          {service.requiredDocuments && service.requiredDocuments.length > 0 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-blush/60 p-4 sm:p-8 shadow-[0_10px_30px_rgba(242,136,123,0.08)] space-y-4 sm:space-y-6">
              {/* Header with 3D Glossy Red/Coral Icon */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFE4E6] via-[#FECDD3] to-[#F43F5E] p-0.5 shadow-[0_4px_12px_rgba(244,63,94,0.3)] flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-gradient-to-tr from-[#E11D48] to-[#FDA4AF] flex items-center justify-center text-white shadow-inner">
                    <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm fill-white/20" />
                  </div>
                </div>
                <div>
                  <h3 className="font-sans text-base sm:text-xl font-extrabold text-charcoal tracking-tight">
                    Required Documents Checklist
                  </h3>
                  <p className="font-sans text-[11px] sm:text-sm text-charcoal/60">
                    Keep digital or physical copies ready for planning clearance
                  </p>
                </div>
              </div>

              {/* Document rows matching the uploaded image */}
              <div className="space-y-2.5 sm:space-y-3">
                {service.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0]/80 hover:border-coral/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3.5 group"
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]/50 flex items-center justify-center shrink-0 text-[#0284C7] shadow-[0_2px_6px_rgba(2,132,199,0.2)] mt-0.5">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0284C7]/20" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-sans text-xs sm:text-sm font-bold text-charcoal/90 group-hover:text-coral transition-colors">
                          {doc.title}
                        </h4>
                        <p className="font-sans text-[11px] sm:text-xs text-charcoal/65 leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end sm:justify-start">
                      <span
                        className={`text-[9px] sm:text-[10px] uppercase font-sans font-bold tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ${
                          doc.isMandatory
                            ? "bg-coral/15 text-coral-dark border border-coral/30"
                            : "bg-charcoal/5 text-charcoal/70 border border-charcoal/10"
                        }`}
                      >
                        {doc.isMandatory ? "Mandatory" : "Recommended"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow */}
          <div>
            <div className="text-center mb-6 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold">
                Execution Model
              </span>
              <h2 className="font-serif text-xl sm:text-4xl text-charcoal-dark mt-1 sm:mt-2">
                Our Collaborative Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {service.workflow.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-blush/60 text-center space-y-1 sm:space-y-2 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-coral/50 transition-all duration-300"
                >
                  <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-coral font-bold block">
                    Phase {idx + 1}
                  </span>
                  <span className="font-serif text-sm sm:text-base text-charcoal block font-medium">
                    {step.replace(/^\d+\.\s*/, "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <EnquiryCTASection
        title={`Inquire about ${service.title}`}
        subtitle="Connect with our wedding planners in Karad to review specific celebration dates and customized arrangements."
      />
    </>
  );
}
