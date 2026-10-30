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
    <article className="bg-white rounded-2xl border border-blush/60 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between group hover:border-coral/50">
      <div>
        {imageUrl ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-ivory-100">
            <Image
              src={imageUrl}
              alt={imageAlt || `${title} visual presentation`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            {categoryLabel && (
              <div className="absolute top-3 left-3 transform transition-transform duration-300 group-hover:translate-x-1">
                <Badge variant="gold" size="sm" className="backdrop-blur-md shadow-sm border border-white/30">
                  {categoryLabel}
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 pb-0 flex items-center justify-between">
            {categoryLabel && <Badge variant="gold">{categoryLabel}</Badge>}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3 group-hover:text-coral transition-colors">
            {title}
          </h3>

          <p className="font-sans text-sm text-charcoal/80 leading-relaxed mb-6">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="space-y-2.5 mb-6 pt-4 border-t border-blush/40">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="font-sans text-xs text-charcoal/85 flex items-center space-x-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <span className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral group-hover:text-white transition-colors duration-300">
                    <Check className="w-3 h-3 text-coral group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between text-xs">
        {isDraft ? (
          <span className="text-[11px] text-charcoal/60 italic">
            * Dedicated Pune &amp; Maharashtra orchestration
          </span>
        ) : (
          <span className="text-coral font-bold uppercase tracking-wider">
            Available Service
          </span>
        )}

        {href && (
          <Link
            href={href}
            className="text-coral hover:text-coral-dark font-bold inline-flex items-center space-x-1.5 focus-visible:outline-coral group/link"
          >
            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-coral-dark hover:after:w-full after:transition-all after:duration-300">
              Learn more
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
