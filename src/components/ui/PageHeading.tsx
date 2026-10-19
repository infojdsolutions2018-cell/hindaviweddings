import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";

interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  badge,
  centered = true,
  className = "",
}: PageHeadingProps) {
  return (
    <div
      className={`py-12 md:py-16 ${
        centered ? "text-center" : "text-left"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3 justify-center">
        {eyebrow && (
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-burgundy">
            {eyebrow}
          </span>
        )}
        {badge && <Badge variant="gold">{badge}</Badge>}
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-dark tracking-tight leading-tight">
        {title}
      </h1>

      <Divider variant="ornate" centered={centered} />

      {subtitle && (
        <p className="font-sans text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
