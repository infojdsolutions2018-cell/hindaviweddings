"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EnquiryCTASection } from "@/components/ui/EnquiryCTASection";
import { BUSINESS_CONFIG } from "@/config/business";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ThreadsIcon } from "@/components/ui/ThreadsIcon";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { Play, Eye, Film, Grid, X } from "lucide-react";

interface MediaItem {
  id: string;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category?: string;
}

const FALLBACK_MEDIA: MediaItem[] = [
  { id: "work-1", type: "image", src: "/other-images/our_work_mandap.jpg", title: "Sacred Mandap Architecture", aspect: "square", category: "Our Work" },
  { id: "work-2", type: "image", src: "/other-images/our_work_haldi.jpg", title: "Haldi Courtyard Atmosphere", aspect: "square", category: "Our Work" },
  { id: "reel-1", type: "reel", src: "/reels/r1.mp4", title: "Wedding Moments • Ceremony Highlights", aspect: "tall", category: "Reels" },
  { id: "work-3", type: "image", src: "/other-images/our_work_reception.jpg", title: "Reception Dinner Banquet", aspect: "square", category: "Our Work" },
  { id: "work-4", type: "image", src: "/other-images/event_decor_design.jpg", title: "Royal Floral Mandap Design", aspect: "square", category: "Services" },
  { id: "reel-2", type: "reel", src: "/reels/r2.mp4", title: "Atmospheric Celebrations & Staging", aspect: "tall", category: "Reels" },
  { id: "work-5", type: "image", src: "/other-images/event_production.jpg", title: "Concert Trussing & Intelligent Lighting", aspect: "square", category: "Services" },
  { id: "work-6", type: "image", src: "/other-images/wedding_planning.jpg", title: "Curated Wedding Planning & Stationery", aspect: "square", category: "Services" },
  { id: "img-1", type: "image", src: "/images/i1.jpg", title: "Royal Mandap Heritage Architecture", aspect: "square" },
  { id: "img-2", type: "image", src: "/images/i2.jpg", title: "Vibrant Haldi Courtyard Ceremony", aspect: "square" },
  { id: "img-3", type: "image", src: "/images/i3.jpg", title: "High-Energy Sangeet Concert Stage", aspect: "square" },
  { id: "img-4", type: "image", src: "/images/i4.jpg", title: "Crystal Chandelier Reception Banquet", aspect: "square" },
  { id: "img-5", type: "image", src: "/images/i5.jpg", title: "Grand Royal Floral Entrance Avenue", aspect: "square" },
  { id: "img-6", type: "image", src: "/images/i6.jpg", title: "Romantic Ring Ceremony Styling", aspect: "square" },
];

export default function GalleryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(FALLBACK_MEDIA);
  const [activeFilter, setActiveFilter] = useState<"all" | "images" | "reels">("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch(`/api/gallery?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setMediaList(data.data);
        }
      })
      .catch(() => {
        // Fallback already preloaded
      });
  }, []);

  const filteredItems = mediaList.filter((item) => {
    if (activeFilter === "images") return item.type === "image";
    if (activeFilter === "reels") return item.type === "reel";
    return true;
  });

  return (
    <>
      {/* ========================================================
          1. EDITORIAL GALLERY HERO (Compact & Elegant)
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
            <span>Visual Portfolio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
            Gallery &amp; Reels Feed
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light">
            An Instagram-inspired showcase mixing cinematic reels and captured decor moments curated across Maharashtra.
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
          2. INSTAGRAM-STYLE FEED: MIXED IMAGES & REELS
          ======================================================== */}
      <Section background="white" className="!py-6 sm:!py-10">
        {/* Instagram Profile-Style Filter Tabs */}
        <div className="flex items-center justify-center border-b border-blush/60 mb-6 sm:mb-8 pb-3 max-w-md mx-auto space-x-8">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-sans font-bold pb-2 transition-all relative ${
              activeFilter === "all"
                ? "text-coral border-b-2 border-coral"
                : "text-charcoal/60 hover:text-coral"
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>All Posts ({mediaList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("reels")}
            className={`inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-sans font-bold pb-2 transition-all relative ${
              activeFilter === "reels"
                ? "text-coral border-b-2 border-coral"
                : "text-charcoal/60 hover:text-coral"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Reels ({mediaList.filter((m) => m.type === "reel").length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("images")}
            className={`inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-sans font-bold pb-2 transition-all relative ${
              activeFilter === "images"
                ? "text-coral border-b-2 border-coral"
                : "text-charcoal/60 hover:text-coral"
            }`}
          >
            <span>Photos ({mediaList.filter((m) => m.type === "image").length})</span>
          </button>
        </div>

        {/* Instagram Pure Media Grid (No card borders/shadows, tight seamless fit like reference) */}
        <div key={activeFilter} className="columns-2 sm:columns-3 gap-1.5 sm:gap-2 md:gap-2.5 max-w-5xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-2.5 animate-in fade-in duration-300">
          {filteredItems.map((item) => {
            const isReel = item.type === "reel";

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="break-inside-avoid relative overflow-hidden cursor-pointer group bg-charcoal/5"
              >
                {/* Pure media display - natural aspect ratio, no card borders or white frames */}
                {isReel ? (
                  <div className="relative w-full aspect-[9/16] overflow-hidden">
                    <video
                      src={item.src}
                      playsInline
                      muted
                      loop
                      autoPlay
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                    {/* Reel badge in top right */}
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-xs text-white rounded p-1">
                      <Film className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                      className="object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                  </div>
                )}

                {/* Minimal Instagram hover play/view icon without text title */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                  {isReel ? (
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center">
                      <Eye className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Instagram footer link note */}
        <div className="mt-8 pt-4 text-center">
          <p className="text-xs text-charcoal/70 font-sans">
            Follow{" "}
            <a
              href={BUSINESS_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-coral font-bold hover:underline"
            >
              {BUSINESS_CONFIG.socials.instagram.handle}
            </a>{" "}
            on Instagram &amp; Threads for fresh weekly reels and decor updates.
          </p>
        </div>
      </Section>

      {/* Pure Zoom Overlay for Image or Reel (No borders, headers, or text design) */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedMedia(null)}
        >
          {/* Close button in top-right */}
          <button
            type="button"
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all shadow-lg"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Zoomed Media Container without borders, frames, or text */}
          <div
            className="relative max-w-full max-h-[95vh] flex items-center justify-center cursor-default animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "reel" ? (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                playsInline
                className="max-h-[90vh] sm:max-h-[92vh] w-auto max-w-full object-contain rounded-none shadow-2xl"
              />
            ) : (
              <div className="relative max-h-[90vh] sm:max-h-[92vh] max-w-[94vw] w-auto h-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="max-h-[90vh] sm:max-h-[92vh] max-w-[94vw] w-auto h-auto object-contain select-none shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <EnquiryCTASection
        title="Love What You See?"
        subtitle="Connect with our design team to plan your wedding aesthetics and production."
      />
    </>
  );
}
