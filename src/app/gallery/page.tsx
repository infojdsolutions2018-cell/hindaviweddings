"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { BUSINESS_CONFIG } from "@/config/business";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Play, Film, Grid, X, Heart, Sparkles, Music, Sun, Flame } from "lucide-react";

export type CeremonyCategory = "All" | "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";

interface MediaItem {
  id: string;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";
}

const CEREMONY_TABS: { label: CeremonyCategory; sub: string }[] = [
  { label: "All", sub: "Complete Gallery" },
  { label: "Engagement", sub: "Ring Ceremony" },
  { label: "Halad", sub: "Haldi Courtyard" },
  { label: "Sangit", sub: "Sangeet & Dance" },
  { label: "Vidhi", sub: "Vedic Rituals" },
  { label: "Marriage", sub: "Mandap & Reception" },
  { label: "Other", sub: "Special Highlights" },
];

export default function GalleryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CeremonyCategory>("All");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<"all" | "images" | "reels">("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch(`/api/gallery?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMediaList(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load ImageKit media", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter by both ceremony category and media type
  const filteredItems = mediaList.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ? true : item.category === selectedCategory;
    const matchesType =
      mediaTypeFilter === "all"
        ? true
        : mediaTypeFilter === "images"
        ? item.type === "image"
        : item.type === "reel";
    return matchesCategory && matchesType;
  });

  return (
    <>
      {/* ========================================================
          1. EDITORIAL GALLERY HERO
          ======================================================== */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center justify-center overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hello-images/gallery_sangeet.jpg"
            alt="Palace wedding celebration and stage aesthetic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold">
            <span>Ritual &amp; Celebration Showcase</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
            Wedding Gallery
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light">
            Explore curated photographs and cinematic reels categorized across sacred wedding milestones.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href={BUSINESS_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-sans uppercase tracking-wider font-semibold transition-all backdrop-blur-xs"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={BUSINESS_CONFIG.socials.threads.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-sans uppercase tracking-wider font-semibold transition-all backdrop-blur-xs"
            >
              <ThreadsIcon className="w-3.5 h-3.5" />
              <span>Threads</span>
            </a>
            <a
              href={BUSINESS_CONFIG.socials.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-sans uppercase tracking-wider font-semibold transition-all backdrop-blur-xs"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. WEDDING CEREMONY TABS (1. Engagement, 2. Halad, etc.)
          ======================================================== */}
      <Section background="white" className="!py-6 sm:!py-10">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Main 5 Ceremonial Navigation Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 pb-2 pt-1 border-b border-blush/60">
            {CEREMONY_TABS.map((tab, idx) => {
              const isActive = selectedCategory === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setSelectedCategory(tab.label)}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-2xl font-sans transition-all duration-300 text-left sm:text-center ${
                    isActive
                      ? "bg-gradient-to-r from-[#801C30] to-[#A82835] text-white shadow-md scale-102"
                      : "bg-[#F8FAFC] text-charcoal/80 hover:bg-blush/20 hover:text-coral border border-[#E2E8F0]"
                  }`}
                >
                  <span className="block text-xs sm:text-sm font-bold tracking-wide">
                    {tab.label !== "All" && <span className="opacity-75 mr-1">{idx}.</span>}
                    {tab.label}
                  </span>
                  <span className={`block text-[10px] tracking-wider uppercase ${isActive ? "text-white/80" : "text-charcoal/50"}`}>
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subfilter: Type toggle (All / Photos / Reels) */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <span className="font-sans text-xs sm:text-sm text-charcoal/70 font-medium">
              Showing <strong className="text-charcoal font-bold">{filteredItems.length}</strong> items in{" "}
              <span className="text-coral font-bold">{selectedCategory}</span>
            </span>

            <div className="inline-flex p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-sans font-semibold">
              <button
                type="button"
                onClick={() => setMediaTypeFilter("all")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mediaTypeFilter === "all" ? "bg-white text-charcoal shadow-xs" : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setMediaTypeFilter("images")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mediaTypeFilter === "images" ? "bg-white text-charcoal shadow-xs" : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                Photos
              </button>
              <button
                type="button"
                onClick={() => setMediaTypeFilter("reels")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mediaTypeFilter === "reels" ? "bg-white text-charcoal shadow-xs" : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                Reels
              </button>
            </div>
          </div>

          {/* Media Grid */}
          {loading ? (
            <div className="py-20 text-center space-y-3 bg-[#FDF9F8] rounded-2xl border border-dashed border-[#F4ABA2]/60">
              <div className="w-8 h-8 border-2 border-[#801C30] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-serif text-lg text-charcoal">Loading wedding moments from ImageKit CDN...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#FDF9F8] rounded-2xl border border-dashed border-[#F4ABA2]/60">
              <p className="font-serif text-lg text-charcoal">No media found in this category yet.</p>
              <p className="font-sans text-xs text-charcoal/60">
                New photos and reels uploaded via the Admin Console will appear here live.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setMediaTypeFilter("all");
                }}
                className="text-xs uppercase font-sans font-bold text-[#801C30] underline underline-offset-4"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              key={`${selectedCategory}-${mediaTypeFilter}`}
              className="columns-2 sm:columns-3 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4 animate-in fade-in duration-300"
            >
              {filteredItems.map((item) => {
                const isReel = item.type === "reel";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className="break-inside-avoid relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group bg-charcoal/5 border border-blush/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {isReel ? (
                      <div className="relative w-full aspect-[9/16] overflow-hidden">
                        <video
                          src={item.src}
                          playsInline
                          muted
                          loop
                          autoPlay
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white rounded-lg p-1.5 shadow-sm">
                          <Film className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Category pill on media item */}
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                      {item.category}
                    </div>

                    {/* Gradient overlay and title on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                      <p className="font-serif text-sm sm:text-base leading-tight drop-shadow-md">
                        {item.title}
                      </p>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-coral font-bold mt-1">
                        Click to view
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {/* ========================================================
          3. LIGHTBOX MODAL FOR IMAGES & REELS
          ======================================================== */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-charcoal rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMedia(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Presentation */}
            <div className="w-full flex items-center justify-center bg-black/40 overflow-hidden">
              {selectedMedia.type === "reel" ? (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto object-contain"
                />
              ) : (
                <div className="relative w-full h-[65vh] sm:h-[75vh]">
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Caption Footer */}
            <div className="w-full p-4 bg-charcoal/95 border-t border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-coral block">
                  {selectedMedia.category} • {selectedMedia.type === "reel" ? "Reel Video" : "Photograph"}
                </span>
                <h3 className="font-serif text-base sm:text-lg">{selectedMedia.title}</h3>
              </div>
              <a
                href={BUSINESS_CONFIG.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-coral hover:text-white transition-colors uppercase font-sans font-bold tracking-wider"
              >
                <span>View on IG</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. CLOSING CTA BANNER
          ======================================================== */}
      <EnquiryCTASection
        eyebrow="Preserve Your Story"
        title="Envision Your Celebration With Us"
        subtitle="Every ritual is curated with bespoke decor, atmospheric production, and flawless execution."
      />
    </>
  );
}
