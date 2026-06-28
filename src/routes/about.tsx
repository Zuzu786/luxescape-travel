import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import car from "@/assets/luxury-car.jpg";
import shuttle from "@/assets/hero-shuttle.jpg";
import mountain from "@/assets/hero-mountain.jpg";

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
  { i: Award, t: "Triple BEE Certified", d: "A certified, accountable South African operator trusted by executives, productions and discerning travellers." },
  { i: HeartHandshake, t: "Integrity", d: "Every promise is met with quiet precision — what we say is what we do." },
  { i: Sparkles, t: "Personalised", d: "Itineraries shaped around how you actually travel, never a template." },
  { i: ShieldCheck, t: "Care", d: "Discreet professional support, end to end — concierge, transport and protection." },
];

const stats = [
  { n: "10+", l: "Years operating" },
  { n: "500+", l: "Journeys curated" },
  { n: "24/7", l: "Concierge support" },
  { n: "100%", l: "BEE certified" },
];

function About() {
  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 mx-auto max-w-[1500px] grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow reveal">About — Est. South Africa</p>
          <h1 className="reveal mt-6 font-display text-6xl lg:text-[8rem] leading-[0.95]">
            Travel as it<br />should <span className="italic text-gold">feel</span>.
          </h1>
        </div>
        <div className="lg:col-span-5 reveal space-y-6 text-lg text-charcoal/75 leading-relaxed">
          <p>
            Luxescape Travel is a Triple BEE Certified house of professional, personalised world-class services — built on integrity, respect and care.
          </p>
          <p>
            From the slopes of Table Mountain to the wide silence of safari, our work moves across the full landscape of South African hospitality.
          </p>
        </div>
      </section>

      {/* PARALLAX IMAGE */}
      <section className="relative overflow-hidden">
        <img src={mountain} alt="Table Mountain" loading="lazy" className="h-[70vh] w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1500px] px-6 lg:px-12 pb-10">
          <p className="font-display italic text-ivory text-3xl lg:text-5xl max-w-2xl">
            "Quiet luxury, delivered with conviction."
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-charcoal/15">
        <div className="mx-auto max-w-[1500px] grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="p-10 lg:p-14 border-l border-charcoal/15 first:border-l-0 reveal">
              <p className="font-display text-5xl lg:text-6xl text-gold">{s.n}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-charcoal/60">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-28 lg:py-40 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow">Our philosophy</p>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.05]">
            More than a tour — a <span className="italic text-gold">considered</span> journey.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 reveal space-y-6 text-lg text-charcoal/80 leading-relaxed">
          <p>
            Beyond daily and packaged tours, we provide transportation, luxury accommodation, VIP protection services, and specialised support to the entertainment industry.
          </p>
          <p>
            From comedy festivals and musical productions to private executive travel and quiet weekend escapes, our work is shaped by one simple standard — discretion paired with obsessive detail.
          </p>
        </div>
      </section>

      {/* VALUES — bento */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-28">
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <p className="eyebrow">What guides us</p>
            <h2 className="mt-4 font-display text-5xl lg:text-6xl">Four anchors.</h2>
          </div>
        </div>
        <div className="grid gap-px bg-charcoal/15 border border-charcoal/15 md:grid-cols-2">
          {values.map(({ i: Icon, t, d }, idx) => (
            <div key={t} className="bg-ivory p-10 lg:p-14 hover:bg-charcoal hover:text-ivory transition-colors duration-500 group reveal">
              <div className="flex items-start justify-between">
                <Icon className="text-gold" size={36} strokeWidth={1.1} />
                <span className="font-display text-sm text-charcoal/30 group-hover:text-gold/60">0{idx + 1}</span>
              </div>
              <p className="mt-8 font-display text-3xl lg:text-4xl">{t}</p>
              <p className="mt-4 text-charcoal/70 group-hover:text-ivory/70 leading-relaxed max-w-md">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE DUO */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-28 grid gap-6 md:grid-cols-2">
        <img src={car} alt="Luxury chauffeur" loading="lazy" className="h-[480px] w-full object-cover reveal" />
        <img src={shuttle} alt="Group shuttle" loading="lazy" className="h-[480px] w-full object-cover reveal md:mt-20" />
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 text-center">
          <p className="eyebrow reveal">Begin</p>
          <h2 className="reveal mt-4 font-display text-5xl lg:text-7xl">Ready to travel with us?</h2>
          <p className="reveal mt-6 text-ivory/70 max-w-lg mx-auto">Tell us how you travel — we'll handle the rest.</p>
          <Link to="/contact" className="btn-gold mt-10 reveal">Start the conversation <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
