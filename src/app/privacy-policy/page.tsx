import React from "react";
import type { Metadata } from "next";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy and data protection practices for event enquiries submitted to Hindavi Wedding Family.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: `Privacy Policy | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Privacy and data protection practices for event enquiries submitted to Hindavi Wedding Family.",
    url: `${BUSINESS_CONFIG.siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section background="subtle">
        <PageHeading
          eyebrow="Legal & Trust"
          title="Privacy Policy"
          subtitle="How Hindavi Wedding Family collects, uses, and safeguards information provided via our website."
        />
      </Section>

      <Section background="white">
        <div className="max-w-3xl mx-auto space-y-8 font-sans text-charcoal leading-relaxed text-sm">
          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              1. Information We Collect
            </h2>
            <p className="text-charcoal-muted">
              When you submit an enquiry through the {BUSINESS_CONFIG.displayName}{" "}
              website, we collect information necessary to understand and fulfill
              your event requirements: your name, phone number, email address,
              tentative event dates, ceremony types, and location preferences.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-charcoal-muted">
              Your details are used exclusively to communicate regarding your
              event quotation, schedule planning consultations, and coordinate
              wedding services. We do not sell, rent, or share personal
              information with unauthorized third parties or marketing brokers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              3. Data Retention & Privacy Rights
            </h2>
            <p className="text-charcoal-muted">
              We retain enquiry details for the duration needed to service your
              wedding planning cycle. You have the right at any time to request
              access, correction, or deletion of your contact records by emailing{" "}
              <a
                href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                className="text-burgundy font-semibold hover:underline"
              >
                {BUSINESS_CONFIG.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
