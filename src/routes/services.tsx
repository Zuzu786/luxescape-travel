import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { SERVICES } from "@/lib/tours-data";
import car from "@/assets/luxury-car.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Luxescape Travel" },
      { name: "description", content: "VIP, chauffeur, group shuttles, corporate travel, event management, luxury accommodation, concierge, bulletproof vehicles and CPOs." },
      { property: "og:title", content: "Services - Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Services,
});

const categories = [
  { tag: "Travel", slugs: ["vip", "travel-tourism", "concierge", "accommodation"] },
  { tag: "Transport", slugs: ["chauffeur", "group-shuttles", "corporate"] },
  { tag: "Protection", slugs: ["bulletproof", "cpos"] },
  { tag: "Events", slugs: ["event-management"] },
];

function Services() {
  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section className="pt-40 pb-16 px-6 lg:px-12 mx-auto max-w-[1500px] grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow reveal">What we do</p>
          <h1 className="reveal mt-5 font-display text-6xl lg:text-[8rem] leading-[0.95]">
            Services, <span className="italic text-gold">refined</span>.
          </h1>
        </div>
        <div className="lg:col-span-4 reveal">
          <p className="text-lg text-charcoal/70 leading-relaxed">
            A complete ecosystem of travel, transport, hospitality and protection built to the highest standard, delivered with discretion.
          </p>
        </div>
      </section>

      {/* CATEGORY TAGS */}
      <section className="border-y border-charcoal/15 bg-charcoal/[0.02]">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 py-6 flex flex-wrap gap-x-10 gap-y-3 items-center reveal">
          <span className="eyebrow">Categories</span>
          {categories.map((c, i) => (
            <span key={c.tag} className="font-display text-xl">
              <span className="text-gold mr-2">0{i + 1}</span>{c.tag}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES GRID — large feature + grid */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-20">
        <div className="grid gap-px bg-charcoal/15 border border-charcoal/15 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] as React.FC<{ size?: number; strokeWidth?: number; className?: string }>) ?? Icons.Sparkles;
            const featured = s.slug === "vip";
            const wide = s.slug === "cpos";
            return (
              <article
                key={s.slug}
                className={`group bg-ivory p-10 lg:p-12 hover:bg-charcoal hover:text-ivory transition-colors duration-500 reveal min-h-[340px] flex flex-col ${featured || wide ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center border border-charcoal/20 group-hover:border-gold">
                    <Icon className="text-gold" size={26} strokeWidth={1.2} />
                  </span>
                  <span className="font-display text-sm text-charcoal/30 group-hover:text-gold/60">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className={`font-display mt-10 ${featured ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>{s.name}</h3>
                <p className={`mt-4 text-sm leading-relaxed flex-1 text-charcoal/70 group-hover:text-ivory/70 ${featured ? "max-w-xl" : ""}`}>
                  {s.desc}
                </p>
                <Link
                  to="/contact"
                  className="mt-8 text-xs uppercase tracking-[0.25em] inline-flex items-center gap-2 link-gold"
                >
                  Request a quote <Icons.ArrowUpRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 reveal">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.05]">
            A simple, <span className="italic text-gold">considered</span> process.
          </h2>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {[
            { n: "01", t: "Enquire", d: "Tell us how you travel, destinations, dates, preferences." },
            { n: "02", t: "Curate", d: "We design a personalised itinerary with transparent pricing." },
            { n: "03", t: "Travel", d: "Concierge support from departure to your return home." },
          ].map((s) => (
            <div key={s.n} className="bg-ivory p-8 reveal">
              <p className="font-display text-4xl text-gold">{s.n}</p>
              <p className="font-display text-2xl mt-4">{s.t}</p>
              <p className="mt-3 text-sm text-charcoal/65 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA WITH IMAGE */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img src={car} alt="Luxury chauffeur" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" />
        <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12 py-28 max-w-xl">
          <p className="eyebrow reveal">Custom request?</p>
          <h2 className="reveal mt-4 font-display text-5xl lg:text-6xl">Every detail, your way.</h2>
          <p className="reveal mt-6 text-ivory/75 text-lg">
            Bulletproof vehicles, armed CPOs, executive itineraries or a private island weekend, tell us what you need.
          </p>
          <Link to="/contact" className="btn-gold mt-10 reveal">Speak to a concierge <Icons.ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
