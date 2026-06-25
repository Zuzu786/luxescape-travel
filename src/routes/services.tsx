import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { SERVICES } from "@/lib/tours-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Luxescape Travel" },
      { name: "description", content: "VIP, chauffeur, group shuttles, corporate travel, event management, luxury accommodation, concierge, bulletproof vehicles and CPOs." },
      { property: "og:title", content: "Services — Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-16 px-6 lg:px-12 mx-auto max-w-[1500px]">
        <p className="eyebrow reveal">What we do</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-8xl leading-[1]">
          Services, <span className="italic text-gold">refined</span>.
        </h1>
        <p className="reveal mt-8 max-w-2xl text-lg text-charcoal/70">
          A full ecosystem of travel, transport, hospitality and protection — built to the highest standard.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-32">
        <div className="grid gap-px bg-charcoal/15 border border-charcoal/15 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] as React.FC<{ size?: number; strokeWidth?: number; className?: string }>) ?? Icons.Sparkles;
            return (
              <article key={s.slug} className="group bg-ivory p-10 hover:bg-charcoal hover:text-ivory transition-colors duration-500 reveal min-h-[320px] flex flex-col">
                <div className="flex items-start justify-between">
                  <Icon className="text-gold" size={32} strokeWidth={1.2} />
                  <span className="font-display text-sm text-charcoal/30 group-hover:text-gold/60">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl mt-8">{s.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70 group-hover:text-ivory/70 flex-1">{s.desc}</p>
                <Link to="/contact" className="mt-6 link-gold text-xs uppercase tracking-[0.25em]">Enquire →</Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
