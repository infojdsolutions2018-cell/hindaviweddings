import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BUSINESS_CONFIG } from "@/config/business";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F9CFCA] text-charcoal border-t border-[#F4ABA2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 shadow-sm flex-shrink-0 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings & Events Logo"
                  fill
                  sizes="56px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-wider text-charcoal font-semibold block leading-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/70 font-semibold">
                  {BUSINESS_CONFIG.displayName}
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed max-w-sm">
              Creating elevated, thoughtful wedding experiences and event
              productions with bespoke decor design and seamless execution.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/70 border border-coral/30 flex items-center justify-center text-charcoal hover:bg-coral hover:text-white transition-all shadow-xs"
                aria-label="Follow Hindavi on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.socials.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/70 border border-coral/30 text-[11px] font-sans uppercase tracking-wider text-charcoal hover:bg-coral hover:text-white transition-all shadow-xs font-semibold"
                aria-label="Follow Hindavi on Threads"
              >
                Threads
              </a>
            </div>
          </div>

          {/* Quick Links (Shaadi Squad style uppercase menu) */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-charcoal">
              Menu
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm">
              {BUSINESS_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-charcoal/80 hover:text-coral transition-colors font-medium uppercase tracking-wider text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-charcoal">
              Specializations
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-charcoal/80">
              {BUSINESS_CONFIG.specializations.map((spec) => (
                <li key={spec} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" aria-hidden="true" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-charcoal/60 italic pt-2">
              * Dedicated planning &amp; production for premier celebrations in Maharashtra.
            </p>
          </div>

          {/* Contact Details (Office / Physical Address) */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-charcoal">
              Contact
            </h3>
            <div className="space-y-3 font-sans text-xs sm:text-sm text-charcoal/80">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
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
                <Mail className="w-4 h-4 text-coral flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:text-coral transition-colors break-all font-medium"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#F4ABA2]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/70 font-sans gap-4">
          <p>
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
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
