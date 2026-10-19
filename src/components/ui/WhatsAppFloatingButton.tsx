"use client";

import React from "react";
import { BUSINESS_CONFIG } from "@/config/business";

export function WhatsAppFloatingButton() {
  const whatsappUrl =
    BUSINESS_CONFIG.contact.whatsappUrl ||
    `https://wa.me/91${BUSINESS_CONFIG.contact.phone}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:shadow-green-900/40 transition-all duration-300 hover:scale-110 group border-2 border-white/90"
      aria-label="Chat with Hindavi Weddings on WhatsApp"
    >
      {/* Official WhatsApp SVG Logo */}
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.905.534 3.684 1.458 5.202L2.054 22l4.908-1.378a10.02 10.02 0 0 0 5.069 1.409h.004c5.536 0 10.031-4.495 10.031-10.031A10.033 10.033 0 0 0 12.031 2Zm-.004 18.362h-.003a8.318 8.318 0 0 1-4.238-1.163l-.304-.18-2.912.818.825-2.838-.198-.314a8.324 8.324 0 0 1-1.277-4.654c0-4.6 3.742-8.342 8.344-8.342a8.3 8.3 0 0 1 5.9 2.443 8.3 8.3 0 0 1 2.441 5.9c0 4.601-3.742 8.344-8.342 8.344Zm4.57-6.242c-.25-.125-1.479-.73-1.708-.813-.23-.083-.396-.125-.563.125-.167.25-.646.813-.792.98-.146.167-.292.188-.542.063a6.877 6.877 0 0 1-2.015-1.242 7.57 7.57 0 0 1-1.393-1.735c-.146-.25-.016-.385.109-.51.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.563-1.354-.771-1.854-.203-.487-.409-.421-.563-.429l-.479-.008c-.167 0-.438.063-.667.313s-.875.854-.875 2.083c0 1.229.896 2.417 1.021 2.583.125.167 1.764 2.694 4.274 3.778.597.258 1.064.412 1.428.528.6.191 1.146.164 1.577.1.48-.072 1.479-.604 1.688-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.167-.479-.292Z" />
      </svg>
    </a>
  );
}
