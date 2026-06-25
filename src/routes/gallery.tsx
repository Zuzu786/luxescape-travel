import { createFileRoute } from "@tanstack/react-router";
import { TOURS } from "@/lib/tours-data";
import car from "@/assets/luxury-car.jpg";
import hero from "@/assets/hero-mountain.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Luxescape Travel" },
      { name: "description", content: "Moments from journeys across South Africa." },
      { property: "og:title", content: "Gallery — Luxescape Travel" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const items = [
    { src: hero, h: "row-span-2", title: "Table Mountain at dusk" },
    ...TOURS.map((t) => ({ src: t.image, h: "", title: t.name })),
    { src: car, h: "", title: "Chauffeur services" },
  ];
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-16 px-6 lg:px-12 mx-auto max-w-[1500px]">
        <p className="eyebrow reveal">Moments</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-8xl">Gallery.</h1>
      </section>
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-32">
        <div className="grid gap-4 md:grid-cols-3 auto-rows-[280px]">
          {items.map((it, i) => (
            <figure key={i} className={`relative overflow-hidden group bg-charcoal reveal ${it.h}`}>
              <img src={it.src} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-4 left-4 text-ivory font-display text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                {it.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
