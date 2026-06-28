import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Instagram, Send, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Luxescape Travel" },
      { name: "description", content: "Get in touch to plan your journey. hello@luxescapetravel.co.za" },
      { property: "og:title", content: "Contact - Luxescape Travel" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [state, setState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert([state]);
    if (error) {
      toast.error("Could not send. Please try again or email us directly.");
      setStatus("idle");
      return;
    }
    setStatus("sent");
    setState({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent. We'll be in touch shortly.");
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className="bg-ivory text-charcoal">
      <Toaster richColors position="top-center" />
      <section className="pt-40 pb-20 px-6 lg:px-12 mx-auto max-w-[1500px] grid gap-16 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">Reach out</p>
          <h1 className="mt-5 font-display text-6xl lg:text-7xl leading-[1]">
            Let's craft <span className="italic text-gold">something rare</span>.
          </h1>
          <p className="mt-8 max-w-lg text-lg text-charcoal/70">
            Tell us about the journey, the people, the moment. We'll handle every detail with discretion.
          </p>
          <div className="mt-12 space-y-4">
            <a href="mailto:hello@luxescapetravel.co.za" className="flex items-center gap-4 group">
              <span className="grid h-12 w-12 place-items-center border border-gold text-gold group-hover:bg-gold group-hover:text-charcoal transition"><Mail size={18} /></span>
              <span className="link-gold">hello@luxescapetravel.co.za</span>
            </a>
            <a href="https://www.instagram.com/luxescape.travel" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <span className="grid h-12 w-12 place-items-center border border-gold text-gold group-hover:bg-gold group-hover:text-charcoal transition"><Instagram size={18} /></span>
              <span className="link-gold">@luxescape.travel</span>
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="reveal bg-charcoal text-ivory p-8 lg:p-12 space-y-6">
          <Field label="Full name" value={state.name} onChange={(v) => setState({ ...state, name: v })} required />
          <Field label="Email" type="email" value={state.email} onChange={(v) => setState({ ...state, email: v })} required />
          <Field label="Subject" value={state.subject} onChange={(v) => setState({ ...state, subject: v })} />
          <div>
            <label className="eyebrow block mb-2">Message</label>
            <textarea
              required
              value={state.message}
              onChange={(e) => setState({ ...state, message: e.target.value })}
              rows={5}
              className="w-full bg-transparent border-b border-ivory/30 focus:border-gold outline-none py-3 text-ivory placeholder:text-ivory/40 resize-none"
              placeholder="Tell us about your journey..."
            />
          </div>
          <button type="submit" disabled={status !== "idle"} className="btn-gold w-full justify-center">
            {status === "sending" && <><Loader2 className="animate-spin" size={16} /> Sending</>}
            {status === "sent" && <><Check size={16} /> Sent</>}
            {status === "idle" && <>Send message <Send size={16} /></>}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-ivory/30 focus:border-gold outline-none py-3 text-ivory"
      />
    </div>
  );
}
