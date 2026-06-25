import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-ivory">
      <div className="hairline" />
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center border border-gold text-gold font-display text-2xl">L</span>
            <div>
              <p className="font-display text-2xl">Luxescape Travel</p>
              <p className="eyebrow mt-1">Triple BEE Certified · South Africa</p>
            </div>
          </div>
          <p className="max-w-md text-ivory/70 leading-relaxed">
            World-class, personalised travel through integrity, respect and care. Tours, luxury transport, VIP protection and event support across South Africa.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://www.instagram.com/luxescape.travel" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition">
              <Instagram size={18} />
            </a>
            <a href="mailto:hello@luxescapetravel.co.za" className="grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-ivory/80">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/tours" className="hover:text-gold">Tours</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Reach Us</p>
          <ul className="space-y-3 text-ivory/80">
            <li><a href="mailto:hello@luxescapetravel.co.za" className="hover:text-gold">hello@luxescapetravel.co.za</a></li>
            <li><a href="https://www.instagram.com/luxescape.travel" target="_blank" rel="noreferrer" className="hover:text-gold">@luxescape.travel</a></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center text-xs uppercase tracking-[0.25em] text-ivory/50">
        © {new Date().getFullYear()} Luxescape Travel · Crafted with care
      </div>
    </footer>
  );
}
