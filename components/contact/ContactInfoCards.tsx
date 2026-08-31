import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-white p-6">
        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-amber-700" />
          <p className="font-serif text-base font-semibold text-neutral-900">Visit Our Studio</p>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          128 Frame Street
          <br />
          New York, NY 10014
          <br />
          United States
        </p>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="flex items-center gap-3">
          <Phone size={18} className="text-amber-700" />
          <p className="font-serif text-base font-semibold text-neutral-900">Call Us</p>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          +1 212 555 0100
          <br />
          Mon–Fri 9am–6pm EST
        </p>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-amber-700" />
          <p className="font-serif text-base font-semibold text-neutral-900">Email</p>
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          hello@galleryedge.com
          <br />
          For orders: orders@galleryedge.com
        </p>
      </div>

      <div className="rounded-xl bg-[#F3EFE7] p-6">
        <p className="font-serif text-base font-semibold text-neutral-900">Studio Hours</p>
        <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-600">
          <div className="flex justify-between">
            <span>Monday – Friday</span>
            <span>9:00am – 6:00pm</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>10:00am – 4:00pm</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}