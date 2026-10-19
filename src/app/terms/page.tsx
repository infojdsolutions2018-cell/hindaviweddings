import React from "react";
import type { Metadata } from "next";
import { PageHeading } from "@/components/ui/PageHeading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service, intellectual property, and engagement principles for Hindavi Wedding Family.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Service | ${BUSINESS_CONFIG.displayName}`,
    description:
      "Terms of service, intellectual property, and engagement principles for Hindavi Wedding Family.",
    url: `${BUSINESS_CONFIG.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Section background="subtle">
        <PageHeading
          eyebrow="Legal & Trust"
          title="Terms of Service"
          subtitle="General terms of website use and event service engagement principles."
        />
      </Section>

      <Section background="white">
        <div className="max-w-3xl mx-auto space-y-8 font-sans text-charcoal leading-relaxed text-sm">
          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              1. Website Purpose & Quotations
            </h2>
            <p className="text-charcoal-muted">
              The content presented on this website by {BUSINESS_CONFIG.name} is
              for informational and event enquiry purposes. Formal service
              agreements, dates, deliverables, payment milestones, and terms are
              finalized via written contracts signed between the client and
              Hindavi Wedding Family.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              2. Intellectual Property & Brand Assets
            </h2>
            <p className="text-charcoal-muted">
              All branding elements, wordmarks, photography, design concepts, and
              editorial text belong to {BUSINESS_CONFIG.displayName} or their
              respective copyright holders. Reproduction without express
              written permission is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal-dark mb-3">
              3. Inquiries & Communication
            </h2>
            <p className="text-charcoal-muted">
              For any questions regarding these terms, contact us at{" "}
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
