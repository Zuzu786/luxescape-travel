import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  Crown,
  MapPin,
  Plane,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import heroImg from "@/assets/heroimg.png";
import carImg from "@/assets/luxury-car.jpg";
import { TOURS } from "@/lib/tours-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxescape Travel - Luxury Tours & VIP Travel in South Africa" },
      {
        name: "description",
        content:
          "Tours, chauffeur, VIP protection and event management across South Africa. Triple BEE certified.",
      },
      { property: "og:title", content: "Luxescape Travel" },
      {
        property: "og:description",
        content: "Luxury tours, VIP transport and protection across South Africa.",
      },
      { property: "og:image", content: "/icon-512.png" },
    ],
  }),
  component: Home,
});

const premiumEase = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const heroReveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: premiumEase,
    },
  },
};

const bookingPreview = [
  { icon: MapPin, label: "Destination", value: "Cape Town" },
  { icon: Compass, label: "Experience", value: "Private Tour" },
  { icon: Users, label: "Guests", value: "2 Adults" },
  { icon: CalendarDays, label: "Travel Date", value: "Flexible" },
];

const lightParticles = [
  { left: "6%", top: "21%", size: 2, delay: 0.1, duration: 7.2 },
  { left: "12%", top: "64%", size: 3, delay: 1.1, duration: 8.4 },
  { left: "18%", top: "33%", size: 2, delay: 0.6, duration: 6.8 },
  { left: "27%", top: "17%", size: 2, delay: 1.9, duration: 9.2 },
  { left: "31%", top: "79%", size: 3, delay: 0.3, duration: 7.8 },
  { left: "43%", top: "23%", size: 2, delay: 2.4, duration: 8.9 },
  { left: "49%", top: "69%", size: 2, delay: 1.4, duration: 7.1 },
  { left: "58%", top: "14%", size: 3, delay: 0.9, duration: 9.5 },
  { left: "63%", top: "46%", size: 2, delay: 2.1, duration: 8.2 },
  { left: "71%", top: "27%", size: 2, delay: 0.2, duration: 6.9 },
  { left: "79%", top: "72%", size: 3, delay: 1.7, duration: 9.1 },
  { left: "88%", top: "18%", size: 2, delay: 0.8, duration: 7.7 },
  { left: "93%", top: "58%", size: 2, delay: 2.7, duration: 8.8 },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateDesktopState = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDesktopState();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateDesktopState);
      return () => mediaQuery.removeEventListener("change", updateDesktopState);
    }

    mediaQuery.addListener(updateDesktopState);
    return () => mediaQuery.removeListener(updateDesktopState);
  }, []);

  return isDesktop;
}

