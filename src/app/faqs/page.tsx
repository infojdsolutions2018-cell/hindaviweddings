import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { BUSINESS_CONFIG } from "@/config/business";
import { HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description:
    "Common questions regarding wedding planning, custom decor design, technical production, and event booking with Hindavi Wedding Family in Pune, Maharashtra.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: `FAQs | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Everything you need to know about planning your wedding or event with Hindavi Wedding Family in Pune and across Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/faqs`,
  },
};

const FAQS_DATA = [
  {
    category: "Services & Scope",
    items: [
      {
        question: "What core services do Hindavi Weddings & Events provide?",
        answer:
          "We specialize in three integrated disciplines: (1) Full-scale Wedding Planning & Day-of Coordination, (2) Event Production & Structural Staging (trussing, stage fabrication, intelligent acoustics, and illumination), and (3) Bespoke Decor Design (custom Vedic mandaps, fresh floral styling, and themed entrance avenues).",
      },
      {
        question: "Do you plan weddings outside of Pune?",
        answer:
          "Yes! While our operational headquarters is in Pune, we orchestrate destination and city celebrations across Maharashtra, including Karad, Mahabaleshwar, Satara, Kolhapur, Lonavala, and Mumbai.",
      },
      {
        question: "Can we hire you for only decor design or only event production?",
        answer:
          "Absolutely. While many couples choose our integrated end-to-end planning, we offer standalone service engagements for decor design or technical production based on your exact venue needs.",
      },
    ],
  },
  {
    category: "Planning & Booking Process",
    items: [
      {
        question: "How far in advance should we book your team?",
        answer:
          "For peak wedding season dates (October through March in Maharashtra), we recommend booking 6 to 10 months in advance to ensure prime dates, premier vendor securing, and ample design conceptualization time. However, we also accommodate intimate celebrations with shorter timelines depending on date availability.",
      },
      {
        question: "How does your planning roadmap work?",
        answer:
          "Our collaborative process follows four distinct phases: (1) Discovery & Consultation, (2) Design & 3D Spatial Layouts, (3) Vendor Alignment & Master Itinerary Scheduling, and (4) Day-of Ground Execution with our on-site team overseeing every ritual.",
      },
      {
        question: "Do you offer standard fixed packages?",
        answer:
          "We create custom proposals rather than rigid packages. Every wedding has distinct guest counts, ritual timelines, and venue requirements. We take time to understand your specific scope to deliver a transparent, tailored investment breakdown without hidden surprises.",
      },
    ],
  },
  {
    category: "On-Day Coordination & Vendors",
    items: [
      {
        question: "Will you coordinate with external vendors chosen by our family?",
        answer:
          "Yes. We collaborate seamlessly with caterers, photographers, pandits, makeup artists, and hospitality teams chosen by your family, aligning everyone to a unified master run-sheet.",
      },
      {
        question: "Who will be present on the wedding day?",
        answer:
          "Our lead planners, hospitality coordinators, and technical production directors remain on-ground throughout your celebrations, ensuring punctuality, family comfort, and seamless transitions.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <>
      {/* ========================================================
          1. EDITORIAL FAQS HERO
          ======================================================== */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hello-images/service_mandap.jpg"
            alt="Royal Vedic wedding mandap setup and guidance"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-5">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.25em] font-sans font-bold">
            <span>Help &amp; Insights</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to know about our bespoke planning, decor curation,
            and event execution across Maharashtra.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. FAQS ACCORDION / SECTIONS
          ======================================================== */}
      <Section background="white">
        <div className="max-w-4xl mx-auto space-y-16">
          {FAQS_DATA.map((group, gIdx) => (
            <div key={gIdx} className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-blush/60 pb-3">
                <HelpCircle className="w-5 h-5 text-coral" />
                <h2 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-wide text-charcoal">
                  {group.category}
                </h2>
              </div>

              <div className="space-y-4">
                {group.items.map((faq, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-6 sm:p-7 rounded-2xl bg-blush-50/70 border border-blush/60 space-y-3 transition-all hover:border-coral/60 shadow-xs"
                  >
                    <h3 className="font-sans text-base sm:text-lg font-bold text-charcoal flex items-start justify-between">
                      <span>{faq.question}</span>
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Direct Support Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-blush/80 text-center space-y-4 shadow-xs">
            <h3 className="font-sans text-2xl font-extrabold uppercase tracking-tight text-charcoal">
              Have a Specific Question?
            </h3>
            <p className="font-sans text-sm text-charcoal/80 max-w-lg mx-auto leading-relaxed">
              Our wedding directors are available to discuss dates, venue logistics,
              or specialized ceremonial traditions directly.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-coral hover:bg-coral-dark text-white font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-full transition-all shadow-md"
              >
                <span>Ask Us Directly</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <EnquiryCTASection
        title="Ready to Begin Planning Your Wedding?"
        subtitle="Share your celebration dates, envisioned aesthetic, and guest count with our Pune planning team."
      />
    </>
  );
}
