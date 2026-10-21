"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { BUSINESS_CONFIG } from "@/config/business";

interface GalleryItem {
  id: string;
  title: string;
  category: "Decor Design" | "Traditional Rituals" | "Event Production" | "Styling & Ambiance" | "Wedding Planning";
  imageUrl: string;
  altText: string;
  aspect: "wide" | "tall" | "square";
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "1",
    title: "Sacred Mandap Architecture",
    category: "Decor Design",
    imageUrl: "/images/service_decor.jpg",
    altText: "Illustrative royal wedding mandap with cascading florals and brass lamps",
    aspect: "tall",
  },
  {
    id: "2",
    title: "Haldi Courtyard Atmosphere",
    category: "Traditional Rituals",
    imageUrl: "/images/gallery_haldi.jpg",
    altText: "Illustrative vibrant traditional Haldi marigold courtyard decor",
    aspect: "wide",
  },
  {
    id: "3",
    title: "Evening Reception Stage",
    category: "Event Production",
    imageUrl: "/images/service_production.jpg",
    altText: "Illustrative illuminated open-air structural staging",
    aspect: "square",
  },
  {
    id: "4",
    title: "Reception Dinner Banquet",
    category: "Styling & Ambiance",
    imageUrl: "/images/gallery_reception.jpg",
    altText: "Illustrative luxury dinner banquet with chandeliers and candlelight",
    aspect: "tall",
  },
  {
    id: "5",
    title: "Stationery & Planning Flatlay",
    category: "Wedding Planning",
    imageUrl: "/images/service_planning.jpg",
    altText: "Illustrative wedding consultation invitations and moodboards",
    aspect: "square",
  },
  {
    id: "6",
    title: "Ceremonial Canopy Illumination",
    category: "Event Production",
    imageUrl: "/images/hero_wedding.jpg",
    altText: "Illustrative warm fairy light canopy over mandap setup",
    aspect: "wide",
  },
  {
    id: "7",
    title: "Sangeet Festive Evening Stage",
    category: "Traditional Rituals",
    imageUrl: "/images/gallery_sangeet.jpg",
    altText: "Illustrative lavish Sangeet stage with fairy lights and regal seating",
    aspect: "wide",
  },
  {
    id: "8",
    title: "Heritage Palace Celebration Courtyard",
    category: "Decor Design",
    imageUrl: "/images/hero_about.jpg",
    altText: "Illustrative heritage palace arches adorned with red roses and warm lanterns",
    aspect: "square",
  },
];

const CATEGORIES = [
  "All",
  "Decor Design",
  "Traditional Rituals",
  "Event Production",
  "Styling & Ambiance",
  "Wedding Planning",
] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* ========================================================
          1. EDITORIAL GALLERY HERO
          ======================================================== */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_about.jpg"
            alt="Illustrative palace wedding decor aesthetic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.25em] font-sans font-bold">
            <span>Visual Portfolio</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]">
            Celebrations &amp; Decor Concepts
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            A curated showcase of sacred mandaps, ambient evening lighting,
            and grand celebrations orchestrated across Maharashtra.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY FILTERS & EDITORIAL ASYMMETRIC MASONRY
          ======================================================== */}
      <Section background="white">
        {/* Transparency banner */}
        <div className="mb-12 p-6 rounded-2xl bg-blush-50/70 border border-blush/60 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
            * <strong>Client Privacy &amp; Authenticity Policy:</strong> In alignment
            with our transparency principles, the photography below displays
            illustrative aesthetic design concepts. Real client wedding albums
            will be published only following client consent and guest privacy
            approvals. You can also view recent work updates on our official{" "}
            <a
              href={BUSINESS_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral font-bold hover:underline"
            >
              Instagram profile
            </a>
            .
          </p>
        </div>

        {/* Category Filter Tabs (Shaadi Squad style pill filters) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-coral ${
                  isActive
                    ? "bg-coral text-white shadow-sm font-bold"
                    : "bg-blush-50/80 text-charcoal border border-blush/60 hover:border-coral hover:text-coral font-semibold"
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-ivory-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-ivory-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <Badge variant="gold" size="sm" className="backdrop-blur-sm shadow-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="absolute bottom-2 right-2">
                  <span className="text-[10px] text-white/90 uppercase tracking-widest font-sans bg-charcoal/60 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                    Illustrative Concept
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white border-t border-ivory-200 flex items-center justify-between">
                <h3 className="font-serif text-lg text-charcoal-dark font-medium group-hover:text-burgundy transition-colors">
                  {item.title}
                </h3>
                <span className="font-sans text-xs text-charcoal-muted">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <EnquiryCTASection
        title="Envisioning a Unique Aesthetic Theme?"
        subtitle="Let's bring your personalized floral, lighting, and stage concepts to life."
      />
    </>
  );
}
