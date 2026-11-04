"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { BUSINESS_CONFIG } from "@/config/business";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide the entire public footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#F9CFCA] text-charcoal border-t border-[#F4ABA2]/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12">
        
        {/* ========================================================
            MOBILE VIEW (Compact, Minimal, Single-Line Menu)
            ======================================================== */}
        <div className="block md:hidden space-y-4">
          {/* Brand Row with Social Icons */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F4ABA2]/40">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#F4ABA2]/80 shadow-xs flex-shrink-0 bg-white p-0.5">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-base tracking-wider text-charcoal font-bold block leading-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-charcoal/70 font-semibold block">
                  {BUSINESS_CONFIG.displayName}
                </span>
              </div>
            </div>

            {/* Social Icons in compact row */}
            <div className="flex items-center space-x-2">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] p-[1px] shadow-xs flex items-center justify-center"
                aria-label="Instagram"
              >
                <span className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#E1306C]">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow-xs"
                aria-label="Threads"
              >
                <ThreadsIcon className="w-3 h-3" />
              </a>

              <a
                href={BUSINESS_CONFIG.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Single-Line / Horizontal Wrap Menu Section */}
          <div className="py-1">
            <nav className="flex items-center justify-center flex-wrap gap-x-3.5 gap-y-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal/90">
              {BUSINESS_CONFIG.navigation.map((item, idx) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-coral transition-colors py-0.5"
                  >
                    {item.label}
                  </Link>
                  {idx < BUSINESS_CONFIG.navigation.length - 1 && (
                    <span className="text-charcoal/30 font-light select-none">•</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Minimal Specs & Specializations Badge */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 py-1 text-[10px] text-charcoal/80">
            {BUSINESS_CONFIG.specializations.map((spec, i) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded-full bg-white/70 border border-[#F4ABA2]/50 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Compact Contact (One-line address & email) */}
          <div className="pt-2 border-t border-[#F4ABA2]/40 text-center space-y-1 text-[10px] text-charcoal/80">
            <p className="flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-coral flex-shrink-0" />
              <span>Dhayari, Pune, Maharashtra 411041</span>
            </p>
            <p className="flex items-center justify-center gap-1">
              <Mail className="w-3 h-3 text-coral flex-shrink-0" />
              <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="hover:underline font-semibold">
                {BUSINESS_CONFIG.contact.email}
              </a>
            </p>
          </div>
        </div>

        {/* ========================================================
            DESKTOP / TABLET VIEW (Classic Full 4-Column Grid)
            ======================================================== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#F4ABA2]/80 shadow-sm flex-shrink-0 bg-white p-1">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings & Events Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-serif text-xl tracking-wider text-charcoal font-semibold block leading-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/70 font-semibold">
                  {BUSINESS_CONFIG.displayName}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-charcoal/80 leading-relaxed max-w-sm">
              Creating elevated, thoughtful wedding experiences and event
              productions with bespoke decor design and seamless execution.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              {/* Instagram */}
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] p-[1.5px] transition-transform duration-300 hover:scale-110 shadow-sm"
                aria-label="Follow Hindavi on Instagram"
              >
                <span className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#E1306C] hover:bg-transparent hover:text-white transition-colors duration-300">
                  <InstagramIcon className="w-4 h-4" />
                </span>
              </a>

              {/* Threads */}
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-black shadow-sm border border-neutral-700/30"
                aria-label="Follow Hindavi on Threads"
              >
                <ThreadsIcon className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href={BUSINESS_CONFIG.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-[#166fe5] shadow-sm"
                aria-label="Follow Hindavi on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal">
              Menu
            </h3>
            <ul className="space-y-2 font-sans text-xs">
              {BUSINESS_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-charcoal/80 hover:text-coral transition-colors font-medium uppercase tracking-wider text-[11px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal">
              Specializations
            </h3>
            <ul className="space-y-2 font-sans text-xs text-charcoal/80">
              {BUSINESS_CONFIG.specializations.map((spec) => (
                <li key={spec} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" aria-hidden="true" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-charcoal/60 italic pt-1">
              * Dedicated planning &amp; production for premier celebrations in Maharashtra.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal">
              Contact
            </h3>
            <div className="space-y-2.5 font-sans text-xs text-charcoal/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-coral flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-[11px]">
                  {BUSINESS_CONFIG.contact.address.line1},{" "}
                  {BUSINESS_CONFIG.contact.address.line2},{" "}
                  {BUSINESS_CONFIG.contact.address.city},{" "}
                  {BUSINESS_CONFIG.contact.address.state}{" "}
                  {BUSINESS_CONFIG.contact.address.postalCode}
                </address>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-coral flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:text-coral transition-colors break-all font-medium text-[11px]"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#F4ABA2]/50 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-charcoal/70 font-sans gap-2">
          <p className="text-center sm:text-left">
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-left">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.jisnudigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-charcoal hover:text-coral transition-colors underline decoration-charcoal/30 hover:decoration-coral underline-offset-2"
            >
              Jisnu Digital Solutions
            </a>
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-coral transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-coral transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
