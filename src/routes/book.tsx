import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { TOURS, SERVICES } from "@/lib/tours-data";
import { CheckCircle2, Loader2 } from "lucide-react";

const searchSchema = z.object({
  tour: z.string().optional(),
  service: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book a Journey - Luxescape Travel" },
      { name: "description", content: "Reserve a luxury tour or service with Luxescape Travel — bespoke Cape Town experiences." },
      { property: "og:title", content: "Book a Journey - Luxescape Travel" },
      { property: "og:description", content: "Reserve a luxury tour or service with Luxescape Travel." },
    ],
  }),
  component: BookPage,
});

const bookingSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  travel_date: z.string().optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(50),
  selection: z.string().min(1, "Please choose a tour or service"),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

function BookPage() {
  const { tour, service } = Route.useSearch();
  const defaultSelection = useMemo(() => {
    if (tour) return `tour:${tour}`;
    if (service) return `service:${service}`;
    return "";
  }, [tour, service]);

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    const v = parsed.data;
    const [kind, slug] = v.selection.split(":");
    const label =
      kind === "tour"
        ? TOURS.find((t) => t.slug === slug)?.name ?? slug
        : SERVICES.find((s) => s.slug === slug)?.name ?? slug;
    const composedMessage = `${kind === "tour" ? "Tour" : "Service"}: ${label}${v.message ? `\n\n${v.message}` : ""}`;

    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      full_name: v.full_name,
      email: v.email,
      phone: v.phone || null,
      travel_date: v.travel_date || null,
      guests: v.guests,
      message: composedMessage,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      <section className="pt-40 pb-12 px-6 lg:px-12 mx-auto max-w-[1200px]">
        <p className="eyebrow reveal">Reservations</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-8xl leading-[1]">
          Book your <span className="italic text-gold">journey</span>.
        </h1>
        <p className="reveal mt-6 max-w-2xl text-charcoal/70">
          Share a few details and our concierge will confirm availability within 24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 lg:px-12 pb-32">
        {done ? (
          <div className="border border-gold/40 bg-white p-10 lg:p-14 text-center">
            <CheckCircle2 className="mx-auto text-gold" size={48} />
            <h2 className="mt-6 font-display text-4xl">Request received</h2>
            <p className="mt-3 text-charcoal/70 max-w-md mx-auto">
              Thank you. A member of our concierge team will be in touch shortly to confirm your reservation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/tours" className="btn-ghost-gold">Browse more tours</Link>
              <Link to="/" className="btn-gold">Return home</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid lg:grid-cols-2 gap-6 border-t border-charcoal/15 pt-10">
            <Field label="Full name" name="full_name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Preferred travel date" name="travel_date" type="date" />
            <Field label="Guests" name="guests" type="number" defaultValue="2" min={1} max={50} required />

            <label className="block">
              <span className="block text-xs uppercase tracking-[0.25em] text-charcoal/60 mb-2">Tour or service</span>
              <select
                name="selection"
                defaultValue={defaultSelection}
                required
                className="w-full border border-charcoal/20 bg-white px-4 py-3 focus:border-gold outline-none"
              >
                <option value="">Select an option…</option>
                <optgroup label="Tours">
                  {TOURS.map((t) => (
                    <option key={t.slug} value={`tour:${t.slug}`}>{t.name} — from R{t.price.toLocaleString()}</option>
                  ))}
                </optgroup>
                <optgroup label="Services">
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={`service:${s.slug}`}>{s.name}</option>
                  ))}
                </optgroup>
              </select>
            </label>

            <label className="block lg:col-span-2">
              <span className="block text-xs uppercase tracking-[0.25em] text-charcoal/60 mb-2">Message (optional)</span>
              <textarea
                name="message"
                rows={5}
                maxLength={5000}
                placeholder="Anything we should know — group profile, occasion, dietary needs, accessibility…"
                className="w-full border border-charcoal/20 bg-white px-4 py-3 focus:border-gold outline-none"
              />
            </label>

            {err && <p className="lg:col-span-2 text-sm text-red-600">{err}</p>}

            <div className="lg:col-span-2 flex items-center justify-between pt-4 border-t border-charcoal/15">
              <p className="text-xs text-charcoal/50 max-w-sm">
                By submitting you agree to our concierge contacting you about this enquiry.
              </p>
              <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-60">
                {submitting ? <><Loader2 className="animate-spin" size={16} /> Sending…</> : "Request booking"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-charcoal/60 mb-2">
        {label}{required && <span className="text-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className="w-full border border-charcoal/20 bg-white px-4 py-3 focus:border-gold outline-none"
      />
    </label>
  );
}
