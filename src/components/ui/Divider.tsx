import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "subtle" | "ornate";
  centered?: boolean;
}

export function Divider({
  variant = "gold",
  centered = true,
  className = "",
  ...props
}: DividerProps) {
  if (variant === "subtle") {
    return (
      <div
        className={`w-full h-px bg-ivory-200 my-6 ${className}`}
        aria-hidden="true"
        {...props}
      />
    );
  }

  if (variant === "ornate") {
    return (
      <div
        className={`flex items-center space-x-3 my-6 ${
          centered ? "justify-center" : "justify-start"
        } ${className}`}
        aria-hidden="true"
        {...props}
      >
        <span className="w-12 h-px bg-gold/50" />
        <span className="w-2 h-2 rotate-45 border border-gold bg-ivory-50" />
        <span className="w-12 h-px bg-gold/50" />
      </div>
    );
  }

  return (
    <div
      className={`w-16 h-0.5 bg-gold my-4 ${
        centered ? "mx-auto" : ""
      } ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
