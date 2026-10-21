"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#F9CFCA]/95 backdrop-blur-md border-b border-[#F4ABA2]/40 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Brand Logo & Wordmark (Shaadi Squad style clean branding) */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-coral"
            aria-label={`${BUSINESS_CONFIG.displayName} - Home`}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/80 shadow-sm flex-shrink-0 bg-white">
              <Image
                src="/logo.jpg"
                alt="Hindavi Weddings & Events Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider text-charcoal group-hover:text-coral transition-colors leading-tight">
                HINDAVI
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-charcoal/70 font-semibold">
                Weddings & Events
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Montserrat uppercase clean links) */}
          <nav
            className="hidden md:flex items-center space-x-7 lg:space-x-8"
            aria-label="Main Navigation"
          >
            {BUSINESS_CONFIG.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] uppercase tracking-[0.12em] font-sans transition-colors py-2 relative focus-visible:outline-coral ${
                    isActive
                      ? "text-coral font-bold"
                      : "text-charcoal hover:text-coral font-semibold"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action + Social Links */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              href={BUSINESS_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal hover:text-coral transition-colors p-2 rounded-full hover:bg-white/40"
              aria-label={`Follow on ${BUSINESS_CONFIG.socials.instagram.label}`}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <Button href="/contact" size="sm" variant="primary">
              Enquire Now
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden space-x-3">
            <Button href="/contact" size="sm" variant="primary" className="!px-3.5 !py-1.5 text-[11px]">
              Enquire
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-coral rounded-full hover:bg-white/40 focus-visible:outline-coral transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Blush themed) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-[#F4ABA2]/50 bg-[#F9CFCA] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-md"
        >
          <nav className="flex flex-col space-y-1.5">
            {BUSINESS_CONFIG.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs uppercase tracking-widest font-sans rounded-md transition-colors ${
                    isActive
                      ? "text-coral font-bold bg-white/70"
                      : "text-charcoal hover:text-coral hover:bg-white/40 font-semibold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[#F4ABA2]/40 flex items-center justify-between">
            <span className="text-xs text-charcoal/70 font-sans uppercase tracking-wider">
              Connect with us
            </span>
            <div className="flex items-center space-x-4">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-coral p-1.5 rounded-full hover:bg-white/40 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
