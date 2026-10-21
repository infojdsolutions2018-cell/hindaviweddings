import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface MediaItem {
  id: string;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category?: string;
}

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "images");
    const reelsDir = path.join(publicDir, "reels");

    const mediaList: MediaItem[] = [];

    // Read reels folder if exists
    if (fs.existsSync(reelsDir)) {
      const reelFiles = fs.readdirSync(reelsDir).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".mp4", ".webm", ".mov"].includes(ext);
      });

      reelFiles.forEach((file, index) => {
        const baseName = path.parse(file).name;
        mediaList.push({
          id: `reel-${baseName}-${index}`,
          type: "reel",
          src: `/reels/${file}`,
          title: `Wedding Moments • Ceremony Highlights`,
          aspect: "tall",
          category: "Reels",
        });
      });
    }

    // Read images folder if exists
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      });

      // Natural numerical sort: i1, i2, ... i9, i10
      imageFiles.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""), 10);
        const numB = parseInt(b.replace(/\D/g, ""), 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });

      const niceNames: Record<string, string> = {
        i1: "Sacred Royal Mandap Architecture",
        i2: "Vibrant Haldi Courtyard Ceremony",
        i3: "High-Energy Sangeet Concert Stage",
        i4: "Crystal Chandelier Reception Banquet",
        i5: "Grand Royal Floral Entrance Avenue",
        i6: "Romantic Ring Ceremony Styling",
        i7: "Ornate Vedic Mandap Canopy",
        i8: "Intelligent Sangeet Concert Production",
        i9: "Majestic Floral Entrance Pathway",
        i10: "Festive Yellow Haldi Courtyard Styling",
        gallery_haldi: "Haldi Celebration Courtyard",
        gallery_reception: "Reception Dinner Banquet",
        gallery_sangeet: "Festive Sangeet Stage",
        hero_about: "Heritage Palace Architecture",
        hero_wedding: "Sacred Mandap Canopy",
        service_decor: "Royal Floral Decor",
        service_planning: "Curated Consultation Flatlay",
        service_production: "Ambient Stage & Trussing",
      };

      imageFiles.forEach((file, index) => {
        const baseName = path.parse(file).name;
        const displayName =
          niceNames[baseName] ||
          baseName
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

        mediaList.push({
          id: `img-${baseName}-${index}`,
          type: "image",
          src: `/images/${file}`,
          title: displayName,
          aspect: "square",
          category: "Images",
        });
      });
    }

    // Read other-images folder if exists (Our Work & Service Specializations)
    const otherImagesDir = path.join(publicDir, "other-images");
    if (fs.existsSync(otherImagesDir)) {
      const otherFiles = fs.readdirSync(otherImagesDir).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      });

      const otherNames: Record<string, string> = {
        our_work_mandap: "Sacred Mandap Architecture",
        our_work_haldi: "Haldi Courtyard Atmosphere",
        our_work_reception: "Reception Dinner Banquet",
        our_work_sangeet: "Festive Sangeet Celebration Stage",
        our_work_entrance: "Grand Floral Entrance Gateway",
        our_work_ring_ceremony: "Bespoke Ring Ceremony Setup",
        wedding_planning: "Curated Wedding Planning & Stationery",
        event_production: "Concert Trussing & Intelligent Lighting",
        event_decor_design: "Royal Floral Mandap & Diya Ambiance",
      };

      // Put the 3 homepage "Our Work" images first
      const priorityOrder = ["our_work_mandap", "our_work_haldi", "our_work_reception"];
      otherFiles.sort((a, b) => {
        const nameA = path.parse(a).name;
        const nameB = path.parse(b).name;
        const idxA = priorityOrder.indexOf(nameA);
        const idxB = priorityOrder.indexOf(nameB);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
      });

      otherFiles.forEach((file, index) => {
        const baseName = path.parse(file).name;
        const displayName =
          otherNames[baseName] ||
          baseName
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

        mediaList.push({
          id: `other-${baseName}-${index}`,
          type: "image",
          src: `/other-images/${file}`,
          title: displayName,
          aspect: "square",
          category: baseName.startsWith("our_work") ? "Our Work" : "Services",
        });
      });
    }

    // Interleave / mix reels and images like Instagram feed
    // e.g. Image, Reel, Image, Image, Reel, Image...
    const reels = mediaList.filter((m) => m.type === "reel");
    const images = mediaList.filter((m) => m.type === "image");

    const mixedFeed: MediaItem[] = [];
    let rIdx = 0;
    let iIdx = 0;

    // Pattern: 2 images, 1 reel, 2 images, 1 reel...
    while (iIdx < images.length || rIdx < reels.length) {
      if (iIdx < images.length) mixedFeed.push(images[iIdx++]);
      if (iIdx < images.length) mixedFeed.push(images[iIdx++]);
      if (rIdx < reels.length) mixedFeed.push(reels[rIdx++]);
      if (iIdx >= images.length && rIdx < reels.length) {
        mixedFeed.push(reels[rIdx++]);
      }
    }

    return NextResponse.json({
      success: true,
      data: mixedFeed,
      totalCount: mixedFeed.length,
      reelsCount: reels.length,
      imagesCount: images.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to read media library" },
      { status: 500 }
    );
  }
}
