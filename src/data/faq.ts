export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: string; // lucide icon name
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "booking",
    title: "Booking & Reservations",
    icon: "calendar-check",
    items: [
      {
        question: "How do I book a trip with Pingintrip?",
        answer:
          "Simply browse our destinations, add the places you want to visit to your trip, and submit an enquiry through our website. Our team will get back to you within 24 hours with a personalized itinerary and quote. You can also contact us directly via WhatsApp or email.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 2–4 weeks in advance, especially during peak season (July–August and December–January). However, we can sometimes accommodate last-minute bookings depending on availability.",
      },
      {
        question: "Can I modify my booking after confirmation?",
        answer:
          "Yes! We understand plans can change. Minor modifications can usually be made free of charge up to 7 days before your trip. For major changes, please contact us as soon as possible and we'll do our best to accommodate your requests.",
      },
      {
        question: "Do I need to pay a deposit?",
        answer:
          "Yes, we require a 30% deposit to confirm your booking. The remaining balance is due 14 days before your trip start date. For bookings made within 14 days of the trip, full payment is required at the time of booking.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, credit/debit cards (Visa, Mastercard), and various digital payment methods through our secure payment partner Xendit. All payments are processed in Indonesian Rupiah (IDR), but we can provide quotes in USD or CNY.",
      },
    ],
  },
  {
    id: "trips",
    title: "Trips & Itineraries",
    icon: "map",
    items: [
      {
        question: "What's the difference between Open Trips and Custom Tours?",
        answer:
          "Open Trips are pre-scheduled group tours with fixed dates and itineraries — great for solo travelers or those looking for a social experience. Custom Tours are fully personalized trips designed around your preferences, schedule, and group — perfect for families, couples, or private groups.",
      },
      {
        question: "Can I customize my itinerary?",
        answer:
          "Absolutely! That's what we do best. Tell us your interests, must-see places, budget, and travel style, and we'll craft a fully personalized itinerary. You can adjust it as many times as you want before confirming.",
      },
      {
        question: "What's included in the trip price?",
        answer:
          "Typically, our packages include accommodation, private transport with driver, local guide, entrance fees to attractions, and some meals. The exact inclusions vary by package and are clearly listed in your personalized quote. Flights are usually not included unless specifically stated.",
      },
      {
        question: "What's the minimum group size for a private tour?",
        answer:
          "There's no minimum! We organize private tours for solo travelers, couples, families, and groups of any size. However, please note that solo trips typically have a higher per-person rate due to private transport and guide costs.",
      },
      {
        question: "Do you offer airport pickup?",
        answer:
          "Yes, airport pickup and drop-off are included in all our tour packages. We'll be waiting for you at the airport with a welcome sign and a cold drink!",
      },
    ],
  },
  {
    id: "destinations",
    title: "Destinations & Activities",
    icon: "compass",
    items: [
      {
        question: "Which destinations do you cover?",
        answer:
          "We primarily operate in Lombok and Bali, but we also offer trips to Komodo Island, Flores, Sumbawa, and other islands in the Nusa Tenggara region. Check our Explore & Plan page for the full list of 78+ destinations.",
      },
      {
        question: "Is it safe to travel in Lombok and Bali?",
        answer:
          "Yes, both Lombok and Bali are very safe for tourists. Our local guides know the areas intimately and will always prioritize your safety. We provide 24/7 support during your trip and have emergency protocols in place.",
      },
      {
        question: "What activities are available?",
        answer:
          "We offer a wide range of activities including hiking (Mount Rinjani, rice terraces), snorkeling and diving, surfing, temple visits, traditional cooking classes, waterfall treks, island hopping, cultural ceremonies, and much more.",
      },
      {
        question: "What's the best time to visit Lombok and Bali?",
        answer:
          "The dry season (April–October) is generally the best time to visit, with sunny weather and calm seas. However, the wet season (November–March) has its own charm with lush green landscapes and fewer crowds. We can help you plan the perfect trip any time of year.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Information",
    icon: "info",
    items: [
      {
        question: "Do I need a visa to visit Indonesia?",
        answer:
          "Many nationalities can get a Visa on Arrival (VOA) for 30 days at major Indonesian airports, which can be extended once for another 30 days. Some nationalities are eligible for visa-free entry. We recommend checking with your local Indonesian embassy for the most up-to-date visa requirements.",
      },
      {
        question: "What should I pack for my trip?",
        answer:
          "Essentials include light, breathable clothing, sunscreen, insect repellent, comfortable walking shoes, swimwear, and a light rain jacket. If you're planning to hike Mount Rinjani, we'll send you a specific packing list. Don't forget your camera!",
      },
      {
        question: "Do I need travel insurance?",
        answer:
          "We strongly recommend travel insurance for all our guests. It should cover medical emergencies, trip cancellation, and personal belongings. Check our Travel Insurance page for more details and recommended providers.",
      },
      {
        question: "What language do your guides speak?",
        answer:
          "All our guides speak fluent English and Indonesian (Bahasa). Some guides also speak basic Mandarin, Japanese, or other languages. Let us know your language preference when booking and we'll match you with the right guide.",
      },
      {
        question: "Is there Wi-Fi during trips?",
        answer:
          "Most hotels and restaurants have Wi-Fi. For remote areas, we recommend getting a local SIM card with data (available at the airport or any phone shop). We can help you set this up on arrival.",
      },
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & Refunds",
    icon: "rotate-ccw",
    items: [
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations made 30+ days before the trip: full refund minus processing fees. 14–29 days: 50% refund. 7–13 days: 25% refund. Less than 7 days: no refund. For detailed terms, please see our Booking Conditions page.",
      },
      {
        question: "What happens if the weather is bad?",
        answer:
          "We monitor weather conditions closely. If an activity needs to be rescheduled due to weather (e.g., heavy rain, high waves), we'll adjust the itinerary with alternative activities at no extra charge. Safety always comes first.",
      },
      {
        question: "Can I get a refund if I cut my trip short?",
        answer:
          "Unfortunately, we cannot offer refunds for unused portions of a trip that has already started. We strongly recommend purchasing travel insurance that covers trip interruption for unexpected situations.",
      },
    ],
  },
];
