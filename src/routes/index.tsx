import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Crown, Shield, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import carImg from "@/assets/luxury-car.jpg";
import { TOURS } from "@/lib/tours-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxescape Travel — Luxury Tours & VIP Travel in South Africa" },
      { name: "description", content: "Tours, chauffeur, VIP protection and event management across South Africa. Triple BEE certified." },
      { property: "og:title", content: "Luxescape Travel" },
      { property: "og:description", content: "Luxury tours, VIP transport and protection across South Africa." },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-charcoal text-ivory">
        <img
          src={heroImg}
          alt="Table Mountain at golden hour"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal" />
        <div className="absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-[1500px] flex-col justify-end px-6 pb-24 lg:px-12 lg:pb-32">
          <p className="eyebrow reveal">Triple BEE Certified · Est. South Africa</p>
          <h1 className="reveal mt-6 max-w-5xl font-display text-[3.2rem] leading-[1] sm:text-[5rem] lg:text-[7rem]">
            Escape, <span className="italic text-gold">elevated.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-ivory/80">
            World-class travel, transport and protection across South Africa — crafted with integrity, respect and obsessive care.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <Link to="/tours" className="btn-gold">Explore Tours <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-ghost-gold">Reserve a Journey</Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden md:block text-right text-ivory/60 text-xs uppercase tracking-[0.3em]">
          <p>Cape Town</p>
          <p className="mt-1">33.9°S · 18.4°E</p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-gold/20 bg-charcoal py-6 overflow-hidden">
        <div className="marquee-track text-ivory/60 font-display text-2xl italic">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex gap-16">
              {["VIP Services","Chauffeur","Safari","Wine Lands","Close Protection","Event Management","Luxury Stays","Cape Peninsula"].map((w, i) => (
                <span key={i} className="flex items-center gap-16">
                  {w} <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* INTRO — asymmetric split */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-28 lg:py-40 grid gap-16 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5 reveal">
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.05]">
            A passionate house of <span className="italic text-gold">professional, personalised</span> world-class travel.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 reveal space-y-6 text-lg text-charcoal/75 leading-relaxed">
          <p>
            Luxescape Travel is a Triple BEE Certified company delivering an array of services beyond daily and packaged tours — including transportation, luxury accommodation, VIP protection and specialised support to the entertainment industry across South Africa.
          </p>
          <p>
            Comedy festivals, musical productions, executive itineraries or a quiet wine country weekend — every journey is built around integrity, respect and care.
          </p>
          <Link to="/about" className="link-gold inline-flex items-center gap-2 pt-2 text-charcoal hover:text-gold">
            Our story <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="hairline mx-auto max-w-[1200px]" />

      {/* SIGNATURE TOURS — broken grid */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 reveal">
          <div>
            <p className="eyebrow">Signature</p>
            <h2 className="font-display text-5xl lg:text-6xl mt-4">Tours, considered.</h2>
          </div>
          <Link to="/tours" className="link-gold text-sm uppercase tracking-[0.2em]">View all tours →</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-12 md:auto-rows-[280px]">
          {TOURS.slice(0, 6).map((t, i) => {
            const spans = [
              "md:col-span-8 md:row-span-2",
              "md:col-span-4 md:row-span-1",
              "md:col-span-4 md:row-span-1",
              "md:col-span-5 md:row-span-2",
              "md:col-span-4 md:row-span-1",
              "md:col-span-3 md:row-span-1",
            ];
            return (
              <Link
                key={t.slug}
                to="/tours"
                className={`group relative overflow-hidden bg-charcoal reveal ${spans[i]}`}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="eyebrow opacity-80">{t.duration}</p>
                  <h3 className="font-display text-2xl lg:text-3xl mt-1">{t.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SERVICE STRIP w/ luxury car */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img src={carImg} alt="Luxury chauffeur" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" width={1600} height={1100} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12 py-32 grid gap-12 lg:grid-cols-2 items-center">
          <div className="reveal">
            <p className="eyebrow">Beyond tours</p>
            <h2 className="mt-5 font-display text-5xl lg:text-6xl">A complete service ecosystem.</h2>
            <p className="mt-6 text-ivory/75 text-lg max-w-lg">
              VIP services, chauffeur, group shuttles, corporate travel, event management, luxury accommodation, concierge, bulletproof vehicles and fully-armed CPOs.
            </p>
            <Link to="/services" className="btn-gold mt-10">All services <ArrowRight size={16} /></Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { i: Crown, t: "VIP Services" },
              { i: Shield, t: "Close Protection" },
              { i: Sparkles, t: "Concierge" },
              { i: Star, t: "Event Management" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="border border-ivory/15 p-6 hover:border-gold/60 transition-colors group">
                <Icon className="text-gold" size={28} strokeWidth={1.2} />
                <p className="mt-6 font-display text-xl">{t}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/50 group-hover:text-gold">Discover →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-32 text-center">
        <p className="eyebrow reveal">Begin</p>
        <h2 className="reveal font-display text-5xl lg:text-7xl mt-4 max-w-3xl mx-auto">
          Your South Africa, <span className="italic text-gold">unhurried</span>.
        </h2>
        <p className="reveal mt-6 text-charcoal/70 max-w-xl mx-auto">
          Tell us how you travel. We'll handle the rest — transport, protection, stays and every detail in between.
        </p>
        <Link to="/contact" className="btn-gold mt-10 reveal" style={{ borderColor: "var(--color-charcoal)" }}>
          Plan my journey <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
