import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "burgundy" | "charcoal" | "neutral";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "gold",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px] tracking-widest",
    md: "px-3 py-1 text-xs tracking-wider",
  };

  const variantStyles = {
    gold: "bg-gold-50 text-burgundy border border-gold/30 font-semibold",
    burgundy: "bg-burgundy text-white font-medium",
    charcoal: "bg-charcoal text-ivory-100 font-medium",
    neutral: "bg-ivory-200 text-charcoal font-medium",
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-sans rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
