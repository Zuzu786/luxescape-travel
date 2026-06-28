import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Compass,
  Crown,
  Expand,
  MapPin,
  Mountain,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { TOURS } from "@/lib/tours-data";
import chauffeurImg from "@/assets/luxury-car.jpg";
import heroImg from "@/assets/hero-mountain.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery - Luxescape Travel" },
      {
        name: "description",
        content: "Moments from journeys across South Africa.",
      },
      { property: "og:title", content: "Gallery - Luxescape Travel" },
    ],
  }),
  component: Gallery,
});

const premiumEase = [0.22, 1, 0.36, 1] as const;

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: premiumEase },
  },
};

function getCategory(slug: string) {
  if (slug.includes("safari")) return "Safari";
  if (slug.includes("wine")) return "Winelands";
  if (slug.includes("garden")) return "Coastline";
  if (slug.includes("hermanus")) return "Coastline";
  if (slug.includes("peninsula")) return "Cape Peninsula";
  return "Cape Town";
}

const gridSpans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

const galleryItems = [
  {
    src: heroImg,
    title: "Table Mountain at dusk",
    category: "Cape Town",
    eyebrow: "Golden Hour",
    description:
      "A cinematic Cape Town arrival framed by mountain light, ocean air and city energy.",
    span: "md:col-span-2 md:row-span-2",
  },
  ...TOURS.filter((tour) => tour.slug !== "table-mountain").map((tour, index) => ({
    src: tour.image,
    title: tour.name,
    category: getCategory(tour.slug),
    eyebrow: tour.duration,
    description: tour.desc,
    price: tour.price,
    span: gridSpans[index % gridSpans.length],
  })),
  {
    src: chauffeurImg,
    title: "Private Chauffeur Services",
    category: "VIP Travel",
    eyebrow: "Executive Fleet",
    description:
      "Discreet, comfortable and reliable private travel for airport transfers, events and executive itineraries.",
    span: "md:col-span-2 md:row-span-1",
  },
];

