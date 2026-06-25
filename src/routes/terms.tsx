import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Luxescape Travel" },
      { name: "description", content: "Terms and conditions for Luxescape Travel services." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="pt-40 pb-24 px-6 lg:px-12 mx-auto max-w-3xl">
        <p className="eyebrow reveal">Legal</p>
        <h1 className="reveal mt-5 font-display text-6xl lg:text-7xl">Terms &amp; Conditions.</h1>
        <div className="prose prose-lg mt-14 reveal text-charcoal/80 space-y-8 leading-relaxed">
          <Section title="1. Bookings & Confirmations">
            All bookings are subject to availability and confirmation. A reservation is considered confirmed only upon receipt of written confirmation and required deposit from Luxescape Travel.
          </Section>
          <Section title="2. Payment">
            Payment terms vary by service. Deposits may be required to secure your booking, with the balance due before the start of services unless otherwise agreed in writing.
          </Section>
          <Section title="3. Cancellations">
            Cancellation fees apply in line with the timeframe and service booked. The exact policy is shared at the time of booking. Late cancellations may forfeit the full deposit.
          </Section>
          <Section title="4. Liability">
            Luxescape Travel acts as a coordinator of services. While we vet our partners and providers carefully, we are not liable for acts beyond our control, including weather, third-party disruptions or force majeure events.
          </Section>
          <Section title="5. Conduct">
            Guests are expected to act with respect to our team, partners and other guests. We reserve the right to terminate services for conduct that endangers safety or breaches local law.
          </Section>
          <Section title="6. Privacy">
            Personal information is collected only for the purpose of delivering your services and is treated confidentially. We do not sell or share client data with third parties.
          </Section>
          <Section title="7. Changes to Itinerary">
            Itineraries may change due to operational reasons. We will always seek the closest possible alternative of equal or higher standard.
          </Section>
          <Section title="8. Contact">
            Questions about these terms? Email <a href="mailto:hello@luxescapetravel.co.za" className="link-gold text-charcoal">hello@luxescapetravel.co.za</a>.
          </Section>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      <p className="mt-3">{children}</p>
    </div>
  );
}
