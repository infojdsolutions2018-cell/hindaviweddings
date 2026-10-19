import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ImageIcon } from "lucide-react";

interface GalleryCardProps {
  title: string;
  category: string;
  imageUrl?: string;
  altText?: string;
  isPlaceholder?: boolean;
}

export function GalleryCard({
  title,
  category,
  imageUrl,
  altText,
  isPlaceholder = true,
}: GalleryCardProps) {
  return (
    <div className="group relative bg-white border border-ivory-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-ivory-100 via-ivory to-ivory-200 overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={altText || `${title} visual concept`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-2 right-2">
              <span className="text-[10px] text-white/90 uppercase tracking-widest font-sans bg-charcoal/60 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                Illustrative
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-serif text-lg text-charcoal-dark block">
                {title}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-muted block">
                Approved Photography Pending
              </span>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <Badge variant="gold" size="sm" className="backdrop-blur-sm shadow-xs">
            {category}
          </Badge>
        </div>

        {isPlaceholder && !imageUrl && (
          <div className="absolute top-3 right-3">
            <Badge variant="neutral" size="sm">
              Placeholder
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-ivory-200 flex items-center justify-between">
        <h4 className="font-serif text-base text-charcoal-dark font-medium group-hover:text-burgundy transition-colors">
          {title}
        </h4>
        <span className="font-sans text-xs text-charcoal-muted">{category}</span>
      </div>
    </div>
  );
}
