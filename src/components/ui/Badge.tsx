import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "burgundy" | "charcoal" | "neutral" | "coral" | "blush";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "coral",
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
    coral: "bg-coral text-white font-semibold shadow-xs",
    blush: "bg-[#F9CFCA] text-charcoal border border-[#F4ABA2]/50 font-semibold",
    gold: "bg-blush-50 text-coral border border-coral/30 font-semibold",
    burgundy: "bg-coral-dark text-white font-medium",
    charcoal: "bg-charcoal text-white font-medium",
    neutral: "bg-blush-50 text-charcoal border border-blush/60 font-medium",
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
