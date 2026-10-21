import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
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
}

const SERVICE_REGISTRY: Record<string, ServiceData> = {
  "wedding-planning": {
    title: "Wedding Planning & Coordination",
    slug: "wedding-planning",
    category: "Full Service Planning",
    heroImage: "/other-images/wedding_planning.jpg",
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
  },
  "event-production": {
    title: "Event Production & Fabrication",
    slug: "event-production",
    category: "Technical Production",
    heroImage: "/other-images/event_production.jpg",
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
  },
  "event-decor-design": {
    title: "Event Decor Design & Styling",
    slug: "event-decor-design",
    category: "Decor & Floral Design",
    heroImage: "/other-images/event_decor_design.jpg",
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
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
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

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-gold-light hover:text-white font-sans font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="gold" size="sm">
              {service.category}
            </Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            {service.title}
          </h1>

          <p className="font-sans text-sm sm:text-base text-ivory-100 max-w-2xl mx-auto leading-relaxed">
            {service.summary}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <Section background="white">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Scope and Inclusions */}
          <div className="bg-ivory-50 p-8 sm:p-10 rounded-sm border border-ivory-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-dark">
                Proposed Scope & Inclusions
              </h2>
              <Badge variant="neutral" size="sm">
                Subject to confirmation
              </Badge>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.inclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 font-sans text-sm text-charcoal"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-ivory-200 flex items-center space-x-2 text-xs text-charcoal-muted font-sans">
              <ShieldCheck className="w-4 h-4 text-gold-dark flex-shrink-0" />
              <span>
                Final inclusions, quantities, and milestones are customized per
                venue scale and family traditions.
              </span>
            </div>
          </div>

          {/* Workflow */}
          <div>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-burgundy font-sans font-semibold">
                Execution Model
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-dark mt-2">
                Our Collaborative Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {service.workflow.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-white border border-ivory-200 text-center space-y-2 shadow-xs hover:border-gold/50 transition-colors"
                >
                  <span className="font-sans text-xs uppercase tracking-widest text-burgundy font-semibold block">
                    Phase {idx + 1}
                  </span>
                  <span className="font-serif text-base text-charcoal-dark block font-medium">
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
