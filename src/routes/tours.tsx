import { createFileRoute, Link } from "@tanstack/react-router";
import { TOURS } from "@/lib/tours-data";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Tours - Luxescape Travel" },
      { name: "description", content: "Table Mountain, Safari, Kirstenbosch, Hermanus, Garden Route, Cape Winelands and Cape Peninsula, curated luxury journeys." },
      { property: "og:title", content: "Tours - Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Tours,
});

function Tours() {
  const [feature, ...rest] = TOURS;
  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section className="pt-40 pb-16 px-6 lg:px-12 mx-auto max-w-[1500px] grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow reveal">Curated journeys</p>
          <h1 className="reveal mt-5 font-display text-6xl lg:text-[8rem] leading-[0.95]">
            Our <span className="italic text-gold">tours</span>.
          </h1>
        </div>
        <div className="lg:col-span-4 reveal">
          <p className="text-lg text-charcoal/70 leading-relaxed">
            From half-day Cape escapes to multi-day Big Five safaris, every itinerary is shaped around how you travel.
          </p>
        </div>
      </section>

      {/* FEATURED TOUR */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-20">
        <Link
          to="/book"
          search={{ tour: feature.slug }}
          className="group block relative overflow-hidden bg-charcoal text-ivory reveal"
        >
          <div className="grid lg:grid-cols-12 min-h-[560px]">
            <div className="lg:col-span-7 relative overflow-hidden">
              <img
                src={feature.image}
                alt={feature.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/40 lg:to-charcoal" />
              <span className="absolute top-6 left-6 bg-gold text-charcoal text-[10px] uppercase tracking-[0.3em] px-3 py-1.5">Signature</span>
            </div>
            <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-between">
              <div>
                <p className="font-display text-sm text-gold">01 · Featured journey</p>
                <h2 className="font-display text-5xl lg:text-7xl mt-6 leading-[1]">{feature.name}</h2>
                <p className="mt-6 text-ivory/75 leading-relaxed max-w-md">{feature.desc}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-ivory/70"><Clock size={14} className="text-gold" /> {feature.duration}</div>
                  <div className="flex items-center gap-2 text-ivory/70"><MapPin size={14} className="text-gold" /> Cape Town</div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold pt-2">From R{feature.price.toLocaleString()}</p>
                </div>
                <span className="grid h-16 w-16 place-items-center border border-gold text-gold group-hover:bg-gold group-hover:text-charcoal transition">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* TOUR GRID */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-32">
        <div className="flex items-end justify-between mb-10 reveal">
          <div>
            <p className="eyebrow">All journeys</p>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl">The collection.</h2>
          </div>
          <p className="hidden md:block text-sm text-charcoal/50 max-w-xs text-right">
            Tap any tour to begin the booking, our team confirms within 24 hours.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t, i) => (
            <Link
              key={t.slug}
              to="/book"
              search={{ tour: t.slug }}
              className="group block reveal"
            >
              <div className="relative overflow-hidden bg-charcoal aspect-[4/5]">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <span className="font-display text-gold text-sm">0{i + 2}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/80 bg-charcoal/40 backdrop-blur px-3 py-1">{t.duration}</span>
                </div>
                <div className="absolute inset-x-5 bottom-5 text-ivory">
                  <h3 className="font-display text-3xl lg:text-4xl leading-[1.05]">{t.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">From R{t.price.toLocaleString()}</p>
                    <span className="grid h-10 w-10 place-items-center border border-ivory/30 group-hover:bg-gold group-hover:text-charcoal group-hover:border-gold transition">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-charcoal/65 leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory py-24">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
          <h2 className="font-display text-4xl lg:text-6xl reveal">
            Don't see your <span className="italic text-gold">perfect</span> journey?
          </h2>
          <div className="reveal">
            <p className="text-ivory/70 max-w-md">We design fully bespoke itineraries anywhere in South Africa and beyond.</p>
            <Link to="/contact" className="btn-gold mt-6 inline-flex">Design a custom tour</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
