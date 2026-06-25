import tableMountain from "@/assets/hero-mountain.jpg";
import safari from "@/assets/safari.jpg";
import kirstenbosch from "@/assets/kirstenbosch.jpg";
import hermanus from "@/assets/hermanus.jpg";
import gardenRoute from "@/assets/garden-route.jpg";
import winelands from "@/assets/winelands.jpg";
import peninsula from "@/assets/peninsula.jpg";

export const TOURS = [
  { slug: "table-mountain", name: "Table Mountain", duration: "Half day", price: 1450, image: tableMountain,
    desc: "Cable car ascent to one of the New 7 Wonders of Nature with panoramic Cape Town views." },
  { slug: "safari", name: "Safari Experience", duration: "2–3 days", price: 18500, image: safari,
    desc: "Private Big Five safari with luxury lodge stay and an expert ranger." },
  { slug: "kirstenbosch", name: "Kirstenbosch Botanical Gardens", duration: "Half day", price: 950, image: kirstenbosch,
    desc: "Walk Africa's most beautiful garden beneath the slopes of Table Mountain." },
  { slug: "hermanus", name: "Hermanus", duration: "Full day", price: 2200, image: hermanus,
    desc: "Coastal escape known as the world's best land-based whale watching." },
  { slug: "garden-route", name: "Garden Route", duration: "3–5 days", price: 14500, image: gardenRoute,
    desc: "A journey along forests, lagoons and dramatic coastline." },
  { slug: "cape-winelands", name: "Cape Winelands", duration: "Full day", price: 2750, image: winelands,
    desc: "Curated cellar tastings across Stellenbosch, Franschhoek and Constantia." },
  { slug: "cape-peninsula", name: "Cape Peninsula", duration: "Full day", price: 2450, image: peninsula,
    desc: "Chapman's Peak, Cape Point and Boulders penguin colony in one elegant loop." },
];

export const SERVICES = [
  { slug: "vip", name: "VIP Services", icon: "Crown",
    desc: "Personalised assistance, premium private transfers and tailored arrangements. We focus on comfort, efficiency and professional support to ensure a smooth and exceptional travel experience." },
  { slug: "chauffeur", name: "Chauffeur Services", icon: "Car",
    desc: "Reliable, comfortable and professional private transport. Punctual pickups, experienced drivers and luxury vehicles tailored to your needs — from airport transfers to private tours." },
  { slug: "group-shuttles", name: "Group Shuttles (Conferences & Congresses)", icon: "Bus",
    desc: "Reliable and efficient shuttle services for groups and individuals attending conferences, congresses or corporate events. Punctual pickups, comfortable transport, seamless transfers." },
  { slug: "corporate", name: "Corporate Travel", icon: "Briefcase",
    desc: "Tailored corporate travel solutions for punctual, comfortable and professional transport. Customised for executives, teams and organisations to make every trip seamless." },
  { slug: "event-management", name: "Event Management", icon: "CalendarHeart",
    desc: "Coordination of concerts, comedy festivals and musical productions. VIP support, logistics and seamless planning to world-class standards." },
  { slug: "accommodation", name: "Luxury Accommodation", icon: "BedDouble",
    desc: "Carefully selected luxury stays offering comfort, exclusivity and premium amenities — tailored for leisure travellers, executives and VIP guests." },
  { slug: "concierge", name: "Concierge Connect", icon: "Sparkles",
    desc: "Personalised assistance for reservations, arrangements and specialised requests — from dining and activities to tailored travel support." },
  { slug: "travel-tourism", name: "Travel & Tourism", icon: "Map",
    desc: "Personalised travel and tourism services designed to make every stay in Cape Town truly memorable — itineraries, guided experiences, transport and accommodation." },
  { slug: "bulletproof", name: "Bulletproof Vehicles", icon: "ShieldCheck",
    desc: "Secure, discreet and fully armoured vehicles for high-profile clients, executives and VIP travellers — without compromising on luxury or performance." },
  { slug: "cpos", name: "CPOs — Fully Armed & Trained", icon: "Shield",
    desc: "Close Protection Officers, expertly trained and fully armed, providing discreet professional security with multicalibre proficiency to ensure your safety." },
];
