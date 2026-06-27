import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tours", label: "Tours" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-charcoal/90 backdrop-blur-xl border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-center gap-3 text-ivory">
          <span className="grid h-10 w-10 place-items-center border border-gold text-gold font-display text-xl">
            L
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg tracking-wide">Luxescape</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Travel</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[0.78rem] uppercase tracking-[0.18em] text-ivory">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-gold transition-colors hover:text-gold"
              activeProps={{ className: "text-gold link-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="link-gold flex items-center gap-1 uppercase tracking-[0.18em] hover:text-gold">
              Info <ChevronDown size={14} />
            </button>
            <div className="invisible absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 border border-gold/30 bg-charcoal opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-2 group-hover:opacity-100">
              <Link to="/faq" className="block px-5 py-3 text-ivory hover:bg-gold/10 hover:text-gold">FAQ</Link>
              <div className="hairline" />
              <Link to="/terms" className="block px-5 py-3 text-ivory hover:bg-gold/10 hover:text-gold">Terms &amp; Conditions</Link>
            </div>
          </div>
        </nav>

        <Link to="/contact" className="hidden lg:inline-flex btn-gold">
          Reserve
        </Link>

        <button
          aria-label="Menu"
          className="lg:hidden text-ivory"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-charcoal border-t border-gold/20 px-6 py-8 space-y-5 text-ivory">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block uppercase tracking-[0.2em] text-sm hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gold/20 space-y-3">
            <p className="eyebrow">Info</p>
            <Link to="/faq" onClick={() => setOpen(false)} className="block hover:text-gold">FAQ</Link>
            <Link to="/terms" onClick={() => setOpen(false)} className="block hover:text-gold">Terms &amp; Conditions</Link>
          </div>
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-4">Reserve</Link>
        </div>
      )}
    </header>
  );
}
