import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { BUSINESS_CONFIG } from "@/config/business";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F9CFCA] text-charcoal border-t border-[#F4ABA2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
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
              {/* Instagram (Official Gradient) */}
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

              {/* Threads (Classic Sleek Brand Black/White) */}
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-black shadow-sm border border-neutral-700/30"
                aria-label="Follow Hindavi on Threads"
              >
                <ThreadsIcon className="w-4 h-4" />
              </a>

              {/* Facebook (Official Brand Blue) */}
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
        <div className="mt-8 pt-5 border-t border-[#F4ABA2]/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-charcoal/70 font-sans gap-2">
          <p>
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
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