const categories = [
  "All",
  "Cape Town",
  "Safari",
  "Winelands",
  "Coastline",
  "Cape Peninsula",
  "VIP Travel",
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedIndex]);

  const openItem = (index: number) => {
    setSelectedIndex(index);
  };

  const goPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return current === 0 ? filteredItems.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return current === filteredItems.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <div className="bg-ivory text-charcoal">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-ivory">
        <img
          src={heroImg}
          alt="Cape Town mountain landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          width={1920}
          height={1280}
          loading="eager"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/45 to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(215,166,68,0.22),transparent_32%),radial-gradient(circle_at_70%_20%,rgba(255,244,214,0.10),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.68)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1500px] items-center justify-center px-6 pb-16 pt-40 text-center lg:px-12 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mx-auto flex max-w-5xl flex-col items-center"
          >
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-3 rounded-full border border-gold/25 bg-ivory/[0.055] px-4 py-2 backdrop-blur-md"
            >
              <Camera size={15} className="text-gold" strokeWidth={1.4} />
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">
                Moments Across South Africa
              </p>
            </motion.div>

            <motion.h1
              variants={revealUp}
              className="mt-6 font-display text-[clamp(4rem,11vw,10rem)] leading-[0.86] tracking-[-0.055em]"
            >
              Gallery.
            </motion.h1>

            <motion.p
              variants={revealUp}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ivory/70 sm:text-lg"
            >
              A visual collection of luxury tours, coastal escapes, safari
              experiences, private transfers and unforgettable Cape moments.
            </motion.p>

            <motion.div
              variants={revealUp}
              className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3"
            >
              {[
                { icon: Mountain, value: "Cape", label: "Landscapes" },
                { icon: Crown, value: "VIP", label: "Travel Moments" },
                { icon: Sparkles, value: "Curated", label: "Experiences" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-ivory/10 bg-ivory/[0.055] p-5 backdrop-blur-md"
                >
                  <Icon
                    size={20}
                    className="mx-auto text-gold"
                    strokeWidth={1.4}
                  />
                  <p className="mt-4 font-display text-3xl leading-none">
                    {value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ivory/45">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY INTRO + FILTERS */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-charcoal/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] text-center">
          <div className="mx-auto max-w-4xl reveal">
            <p className="eyebrow">The experience</p>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
              Every frame tells a{" "}
              <span className="italic text-gold">luxury journey.</span>
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-fit min-w-max justify-center gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setSelectedIndex(null);
                    }}
                    className={`rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-500 ${isActive
                      ? "border-charcoal bg-charcoal text-ivory shadow-[0_16px_45px_rgba(20,18,14,0.16)]"
                      : "border-charcoal/10 bg-white/60 text-charcoal/55 hover:border-gold/50 hover:text-gold"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED MOBILE CARD */}
      <section className="px-6 pb-8 md:hidden">
        <div className="mx-auto max-w-[1500px]">
          {filteredItems.slice(0, 1).map((item, index) => (
            <button
              key={`${item.title}-featured`}
              type="button"
              onClick={() => openItem(index)}
              className="group relative block w-full overflow-hidden rounded-[2rem] bg-charcoal text-left shadow-[0_24px_80px_rgba(20,18,14,0.20)]"
              aria-label={`Open ${item.title}`}
            >
              <div className="relative h-[470px] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,166,68,0.20),transparent_34%)]" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-ivory/15 bg-charcoal/35 px-4 py-2 backdrop-blur-md">
                  <Star
                    size={13}
                    className="fill-gold/60 text-gold"
                    strokeWidth={1.4}
                  />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/80">
                    Featured Moment
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
                      {item.eyebrow}
                    </span>
                    <span className="rounded-full border border-ivory/15 bg-ivory/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory/75">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl leading-none">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-ivory/72">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/55">
                      Tap to preview
                    </span>

                    <span className="grid size-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                      <Expand size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="mx-auto max-w-[1500px] px-6 pb-24 lg:px-12 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: premiumEase }}
            className="grid auto-rows-[145px] grid-cols-2 gap-4 sm:auto-rows-[180px] lg:grid-cols-12 lg:auto-rows-[280px] lg:gap-6"
          >
            {filteredItems.map((item, index) => {
              const mobileSpans = [
                "col-span-2 row-span-3",
                "col-span-1 row-span-2",
                "col-span-1 row-span-2",
                "col-span-2 row-span-2",
                "col-span-1 row-span-2",
                "col-span-1 row-span-2",
                "col-span-2 row-span-2",
                "col-span-2 row-span-2",
                "col-span-2 row-span-2",
              ];

              const desktopSpans = [
                "lg:col-span-8 lg:row-span-2",
                "lg:col-span-4 lg:row-span-1",
                "lg:col-span-4 lg:row-span-1",
                "lg:col-span-5 lg:row-span-2",
                "lg:col-span-4 lg:row-span-1",
                "lg:col-span-3 lg:row-span-1",
                "lg:col-span-7 lg:row-span-1",
                "lg:col-span-5 lg:row-span-1",
                "lg:col-span-7 lg:row-span-1",
              ];

              const isVipTravel = item.category === "VIP Travel";

              const spanClass = isVipTravel
                ? `${mobileSpans[index % mobileSpans.length]} lg:col-span-12 lg:row-span-1`
                : `${mobileSpans[index % mobileSpans.length]} ${desktopSpans[index % desktopSpans.length]
                }`;

              const isLargeMobile = index === 0 || index === 6;
              const isLargeDesktop = index === 0 || index === 3 || isVipTravel;

              return (
                <button
                  key={`${item.title}-${activeCategory}`}
                  type="button"
                  onClick={() => openItem(index)}
                  className={`group relative overflow-hidden rounded-[1.6rem] bg-charcoal text-left shadow-[0_18px_55px_rgba(20,18,14,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(20,18,14,0.18)] lg:rounded-[2rem] ${spanClass}`}
                  aria-label={`Open ${item.title}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(215,166,68,0.16),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ivory/15 bg-charcoal/35 px-3 py-2 backdrop-blur-md">
                    <MapPin size={12} className="text-gold" strokeWidth={1.4} />
                    <span className="text-[9px] uppercase tracking-[0.18em] text-ivory/75">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory/70 backdrop-blur-md transition-all duration-500 group-hover:border-gold/40 group-hover:text-gold lg:opacity-0 lg:group-hover:opacity-100">
                    <Expand size={15} />
                  </div>

                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5 lg:p-6">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-gold/85 sm:text-[10px]">
                      {item.eyebrow}
                    </p>

                    <h3
                      className={`mt-2 font-display leading-none ${isLargeMobile
                          ? "text-3xl sm:text-4xl"
                          : "text-2xl sm:text-3xl"
                        } ${isLargeDesktop
                          ? "lg:text-5xl"
                          : "lg:text-3xl"
                        }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-3 max-w-lg text-sm leading-6 text-ivory/66 ${isLargeMobile || isLargeDesktop
                          ? "line-clamp-3"
                          : "line-clamp-2 lg:translate-y-2 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                        }`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3 border-t border-ivory/10 pt-4 lg:hidden">
                      <span className="text-[9px] uppercase tracking-[0.22em] text-ivory/45">
                        Tap to preview
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
                    </div>
                  </figcaption>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-charcoal/10 bg-white/60 p-5 text-center shadow-[0_18px_55px_rgba(20,18,14,0.06)] sm:flex-row sm:text-left lg:mt-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-charcoal/45">
              Curated Gallery
            </p>
            <p className="mt-2 font-display text-2xl text-charcoal">
              Want the full experience?
            </p>
          </div>

          <Link
            to="/tours"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-charcoal bg-charcoal px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal sm:w-auto"
          >
            Explore Tours
            <ArrowRight
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/94 px-4 py-4 text-ivory backdrop-blur-xl sm:px-6 sm:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} gallery preview`}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-30 grid size-11 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold sm:right-6 sm:top-6"
              aria-label="Close gallery preview"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold lg:grid"
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold lg:grid"
              aria-label="Next gallery image"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            <motion.div
              key={selectedItem.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.55, ease: premiumEase }}
              className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-ivory/15 bg-ivory/[0.055] shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:max-h-[calc(100svh-3rem)] lg:grid lg:grid-cols-[1.35fr_0.65fr]"
            >
              <div className="relative h-[48svh] min-h-[300px] overflow-hidden lg:h-full lg:min-h-[640px]">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent lg:hidden" />
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-gold">
                    <Compass size={14} strokeWidth={1.4} />
                    <span className="text-[10px] uppercase tracking-[0.24em]">
                      {selectedItem.category}
                    </span>
                  </div>

                  <p className="mt-7 text-[10px] uppercase tracking-[0.28em] text-ivory/45">
                    {selectedItem.eyebrow}
                  </p>

                  <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
                    {selectedItem.title}
                  </h2>

                  <p className="mt-6 text-sm leading-7 text-ivory/68 sm:text-base sm:leading-8">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-ivory/10 pt-5">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-ivory/45">
                    {selectedIndex + 1} / {filteredItems.length}
                  </span>

                  <div className="flex gap-2 lg:hidden">
                    <button
                      type="button"
                      onClick={goPrevious}
                      className="grid size-10 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory"
                      aria-label="Previous gallery image"
                    >
                      <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="grid size-10 place-items-center rounded-full border border-ivory/15 bg-ivory/10 text-ivory"
                      aria-label="Next gallery image"
                    >
                      <ChevronRight size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  <Link
                    to="/tours"
                    className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-ivory sm:inline-flex"
                  >
                    Explore Tours <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}