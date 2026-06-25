import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import car from "@/assets/luxury-car.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Luxescape Travel" },
      { name: "description", content: "Triple BEE certified luxury travel company delivering integrity, respect and care across South Africa." },
      { property: "og:title", content: "About Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: About,
});

const values = [
  { i: Award, t: "Triple BEE Certified", d: "A certified, accountable South African operator." },
  { i: HeartHandshake, t: "Integrity", d: "Every promise is met with quiet precision." },
  { i: Sparkles, t: "Personalised", d: "Itineraries built around how you actually travel." },
  { i: ShieldCheck, t: "Care", d: "Discreet professional support, end to end." },
];

function About() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-20 px-6 lg:px-12 mx-auto max-w-[1500px]">
        <p className="eyebrow reveal">About</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-8xl max-w-5xl leading-[1]">
          Travel as it should <span className="italic text-gold">feel</span>.
        </h1>
        <p className="reveal mt-10 max-w-2xl text-lg text-charcoal/75 leading-relaxed">
          Luxescape Travel is a Triple BEE Certified company passionate about providing professional, personalised world-class services through integrity, respect and care.
        </p>
      </section>

      <section className="relative overflow-hidden">
        <img src={car} alt="Luxury car" loading="lazy" className="h-[60vh] w-full object-cover" width={1600} height={1100} />
        <div className="absolute inset-0 bg-charcoal/30" />
      </section>

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-28 grid gap-12 lg:grid-cols-2">
        <div className="reveal space-y-6 text-lg text-charcoal/80 leading-relaxed">
          <p>
            We provide an array of services beyond daily and packaged tours — including transportation, luxury accommodation, VIP protection services, and specialised support to the entertainment industry.
          </p>
          <p>
            From comedy festivals and musical productions to private executive travel and quiet weekend escapes, our work moves across the full landscape of South African hospitality.
          </p>
        </div>
        <div className="reveal grid sm:grid-cols-2 gap-6">
          {values.map(({ i: Icon, t, d }) => (
            <div key={t} className="border border-charcoal/15 p-7 bg-card hover:border-gold transition-colors">
              <Icon className="text-gold" size={28} strokeWidth={1.2} />
              <p className="mt-5 font-display text-xl">{t}</p>
              <p className="mt-2 text-sm text-charcoal/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 text-center">
          <h2 className="reveal font-display text-5xl lg:text-6xl">Ready to travel with us?</h2>
          <Link to="/contact" className="btn-gold mt-10 reveal">Start the conversation</Link>
        </div>
      </section>
    </div>
  );
}
