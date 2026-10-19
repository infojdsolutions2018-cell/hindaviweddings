import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "inline-flex items-center justify-center font-sans tracking-wide rounded-sm transition-all duration-200 cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs uppercase tracking-widest font-semibold",
    md: "px-6 py-3 text-sm uppercase tracking-wider font-semibold",
    lg: "px-8 py-4 text-base uppercase tracking-wider font-medium",
  };

  const variantStyles = {
    primary:
      "bg-burgundy text-white hover:bg-burgundy-600 focus-visible:outline-burgundy shadow-sm hover:shadow",
    secondary:
      "bg-gold text-charcoal-dark hover:bg-gold-light focus-visible:outline-gold font-semibold shadow-sm",
    outline:
      "border border-burgundy text-burgundy hover:bg-burgundy hover:text-white focus-visible:outline-burgundy",
    ghost:
      "text-charcoal hover:text-burgundy hover:bg-ivory-200 focus-visible:outline-burgundy",
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
