import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  background?: "ivory" | "white" | "charcoal" | "subtle";
  containerSize?: "default" | "narrow" | "wide" | "full";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  background = "ivory",
  containerSize = "default",
  className = "",
  children,
  ...props
}: SectionProps) {
  const bgStyles = {
    ivory: "bg-ivory text-charcoal",
    white: "bg-white text-charcoal",
    charcoal: "bg-charcoal text-ivory",
    subtle: "bg-ivory-50 text-charcoal",
  };

  const containerWidths = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${bgStyles[background]} ${className}`}
      {...props}
    >
      <div className={`mx-auto ${containerWidths[containerSize]}`}>
        {children}
      </div>
    </Component>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  inverted = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${centered ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs uppercase tracking-widest font-sans font-semibold mb-3 ${
            inverted ? "text-gold" : "text-burgundy"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight ${
          inverted ? "text-white" : "text-charcoal-dark"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-16 h-0.5 bg-gold my-4 ${
          centered ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={`font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
            inverted ? "text-ivory-200" : "text-charcoal-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