function HeroPerformanceStyles() {
  return (
    <style>{`
      .hero-mountain-layer {
        transform: translate3d(var(--mountain-x, 0px), var(--mountain-y, 0px), 0);
        transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .hero-kenburns {
        animation: heroKenBurns 3.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        transform-origin: center;
        will-change: transform;
      }

      .hero-car-layer {
        transform: translate3d(var(--car-x, 0px), var(--car-y, 0px), 0);
        transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .hero-car-image {
        opacity: 0;
        animation: heroCarReveal 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        transform-origin: center;
        will-change: transform, opacity;
      }

      .hero-glow-main {
        transform: translate3d(calc(-50% + var(--glow-x, 0px)), var(--glow-y, 0px), 0);
        transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        animation: heroGlowOpacity 8s ease-in-out infinite;
        will-change: transform, opacity;
      }

      .hero-breathe-gold {
        animation: heroBreatheGold 9s ease-in-out infinite;
        will-change: transform, opacity;
      }

      .hero-breathe-ivory {
        animation: heroBreatheIvory 10s ease-in-out infinite;
        will-change: transform, opacity;
      }

      .hero-particle {
        animation-name: heroParticleFloat;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        will-change: transform, opacity;
      }

      .hero-top-line {
        transform-origin: center;
        animation: heroTopLine 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
      }

      .hero-scroll-reveal {
        opacity: 0;
        animation: heroScrollReveal 1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
      }

      .hero-scroll-beam {
        transform-origin: top;
        animation: heroScrollBeam 1.9s ease-in-out infinite;
      }

      .booking-card-float {
        animation: bookingCardFloat 8s ease-in-out infinite;
        will-change: transform;
      }

      .booking-card-shine {
        animation: bookingCardShine 8.8s ease-in-out infinite;
        will-change: transform;
      }

      .booking-plane-pulse {
        animation: bookingPlanePulse 7s ease-in-out infinite;
        will-change: transform;
      }

      @keyframes heroKenBurns {
        from {
          transform: scale(1.16);
        }
        to {
          transform: scale(1.05);
        }
      }

      @keyframes heroCarReveal {
        from {
          opacity: 0;
          transform: scale(1.08);
        }
        to {
          opacity: 0.14;
          transform: scale(1);
        }
      }

      @keyframes heroGlowOpacity {
        0%, 100% {
          opacity: 0.42;
        }
        50% {
          opacity: 0.7;
        }
      }

      @keyframes heroBreatheGold {
        0%, 100% {
          opacity: 0.24;
          transform: scale(1);
        }
        50% {
          opacity: 0.46;
          transform: scale(1.12);
        }
      }

      @keyframes heroBreatheIvory {
        0%, 100% {
          opacity: 0.16;
          transform: scale(1);
        }
        50% {
          opacity: 0.32;
          transform: scale(1.08);
        }
      }

      @keyframes heroParticleFloat {
        0%, 100% {
          opacity: 0.12;
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          opacity: 0.75;
          transform: translate3d(0, -14px, 0) scale(1.8);
        }
      }

      @keyframes heroTopLine {
        from {
          opacity: 0;
          transform: scaleX(0);
        }
        to {
          opacity: 1;
          transform: scaleX(1);
        }
      }

      @keyframes heroScrollReveal {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes heroScrollBeam {
        0%, 100% {
          transform: scaleY(1);
        }
        50% {
          transform: scaleY(0.38);
        }
      }

      @keyframes bookingCardFloat {
        0%, 100% {
          transform: translate3d(0, 0, 0);
        }
        50% {
          transform: translate3d(0, -10px, 0);
        }
      }

      @keyframes bookingCardShine {
        0%, 38% {
          transform: translate3d(0%, 0, 0) rotate(12deg);
        }
        70%, 100% {
          transform: translate3d(340%, 0, 0) rotate(12deg);
        }
      }

      @keyframes bookingPlanePulse {
        0%, 100% {
          transform: rotate(0deg) scale(1);
        }
        35% {
          transform: rotate(8deg) scale(1.04);
        }
        65% {
          transform: rotate(-4deg) scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-mountain-layer,
        .hero-kenburns,
        .hero-car-layer,
        .hero-car-image,
        .hero-glow-main,
        .hero-breathe-gold,
        .hero-breathe-ivory,
        .hero-particle,
        .hero-top-line,
        .hero-scroll-reveal,
        .hero-scroll-beam,
        .booking-card-float,
        .booking-card-shine,
        .booking-plane-pulse {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }

        .hero-car-image {
          opacity: 0.14;
        }

        .hero-scroll-reveal {
          opacity: 1;
        }
      }
    `}</style>
  );
}

