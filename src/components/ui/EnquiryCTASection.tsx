import React from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";

interface EnquiryCTASectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EnquiryCTASection({
  eyebrow = "Begin Your Journey",
  title = "Ready to Plan Your Milestone Event?",
  subtitle = "Share your dates, vision, and guest expectations. Our planning team will connect to curate every detail.",
  className = "",
}: EnquiryCTASectionProps) {
  return (
    <Section background="charcoal" className={className}>
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-gold font-sans font-semibold">
          {eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto" aria-hidden="true" />
        <p className="font-sans text-ivory-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" size="lg" variant="secondary">
            Submit an Enquiry
          </Button>
          <a
            href={`mailto:${BUSINESS_CONFIG.contact.email}`}
            className="text-ivory-200 hover:text-white text-xs uppercase tracking-widest font-semibold font-sans py-3 px-4 transition-colors"
          >
            Email Directly
          </a>
        </div>
      </div>
    </Section>
  );
}
