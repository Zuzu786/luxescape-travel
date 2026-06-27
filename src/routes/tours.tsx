import { createFileRoute, Link } from "@tanstack/react-router";
import { TOURS } from "@/lib/tours-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Tours — Luxescape Travel" },
      { name: "description", content: "Table Mountain, Safari, Kirstenbosch, Hermanus, Garden Route, Cape Winelands and Cape Peninsula." },
      { property: "og:title", content: "Tours — Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Tours,
});

function Tours() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-16 px-6 lg:px-12 mx-auto max-w-[1500px]">
        <p className="eyebrow reveal">Curated journeys</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-8xl leading-[1]">
          Our <span className="italic text-gold">tours</span>.
        </h1>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-32 space-y-6">
        {TOURS.map((t, i) => (
          <Link
            key={t.slug}
            to="/book"
            search={{ tour: t.slug }}
            className="group grid gap-8 lg:grid-cols-12 items-center border-t border-charcoal/15 pt-8 reveal hover:bg-charcoal hover:text-ivory transition-colors duration-500 px-2"
          >
            <div className="lg:col-span-1 font-display text-3xl text-gold">0{i + 1}</div>
            <div className="lg:col-span-4 overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                width={1600}
                height={1100}
              />
            </div>
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-display text-3xl lg:text-5xl">{t.name}</h3>
              <p className="text-sm text-charcoal/70 group-hover:text-ivory/70 max-w-xl">{t.desc}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{t.duration} · From R{t.price.toLocaleString()}</p>
            </div>
            <div className="lg:col-span-2 flex lg:justify-end pb-6">
              <span className="grid h-16 w-16 place-items-center border border-gold text-gold group-hover:bg-gold group-hover:text-charcoal transition">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
