import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Car,
  Compass,
  Crown,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import car from "@/assets/luxury-car.jpg";
import mountain from "@/assets/abouthero.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Luxescape Travel" },
      {
        name: "description",
        content:
          "Triple BEE certified luxury travel company delivering integrity, respect and care across South Africa.",
      },
      { property: "og:title", content: "About Luxescape Travel" },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: About,
});

const values = [
  {
    i: Award,
    t: "Triple BEE Certified",
    d: "A certified, accountable South African operator trusted by executives, productions and discerning travellers.",
  },
  {
    i: HeartHandshake,
    t: "Integrity",
    d: "Every promise is met with quiet precision. What we say is what we do.",
  },
  {
    i: Sparkles,
    t: "Personalised",
    d: "Itineraries shaped around how you actually travel never copied, rushed or templated.",
  },
  {
    i: ShieldCheck,
    t: "Care",
    d: "Discreet professional support from arrival to departure, including concierge, transport and protection.",
  },
];

const stats = [
  { n: "5+", l: "Years experience" },
  { n: "500+", l: "Journeys curated" },
  { n: "24/7", l: "Travel support" },
  { n: "100%", l: "BEE certified" },
];

const services = [
  {
    i: Crown,
    t: "VIP Travel",
    d: "Private, discreet and seamless travel experiences for high-profile guests.",
  },
  {
    i: Car,
    t: "Chauffeur Services",
    d: "Premium transport for airport transfers, tours, events and executive movement.",
  },
  {
    i: Compass,
    t: "Curated Tours",
    d: "Cape Town, safari, Winelands and coastal experiences shaped around your pace.",
  },
  {
    i: Users,
    t: "Group & Corporate",
    d: "Reliable movement for teams, productions, conferences and private groups.",
  },
];

function StandardParallaxSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["18px", "-18px"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-charcoal"
    >
      <motion.img
        src={mountain}
        alt="Table Mountain at golden hour"
        loading="lazy"
        width={1920}
        height={1280}
        style={{ y: imageY }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover opacity-80 will-change-transform"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/10 to-charcoal/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(215,166,68,0.24),transparent_34%),radial-gradient(circle_at_75%_15%,rgba(255,244,214,0.10),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(0,0,0,0.62)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1500px] items-end px-6 py-16 lg:px-12 lg:py-20">
        <motion.div style={{ y: textY }} className="max-w-4xl will-change-transform">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/80" />
            <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
              Our standard
            </p>
          </div>

          <p className="font-display text-4xl italic leading-[1.05] text-ivory sm:text-5xl lg:text-7xl">
            Quiet luxury, delivered with conviction.
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ivory/68 sm:text-lg">
            Every route, arrival and experience is shaped with calm precision,
            thoughtful planning and the kind of detail guests can feel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO — text only */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 lg:px-12 lg:pb-24">
        <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-charcoal/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow reveal">About - Est. South Africa</p>

            <h1 className="reveal mt-6 font-display text-[clamp(4rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.055em]">
              Travel as it <br />
              should{" "}
              <span className="italic text-gold">
                feel.
              </span>
            </h1>
          </div>

          <div className="reveal space-y-6 text-base leading-8 text-charcoal/72 sm:text-lg lg:col-span-5">
            <p>
              From the slopes of Table Mountain to the wide silence of safari,
              our work moves across the full landscape of South African
              hospitality.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {["Luxury Tours", "VIP Travel", "Chauffeur", "Safari"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-charcoal/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-charcoal/55 shadow-[0_12px_35px_rgba(20,18,14,0.05)]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-y border-charcoal/10 bg-white/45">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="reveal border-charcoal/10 p-6 text-center even:border-l sm:p-8 lg:border-l lg:p-12 lg:first:border-l-0"
            >
              <p className="font-display text-4xl leading-none text-gold sm:text-5xl lg:text-6xl">
                {s.n}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-charcoal/50 sm:text-xs">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-charcoal/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">Who we are</p>

            <h2 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              A premium travel company for{" "}
              <span className="italic text-gold">personalised</span> South
              African journeys.
            </h2>
          </div>

          <div className="reveal space-y-6 text-base leading-8 text-charcoal/72 sm:text-lg lg:col-span-6 lg:col-start-7">
            <p>
              LuxesCape Travel is a Triple BEE Certified company delivering
              professional, personalised and world-class travel services across
              South Africa. Our work is built on integrity, respect and care,
              the kind of values that turn movement into experience.
            </p>

            <p>
              Beyond daily and packaged tours, we provide transportation, luxury
              accommodation support, VIP protection services and specialised
              support to the entertainment industry.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {[
                "Luxury Tours",
                "Airport Transfers",
                "Private Chauffeur",
                "Safari Experiences",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-charcoal/10 bg-white/70 p-4 shadow-[0_14px_40px_rgba(20,18,14,0.05)]"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-gold/10 text-gold">
                    <Star size={14} className="fill-gold/50" strokeWidth={1.4} />
                  </span>
                  <span className="text-sm font-medium text-charcoal/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX STANDARD IMAGE */}
      <StandardParallaxSection />

      {/* PHILOSOPHY */}
      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 lg:grid-cols-12 lg:px-12 lg:py-32">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">Our philosophy</p>

          <h2 className="mt-5 font-display text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            More than a tour, a{" "}
            <span className="italic text-gold">considered</span> journey.
          </h2>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <div className="rounded-[2rem] border border-charcoal/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(20,18,14,0.07)] sm:p-8 lg:p-10">
            <p className="text-base leading-8 text-charcoal/72 sm:text-lg">
              From comedy festivals and musical productions to private executive
              travel and quiet weekend escapes, our work is shaped by one simple
              standard: discretion paired with obsessive detail.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: MapPin, title: "Local insight" },
                { icon: CalendarDays, title: "Seamless planning" },
                { icon: ShieldCheck, title: "Trusted support" },
              ].map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-charcoal/10 bg-ivory p-5"
                >
                  <Icon size={22} className="text-gold" strokeWidth={1.4} />
                  <p className="mt-4 font-display text-xl leading-none">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SNAPSHOT */}
      <section className="relative overflow-hidden bg-charcoal px-6 py-24 text-ivory lg:px-12 lg:py-32">
        <img
          src={car}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/70" />

        <div className="relative mx-auto max-w-[1500px]">
          <div className="reveal mb-12 max-w-3xl text-center sm:mx-auto">
            <p className="eyebrow">What we do</p>

            <h2 className="mt-4 font-display text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
              A complete ecosystem for{" "}
              <span className="italic text-gold">premium travel.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ i: Icon, t, d }) => (
              <div
                key={t}
                className="reveal group rounded-[2rem] border border-ivory/10 bg-ivory/[0.055] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-gold/10"
              >
                <div className="grid size-12 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Icon size={22} strokeWidth={1.4} />
                </div>

                <h3 className="mt-6 font-display text-2xl leading-none">
                  {t}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ivory/62">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="reveal mb-12 text-center">
          <p className="eyebrow">What guides us</p>

          <h2 className="mt-4 font-display text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
            Four anchors.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {values.map(({ i: Icon, t, d }, idx) => (
            <div
              key={t}
              className="reveal group rounded-[2rem] border border-charcoal/10 bg-white/70 p-6 shadow-[0_20px_70px_rgba(20,18,14,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-charcoal hover:text-ivory sm:p-8 lg:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  <Icon size={23} strokeWidth={1.3} />
                </div>

                <span className="font-display text-sm text-charcoal/30 transition-colors group-hover:text-gold/60">
                  0{idx + 1}
                </span>
              </div>

              <p className="mt-8 font-display text-3xl leading-none lg:text-4xl">
                {t}
              </p>

              <p className="mt-4 max-w-md leading-relaxed text-charcoal/65 transition-colors group-hover:text-ivory/70">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal px-6 py-24 text-ivory lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-[900px] text-center">
          <p className="eyebrow reveal">Begin</p>

          <h2 className="reveal mt-4 font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Ready to travel with us?
          </h2>

          <p className="reveal mx-auto mt-6 max-w-xl text-base leading-8 text-ivory/70 sm:text-lg">
            Tell us how you travel. We will handle the transport, planning,
            protection, stays and every detail in between.
          </p>

          <Link to="/book" className="btn-gold reveal mt-10">
            Book Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}