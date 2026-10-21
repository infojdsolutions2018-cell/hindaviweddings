import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BUSINESS_CONFIG } from "@/config/business";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/50 shadow-sm flex-shrink-0 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings & Events Logo"
                  fill
                  sizes="48px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-wider text-gold-light font-semibold block leading-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-ivory-200">
                  {BUSINESS_CONFIG.displayName}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-ivory-300 leading-relaxed max-w-sm">
              Creating elevated, thoughtful wedding experiences and event
              productions with bespoke decor design and seamless execution.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold-light hover:bg-gold hover:text-charcoal-dark transition-all"
                aria-label="Follow Hindavi on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-gold/40 text-[11px] font-sans uppercase tracking-wider text-gold-light hover:bg-gold hover:text-charcoal-dark transition-all"
                aria-label="Follow Hindavi on Threads"
              >
                Threads
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide text-white">
              Explore
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm">
              {BUSINESS_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory-200 hover:text-gold-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide text-white">
              Specializations
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ivory-300">
              {BUSINESS_CONFIG.specializations.map((spec) => (
                <li key={spec} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-ivory-300 italic pt-2">
              * Services listed are draft owner categories pending final service catalogue sign-off.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide text-white">
              Connect
            </h3>
            <div className="space-y-3 font-sans text-xs sm:text-sm text-ivory-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-xs">
                  {BUSINESS_CONFIG.contact.address.line1},{" "}
                  {BUSINESS_CONFIG.contact.address.line2},{" "}
                  {BUSINESS_CONFIG.contact.address.city},{" "}
                  {BUSINESS_CONFIG.contact.address.state}{" "}
                  {BUSINESS_CONFIG.contact.address.postalCode},{" "}
                  {BUSINESS_CONFIG.contact.address.country}
                </address>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:text-gold-light transition-colors break-all"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-charcoal-light/60 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-300 font-sans gap-4">
          <p>
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gold-light transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gold-light transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
