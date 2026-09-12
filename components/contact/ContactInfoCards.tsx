import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="flex flex-col gap-5">
      {/* WhatsApp Priority Card */}
      <div className="rounded-2xl border border-green-600/30 bg-green-50/50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="font-serif text-base font-semibold text-neutral-900">Instant WhatsApp Support</p>
            <p className="text-xs text-green-700 font-medium">Quickest response time</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
          Share photo references, request custom quotes, or ask about ongoing orders directly with our framemakers.
        </p>
        <a
          href="https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20have%20a%20question%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-700 shadow-sm"
        >
          <MessageCircle size={15} />
          Chat: +92 330 1711146
        </a>
      </div>

      {/* Nationwide Delivery & Studio */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
            <MapPin size={20} />
          </div>
          <p className="font-serif text-base font-semibold text-neutral-900">Delivery Nationwide</p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
          We handcraft and safely ship to all cities across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar with Cash on Delivery (COD).
        </p>
      </div>

      {/* Call & Direct Phone */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
            <Phone size={20} />
          </div>
          <p className="font-serif text-base font-semibold text-neutral-900">Direct Phone Line</p>
        </div>
        <p className="mt-2 text-sm font-semibold text-neutral-800">
          +92 330 1711146
        </p>
        <p className="text-xs text-neutral-500">
          Monday to Saturday: 10:00 AM – 8:00 PM (PKT)
        </p>
      </div>

      {/* Email Card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
            <Mail size={20} />
          </div>
          <p className="font-serif text-base font-semibold text-neutral-900">Email Inquiries</p>
        </div>
        <p className="mt-2 text-xs text-neutral-600">
          Support: <a href="mailto:support@galleryedge.pk" className="font-medium text-amber-800 hover:underline">support@galleryedge.pk</a>
        </p>
        <p className="text-xs text-neutral-600">
          Bulk Orders: <a href="mailto:orders@galleryedge.pk" className="font-medium text-amber-800 hover:underline">orders@galleryedge.pk</a>
        </p>
      </div>

      {/* Hours */}
      <div className="rounded-2xl bg-[#F3EFE7] p-6">
        <div className="flex items-center gap-2 text-neutral-800">
          <Clock size={16} />
          <p className="font-serif text-sm font-semibold">Studio &amp; Dispatch Hours</p>
        </div>
        <div className="mt-3 flex flex-col gap-2 text-xs text-neutral-600">
          <div className="flex justify-between border-b border-neutral-300/60 pb-1.5">
            <span>Monday – Friday</span>
            <span className="font-medium text-neutral-900">10:00 AM – 8:00 PM</span>
          </div>
          <div className="flex justify-between border-b border-neutral-300/60 pb-1.5">
            <span>Saturday</span>
            <span className="font-medium text-neutral-900">11:00 AM – 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span className="font-medium text-amber-800">Online Inquiries Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}