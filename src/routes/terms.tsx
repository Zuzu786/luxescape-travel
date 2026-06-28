import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Luxescape Travel" },
      { name: "description", content: "Terms and conditions for Luxescape Travel services, including inclusions, payments, and cancellation policy." },
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
        <p className="reveal mt-4 text-sm uppercase tracking-[0.25em] text-charcoal/50">Effective 8 February 2026</p>

        <div className="mt-14 reveal text-charcoal/80 space-y-10 leading-relaxed text-lg">
          <Section title="Inclusions">
            <p>Costs include the following:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>All sightseeing trips</li>
              <li>Airport collections and airport departure transfers</li>
              <li>Entrance fees</li>
              <li>Vehicle, driver and fuel charges</li>
            </ul>
          </Section>

          <Section title="Exclusions">
            <p>Costs exclude the following: meals (lunch and dinner), accommodation (unless stipulated otherwise), any and all personal expenses, and flights.</p>
          </Section>

          <Section title="Accommodation">
            <p>Please note that all accommodation is subject to availability.</p>
          </Section>

          <Section title="Payment Terms">
            <p>A 50% deposit must be made as soon as a booking is confirmed, with the full balance of costs for the entire trip to be paid prior to departure.</p>
            <p className="mt-3">LuxesCape Travel accepts payment through forex/ZAR or EFT.</p>
          </Section>

          <Section title="Itinerary Flexibility">
            <p>Planned itineraries are flexible and can be adjusted to your needs. However, last minute special requests or changes to the itinerary — such as additional trips requested by the client — will result in additional charges.</p>
            <p className="mt-3">Prices are quoted at the ruling daily exchange rate as on 8 February 2026.</p>
          </Section>

          <Section title="Cancellation Policy">
            <ul className="mt-1 list-disc pl-6 space-y-2">
              <li>Cancellations <strong className="text-charcoal">6 weeks</strong> prior to departure incur a charge of <strong className="text-gold">35%</strong> of the total tour price.</li>
              <li>Cancellations <strong className="text-charcoal">4 weeks</strong> prior to departure incur a charge of <strong className="text-gold">50%</strong> of the total tour price.</li>
              <li>Cancellations within <strong className="text-charcoal">3 weeks or less</strong> of the specified date of tour incur a charge of <strong className="text-gold">100%</strong> of the total tour price.</li>
            </ul>
          </Section>

          <Section title="Insurance & Liability">
            <p>All vehicles carry the necessary insurances (vehicle and passenger liability insurances). LuxesCape Travel and its staff accept no responsibility and no liability whatsoever for any loss or damage to a client's belongings.</p>
            <p className="mt-3">If you wish to book any of our services and have any diagnosis and/or disability, please inform us in advance and we will do our utmost best to accommodate you.</p>
          </Section>

          <Section title="Additional Services">
            <p>We provide all dinner transfers throughout Cape Town. In addition to the package presented, we can arrange luxury accommodation at hotels or self-catering establishments.</p>
          </Section>

          <Section title="Pricing">
            <p>Please note that prices for our travel packages and services are subject to change without notification.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about these terms? Email <a href="mailto:hello@luxescapetravel.co.za" className="link-gold text-charcoal">hello@luxescapetravel.co.za</a>.</p>
          </Section>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-charcoal border-b border-charcoal/15 pb-3">{title}</h2>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}
