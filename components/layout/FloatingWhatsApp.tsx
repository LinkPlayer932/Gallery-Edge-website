"use client";

import { FaWhatsapp } from "react-icons/fa6";

export default function FloatingWhatsApp() {
  const whatsappNumber = "923301711146";
  const defaultMessage = encodeURIComponent(
    "Hi Gallery Edge, I have an inquiry about your frames and custom framing services."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip Label on Hover */}
      <span className="pointer-events-none mr-3 hidden rounded-xl bg-neutral-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 sm:inline-block">
        Chat with Us on WhatsApp
      </span>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Gallery Edge on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-green-500/30 active:scale-95"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[#25D366]/40 opacity-75 duration-1000" />
        
        <FaWhatsapp size={30} className="drop-shadow-sm" />
      </a>
    </div>
  );
}
