"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";

export function SpecialServicesFloatingButton() {
  const pathname = usePathname();
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Hide Special Services floating button on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Hide or fade out when user scrolls down to the footer to never obstruct copyright/links
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // If the top of footer is within 140px of window bottom, hide button
        if (footerRect.top <= window.innerHeight - 60) {
          setIsNearFooter(true);
          return;
        }
      }
      setIsNearFooter(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 transition-all duration-300 ${
        isNearFooter
          ? "opacity-0 pointer-events-none translate-y-4"
          : "opacity-100 pointer-events-auto translate-y-0"
      }`}
    >
      <Link
        href="/services"
        className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#801C30] to-[#A82835] hover:from-[#6F1829] hover:to-[#801C30] text-white font-sans text-xs sm:text-[13px] font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(128,28,48,0.35)] hover:shadow-[0_6px_20px_rgba(128,28,48,0.5)] border border-white/80 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="View Services"
      >
        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Layers className="w-3 h-3 text-white" />
        </span>
        <span className="font-semibold tracking-wider">Services</span>
      </Link>
    </div>
  );
}
