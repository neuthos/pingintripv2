import {companyInfo} from "./company";

export interface ConditionSection {
  id: string;
  title: string;
  content: string[];
  items?: string[];
}

export const bookingConditionsMeta = {
  lastUpdated: "2025-03-12",
  contactEmail: companyInfo.email,
  companyName: companyInfo.legalName,
};

export const bookingConditionsSections: ConditionSection[] = [
  {
    id: "agreement",
    title: "Booking Agreement",
    content: [
      `By making a booking with ${companyInfo.legalName} ("Pingintrip", "we", "our", or "us"), you ("the Client", "you", or "your") agree to the following terms and conditions. These conditions form the basis of the contract between you and Pingintrip.`,
      "Please read these conditions carefully before confirming your booking. If you have any questions, please contact us before proceeding.",
    ],
  },
  {
    id: "reservation",
    title: "Making a Reservation",
    content: [
      "To make a reservation, you can submit an enquiry through our website, contact us via WhatsApp, email, or phone. Once we receive your enquiry, our team will prepare a personalized itinerary and quote within 24 hours.",
    ],
    items: [
      "All quotations are valid for 7 days from the date of issue",
      "Prices are quoted in Indonesian Rupiah (IDR), with estimates available in USD and CNY",
      "A booking is confirmed only after receiving the required deposit and a written confirmation from Pingintrip",
      "The person making the booking must be at least 18 years of age and is responsible for all members of the travel party",
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      "We require payment according to the following schedule:",
    ],
    items: [
      "Deposit: 30% of the total trip cost is required to confirm your booking",
      "Balance: The remaining 70% is due no later than 14 days before your trip start date",
      "Late bookings (within 14 days of departure): Full payment is required at the time of booking",
      "Payment methods: Bank transfer, credit/debit card (Visa, Mastercard), and digital payment via Xendit",
      "All bank charges and transfer fees are the responsibility of the Client",
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Inclusions",
    content: [
      "All trip prices are based on the services and inclusions specified in your personalized quote. Prices may vary based on:",
    ],
    items: [
      "Number of travelers in your group",
      "Travel dates and season (peak vs. off-peak rates may apply)",
      "Accommodation category selected",
      "Activities and excursions chosen",
      "Special requests or add-on services",
    ],
  },
  {
    id: "changes-by-client",
    title: "Changes by the Client",
    content: [
      "If you wish to make changes to your confirmed booking, please contact us as soon as possible. We will do our best to accommodate your requests, subject to availability.",
    ],
    items: [
      "Minor changes (e.g., switching activities within the same day): Usually free of charge if made 7+ days before the trip",
      "Major changes (e.g., changing dates, adding/removing travelers, changing accommodation): May incur additional charges depending on supplier policies",
      "Date changes: Subject to availability and potential price adjustments based on the new travel period",
      "Requests made within 7 days of departure may not always be possible to accommodate",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation by the Client",
    content: [
      "If you need to cancel your booking, please notify us in writing (email or WhatsApp). The following cancellation fees apply, calculated based on the total trip cost:",
    ],
    items: [
      "30+ days before departure: Full refund minus IDR 500,000 processing fee per person",
      "14–29 days before departure: 50% of total trip cost",
      "7–13 days before departure: 75% of total trip cost",
      "Less than 7 days before departure or no-show: 100% of total trip cost (no refund)",
    ],
  },
  {
    id: "cancellation-by-us",
    title: "Cancellation by Pingintrip",
    content: [
      "We reserve the right to cancel a trip in the following circumstances:",
    ],
    items: [
      "Force majeure: Natural disasters, volcanic eruptions, severe weather, pandemics, government restrictions, or other events beyond our control",
      "Safety concerns: If conditions are deemed unsafe for travelers",
      "Minimum group size not met (Open Trips only): We will notify you at least 7 days before departure",
    ],
  },
  {
    id: "itinerary-changes",
    title: "Itinerary Changes",
    content: [
      "While we make every effort to operate trips as described, circumstances may require changes to the published itinerary. These may include:",
    ],
    items: [
      "Route or destination changes due to weather, road conditions, or safety reasons",
      "Substitution of accommodation of equivalent or higher standard",
      "Adjustment of activity timings",
      "Changes in local regulations or permit requirements",
    ],
  },
  {
    id: "responsibilities",
    title: "Client Responsibilities",
    content: [
      "By booking with Pingintrip, you agree to:",
    ],
    items: [
      "Provide accurate personal information for all travelers at the time of booking",
      "Ensure all travelers have valid travel documents (passport, visa) for entry into Indonesia",
      "Inform us of any medical conditions, dietary requirements, or allergies that may affect your trip",
      "Follow the instructions and safety guidelines provided by your guide",
      "Behave responsibly and respect local customs, culture, and the environment",
      "Obtain adequate travel insurance before departure",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      "Pingintrip acts as a tour operator and uses third-party service providers including hotels, transport operators, and activity providers. While we carefully select our partners and maintain quality standards:",
    ],
    items: [
      "We are not liable for any injury, loss, damage, or expense arising from events outside our control (force majeure)",
      "We are not liable for any loss or damage to personal belongings during the trip",
      "Our liability for any claim is limited to the total amount paid for the trip",
      "We strongly recommend purchasing comprehensive travel insurance to protect against unforeseen circumstances",
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    content: [
      "Your satisfaction is our top priority. If you have any concerns during your trip:",
    ],
    items: [
      "Please inform your guide immediately so we can address the issue on the spot",
      "If the issue cannot be resolved during the trip, please submit a written complaint within 14 days of your trip end date",
      `Send all complaints to ${companyInfo.email} with your booking reference and a detailed description of the issue`,
      "We will acknowledge your complaint within 48 hours and aim to resolve it within 14 business days",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      `If you have any questions about these Booking Conditions, please contact us:`,
      `Company: ${companyInfo.legalName}`,
      `Address: ${companyInfo.address}`,
      `Email: ${companyInfo.email}`,
      `Phone: ${companyInfo.phoneFormatted}`,
    ],
  },
];
