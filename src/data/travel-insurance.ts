import {companyInfo} from "./company";

export interface InsuranceCoverage {
  title: string;
  description: string;
  icon: string;
}

export interface InsuranceProvider {
  name: string;
  website: string;
  description: string;
}

export interface InsuranceTip {
  title: string;
  description: string;
}

export const insuranceMeta = {
  lastUpdated: "2025-03-12",
  contactEmail: companyInfo.email,
  companyName: companyInfo.legalName,
};

export const insuranceIntro = {
  title: "Travel Insurance",
  description:
    "While we take every precaution to ensure your safety and comfort during your trip with Pingintrip, unexpected situations can arise. Travel insurance gives you peace of mind and financial protection, so you can focus on enjoying your adventure.",
  recommendation:
    "We strongly recommend that all travelers purchase comprehensive travel insurance before departing for their trip. It is a requirement for certain activities such as Mount Rinjani trekking and scuba diving.",
};

export const essentialCoverages: InsuranceCoverage[] = [
  {
    title: "Medical Emergencies",
    description:
      "Coverage for hospital stays, doctor visits, emergency evacuation, and repatriation. This is especially important for adventure activities like hiking, diving, and surfing in remote areas.",
    icon: "heart-pulse",
  },
  {
    title: "Trip Cancellation",
    description:
      "Reimbursement for prepaid trip costs if you need to cancel due to illness, injury, family emergency, or other covered reasons before your departure date.",
    icon: "calendar-x",
  },
  {
    title: "Trip Interruption",
    description:
      "Coverage if you need to cut your trip short and return home early due to an emergency. This typically covers unused portions of your trip and additional travel costs.",
    icon: "plane",
  },
  {
    title: "Baggage & Personal Items",
    description:
      "Protection against lost, stolen, or damaged luggage and personal belongings during your trip. Make sure your policy covers electronics like cameras and phones.",
    icon: "luggage",
  },
  {
    title: "Travel Delays",
    description:
      "Reimbursement for additional expenses incurred due to significant flight delays, missed connections, or cancellations — including meals, accommodation, and rebooking fees.",
    icon: "clock",
  },
  {
    title: "Adventure Activities",
    description:
      "Standard travel insurance often excludes adventure sports. Make sure your policy covers activities like trekking, snorkeling, diving, surfing, and waterfall rappelling.",
    icon: "mountain",
  },
];

export const recommendedProviders: InsuranceProvider[] = [
  {
    name: "World Nomads",
    website: "https://www.worldnomads.com",
    description:
      "Popular among adventure travelers. Covers a wide range of activities including trekking, diving, and surfing. Easy online purchase and claims process.",
  },
  {
    name: "Allianz Travel Insurance",
    website: "https://www.allianz-travel.com",
    description:
      "Comprehensive coverage options with 24/7 emergency assistance. Well-known global brand with a strong presence in Asia.",
  },
  {
    name: "SafetyWing",
    website: "https://www.safetywing.com",
    description:
      "Flexible subscription-based travel insurance ideal for longer trips. Affordable monthly plans with solid medical coverage.",
  },
  {
    name: "AXA Travel Insurance",
    website: "https://www.axa.com",
    description:
      "Offers various tiers of coverage for different budgets. Good option for families with comprehensive medical and cancellation coverage.",
  },
];

export const insuranceTips: InsuranceTip[] = [
  {
    title: "Buy early",
    description:
      "Purchase your travel insurance as soon as you book your trip. This ensures you're covered for trip cancellation from day one.",
  },
  {
    title: "Check activity coverage",
    description:
      "If you're planning adventure activities (Rinjani trek, diving, surfing), verify that your policy explicitly covers these activities. Some require an add-on.",
  },
  {
    title: "Keep documentation",
    description:
      "Save all receipts, medical reports, and police reports (in case of theft). These are essential for filing claims when you return home.",
  },
  {
    title: "Know your policy number",
    description:
      "Save your policy number and emergency contact number on your phone and share it with your travel companion. Have a printed copy in your luggage as backup.",
  },
  {
    title: "Declare pre-existing conditions",
    description:
      "Always disclose pre-existing medical conditions when purchasing insurance. Not doing so may invalidate your coverage when you need it most.",
  },
  {
    title: "Check regional coverage",
    description:
      "Make sure your policy covers Indonesia specifically, including remote areas like the Gili Islands, Komodo, and Mount Rinjani — not just major cities.",
  },
];
