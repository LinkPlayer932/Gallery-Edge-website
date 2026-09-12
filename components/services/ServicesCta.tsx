import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function ServicesCta() {
  return (
    <section className="bg-neutral-900 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-amber-950/80 via-neutral-900 to-neutral-900 p-8 text-center border border-amber-800/30 md:p-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Ready to Elevate Your Space?
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-white md:text-4xl">
          Let’s create your next signature wall piece.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-300">
          Whether you need a single bespoke frame or a complete commercial interior framing package, our artisans are ready to help.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/custom-frames"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600"
          >
            Start Custom Frame
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20would%20like%20to%20consult%20with%20an%20art%20and%20framing%20expert."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/80 px-6 py-3.5 text-sm font-semibold text-neutral-200 transition-all hover:border-neutral-500 hover:text-white"
          >
            <MessageCircle size={16} className="text-green-500" />
            Chat with Framing Specialist
          </a>
        </div>
      </div>
    </section>
  );
}
