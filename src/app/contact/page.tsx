import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BUSINESS_CONFIG } from "@/config/business";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Get in touch with Hindavi Wedding Family for bespoke wedding planning, event production, and decor design in Pune, Maharashtra.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact & Enquiries | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Get in touch with Hindavi Wedding Family for bespoke wedding planning, event production, and decor design in Pune, Maharashtra.",
    url: `${BUSINESS_CONFIG.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ========================================================
          1. EDITORIAL CONTACT HERO
          ======================================================== */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hello-images/service_entrance.jpg"
            alt="Majestic floral wedding gateway and entrance archway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14 text-center space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans font-bold">
            <span>Direct Planning Liaison</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.15] sm:leading-[1.1]">
            Connect With Our Team
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light">
            Whether you are envisioning a grand celebration in Pune or a destination wedding across Maharashtra,
            we are here to craft your milestone with grace.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. TWO-COLUMN HIGH-END CONSULTATION EXPERIENCE
          ======================================================== */}
      <Section background="white" className="!py-6 sm:!py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column: Contact Profile & Office Details (Shaadi Squad style clean card) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 bg-blush-50/70 p-4 sm:p-8 rounded-2xl border border-blush/60">
            <div className="space-y-2 sm:space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
                Pune Office
              </span>
              <h2 className="font-sans text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-charcoal leading-snug sm:leading-tight">
                {BUSINESS_CONFIG.displayName}
              </h2>
              <div className="w-12 h-1 bg-coral rounded-full" />
              <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed pt-1 sm:pt-2">
                We invite you to reach out for an initial consultation. Our event
                specialists coordinate wedding planning timelines, decor fabrication,
                and technical staging across Pune and Maharashtra.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-blush/60">
              {/* Address */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-coral shadow-xs shrink-0 mt-0.5 border border-blush/50">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-coral" />
                </div>
                <div className="font-sans text-sm min-w-0">
                  <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs block text-charcoal mb-0.5">
                    Main Office Address
                  </span>
                  <address className="not-italic leading-relaxed text-charcoal/80 text-[11px] sm:text-xs">
                    {BUSINESS_CONFIG.contact.address.fullText}
                  </address>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-coral shadow-xs shrink-0 mt-0.5 border border-blush/50">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-coral" />
                </div>
                <div className="font-sans text-sm min-w-0">
                  <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs block text-charcoal mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                    className="text-coral hover:text-coral-dark font-medium text-xs break-all hover:underline"
                  >
                    {BUSINESS_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-coral shadow-xs shrink-0 mt-0.5 border border-blush/50">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-coral" />
                </div>
                <div className="font-sans text-sm min-w-0">
                  <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs block text-charcoal mb-0.5">
                    Mobile / Phone
                  </span>
                  <a
                    href={`tel:+91${BUSINESS_CONFIG.contact.phone}`}
                    className="text-coral hover:text-coral-dark text-xs sm:text-sm font-bold block"
                  >
                    {BUSINESS_CONFIG.contact.displayPhone}
                  </a>
                  <span className="text-[10px] sm:text-[11px] text-charcoal/60">
                    Available for wedding consultations and inquiries
                  </span>
                </div>
              </div>

              {/* Response Time Expectation */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-coral shadow-xs shrink-0 mt-0.5 border border-blush/50">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-coral" />
                </div>
                <div className="font-sans text-sm min-w-0">
                  <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs block text-charcoal mb-0.5">
                    Consultation Response
                  </span>
                  <span className="text-charcoal/70 text-[11px] sm:text-xs leading-relaxed block">
                    Inquiries received via direct email or form are acknowledged
                    within 24–48 business hours.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-3 sm:pt-4 border-t border-blush/60 space-y-1.5 sm:space-y-2">
              <span className="font-sans text-xs uppercase tracking-wider text-charcoal/70 block font-bold">
                Official Channels
              </span>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <a
                  href={BUSINESS_CONFIG.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 text-xs text-coral hover:text-coral-dark font-bold transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Instagram</span>
                </a>
                <span className="text-blush-300">•</span>
                <a
                  href={BUSINESS_CONFIG.socials.threads.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 text-xs text-charcoal hover:text-coral font-bold transition-colors"
                >
                  <ThreadsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Threads</span>
                </a>
                <span className="text-blush-300">•</span>
                <a
                  href={BUSINESS_CONFIG.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 text-xs text-charcoal hover:text-coral font-bold transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
