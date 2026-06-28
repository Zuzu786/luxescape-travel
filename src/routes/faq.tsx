import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Luxescape Travel" },
      { name: "description", content: "Frequently asked questions about LuxesCape Travel — luxury tours, VIP services, CPOs, bookings and more." },
      { property: "og:title", content: "FAQ — Luxescape Travel" },
    ],
  }),
  component: FAQ,
});

type FAQ = { q: string; a: string };

const general: FAQ[] = [
  {
    q: "What types of travel experiences does LuxesCape Travel offer?",
    a: "We specialise in luxury travel, including customised itineraries, exclusive experiences, corporate travel, and concierge services designed to create unforgettable journeys.",
  },
  {
    q: "How do I book a luxury trip or concierge service with LuxesCape Travel?",
    a: "Bookings can be made via our website (click \"Request a Quote\" on any of our services and we'll get back to you), by email, or by giving us a call directly. We then provide a personalised itinerary tailored to your preferences.",
  },
  {
    q: "Do you cater to corporate and executive travel needs?",
    a: "Yes. We offer tailored solutions for corporate clients, including executive transfers, conference shuttles, and fully managed business travel arrangements. Please contact us for more personalised information.",
  },
  {
    q: "Can you arrange VIP and tailored travel experiences?",
    a: "Absolutely. From private tours to exclusive events, our team designs unique experiences based on your individual requirements.",
  },
  {
    q: "What kind of security services do you provide for high-profile clients?",
    a: "We provide fully trained Close Protection Officers (CPOs), risk assessments, and secure transportation to ensure the safety and peace of mind of our clients.",
  },
  {
    q: "Are bulletproof vehicles or armed CPOs available upon request?",
    a: "Yes. We offer armoured vehicles and professional armed CPOs for clients requiring the highest level of security.",
  },
  {
    q: "Do you organise private and group tours?",
    a: "Yes — we arrange both individual and group travel, ensuring every client receives a seamless and personalised experience.",
  },
  {
    q: "How far in advance should I book for a seamless luxury experience?",
    a: "We recommend booking your experience as early as possible, especially for personalised or high-demand packages. An early booking allows us to secure availability and provide sufficient time for detailed planning.",
  },
];

const travelling: FAQ[] = [
  {
    q: "Do you provide support while I am travelling?",
    a: "Yes. Our concierge and support team remain available throughout your journey to assist with any changes, requests, or emergencies.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "Our policies vary depending on the service booked. We offer flexible options and partial refunds where applicable. Please refer to our Terms & Conditions for full details.",
  },
  {
    q: "How do you ensure privacy and discretion for high-profile clients?",
    a: "We prioritise confidentiality in every aspect of our service, from discreet planning to secure communications and personalised attention throughout your journey.",
  },
  {
    q: "Are your services available internationally?",
    a: "Yes — we offer worldwide travel planning and support to provide seamless experiences no matter the destination.",
  },
  {
    q: "How do you handle special requests or unique itineraries?",
    a: "Our team works closely with clients to create fully customised itineraries, accommodating unique experiences, special interests, and any personal requirements.",
  },
  {
    q: "How can I contact LuxesCape Travel for personalised assistance or a quote?",
    a: "You can reach us via our website contact form, email, or by phone. Our concierge team is ready to provide personalised guidance and a detailed quote for your travel plans.",
  },
];

function Group({ title, items }: { title: string; items: FAQ[] }) {
  return (
    <div className="reveal">
      <p className="eyebrow">{title}</p>
      <Accordion type="single" collapsible className="mt-6">
        {items.map((f, i) => (
          <AccordionItem key={i} value={`${title}-${i}`} className="border-charcoal/15">
            <AccordionTrigger className="text-left font-display text-xl lg:text-2xl py-6 hover:text-gold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-charcoal/70 leading-relaxed text-base pr-6">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function FAQ() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-12 px-6 lg:px-12 mx-auto max-w-3xl">
        <p className="eyebrow reveal">Questions</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-7xl">
          Frequently <span className="italic text-gold">asked</span>.
        </h1>
        <p className="reveal mt-6 text-charcoal/70 leading-relaxed">
          Not finding the answer you're looking for? Reach us via our contact form, email, or by phone — our concierge team is ready to provide personalised guidance and a detailed quote for your travel plans.
        </p>
      </section>

      <section className="px-6 lg:px-12 mx-auto max-w-3xl pb-16 space-y-14">
        <Group title="General" items={general} />
        <Group title="Travelling with LuxesCape" items={travelling} />
      </section>

      <section className="bg-charcoal text-ivory py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <h2 className="font-display text-4xl lg:text-5xl reveal">Still have questions?</h2>
          <p className="mt-4 text-ivory/70 reveal">Our concierge team responds within 24 hours.</p>
          <Link to="/contact" className="btn-gold mt-8 reveal">Contact us</Link>
        </div>
      </section>
    </div>
  );
}
