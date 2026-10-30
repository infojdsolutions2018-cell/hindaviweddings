"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/Button";

const ROTATING_SLIDES = [
  {
    image: "/hello-images/hero_wedding.jpg",
    alt: "Luxury Indian wedding floral mandap setup with warm golden illumination",
    eyebrow: "Pune & Across Maharashtra",
    titlePrimary: "Crafting Unforgettable",
    titleHighlight: "Celebrations of Love",
  },
  {
    image: "/hello-images/hero_about.jpg",
    alt: "Heritage palace celebration courtyard with royal floral arches",
    eyebrow: "Heritage & Destination Weddings",
    titlePrimary: "Timeless Moments &",
    titleHighlight: "Architectural Grandeur",
  },
  {
    image: "/hello-images/gallery_reception.jpg",
    alt: "Grand evening reception dinner banquet with crystal chandeliers",
    eyebrow: "Bespoke Event Production",
    titlePrimary: "Atmospheric Evenings &",
    titleHighlight: "Luminous Banquets",
  },
  {
    image: "/hello-images/gallery_sangeet.jpg",
    alt: "Lavish Sangeet stage with fairy lights and concert production",
    eyebrow: "High-Energy Celebrations",
    titlePrimary: "Vibrant Ceremonies &",
    titleHighlight: "Unmatched Joy",
  },
  {
    image: "/hello-images/gallery_haldi.jpg",
    alt: "Vibrant marigold yellow Haldi courtyard ceremony setup",
    eyebrow: "Sacred Ceremonial Customs",
    titlePrimary: "Joyous Rituals &",
    titleHighlight: "Golden Traditions",
  },
];

export function HeroRotation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
      {/* Background Rotating Images with crossfade transition */}
      {ROTATING_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.image}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Subtle warm luxury tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-black/30" />
          </div>
        );
      })}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div key={currentIndex} className="animate-fade-slide-up">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-semibold mb-4 shadow-sm">
            <span>{ROTATING_SLIDES[currentIndex].eyebrow}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.1] mb-4 drop-shadow-md min-h-[1.2em]">
            {ROTATING_SLIDES[currentIndex].titlePrimary} <br className="hidden sm:inline" />
            <span className="italic font-light text-blush-200">
              {ROTATING_SLIDES[currentIndex].titleHighlight}
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-light">
            Welcome to {BUSINESS_CONFIG.displayName}. We curate bespoke wedding
            planning, full-scale event production, and breathtaking decor design
            tailored for modern love stories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/contact" size="md" variant="primary" className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-102 transition-transform duration-300">
            Plan Your Wedding
          </Button>
          <Button
            href="/gallery"
            size="md"
            variant="outline"
            className="w-full sm:w-auto !border-white/70 !text-white hover:!bg-white hover:!text-charcoal backdrop-blur-xs hover:scale-102 transition-transform duration-300"
          >
            Explore Our Work
          </Button>
        </div>

        {/* Rotation Dots & Animated Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 pt-6 sm:pt-8" aria-label="Slide indicators">
          {ROTATING_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                i === currentIndex
                  ? "w-10 bg-white/30"
                  : "w-2.5 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentIndex && (
                <span
                  key={`progress-${currentIndex}`}
                  className="absolute inset-0 bg-coral rounded-full animate-slide-progress origin-left"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
