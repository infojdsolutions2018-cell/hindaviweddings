import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BUSINESS_CONFIG } from "@/config/business";
import { Divider } from "@/components/ui/Divider";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

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
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_wedding.jpg"
            alt="Illustrative wedding venue illumination in Karad"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
          <div className="absolute inset-0 bg-burgundy/25 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold-light text-xs uppercase tracking-[0.25em] font-sans font-semibold">
            <span>Direct Planning Liaison</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]">
            Connect With Our Team
          </h1>

          <Divider variant="ornate" centered={true} />

          <p className="font-sans text-base sm:text-lg text-ivory-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you are envisioning a grand palace wedding or an intimate
            family celebration, we are here to craft your milestone with grace.
          </p>

          <div className="pt-2">
            <span className="text-[10px] text-ivory-300 uppercase tracking-widest font-sans">
              * Photography shown represents illustrative concept
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TWO-COLUMN HIGH-END CONSULTATION EXPERIENCE
          ======================================================== */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Profile & Office Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-sans font-semibold">
                Pune Office
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-dark leading-tight">
                {BUSINESS_CONFIG.displayName}
              </h2>
              <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                We invite you to reach out for an initial consultation. Our event
                specialists coordinate wedding planning timelines, decor fabrication,
                and technical staging across Pune, Karad, and surrounding districts in Maharashtra.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-ivory-200">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="font-sans text-sm">
                  <span className="font-semibold block text-charcoal-dark mb-0.5">
                    Main Office Address
                  </span>
                  <address className="not-italic leading-relaxed text-charcoal-muted text-xs">
                    {BUSINESS_CONFIG.contact.address.fullText}
                  </address>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="font-sans text-sm">
                  <span className="font-semibold block text-charcoal-dark mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                    className="text-burgundy hover:underline text-xs break-all"
                  >
                    {BUSINESS_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="font-sans text-sm">
                  <span className="font-semibold block text-charcoal-dark mb-0.5">
                    Mobile / Phone
                  </span>
                  <a
                    href={`tel:+91${BUSINESS_CONFIG.contact.phone}`}
                    className="text-burgundy hover:underline text-xs font-semibold block"
                  >
                    {BUSINESS_CONFIG.contact.displayPhone}
                  </a>
                  <span className="text-[11px] text-charcoal-muted">
                    Available for wedding consultations and inquiries
                  </span>
                </div>
              </div>

              {/* Response Time Expectation */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center text-burgundy flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="font-sans text-sm">
                  <span className="font-semibold block text-charcoal-dark mb-0.5">
                    Consultation Response
                  </span>
                  <span className="text-charcoal-muted text-xs">
                    Inquiries received via direct email or form are acknowledged
                    within 24–48 business hours.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-6 border-t border-ivory-200 space-y-3">
              <span className="font-sans text-xs uppercase tracking-wider text-charcoal-muted block font-semibold">
                Official Channels
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href={BUSINESS_CONFIG.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-burgundy hover:text-burgundy-600 font-semibold transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <span className="text-ivory-300">•</span>
                <a
                  href={BUSINESS_CONFIG.socials.threads.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-burgundy hover:text-burgundy-600 font-semibold transition-colors"
                >
                  Threads
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
