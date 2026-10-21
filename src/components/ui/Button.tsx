import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "coral";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-wider rounded-full transition-all duration-200 cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs uppercase tracking-widest font-semibold",
    md: "px-7 py-3 text-xs sm:text-sm uppercase tracking-wider font-semibold",
    lg: "px-9 py-4 text-sm sm:text-base uppercase tracking-wider font-medium",
  };

  const variantStyles = {
    primary:
      "bg-coral text-white hover:bg-coral-dark focus-visible:outline-coral shadow-sm hover:shadow",
    secondary:
      "bg-blush text-charcoal hover:bg-blush-300 focus-visible:outline-coral font-semibold shadow-sm",
    coral:
      "bg-coral text-white hover:bg-coral-dark focus-visible:outline-coral shadow-sm hover:shadow",
    outline:
      "border border-coral text-coral hover:bg-coral hover:text-white focus-visible:outline-coral",
    ghost:
      "text-charcoal hover:text-coral hover:bg-blush-50 focus-visible:outline-coral",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} role="button">
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
