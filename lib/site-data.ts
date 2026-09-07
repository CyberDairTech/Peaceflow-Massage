export const business = {
  name: "PeaceFlow Massage",
  therapist: "Maranda Jones",
  address: {
    line1: "336 Main St, Suite 218",
    city: "Grand Junction",
    state: "CO",
    zip: "81501",
  },
  phone: "970-739-9857",
  instagram: "@peaceflow_massage",
  instagramUrl: "https://instagram.com/peaceflow_massage",
};

export const hours = [
  { days: "Monday – Friday", time: "4:00pm – 8:00pm", note: "last massage 7:00pm" },
  { days: "Saturday", time: "8:00am – 12:00pm", note: "last massage 12:00pm" },
  { days: "Sunday", time: "1:00pm – 5:00pm", note: "last massage 5:00pm" },
];

export type Service = {
  slug: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
};

// Booking system reserves durationMinutes + 10 min buffer per the corrected
// service-duration mismatch noted in the project scope doc.
export const services: Service[] = [
  {
    slug: "deep-tissue-30",
    name: "Deep Tissue — 30 Minutes",
    durationMinutes: 30,
    price: 55,
    description:
      "A focused session on the areas holding the most tension — perfect between workouts or on a tight schedule.",
  },
  {
    slug: "deep-tissue-60",
    name: "Deep Tissue — 60 Minutes",
    durationMinutes: 60,
    price: 95,
    description:
      "Our signature full-body deep tissue session, tailored to recovery for gym-goers and everyday tension alike.",
  },
  {
    slug: "deep-tissue-90",
    name: "Deep Tissue — 90 Minutes",
    durationMinutes: 90,
    price: 135,
    description:
      "Extended time for a full-body reset — ideal after a heavy training block or when it's been a while.",
  },
];

export const membership = {
  price: 105,
  cadence: "month",
  description:
    "One massage a month, member pricing on any extra visits, and priority booking in the 2-month window.",
};

export const gymPartners = [
  { name: "Lifted Gym", discount: "$15 off any session" },
];

export const cta = "Book with Me";