function BookingWidget() {
  return (
    <motion.aside
      variants={heroReveal}
      className="relative mx-auto hidden w-full max-w-[430px] will-change-transform lg:mx-0 lg:block"
      aria-label="Luxury journey planning preview"
    >
      <div className="booking-card-float relative overflow-hidden rounded-[2rem] border border-ivory/15 bg-charcoal/35 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_32%,rgba(215,166,68,0.10)_68%,rgba(255,255,255,0.04))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ivory/70 to-transparent" />

        <div className="booking-card-shine pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-ivory/20 to-transparent blur-sm" />

        <div className="relative">
          <div className="flex items-center justify-between border-b border-ivory/10 pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-gold/85">
                Private Journey
              </p>
              <h2 className="mt-2 font-display text-3xl text-ivory">
                Tailored Itinerary
              </h2>
            </div>

            <div className="booking-plane-pulse grid size-12 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold shadow-[0_0_34px_rgba(215,166,68,0.22)]">
              <Plane size={20} strokeWidth={1.4} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {bookingPreview.map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.06,
                  duration: 0.55,
                  ease: premiumEase,
                }}
                className="rounded-2xl border border-ivory/10 bg-ivory/[0.055] p-4"
              >
                <div className="flex items-center gap-2 text-gold/80">
                  <Icon size={15} strokeWidth={1.4} />
                  <p className="text-[10px] uppercase tracking-[0.24em]">
                    {label}
                  </p>
                </div>
                <p className="mt-3 font-display text-xl text-ivory">{value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="mt-5"
          >
            <Link
              to="/book"
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/80 bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-charcoal shadow-[0_18px_60px_rgba(215,166,68,0.24)] transition-all duration-500 hover:bg-ivory hover:shadow-[0_24px_80px_rgba(255,244,214,0.18)]"
            >
              Plan Journey
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <div className="mt-5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-ivory/45">
            <span>Luxury Tours</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
            <span>VIP Fleet</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const latestPointerRef = useRef({ x: 0, y: 0 });
  const isDesktop = useIsDesktop();

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDesktop) return;

    const rect = event.currentTarget.getBoundingClientRect();

    latestPointerRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };

    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;

      const hero = heroRef.current;
      if (!hero) return;

      const { x, y } = latestPointerRef.current;

      hero.style.setProperty("--mountain-x", `${x * 28}px`);
      hero.style.setProperty("--mountain-y", `${y * 18}px`);
      hero.style.setProperty("--car-x", `${x * -34}px`);
      hero.style.setProperty("--car-y", `${y * -16}px`);
      hero.style.setProperty("--glow-x", `${x * 44}px`);
      hero.style.setProperty("--glow-y", `${y * 32}px`);
    });
  };

  const resetHeroPointer = () => {
    const hero = heroRef.current;
    if (!hero) return;

    hero.style.setProperty("--mountain-x", "0px");
    hero.style.setProperty("--mountain-y", "0px");
    hero.style.setProperty("--car-x", "0px");
    hero.style.setProperty("--car-y", "0px");
    hero.style.setProperty("--glow-x", "0px");
    hero.style.setProperty("--glow-y", "0px");
  };

  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section
        ref={heroRef}
        onPointerMove={isDesktop ? handleHeroPointerMove : undefined}
        onPointerLeave={isDesktop ? resetHeroPointer : undefined}
        className="relative isolate min-h-[110svh] overflow-hidden bg-charcoal text-ivory"
      >
        <HeroPerformanceStyles />

        {/* Cinematic layered background */}
        <div className="hero-mountain-layer absolute inset-0">
          <img
            src={heroImg}
            alt="Cape Town mountain landscape at golden hour"
            className="hero-kenburns h-full w-full object-cover opacity-70"
            width={1920}
            height={1280}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div
          className="hero-car-layer absolute bottom-0 right-[-18%] hidden w-[58rem] max-w-none will-change-transform lg:block 2xl:right-[-6%]"
          aria-hidden="true"
        >
          <img
            src={carImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="hero-car-image w-full object-contain [mask-image:linear-gradient(to_left,black,transparent)]"
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,244,214,0.08),transparent_34%),linear-gradient(to_bottom,rgba(9,8,6,0.50),rgba(9,8,6,0.22)_38%,rgba(9,8,6,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/42 to-charcoal/88 lg:from-charcoal/88 lg:via-charcoal/35 lg:to-charcoal/76" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_48%,rgba(215,166,68,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,244,214,0.10),transparent_24%)]" />

        <div
          aria-hidden="true"
          className="hero-glow-main absolute left-1/2 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(215,166,68,0.18),rgba(215,166,68,0.055)_36%,transparent_68%)] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="hero-breathe-gold absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="hero-breathe-ivory absolute -right-28 bottom-32 h-96 w-96 rounded-full bg-ivory/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.72)_100%)]" />

        <div aria-hidden="true" className="absolute inset-0">
          {lightParticles.map((particle, index) => (
            <span
              key={index}
              className="hero-particle absolute rounded-full bg-ivory/70 shadow-[0_0_18px_rgba(215,166,68,0.75)]"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="hero-top-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        />

        <div className="absolute right-8 top-8 z-20 hidden text-right text-[11px] uppercase tracking-[0.3em] text-ivory/45 md:block">
          <p>Cape Town</p>
          <p className="mt-1 text-gold/70">33.9°S · 18.4°E</p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="relative z-10 mx-auto grid min-h-[110svh] w-full max-w-[1680px] items-center gap-10 px-5 pb-28 pt-28 sm:px-8 sm:pb-32 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-12 lg:pb-28 lg:pt-32 xl:px-16"
        >
          <div className="mx-auto max-w-[880px] text-center lg:mx-0 lg:text-left">
            <motion.h1
              variants={heroReveal}
              className="mt-6 font-display text-[clamp(3.35rem,8vw,8.8rem)] leading-[0.9] tracking-[-0.055em]"
            >
              <span className="block">South Africa,</span>
              <span className="block">
                crafted in{" "}
                <span className="italic text-gold drop-shadow-[0_0_28px_rgba(215,166,68,0.18)]">
                  absolute luxury.
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={heroReveal}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ivory/74 sm:text-lg lg:mx-0"
            >
              Luxury tours, private transfers, safaris, and chauffeur services,
              crafted with elegance, comfort, and care.
            </motion.p>

            <motion.div
              variants={heroReveal}
              className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
              >
                <Link
                  to="/book"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-gold/80 bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-charcoal shadow-[0_18px_60px_rgba(215,166,68,0.22)] transition-all duration-500 hover:bg-ivory hover:shadow-[0_24px_90px_rgba(255,244,214,0.18)] sm:w-auto"
                >
                  Plan Your Journey
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
              >
                <Link
                  to="/tours"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-ivory/18 bg-ivory/[0.035] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ivory backdrop-blur-md transition-all duration-500 hover:border-gold/60 hover:bg-gold/10 hover:text-gold sm:w-auto"
                >
                  Explore Tours
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {isDesktop && <BookingWidget />}
        </motion.div>

        <div className="hero-scroll-reveal absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/45 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="hero-scroll-beam h-8 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-gold/20 bg-charcoal py-6 overflow-hidden">
        <div className="marquee-track text-ivory/60 font-display text-2xl italic">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex gap-16">
              {[
                "VIP Services",
                "Chauffeur",
                "Safari",
                "Wine Lands",
                "Close Protection",
                "Event Management",
                "Luxury Stays",
                "Cape Peninsula",
              ].map((w, i) => (
                <span key={i} className="flex items-center gap-16">
                  {w} <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* INTRO — luxury brand story */}
      <section className="relative overflow-hidden bg-ivory px-6 py-24 lg:px-12 lg:py-24">
        {/* Soft background detail */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-charcoal/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left visual card */}
          <div className="order-2 lg:order-1 lg:col-span-5 reveal">
            <div className="relative overflow-hidden rounded-[2rem] bg-charcoal shadow-[0_30px_90px_rgba(20,18,14,0.18)]">
              <div className="relative h-[430px] overflow-hidden sm:h-[520px] lg:h-[620px]">
                <img
                  src={carImg}
                  alt="Luxury chauffeur travel experience"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-[1.4s] hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,166,68,0.18),transparent_34%)]" />

                <div className="absolute left-5 top-5 rounded-full border border-ivory/15 bg-charcoal/35 px-4 py-2 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-ivory/75">
                    Cape Town Based
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory sm:p-7">
                  <div className="mb-5 flex items-center gap-2 text-gold">
                    <Star size={14} className="fill-gold/60" strokeWidth={1.4} />
                    <Star size={14} className="fill-gold/60" strokeWidth={1.4} />
                    <Star size={14} className="fill-gold/60" strokeWidth={1.4} />
                    <Star size={14} className="fill-gold/60" strokeWidth={1.4} />
                    <Star size={14} className="fill-gold/60" strokeWidth={1.4} />
                  </div>

                  <h3 className="font-display text-3xl leading-none sm:text-4xl">
                    Travel, handled with quiet precision.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/68">
                    From airport arrivals to executive itineraries, every detail is
                    managed with discretion, comfort and care.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile/desktop stat cards */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { value: "14+", label: "Years" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Certified" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-charcoal/10 bg-white/70 p-4 text-center shadow-[0_14px_40px_rgba(20,18,14,0.06)]"
                >
                  <p className="font-display text-2xl leading-none text-gold">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-charcoal/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 reveal">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2">
                <span className="h-px w-8 bg-gold/70" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-charcoal/60">
                  Who we are
                </p>
              </div>

              <h2 className="mt-6 font-display text-4xl leading-[1.04] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                A premium travel house for{" "}
                <span className="italic text-gold">personalised</span> South African
                journeys.
              </h2>

              <p className="mt-6 text-base leading-8 text-charcoal/70 sm:text-lg">
                LuxesCape Travel is a Triple BEE Certified company delivering more
                than daily and packaged tours. We create refined travel experiences
                across South Africa through luxury transport, curated tours, premium
                accommodation support, VIP protection and specialised event logistics.
              </p>

              <p className="mt-5 text-base leading-8 text-charcoal/70 sm:text-lg">
                Whether it is a quiet wine country weekend, a corporate itinerary, a
                safari escape or high-profile entertainment travel, every journey is
                built around integrity, respect, comfort and exceptional attention to
                detail.
              </p>

              {/* Service highlights */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Crown,
                    title: "VIP Ready",
                    text: "Premium arrangements for executives, guests and private travellers.",
                  },
                  {
                    icon: Shield,
                    title: "Trusted & Certified",
                    text: "Triple BEE Certified with professional, discreet service delivery.",
                  },
                  {
                    icon: Sparkles,
                    title: "Curated Experiences",
                    text: "Tours, stays and transport shaped around your pace and preferences.",
                  },
                  {
                    icon: Star,
                    title: "Luxury Detail",
                    text: "Every pickup, route and itinerary is handled with care.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="group rounded-3xl border border-charcoal/10 bg-white/70 p-5 shadow-[0_18px_50px_rgba(20,18,14,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_70px_rgba(20,18,14,0.10)]"
                  >
                    <div className="grid size-11 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                      <Icon size={20} strokeWidth={1.4} />
                    </div>

                    <h3 className="mt-5 font-display text-2xl leading-none text-charcoal">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-charcoal/60">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-charcoal bg-charcoal px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal"
                >
                  Our story
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-charcoal/15 bg-white/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-charcoal transition-all duration-500 hover:border-gold/50 hover:text-gold"
                >
                  Explore services
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline mx-auto max-w-[1200px]" />

      {/* SIGNATURE TOURS — mobile luxury carousel + desktop broken grid */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-24 md:py-28">
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between reveal">
          <div>
            <p className="eyebrow">Signature</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
              Tours, curated for
              <span className="italic text-gold">comfort</span> and <span className="italic text-gold">unforgettable</span> moments.
            </h2>

            {/* Mobile-only supporting copy */}
            <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal/65 md:hidden">
              Handpicked Cape experiences designed for comfort, elegance and unforgettable
              moments.
            </p>
          </div>

          <Link
            to="/tours"
            className="link-gold inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.2em]"
          >
            View all tours <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile-only tour showcase */}
        <div className="md:hidden">
          {/* Featured mobile card */}
          {TOURS.slice(0, 1).map((tour) => (
            <Link
              key={tour.slug}
              to="/tours"
              className="group relative block overflow-hidden rounded-[2rem] bg-charcoal shadow-[0_24px_80px_rgba(20,18,14,0.22)]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,166,68,0.22),transparent_34%)]" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-ivory/15 bg-charcoal/35 px-4 py-2 backdrop-blur-md">
                  <Star size={13} className="fill-gold/60 text-gold" strokeWidth={1.4} />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/80">
                    Featured Escape
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
                      {tour.duration}
                    </span>
                    <span className="rounded-full border border-ivory/15 bg-ivory/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory/75">
                      From R{tour.price.toLocaleString("en-ZA")}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl leading-none">
                    {tour.name}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-ivory/72">
                    {tour.desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/55">
                      Private curated tour
                    </span>

                    <span className="grid size-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-transform duration-500 group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Mobile horizontal cards */}
          <div className="mt-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-4">
              {TOURS.slice(1, 7).map((tour, index) => (
                <Link
                  key={tour.slug}
                  to="/tours"
                  className="group w-[78vw] max-w-[315px] flex-none snap-start overflow-hidden rounded-[1.6rem] border border-charcoal/10 bg-white shadow-[0_18px_55px_rgba(20,18,14,0.10)]"
                >
                  <div className="relative h-48 overflow-hidden bg-charcoal">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full border border-ivory/15 bg-charcoal/35 px-3 py-1.5 backdrop-blur-md">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/80">
                        0{index + 2}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                        {tour.duration}
                      </span>

                      <span className="text-[10px] uppercase tracking-[0.18em] text-ivory/80">
                        From R{tour.price.toLocaleString("en-ZA")}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-2xl leading-tight text-charcoal">
                      {tour.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/65">
                      {tour.desc}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
                        Explore
                      </span>

                      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                        View <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile hint strip */}
          <div className="mt-4 flex items-center justify-between rounded-full border border-charcoal/10 bg-charcoal/[0.03] px-4 py-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
              Swipe to explore
            </span>
            <span className="h-px flex-1 mx-4 bg-gradient-to-r from-gold/50 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
              7 tours
            </span>
          </div>
        </div>

        {/* Desktop grid — unchanged */}
        <div className="hidden gap-6 md:grid md:grid-cols-12 md:auto-rows-[280px]">
          {TOURS.slice(0, 7).map((t, i) => {
            const spans = [
              "md:col-span-8 md:row-span-2",
              "md:col-span-4 md:row-span-1",
              "md:col-span-4 md:row-span-1",
              "md:col-span-5 md:row-span-2",
              "md:col-span-4 md:row-span-1",
              "md:col-span-3 md:row-span-1",
              "md:col-span-7 md:row-span-1",

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
                  <h3 className="font-display text-2xl lg:text-3xl mt-1">
                    {t.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SERVICE STRIP w/ luxury car */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img
          src={carImg}
          alt="Luxury chauffeur"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          width={1600}
          height={1100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12 py-32 grid gap-12 lg:grid-cols-2 items-center">
          <div className="reveal">
            <p className="eyebrow">Beyond tours</p>
            <h2 className="mt-5 font-display text-5xl lg:text-6xl">
              A complete service ecosystem.
            </h2>
            <p className="mt-6 text-ivory/75 text-lg max-w-lg">
              VIP services, chauffeur, group shuttles, corporate travel, event
              management, luxury accommodation, concierge, bulletproof vehicles
              and fully-armed CPOs.
            </p>
            <Link to="/services" className="btn-gold mt-10">
              All services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { i: Crown, t: "VIP Services" },
              { i: Shield, t: "Close Protection" },
              { i: Sparkles, t: "Concierge" },
              { i: Star, t: "Event Management" },
            ].map(({ i: Icon, t }) => (
              <div
                key={t}
                className="border border-ivory/15 p-6 hover:border-gold/60 transition-colors group"
              >
                <Icon className="text-gold" size={28} strokeWidth={1.2} />
                <p className="mt-6 font-display text-xl">{t}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/50 group-hover:text-gold">
                  Discover →
                </p>
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
          Tell us how you travel. We'll handle the rest, transport, protection,
          stays and every detail in between.
        </p>
        <Link
          to="/contact"
          className="btn-gold mt-10 reveal"
          style={{ borderColor: "var(--color-charcoal)" }}
        >
          Plan my journey <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}