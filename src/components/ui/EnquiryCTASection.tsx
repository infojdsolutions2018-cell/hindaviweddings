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
  title = "Ready to Plan Your Wedding?",
  subtitle = "Share your dates, vision, and guest expectations. Our planning team will connect to curate every detail.",
  className = "",
}: EnquiryCTASectionProps) {
  return (
    <Section background="blush" className={`border-t border-[#F4ABA2]/50 ${className}`}>
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-coral font-sans font-bold">
          {eyebrow}
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-charcoal leading-tight">
          {title}
        </h2>
        <div className="w-16 h-1 bg-coral mx-auto rounded-full" aria-hidden="true" />
        <p className="font-sans text-charcoal/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" size="lg" variant="primary" className="w-full sm:w-auto shadow-md">
            Submit an Enquiry
          </Button>
          <a
            href={`mailto:${BUSINESS_CONFIG.contact.email}`}
            className="text-charcoal hover:text-coral text-xs uppercase tracking-widest font-bold font-sans py-3.5 px-7 transition-all border border-charcoal/30 hover:border-coral rounded-full w-full sm:w-auto bg-white/60 backdrop-blur-xs"
          >
            Email Directly
          </a>
        </div>
      </div>
    </Section>
  );
}
