import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  categoryLabel?: string;
  features?: readonly string[];
  href?: string;
  isDraft?: boolean;
}

export function ServiceCard({
  title,
  description,
  imageUrl,
  imageAlt,
  categoryLabel,
  features,
  href,
  isDraft = true,
}: ServiceCardProps) {
  return (
    <article className="bg-white rounded-sm border border-ivory-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {imageUrl ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-ivory-100">
            <Image
              src={imageUrl}
              alt={imageAlt || `${title} illustrative concept`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            {categoryLabel && (
              <div className="absolute top-3 left-3">
                <Badge variant="gold" size="sm" className="backdrop-blur-sm shadow-xs">
                  {categoryLabel}
                </Badge>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-sans bg-charcoal/60 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                Illustrative Concept
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 pb-0 flex items-center justify-between">
            {categoryLabel && <Badge variant="gold">{categoryLabel}</Badge>}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-dark mb-3 group-hover:text-burgundy transition-colors">
            {title}
          </h3>

          <p className="font-sans text-sm text-charcoal-muted leading-relaxed mb-6">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="space-y-2 mb-6 pt-4 border-t border-ivory-100">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="font-sans text-xs text-charcoal-light flex items-center space-x-2"
                >
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between text-xs">
        {isDraft ? (
          <span className="text-[11px] text-charcoal-muted italic">
            * Scope subject to owner confirmation
          </span>
        ) : (
          <span className="text-gold-dark font-semibold uppercase tracking-wider">
            Available Service
          </span>
        )}

        {href && (
          <Link
            href={href}
            className="text-burgundy hover:text-burgundy-600 font-semibold inline-flex items-center space-x-1 focus-visible:outline-burgundy"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}
