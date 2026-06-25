import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Luxescape Travel" },
      { name: "description", content: "Frequently asked questions about Luxescape Travel tours, transport and VIP services." },
      { property: "og:title", content: "FAQ — Luxescape Travel" },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { q: "Where do you operate?", a: "We operate across South Africa with a strong base in Cape Town, including the Cape Winelands, Garden Route, Hermanus, and on-request safari destinations." },
  { q: "Do you only offer tours?", a: "No. Beyond daily and packaged tours, we provide chauffeur services, group shuttles, corporate travel, event management, luxury accommodation, concierge, bulletproof vehicles and Close Protection Officers." },
  { q: "Are your vehicles licensed and insured?", a: "Yes. All vehicles are fully licensed, insured and maintained to the highest standard. Bulletproof options and armed CPOs are available for high-profile clients." },
  { q: "Can you support live events?", a: "Absolutely — we coordinate concerts, comedy festivals and musical productions with VIP support, logistics and seamless planning." },
  { q: "How do I book?", a: "Use the contact form or email hello@luxescapetravel.co.za. We'll respond with a tailored proposal." },
  { q: "Do you accept international clients?", a: "Yes. We handle international guests regularly and tailor every detail of the stay." },
];

function FAQ() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-20 px-6 lg:px-12 mx-auto max-w-3xl">
        <p className="eyebrow reveal">Questions</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-7xl">FAQ.</h1>
        <Accordion type="single" collapsible className="mt-14 reveal">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-charcoal/20">
              <AccordionTrigger className="text-left font-display text-xl py-6 hover:text-gold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-charcoal/70 leading-relaxed text-base">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
