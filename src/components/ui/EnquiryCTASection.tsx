import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
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
    <section
      className={`relative py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-[#2D2826] via-[#1F1B1A] to-[#2B1B1D] text-white border-t border-[#4A3835] ${className}`}
    >
      {/* Subtle luxury ambient glow & background pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/hello-images/hero_wedding.jpg"
          alt="Luxury wedding backdrop illumination"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blush-200 text-[11px] uppercase tracking-[0.25em] font-sans font-bold">
          <span>{eyebrow}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight drop-shadow-md">
          {title}
        </h2>

        <div className="w-16 h-0.5 bg-coral mx-auto rounded-full" aria-hidden="true" />

        <p className="font-sans text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
          {subtitle}
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            href="/contact"
            size="md"
            variant="primary"
            className="w-full sm:w-auto shadow-lg hover:shadow-xl"
          >
            Submit an Enquiry
          </Button>
          <a
            href={`mailto:${BUSINESS_CONFIG.contact.email}`}
            className="text-white hover:text-coral text-xs uppercase tracking-widest font-bold font-sans py-3 px-6 transition-all border border-white/40 hover:border-coral rounded-full w-full sm:w-auto bg-white/10 backdrop-blur-xs hover:bg-white/20"
          >
            Email Directly
          </a>
        </div>
      </div>
    </section>
  );
}
