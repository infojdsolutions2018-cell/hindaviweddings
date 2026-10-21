"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F9CFCA]/95 backdrop-blur-md border-b border-[#F4ABA2]/40 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-22">
            {/* Brand Logo & Wordmark (Title hidden on mobile as requested) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <Link
                href="/"
                className="relative rounded-xl overflow-hidden border border-[#F4ABA2]/80 bg-white shadow-sm flex items-center justify-center p-1 transition-all duration-300 hover:shadow-md hover:border-coral flex-shrink-0"
                aria-label={`${BUSINESS_CONFIG.displayName} - Home`}
              >
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16">
                  <Image
                    src="/logo.jpg"
                    alt="Hindavi Weddings & Events Logo"
                    fill
                    sizes="(max-width: 640px) 40px, 64px"
                    className="object-contain p-0.5"
                    priority
                  />
                </div>
              </Link>

              {/* Title & Brand Name: hidden on mobile, displayed on sm/md/lg */}
              <Link
                href="/"
                className="hidden sm:flex flex-col group focus-visible:outline-coral"
                aria-label={`${BUSINESS_CONFIG.displayName} - Home`}
              >
                <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-semibold tracking-wider text-charcoal group-hover:text-coral transition-colors leading-tight">
                  HINDAVI
                </span>
                <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-charcoal/70 font-semibold">
                  Weddings & Events
                </span>
              </Link>
            </div>

            {/* Desktop Navigation (Montserrat uppercase clean links) */}
            <nav
              className="hidden md:flex items-center space-x-5 lg:space-x-7"
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

            {/* Right Action + Social Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-coral transition-colors p-2 rounded-full hover:bg-white/40"
                aria-label={`Follow on ${BUSINESS_CONFIG.socials.instagram.label}`}
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-coral transition-colors p-2 rounded-full hover:bg-white/40"
                aria-label={`Follow on ${BUSINESS_CONFIG.socials.threads.label}`}
                title="Threads"
              >
                <ThreadsIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-coral transition-colors p-2 rounded-full hover:bg-white/40"
                aria-label={`Follow on ${BUSINESS_CONFIG.socials.facebook.label}`}
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <Button href="/contact" size="sm" variant="primary">
                Enquire Now
              </Button>
            </div>

            {/* Mobile View: Logo, Instagram/Threads/Facebook, Enquire button, 3 line (hamburger) button */}
            <div className="flex items-center md:hidden space-x-1.5">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-charcoal hover:text-coral rounded-full hover:bg-white/40 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-charcoal hover:text-coral rounded-full hover:bg-white/40 transition-colors"
                aria-label="Threads"
              >
                <ThreadsIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-charcoal hover:text-coral rounded-full hover:bg-white/40 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <Button href="/contact" size="sm" variant="primary" className="!px-2.5 !py-1 text-[11px]">
                Enquire
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-charcoal hover:text-coral rounded-full hover:bg-white/40 focus-visible:outline-coral transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-b border-[#F4ABA2]/50 bg-[#F9CFCA] px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-md"
          >
            <nav className="flex flex-col space-y-1">
              {BUSINESS_CONFIG.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-widest font-sans rounded-md transition-colors ${
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
            <div className="pt-3 border-t border-[#F4ABA2]/40 flex items-center justify-between">
              <span className="text-[11px] text-charcoal/70 font-sans uppercase tracking-wider font-semibold">
                Follow Us
              </span>
              <div className="flex items-center space-x-2.5">
                <a
                  href={BUSINESS_CONFIG.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-coral p-1.5 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={BUSINESS_CONFIG.socials.threads.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-coral p-1.5 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Threads"
                >
                  <ThreadsIcon className="w-4 h-4" />
                </a>
                <a
                  href={BUSINESS_CONFIG.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal hover:text-coral p-1.5 rounded-full hover:bg-white/40 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
