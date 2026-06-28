import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import lctLogo from "@/assets/lctlogo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tours", label: "Tours" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-charcoal/90 backdrop-blur-xl transition-all duration-500">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-3 text-ivory">
          <img
            src={lctLogo}
            alt="Luxescape Travel"
            className="h-12 w-auto max-w-[190px] object-contain lg:h-14 lg:max-w-[240px]"
          />
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

        <Link to="/book" className="hidden lg:inline-flex btn-gold">
          Book
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
          <Link to="/book" onClick={() => setOpen(false)} className="btn-gold mt-4">Book</Link>
        </div>
      )}
    </header>
  );
}
