"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-ivory-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex flex-col group focus-visible:outline-burgundy"
            aria-label={`${BUSINESS_CONFIG.displayName} - Home`}
          >
            <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider text-burgundy group-hover:text-burgundy-600 transition-colors">
              HINDAVI
            </span>
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gold-dark font-medium -mt-1">
              Weddings & Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main Navigation"
          >
            {BUSINESS_CONFIG.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs uppercase tracking-widest font-sans transition-colors py-2 relative focus-visible:outline-burgundy ${
                    isActive
                      ? "text-burgundy font-semibold"
                      : "text-charcoal hover:text-burgundy font-medium"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy rounded-full"
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
              className="text-charcoal-muted hover:text-burgundy transition-colors p-2"
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
            <Button href="/contact" size="sm" variant="primary" className="!px-3 !py-1.5 text-[11px]">
              Enquire
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-burgundy rounded focus-visible:outline-burgundy"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-ivory-200 bg-ivory px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col space-y-2">
            {BUSINESS_CONFIG.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm uppercase tracking-wider font-sans rounded transition-colors ${
                    isActive
                      ? "text-burgundy font-semibold bg-ivory-200"
                      : "text-charcoal hover:text-burgundy hover:bg-ivory-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
            <span className="text-xs text-charcoal-muted font-sans">
              Connect with us
            </span>
            <div className="flex items-center space-x-4">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy hover:text-burgundy-600 p-1"
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
