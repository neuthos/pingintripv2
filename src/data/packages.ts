// ============================
// TYPES & INTERFACES
// ============================

export type Currency = "USD" | "IDR" | "CNY";

export interface Price {
  amount: number;
  discountedAmount?: number;
}

export type MultiCurrencyPrice = Record<Currency, Price>;

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  description: string;
  accommodation: string;
  meals: string[];
}

export interface OpenTrip {
  id: string;
  code: string;
  slug: string;
  title: {en: string; id: string; cn: string};
  description: {en: string; id: string; cn: string};
  durationDays: number;
  physicalRating: number;
  difficulty: "easy" | "moderate" | "challenging";
  maxPax: number;
  price: MultiCurrencyPrice;
  regionId: string;
  startingPoint: string;
  route: {en: string; id: string; cn: string};
  highlights: string[];
  featured: boolean;
  isTrial?: boolean;
  image: string;
  itinerary: ItineraryDay[];
}

// Keep backward compat type alias
export type TourPackage = OpenTrip;

// ============================
// CURRENCY CONFIG & FORMATTERS
// ============================

export const currencyConfig: Record<
  Currency,
  {symbol: string; locale: string; decimals: number}
> = {
  USD: {symbol: "$", locale: "en-US", decimals: 2},
  IDR: {symbol: "Rp", locale: "id-ID", decimals: 0},
  CNY: {symbol: "¥", locale: "zh-CN", decimals: 0},
};

export function formatPrice(amount: number, currency: Currency): string {
  const config = currencyConfig[currency];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount);
}

export function getDefaultCurrency(locale: string): Currency {
  switch (locale) {
    case "id":
      return "IDR";
    case "cn":
      return "CNY";
    default:
      return "USD";
  }
}

// ============================
// OPEN TRIPS DATA
// ============================

export const openTrips: OpenTrip[] = [
  {
    id: "trip-bali-beyond-the-perfect-island-loop",
    code: "PT-BALI-01",
    slug: "bali-beyond-the-perfect-island-loop",
    title: {
      en: "Bali to Lombok Adventure: 16-Day Island Hopping & Cultural Trek",
      id: "Petualangan Bali ke Lombok: 16 Hari Jelajah Pulau & Trekking Budaya",
      cn: "巴厘岛到龙目岛探险：16天跳岛与文化徒步之旅",
    },
    description: {
      en: "Experience the ultimate Indonesian island adventure across Bali and Lombok. Learn to surf in Canggu, hike Mount Batur at sunrise, immerse yourself in traditional village life, and snorkel crystal-clear waters of the Gili Islands. Perfect blend of adventure, culture, and tropical paradise.",
      id: "Rasakan petualangan pulau Indonesia terlengkap di Bali dan Lombok. Belajar surfing di Canggu, mendaki Gunung Batur saat sunrise, menginap di desa tradisional, dan snorkeling di perairan jernih Kepulauan Gili. Kombinasi sempurna antara petualangan, budaya, dan surga tropis.",
      cn: "体验印尼终极跳岛探险，横跨巴厘岛和龙目岛。在仓古学习冲浪、日出时分攀登巴图尔火山、沉浸于传统村庄生活、在吉利群岛清澈海域浮潜。冒险、文化与热带天堂的完美结合。",
    },
    durationDays: 16,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 2499, discountedAmount: 2299},
      IDR: {amount: 42900000, discountedAmount: 39500000},
      CNY: {amount: 17048, discountedAmount: 15684},
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Seminyak",
      id: "Canggu ke Seminyak",
      cn: "仓古至塞米亚克",
    },
    highlights: [
      "canggu-surfing",
      "bulian-village",
      "mount-batur-sunrise",
      "ubud-temples",
      "gili-trawangan",
      "senggigi",
    ],
    featured: true,
    image: "/assets/packages/bali-to-lombok-adventure",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Arrival in Canggu - Welcome to Paradise",
        location: "Canggu",
        description: `Selamat datang di Bali! Your Indonesian adventure begins in Canggu, a surfer's paradise blending beach vibes with vibrant nightlife. Upon arrival, check into your accommodation and meet your Tour Leader and fellow travelers at the welcome briefing. Learn about the exciting journey ahead, share travel stories, and get insider tips for your Bali adventure. This evening, explore Canggu's legendary dining scene together - think fresh seafood, authentic warungs, and sunset views. It's the perfect start to forge friendships that will last the entire trip.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Canggu Surf Lesson - Ride Your First Wave",
        location: "Canggu",
        description: `Time to conquer the waves at one of the world's most famous surf destinations! Whether you're a seasoned surfer or a complete beginner, today's surf lesson is designed for all skill levels. Start on the beach learning proper techniques, safety guidelines, and wave reading basics from experienced local instructors. Then paddle out to catch your first waves in Canggu's beginner-friendly breaks. After your lesson, the day is yours to enjoy - rent a board for more practice, chill at a beach club with panoramic ocean views, or explore the trendy cafes and warungs that make Canggu Indonesia's coolest surf town.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 3,
        title:
          "Day 3: Journey to Bulian Village - Mountain Temples & Rice Terrace Trails",
        location: "Canggu/Bulian",
        description: `Escape the coastal buzz and venture north into Bali's serene highlands. Today's journey takes us to Bulian, a hidden gem where authentic village life thrives among emerald rice terraces. En route, we'll pause at the iconic Ulun Danu Beratan Temple, majestically perched on Lake Beratan's shores - a photographer's dream. Upon arrival in Bulian, receive a warm village welcome with refreshments and a traditional lunch. Energized and ready, embark on a scenic trek through cascading waterfalls, terraced rice paddies, and village pathways, connecting deeply with Bali's natural beauty and cultural heritage. Immerse yourself in local traditions by crafting sacred Balinese offerings from flowers and leaves, then accompany villagers to a nearby temple for an intimate spiritual ceremony led by a local priest. Stay overnight in a community-run homestay that empowers local women and preserves traditional culture - your visit directly supports approximately 50 community members.`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 4,
        title:
          "Day 4: Bulian Free Day - Waterfalls, Coffee Plantations & Village Adventures",
        location: "Bulian",
        description: `Today is yours to design! Bulian's authentic charm and natural wonders await your exploration. Feeling adventurous? Trek through neighboring Lemukih Village to discover durian orchards, layered rice paddies, aromatic coffee plantations, and hidden waterfalls - complete with nature's own waterslide for the brave! Prefer two wheels? Join a cycling tour through Bulian's countryside to experience Northern Bali's peaceful landscapes and warm village hospitality. Or simply relax, absorb the mountain air, and enjoy the slower pace of rural island life. Your day, your adventure.`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Bulian to Kintamani - Hot Springs at Mount Batur's Base",
        location: "Bulian/Kintamani",
        description: `Savor a leisurely morning in Bulian - join an optional cooking class to learn Balinese culinary secrets, take a peaceful sunrise fishing trip, or simply soak in the mountain village atmosphere. Mid-morning, we depart for Kintamani, a scenic town cradled at the foot of volcanic Mount Batur. Arrive at our unique campsite featuring natural hot spring pools fed by geothermal waters - the perfect remedy for tired muscles. Spend the afternoon exploring Toya Bungkah village or relaxing poolside with mountain views. As evening falls, gather around the campfire under a blanket of stars for stories, laughter, and new friendships. Camping never felt so good!`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 6,
        title:
          "Day 6: Mount Batur Sunrise Trek & Transfer to Ubud's Cultural Heart",
        location: "Kintamani/Ubud",
        description: `Today brings one of Bali's most iconic experiences! Rise before dawn and begin a 2-hour ascent up Mount Batur (1,700m), reaching the volcanic summit just as the sun paints the sky in brilliant colors. Enjoy a simple picnic breakfast at the peak while absorbing breathtaking panoramic views - a truly unforgettable moment. Descend back to basecamp for a hearty breakfast followed by a rejuvenating soak in natural hot springs. Next, journey south to Ubud, Bali's artistic and spiritual heart. En route, visit the PKP Community, a women-led social enterprise promoting gender equality through skills training and employment. Share tea, tour their organic garden, and enjoy a delicious home-cooked lunch prepared by these inspiring women. Arrive in Ubud with free time to explore ancient temples, art galleries, and bustling markets. Tonight, celebrate your volcanic conquest with your group on a Big Night Out - Ubud's vibrant nightlife awaits!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Ubud Free Day - Temples, Yoga & Balinese Culture",
        location: "Ubud",
        description: `Ubud offers endless possibilities - today is completely yours to curate! Seeking serenity? Join a yoga class overlooking rice terraces or indulge in a traditional Balinese massage. Hungry for culture? Visit the Sacred Monkey Forest Sanctuary, explore stunning temples like Tirta Empul, or stroll through Ubud's vibrant art market. Culinary enthusiast? Take a Balinese cooking class and master local recipes. Nature lover? Cycle through emerald rice paddies or hike to hidden waterfalls. Your Tour Leader has insider recommendations for every interest. Ubud is yours to discover!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title:
          "Day 8: Another Day in Ubud - Spiritual Tours, Rice Terrace Rides & Local Immersion",
        location: "Ubud",
        description: `With so much to offer, Ubud deserves another full day of exploration! Choose your own adventure from an array of authentic experiences: embark on a Balinese spiritual journey at Widya Guna Foundation to learn about Hindu traditions and purification ceremonies, join another cooking class at the PKP Community to deepen your culinary skills, cycle through iconic Tegallalang rice terraces with stunning layered views, or spend quality time with a local Balinese family learning about daily life and customs. From temple hopping to wellness workshops, market browsing to art classes - every path leads to discovery. Make Ubud your own!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Island Hopping to Lombok - Welcome to Tempasan Village",
        location: "Ubud/Tempasan",
        description: `Bid farewell to Bali as we journey to neighboring Lombok, an island known for pristine beaches, traditional Sasak culture, and the majestic Mount Rinjani. Travel by private vehicle to Padangbai Harbor, then hop aboard a speedboat for a scenic crossing to Lombok's shores. Upon landing at Bangsal, drive through rural landscapes to Tempasan, a peaceful village surrounded by rice fields and mountains. Receive a heartwarming welcome from local villagers and settle into your comfortable lodge. This evening, gather for a communal dinner with your hosts - the perfect introduction to Lombok's legendary hospitality and delicious local cuisine. Tomorrow, the adventure continues!`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 10,
        title:
          "Day 10: Tempasan Village Immersion - Rice Terraces & Traditional Weaving",
        location: "Tempasan",
        description: `Dive deep into authentic Lombok culture today with a village immersion experience. Start with a scenic trek through Tempasan's stunning rice terraces, walking the same paths local farmers use daily. Meet farmers tending their fields, wander through pineapple and cassava plantations, visit coffee farms, and pass chicken and cattle enclosures. Pause at a hilltop viewpoint for breathtaking panoramic vistas of layered rice paddies with Mount Rinjani towering in the distance - pure Instagram gold! Next, journey to Pringgasela Village, renowned throughout eastern Lombok as the region's only traditional weaving village. Watch skilled artisans work their looms, learn about indigenous textiles and natural dyes, then join local women for a delicious home-cooked lunch. The afternoon is yours - take a cooking class, join a bike tour, practice yoga, or simply relax. Tonight, gather around a crackling campfire for stories under the stars.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 11,
        title:
          "Day 11: Tempasan Free Day - Snorkeling, Waterfalls & Island Adventures",
        location: "Tempasan",
        description: `Lombok delivers adventure both on land and sea - today's agenda is entirely up to you! Craving ocean time? Join a snorkeling excursion to discover vibrant coral gardens and tropical fish. Love nature? Trek to cascading waterfalls or visit cheeky monkeys in their forest habitat. Want to deepen your cultural connection? Take another cooking class to master Sasak recipes or join a morning yoga session with jungle views. Prefer to explore independently? Rent a scooter and cruise coastal roads, visit local markets, or find a quiet beach to call your own. With endless options, there's no wrong choice - just make it yours!`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 12,
        title: "Day 12: Bonjeruk Village Cycling & Transfer to Senggigi Beach",
        location: "Tempasan/Senggigi",
        description: `This morning, visit Bonjeruk Village for a heartwarming community experience. Meet the villagers who run a youth development organization supporting local students through English education programs. Your guide - a talented student from the program - will lead you on a leisurely cycling tour through the village (approximately 45-60 minutes), offering authentic glimpses into daily Sasak life. Work up an appetite before settling down for a traditional Lombok feast prepared by village families. After lunch, join local women to sample homemade cakes and snacks crafted from locally grown potatoes and sticky rice. Mid-afternoon, continue west to Senggigi, Lombok's premier beach resort town. Arrive with plenty of time to stroll the sandy shoreline, watch the sunset over the ocean, explore beachfront bars and restaurants, or simply unwind with your toes in the sand.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 13,
        title:
          "Day 13: Island Paradise - Gili Trawangan Snorkeling & Big Night Out",
        location: "Senggigi/Gili Trawangan",
        description: `Today we reach ultimate island paradise! Board a speedboat to Gili Trawangan, a car-free tropical haven where bicycles and horse carts replace motors and pristine air fills your lungs. Drop your bags at the beachfront resort (be prepared to carry them about 300m from the boat dock), then immediately head back to sea for an epic three-island snorkeling adventure. Visit all three Gili Islands - starting at Turtle Point on Gili T where graceful sea turtles glide through crystal waters, then Gili Meno's serene reefs, and finally Gili Air's vibrant coral gardens teeming with tropical fish. Keep your eyes peeled for rays and maybe even a friendly reef shark! Return to shore sun-kissed and salty. Tonight, experience why Gili Trawangan is legendary for nightlife - join your crew for the Big Night Out. Beach bars, fire dancers, live music, and dancing under the stars await. Let's celebrate in paradise!`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 14,
        title: "Day 14: Gili Trawangan Free Day - Beach Bliss & Water Sports",
        location: "Gili Trawangan",
        description: `Paradise perfected - a full free day on Gili Trawangan to live your best island life! Beach loungers dream? Claim your spot on powdery white sand, work on your tan, and dip into turquoise waters whenever the mood strikes. Adventure seekers craving more? Try stand-up paddleboard yoga floating on the calm morning sea, rent a bike to circle the entire island in under an hour, take a freediving course, or join a sunset horseback ride along the beach. Wellness warriors can book a beachfront massage, practice yoga with ocean views, or explore healthy cafes serving acai bowls and fresh juices. However you design your day, Gili T delivers pure tropical magic. This is what island dreams are made of!`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 15,
        title: "Day 15: Return to Bali - Seminyak's Chic Beach Scene",
        location: "Gili Trawangan/Seminyak",
        description: `Bid farewell to island paradise as we speedboat back to Bali for the grand finale. Cross back to Padangbai Harbor, then drive south to Seminyak, Bali's most sophisticated beach town. Known for its upscale boutiques, world-class dining, stylish beach clubs, and pumping nightlife, Seminyak offers the perfect blend of laid-back beach vibes and cosmopolitan energy. Arrive with the entire afternoon and evening free to explore. Shop for designer resort wear, browse artisan galleries, sunset cocktails at legendary beach clubs like Potato Head or Ku De Ta, feast on fresh seafood and international cuisine, or dance the night away at trendy nightspots. Seminyak is your playground - enjoy every luxurious moment!`,
        accommodation: "The Rivavi Legian (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 16,
        title: "Day 16: Departure Day - Farewell to Indonesia",
        location: "Seminyak",
        description: `All good adventures must come to an end. Today you're free to depart at any time that suits your onward travel plans. If you have a late flight, consider one last beach walk, a final Balinese massage, souvenir shopping, or brunch at a trendy Seminyak cafe. Exchange contact information with your new travel family, relive favorite moments, and promise to stay in touch. From Canggu's surf breaks to Bulian's village ceremonies, Mount Batur's sunrise to Lombok's rice terraces, and Gili Trawangan's underwater wonders to Seminyak's stylish streets - you've experienced the very best of Indonesia. Safe travels, and until we meet again!`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-ubud-to-flores-komodo-dragons-beaches-tribal-treks",
    code: "PT-BALI-02",
    slug: "ubud-to-flores-komodo-dragons-beaches-tribal-treks",
    title: {
      en: "Bali to Flores: Komodo Dragons, Island Hopping & Ancient Villages",
      id: "Ubud ke Flores: Komodo, Pantai & Trekking Suku",
      cn: "乌布到弗洛雷斯：巨蜥、海滩与部落徒步",
    },
    description: {
      en: "Journey from Ubud's cultural treasures to Flores' untamed wilderness across 10 unforgettable days. Trek remote mountain trails to UNESCO-listed Waerebo village, encounter legendary Komodo dragons on volcanic islands, and snorkel turquoise waters teeming with marine life.",
      id: "Dari jantung spiritual Bali ke perbatasan liar Flores — temukan desa kuno, mendaki ke Waerebo, berlayar bersama komodo, dan menyelam di terumbu karang.",
      cn: "从巴厘岛的精神中心到弗洛雷斯的荒野前沿——探索古老村庄、徒步到瓦埃勒博、与科莫多巨蜥同行、潜入原始珊瑚礁。",
    },
    durationDays: 10,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1899, discountedAmount: 1699},
      IDR: {amount: 32600000, discountedAmount: 29200000},
      CNY: {amount: 12955, discountedAmount: 11591},
    },
    regionId: "region-bali",
    startingPoint: "Ubud",
    route: {
      en: "Ubud to Labuan Bajo",
      id: "Ubud ke Labuan Bajo",
      cn: "乌布至拉布汉巴焦",
    },
    highlights: [
      "ubud",
      "labuan-bajo",
      "waerebo-village",
      "komodo",
      "snorkeling",
    ],
    featured: true,
    image: "/assets/packages/bali-to-flores-komodo",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Ubud",
        location: "Ubud",
        description: `Touch down in Ubud, Bali's vibrant cultural capital where art galleries line ancient temples and rice terraces frame the horizon. Settle into your accommodations before joining your Tour Leader and fellow adventurers for an evening welcome gathering. Tonight marks the start of something special—bond with your travel crew over your First Night Out as you wander Ubud's lively streets, sample local cuisine, and toast to the journey ahead. Check the lobby for exact meeting details and prepare for 10 days of island magic.`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Ubud",
        location: "Ubud",
        description: `Ubud unfolds at your own pace today with endless possibilities for exploration. Immerse yourself in authentic Balinese experiences—join a spiritual ceremony at Widya Guna Foundation, master traditional dishes at a PKP Community cooking class, cycle through emerald rice paddies, or connect with a local family in their home. Alternatively, indulge in a yoga session, pamper yourself with a Balinese massage, or simply wander the artisan markets. Your Tour Leader stands ready with insider recommendations—just ask!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Ubud/Labuan Bajo",
        location: "Ubud/Labuan Bajo",
        description: `Trade Bali's cultural heartland for Flores' wild frontier as you fly to Labuan Bajo, the gateway to legendary Komodo National Park. Your private transfer whisks you from Ubud to Denpasar Airport for a scenic 75-minute flight over volcanic landscapes and azure seas. Touch down in Labuan Bajo by afternoon with ample time to stroll the waterfront, relax on the beach, or scout sunset viewpoints before tomorrow's island-hopping expedition begins.`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Labuan Bajo/Dintor",
        location: "Labuan Bajo/Dintor",
        description: `Journey deep into Flores' interior to discover Tado Village, where 15th-generation Sulawesi descendants maintain centuries-old traditions among spectacular spiderweb rice terraces. Accompanied by your local guide, ascend 1.5 kilometers of rocky mountain trails—70% uphill, 20% plateau—to reach panoramic viewpoints that reward every step. Cameras are essential for capturing these geometric agricultural masterpieces. After a traditional lunch, continue to Dintor Village, your base camp for tomorrow's jungle trek to the remote Waerebo settlement.`,
        accommodation: "Wae Rebo Lodge (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Dintor/Waerebo",
        location: "Dintor/Waerebo",
        description: `Embark on today's highlight—a jungle expedition to UNESCO World Heritage village Waerebo, one of Indonesia's most isolated traditional communities. Drive to Denge Village, then ride motorbikes to your trailhead before trekking 5 kilometers through tropical rainforest (2-3 hours with rest breaks). The iconic cone-shaped Mbaru Niang houses emerge from the mist as villagers welcome you with traditional ceremonies. After a communal lunch, join locals in their coffee gardens to harvest beans, process them using ancestral tools, and brew your own cup. Tonight you'll sleep inside a Mbaru Niang—basic but profoundly authentic. Pack light with just overnight essentials; your main luggage awaits tomorrow.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Waerebo/Labuan Bajo",
        location: "Waerebo/Labuan Bajo",
        description: `Savor your final morning in Waerebo before descending the same 5-kilometer trail (90 minutes–2.5 hours downhill). Motorbike back to meet your vehicle and reunite with your belongings, then journey 3-4 hours back to coastal Labuan Bajo. Spend your afternoon resting and reorganizing—pack a compact bag for your upcoming 3-day/2-night Komodo boat adventure while your main luggage remains securely stored at the hotel.`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Labuan Bajo/Komodo National Park",
        location: "Labuan Bajo/Komodo National Park",
        description: `Your Komodo odyssey begins as you board a traditional Phinisi boat at the harbor. First stop: Kelor Island for a short summit hike revealing jaw-dropping vistas, followed by kayaking to Strawberry Rock's crystal shallows for world-class snorkeling among vibrant coral gardens. After an onboard lunch, trek across Rinca Island's savannah in search of the world's largest living lizard—the mighty Komodo dragon. As evening falls, witness thousands of flying foxes silhouetted against the sunset while anchored at Padar Island. (Note: Itinerary may adjust for weather conditions.)`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Komodo National Park",
        location: "Komodo National Park",
        description: `Wake before dawn to summit Padar Island, where sunrise ignites its famous three-bay panorama in shades of gold and crimson. Return to the boat for a blissful morning at Long Beach—swim, kayak, or simply lounge on pristine sand. Next, plunge into Manta Point's nutrient-rich waters for a chance encounter with graceful giant manta rays gliding beneath you. Cap your day at Sebayur Island: paddle out for a sunset kayak, then gather around a beach bonfire for stargazing. Paradise perfected.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Komodo National Park/Labuan Bajo",
        location: "Komodo National Park/Labuan Bajo",
        description: `Make every moment count on your final boat day. Snorkel Sebayur's flourishing reefs, kayak to postcard-perfect Kanawa Island, and savor the last hours aboard your Phinisi as it glides back to Labuan Bajo harbor. Reunite with your main luggage and freshen up at the hotel before tonight's Big Night Out—your final celebration with the crew! Head to a beachfront bar, raise your glass to new friendships and unforgettable memories, and dance into the tropical night.`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 10,
        title: "Day 10: Labuan Bajo",
        location: "Labuan Bajo",
        description: `Your Indonesian adventure concludes today. Depart Labuan Bajo at your convenience, carrying memories of ancient villages, legendary dragons, and turquoise horizons that will last a lifetime.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-indonesia-hammocks-hikes",
    code: "PT-BALI-03",
    slug: "indonesia-hammocks-hikes",
    title: {
      en: "Java to Bali Overland: Volcanoes, Temples & Beach Bliss",
      id: "Indonesia: Hammock & Hiking — Jawa ke Bali",
      cn: "印度尼西亚：吊床与徒步——爪哇到巴厘岛",
    },
    description: {
      en: "Traverse Indonesia's heartland on this 14-day overland odyssey from Jakarta to Kuta. Explore Bandung's tea plantations and hot springs, discover Yogyakarta's UNESCO temples, summit Mount Bromo at sunrise, and surf Bali's legendary breaks before unwinding in beachside hammocks.",
      id: "14 hari melintasi jantung vulkanik Jawa ke pantai Bali. Kunjungi Bandung, jelajahi candi Yogyakarta, saksikan Gunung Bromo saat matahari terbit, dan akhiri dengan vibes selancar Bali.",
      cn: "14天从爪哇火山中心区穿越到巴厘岛海滩。访问万隆、探索日惹寺庙、日出时分观赏布罗莫火山，以巴厘岛冲浪氛围结束。",
    },
    durationDays: 14,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 2299, discountedAmount: 2099},
      IDR: {amount: 39500000, discountedAmount: 36100000},
      CNY: {amount: 15684, discountedAmount: 14320},
    },
    regionId: "region-bali",
    startingPoint: "Kuta",
    route: {
      en: "Jakarta to Kuta",
      id: "Jakarta ke Kuta",
      cn: "雅加达至库塔",
    },
    highlights: [
      "jakarta",
      "bandung",
      "yogyakarta",
      "mount-bromo",
      "pemuteran",
      "kuta",
    ],
    featured: false,
    image: "/assets/packages/java-to-bali-overland",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Jakarta",
        location: "Jakarta",
        description: `Arrive in Jakarta, Indonesia's electric capital where modern skyscrapers tower over historic neighborhoods. After settling in, join your Tour Leader and fellow travelers for your First Night Out—a curated evening at a beloved local restaurant where you'll bond over Indonesian delicacies and refreshing drinks. Toast to new friendships and the adventures ahead as Jakarta's vibrant energy sets the tone for your journey. Check lobby notices for exact meeting time and location.`,
        accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Jakarta/Bandung",
        location: "Jakarta/Bandung",
        description: `Leave Jakarta's urban sprawl behind as your private vehicle climbs into West Java's highlands toward Bandung. Watch tea plantations cascade down volcanic slopes and mist-shrouded mountains emerge through your window. Upon arrival, join your Tour Leader for an orientation walk through Bandung's colonial architecture and bustling markets—your introduction to this artistic mountain city known as the \"Paris of Java.\"`,
        accommodation: "Mutiara Hotel Bandung (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Bandung",
        location: "Bandung",
        description: `Immerse yourself in Bandung's natural treasures with a full-day excursion to Ciater Tea Plantation, perched on the slopes of Mount Tangkuban Perahu. Learn the art of tea cultivation from local farmers, hike through emerald plantations to a hidden waterfall, then soak your muscles in volcanic hot springs surrounded by mountain vistas. Experience the perfect blend of agriculture, adventure, and relaxation.`,
        accommodation: "Mutiara Hotel Bandung (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Bandung/Yogyakarta",
        location: "Bandung/Yogyakarta",
        description: `Board a scenic train for a 7-hour, 402-kilometer journey across Java's heartland to Yogyakarta, the island's cultural soul. Watch rice paddies, villages, and volcanic peaks scroll past your window as the landscape transforms. Arrive in the evening with energy to explore Sosrowijayan and Prawirotaman Streets—pedestrian lanes lined with warungs, art galleries, and live music venues perfect for unwinding with local flavors.`,
        accommodation: "Hotel Indah Palace Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Yogyakarta/Ngadas",
        location: "Yogyakarta/Ngadas",
        description: `Embark on an 8-hour scenic drive (400km) to Malang, then continue one hour deeper into the Mount Bromo region to reach Ngadas village. This Tengger farming community welcomes you into their sustainable homestay program—a community-supported initiative where you'll spend the night with a local family. Share a home-cooked dinner, exchange stories with village leaders, and learn about ancient customs and agricultural traditions that have sustained this highland community for generations.`,
        accommodation: "Ngadas Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Desa Ngadas/Bromo",
        location: "Desa Ngadas/Bromo",
        description: `Lace up your hiking boots for today's extraordinary trek along the Ancestor Trail—the historic 10-kilometer pilgrimage route Ngadas villagers once used to honor the gods at Mount Bromo. Led by community-trained local guides, traverse farmland, forest, and grassland, pausing for lunch near a cave before reaching the volcano. Stand at the crater rim of Mount Bromo (part of the Tengger Caldera), watching white smoke billow from the collapsed summit. Capture the otherworldly landscape before transferring to your accommodation.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Bromo/Red Island",
        location: "Bromo/Red Island",
        description: `Rise in darkness for a pre-dawn 30-minute trek across the ethereal Sea of Sand—a vast volcanic plain surrounding Mount Bromo. Witness the sunrise illuminate the 2,392-meter peak as Tenggerese Buddhist communities present offerings to Sang Hyang Widhi Wasa, their supreme deity. After soaking in this spiritual spectacle, embark on an 8-hour overland journey to Red Island on Java's southeastern coast, where surf breaks and beachside hammocks await.`,
        accommodation: "Red Island Villa (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 10,
        title: "Day 10: Red Island",
        location: "Red Island",
        description: `Greet the morning with a hands-on surf lesson from local instructors who'll teach you to read waves, pop up on your board, and ride Java's consistent swells. Whether you're a first-timer or seasoned surfer, the ocean delivers. Spend your afternoon exploring the neighboring fishing village, catching more waves, or swaying in a hammock with a good book. Half the day is structured, half is pure freedom.`,
        accommodation: "Red Island Villa (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 11,
        title: "Day 11: Red Island/Pemuteran",
        location: "Red Island/Pemuteran",
        description: `Return to Bali by land and sea: a 90-minute–2-hour drive delivers you to Ketapang port for the 90-minute ferry crossing to Gilimanuk, then a final 45-minute transfer to Pemuteran on Bali's tranquil northwest coast. Arrive by afternoon with time to snorkel calm, crystal-clear waters where vibrant coral gardens and tropical fish thrive. Settle into beachfront bliss—your Bali beach days begin here.`,
        accommodation: "Rich Farmer House (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 12,
        title: "Day 12: Pemuteran",
        location: "Pemuteran",
        description: `Extend your Pemuteran escape with another full day in paradise. The beach beckons for lounging, the reefs call for snorkeling, and the village invites exploration. Whether you crave underwater adventures or lazy afternoon naps beneath swaying palms, today's agenda is entirely yours. Bali time moves slower here—embrace it.`,
        accommodation: "Rich Farmer House (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 13,
        title: "Day 13: Pemuteran/Kuta",
        location: "Pemuteran/Kuta",
        description: `Savor a leisurely morning before your 5–5.5-hour drive south through Bali's interior—past jungle-cloaked hills and terraced rice fields—to arrive in Kuta, the island's legendary surf and party hub. Catch up on sleep during the journey because tonight is your Big Night Out! Explore iconic Legian Street's neon-lit bars, beachfront clubs, and live music venues. Dance with your crew until dawn, celebrating every temple, volcano, and wave that brought you here.`,
        accommodation: "The Rivavi Legian (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 14,
        title: "Day 14: Kuta",
        location: "Kuta",
        description: `Your Java-to-Bali adventure concludes today. Exchange contact details with newfound friends, snap final group photos, and depart Kuta at your convenience. Need to extend your Indonesian journey? Your Tour Leader can assist with onward travel arrangements.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-bali-to-gili-the-ultimate-island-odyssey",
    code: "PT-BALI-04",
    slug: "bali-to-gili-the-ultimate-island-odyssey",
    title: {
      en: "Bali to Lombok: Volcanoes, Villages & Paradise Islands",
      id: "Bali ke Gili: Petualangan Pulau Terbaik",
      cn: "巴厘岛到吉利：终极海岛冒险",
    },
    description: {
      en: "Experience 15 days of Indonesian island life from surf culture to sacred villages. Catch waves in Canggu, sleep in traditional Bulian homestays, summit Mount Batur for sunrise, master Ubud's arts, trek remote Lombok communities, and unwind on Gili Trawangan's car-free shores.",
      id: "15 hari keajaiban pulau — berselancar di Canggu, menginap di desa Bulian, mendaki puncak Gunung Batur, jelajahi Ubud, trekking di alam liar Lombok, dan bersantai di pantai Gili Trawangan.",
      cn: "15天纯粹的海岛魔力——在仓古冲浪、住在布利安村、登顶巴图尔火山、探索乌布、徒步龙目岛荒野、在吉利特拉旺安的原始海滩放松。",
    },
    durationDays: 15,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 2399, discountedAmount: 2199},
      IDR: {amount: 41200000, discountedAmount: 37800000},
      CNY: {amount: 16366, discountedAmount: 15002},
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Gili Trawangan",
      id: "Canggu ke Gili Trawangan",
      cn: "仓古至吉利特拉旺安",
    },
    highlights: [
      "canggu",
      "bulian-village",
      "mount-batur",
      "ubud",
      "senggigi",
      "gili-trawangan",
    ],
    featured: true,
    image: "/assets/packages/bali-to-lombok-volcanoes",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Canggu",
        location: "Canggu",
        description: `Welcome to Canggu, Bali's laid-back surf town where black-sand beaches meet boho cafés and rice paddies. Check into your hostel and gather for a welcome meeting with your Tour Leader and fellow adventurers. Tonight, dive into Canggu's legendary social scene on your First Night Out—explore beachfront warungs, rooftop bars, and live music venues. It's the perfect mix of hectic energy and hippie chill. Check lobby notices for meeting details.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Canggu",
        location: "Canggu",
        description: `Ride Indonesia's world-famous waves today with a surf lesson tailored to all skill levels. Start on the sand mastering pop-ups and paddle techniques, then hit the water with expert instructors guiding your first rides (or helping you refine your style). After your lesson, the day is yours—rent a board to keep practicing, lounge at a beach club, or explore Canggu's café scene over fresh coconuts and nasi goreng.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Canggu/Bulian",
        location: "Canggu/Bulian",
        description: `Trade surf culture for sacred tradition as you journey north to Bulian, an isolated highland village sometimes called the \"Lost Kingdom.\" En route (2 hours, 55km), stop at the photogenic Ulun Danu Temple floating on Lake Beratan—a 17th-century water temple framed by volcanic peaks. Continue to Bulian (2 hours, 45km) where this women-led community homestay welcomes you with refreshments and lunch. Trek through rice terraces and waterfalls, craft traditional offerings from leaves and flowers, then participate in a temple ceremony led by a local priest. Your stay directly supports 50 community members and empowers local women and youth.`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Bulian",
        location: "Bulian",
        description: `Design your own Bulian adventure today. Trek through neighboring Lemukih Village to discover durian plantations, geometric rice terraces, coffee farms, and cascading waterfalls—complete with a natural waterslide for the brave. Alternatively, join a bike tour winding through northern Bali's countryside, past temples and family compounds. Or simply relax in this tranquil village, far from Bali's tourist crowds.`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Bulian/Kintamani",
        location: "Bulian/Kintamani",
        description: `Spend your morning freely in Bulian—join a cooking class, embark on a sunrise fishing excursion, or simply savor the mountain air. Then drive one hour to Kintamani, the lakeside town cradling Mount Batur. Your campsite features a hot spring pool fed by volcanic mineral waters—soak beneath the stars before gathering around the campfire for stories and s'mores. Afternoon free time allows exploration of Toya Bungkah village.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Kintamani/Ubud",
        location: "Kintamani/Ubud",
        description: `Wake at 3am for today's unforgettable challenge: a 2-hour, 7-kilometer pre-dawn ascent of Mount Batur (1,700m). Reach the summit as sunrise ignites the crater lake and neighboring volcanoes in gold and crimson, then enjoy a picnic breakfast at 1,700 meters. Descend for a proper meal and therapeutic hot spring soak before driving 2 hours (53km) to Ubud. En route, stop at the community-supported PKP women's center for tea, garden tours, and lunch prepared by survivors of discrimination. Arrive in Ubud with time to explore before tonight's Big Night Out—dance, drink, and celebrate with your crew!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Ubud",
        location: "Ubud",
        description: `Ubud reveals itself at your pace today. This cultural capital offers endless exploration: yoga studios overlooking rice terraces, cooking classes teaching Balinese family recipes, traditional massage in garden spas, artisan markets selling hand-carved masks, or temple visits where ceremonies unfold daily. Your Tour Leader holds the insider's guide—just ask for recommendations tailored to your interests.`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Ubud",
        location: "Ubud",
        description: `Another full day to dive deeper into Ubud's soul. Join a Balinese spiritual tour at Widya Guna Foundation, master traditional recipes at the PKP Community cooking class, cycle through terraced rice paddies, or spend intimate time with a local family learning their daily customs. Between activities, wander the Monkey Forest, explore Campuhan Ridge's scenic trails, or simply watch offerings being placed at temple shrines. Ubud never disappoints.`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Ubud/Tempasan",
        location: "Ubud/Tempasan",
        description: `Island-hop to Lombok today. Drive 90 minutes (36km) to Padangbai harbor, then board a 90-minute speedboat across the Lombok Strait to Bangsal. A final 2.5-hour, 72-kilometer drive delivers you to Tempasan village on Lombok's scenic east coast. Arrive in time to gather with villagers for a communal dinner—your introduction to Lombok's warm Sasak culture and a preview of tomorrow's immersive experiences.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 10,
        title: "Day 10: Tempasan",
        location: "Tempasan",
        description: `Immerse yourself in Sasak rural life today. Walk ancient pathways through emerald rice terraces where farmers tend their plots, passing pineapple and cassava plantations, chicken coops, and coffee gardens. Climb to a hilltop viewpoint for panoramic vistas of rice fields backed by Mount Rinjani's volcanic silhouette. Drive to Pringgasela, East Lombok's sole weaving village, to watch artisans create intricate textiles using traditional backstrap looms and natural plant dyes. Share a home-cooked lunch with the weavers before your afternoon of freedom—join a cooking class, cycle the countryside, practice yoga, or simply relax. Gather around the campfire after dinner.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 11,
        title: "Day 11: Tempasan",
        location: "Tempasan",
        description: `Lombok delivers endless adventures—today's menu is entirely your creation. Plunge into snorkeling expeditions, trek to jungle waterfalls inhabited by playful monkeys, deepen your yoga practice, master Sasak recipes in a cooking class, or surrender to lazy beach time. Tempasan's relaxed pace and stunning landscapes accommodate every travel style. This is your day to explore, rest, or push boundaries—whatever fuels your spirit.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 12,
        title: "Day 12: Tempasan/Senggigi",
        location: "Tempasan/Senggigi",
        description: `Journey 90 minutes (40km) to Bonjeruk Village, where a youth-run English learning program thrives. A student guide leads you on a 45–60-minute cycling tour past homes, rice fields, and community gathering spots. Pause for a traditional Lombok lunch featuring local specialties, then join village women showcasing homemade cakes crafted from sweet potato flour and sticky rice. Continue one hour (37km) to Senggigi, Lombok's premier beach town. Spend your afternoon swimming, sunbathing, or strolling the oceanfront promenade.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 13,
        title: "Day 13: Senggigi/Gili Trawangan",
        location: "Senggigi/Gili Trawangan",
        description: `Welcome to paradise: Gili Trawangan, the car-free island where bicycles and cidomo horse carts rule. Drive 30–45 minutes (22km) to Bangsal, then take a 30-minute speedboat to Gili T. Drop your bags at the resort (you'll carry them 300m from the dock—no motorized transport allowed), then embark on a three-island snorkeling adventure. Explore Turtle Point off Gili Trawangan, glide through Gili Meno's tranquil shallows, and spot rays and reef sharks at Gili Air's vibrant reefs. Tonight, unleash your inner party animal on the Big Night Out—Gili T's legendary beach bars, fire dancers, and tropical cocktails await!`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 14,
        title: "Day 14: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Your final full day on Gili T unfolds exactly as you wish. Sun worshippers can claim prime beach real estate for uninterrupted tanning and turquoise swimming. Adventurers might try stand-up paddleboard yoga, circumnavigate the island by bicycle (it takes just 90 minutes), dive PADI-certified sites, or snorkel independently. No agenda, no rush—just crystalline water, powdery sand, and the freedom to design your perfect island day.`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 15,
        title: "Day 15: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Your Indonesian island odyssey concludes today. Depart Gili Trawangan at your convenience. (Optional: Book the Bali Express transfer for hassle-free fast boat and land transport back to Kuta, Bali, accompanied by a Tour Leader—perfect for continuing your Bali adventure.)`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-flores-frontier-jungles-villages-komodo-quests",
    code: "PT-KMDO-01",
    slug: "flores-frontier-jungles-villages-komodo-quests",
    title: {
      en: "Flores Frontier: Jungles, Villages & Komodo Dragons",
      id: "Perbatasan Flores: Hutan, Desa & Komodo",
      cn: "弗洛雷斯前沿：丛林、村庄与科莫多巨蜥",
    },
    description: {
      en: "8 days deep into Flores — trek to the spider-web rice fields, stay in the ancient Waerebo village, sail through Komodo National Park, and snorkel with manta rays.",
      id: "8 hari menjelajahi Flores — mendaki ke sawah jaring laba-laba, menginap di desa kuno Waerebo, berlayar di Taman Nasional Komodo, dan snorkeling bersama pari manta.",
      cn: "8天深入弗洛雷斯——徒步到蜘蛛网状稻田、住在古老的瓦埃勒博村、在科莫多国家公园航行、与蝠鲼一起浮潜。",
    },
    durationDays: 8,
    physicalRating: 4,
    difficulty: "challenging",
    maxPax: 15,
    price: {
      USD: {amount: 1699, discountedAmount: 1499},
      IDR: {amount: 29200000, discountedAmount: 25700000},
      CNY: {amount: 11591, discountedAmount: 10226},
    },
    regionId: "region-komodo",
    startingPoint: "Labuan Bajo",
    route: {
      en: "Labuan Bajo roundtrip",
      id: "Labuan Bajo PP",
      cn: "拉布汉巴焦往返",
    },
    highlights: [
      "labuan-bajo",
      "waerebo",
      "komodo-np",
      "snorkeling",
      "manta-rays",
    ],
    featured: true,
    image: "/assets/packages/flores-frontier",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Labuan Bajo",
        location: "Labuan Bajo",
        description: `Welcome to the island of Flores, the gateway to Komodo National Park! Arrive at any time today. Then meet your Tour Leader and group at a welcome meeting this evening. Get ready for an epic adventure! Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Labuan Bajo/Dintor",
        location: "Labuan Bajo/Dintor",
        description: `Venture inland this morning to Tado Village, full of beautiful rice terraces, and 15th generation descendants of immigrant Sulawesi ancestry who fled Islamic persecution in the 16th & 17th century. Join our local guide to hike up the mountain, about 1.5 km uphill then back. The views are well worth the effort so don’t forget your camera. Hike down, enjoy some lunch then continue on to Dintor Village for the night. We'll prep for our overnight trek to Waerebo Village that starts tomorrow morning. Private VehicleLabuan Bajo – Tado2h65km Settle in and scan the scenery from the convenience of a private vehicle. Private VehicleTado – Dintor2h55km Settle in and scan the scenery from the convenience of a private vehicle. Tado Village HikeTado2h Hike to the top of Tado Village, a community of Sulawesi descendants. Meet with a local guide and together hike to the top of the mountain — approximately a 2-hour journey — and enjoy a stunning bird’s-eye view of the iconic spiderweb rice fields. The trail is rocky and unpaved, with about 70% uphill and 20% relatively flat sections. The same path is used for both going and returning. The total trekking distance is 1.5 km.`,
        accommodation: "Wae Rebo Lodge (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Dintor/Waerebo",
        location: "Dintor/Waerebo",
        description: `Today we trek into the jungle! A drive and a motorbike ride brings us to the starting point of the hike. We’re headed to the remote Waerebo Village, famous for its traditional circular and cone-shaped houses called Mbaru Niang. Trek through the tropical jungle and up hill for about 2-3 hours, with plenty of stops to rest. We’ll be greeted with a welcome ceremony by the local villagers, followed by lunch. In the afternoon, we’ll enjoy a little pick me up where we’ll learn to harvest coffee beans and prep them for our own drinking. Tonight we will sleep in a Mbaru Niang together. These accommodations are basic but offer an extremely unique opportunity to experience this beautiful and cozy village. No need to bring yours entire suitcase with you into the jungle overnight. Make sure to pack a small overnight bag with the few items you need tonight and tomorrow. You’ll be reunited with your main bags again tomorrow evening. Private VehicleDintor – Denge Drive to Denge Village from Dintor. Hop on the back of a motorbike to the start of the trek. Trek to Waerebo VillageDenge – Waerebo2h-3h5km Today we trek to the legendary UNESCO World Heritage village, Waerebo, known as Mbaru Niang in Manggarai culture. This community, known for its cone-shaped houses is nestled deep in the Todo forest. We'll meet our guide and hike for 2-3 hours through the jungle with our small overnight bag. We'll be greeted by the villagers in a welcome ceremony, followed by a local lunch. Waerebo Coffee ExperienceWaerebo Join a local from Waerebo village for a tour of the coffee garden. Go through the steps of coffee cultivation-from harvesting the fruit, using traditional tools to separate the bean from the skin and prepping it before we sample some ourselves!`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Waerebo/Labuan Bajo",
        location: "Waerebo/Labuan Bajo",
        description: `Say goodbye to our friends in Waerebo Village and trek back to the place we started yesterday. Take a motorbike to meet our transport and luggage. Then drive back to Labuan Bajo for a much deserved rest. This evening, repack your smaller bag for the 3-day, 2-night Komodo National Park boat excursion. Your main luggage will be stored safely at the hotel in the Labuan Bajo. Private VehicleDenge – Labuan Bajo3h-4h105km Settle in and scan the scenery from the convenience of a private vehicle. Waerebo Trek Day 2Waerebo – Denge1h30m-2h30m5km Enjoy the morning to explore Waerebo before hiking back to the starting point. Because we are going down hill, the hike will be about 30 minutes faster.`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Labuan Bajo/Komodo National Park",
        location: "Labuan Bajo/Komodo National Park",
        description: `And today we’re off to the famous Komodo National Park! Walk to the harbour then board the boat. And yes! We are exploring Komodo by boat! The First stop-Kelor Island. We’ll take a short hike to an incredible view and then jump into kayaks to Strawberry Rock. Admire the incredible, picturesque, crystal-clear water then jump in to snorkel and watch the fish swim through the coral. After lunch back onboard, it’s off to our next island-Rinca Island. The trek on this island has one point… to spot the worlds largest lizard, the Komodo Dragon! Afterwards, enjoy relaxing on the boat for the rest of evening. Make sure not to miss the stellar sunset onboard as you watch thousands of flying foxes take flight in the colorful sky anchored at our third island, Padar. The boat itinerary may shift depending on the season and weather. Komodo Island Day 1Labuan Bajo – Pulau Padar Besar Explore the amazing islands of Komodo National Park on board a Phinisii boat. Trek through Kelor Island, snorkel Strawberry rock, hike Rinca Island in search of Komodo Dragons, watch the bats fly over Kalong Island and anchor at Padar Island.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Komodo National Park",
        location: "Komodo National Park",
        description: `No better way to start a day at sea than a beautiful sunrise. Trek up Padar Island and reach the top just in time for the colorful view. Back on the boat, we head to Long Beach for some chillin’, swimmin’ and kayakin’. Next stop-Manta Point. And yes.. those mantas! Jump in the water with a snorkel in hopes to see this magnificent (and giant) sea creature. Then to the last stop of the day, Sebayur Island. Here we’ll catch the sunset on a kayak. Then head to the beach for a bonfire and star gazing. Doesn’t get much better than this, huh? Komodo Island Day 2Pulau Padar Besar – Pulau Sebayur Besar Another day on the sea-it's about to be another epic day! Catch the sunrise over Padar Island, kayak around Long Beach, snorkel at Manta Point and enjoy a nighttime bonfire on Sebayur Island. Para... para.... paradise!`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Komodo National Park/Labuan Bajo",
        location: "Komodo National Park/Labuan Bajo",
        description: `Last day on the boat so let’s make it count (don’t worry-we’ve got you covered!) Today will be epic- think snorkeling through the reefs, kayaking to the picture perfect Kanawa Island, and some final time to soak up life on the phinisi boat. This afternoon, we’ll dock back in Labuan Bajo, say goodbye to our boat crew and reunite with our suitcases. Take some time to relax in the hotel but not for long. Tonight, and our last night may I remind you, is our Big Night Out! One more time, we’ll hit the town together for a last hoorah! Join us at a beach bar, grab your drink of choice and celebrate together! Komodo Island Day 3Pulau Sebayur Besar – Labuan Bajo Enjoy the last day on the Phinisi boat! Snorkel around Sebayur Island, kayak around Kanawa Island, and cruise through the incredible natural beauty until you reach the harbor in Labuan Bajo! Your Big Night Out Moment: in Labuan Bajo Hit up a beach bar with the crew and and enjoy a night out on the town!`,
        accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Labuan Bajo",
        location: "Labuan Bajo",
        description: `Say goodbye to the many islands of Indonesia and depart at any time.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-best-of-java",
    code: "PT-JAVA-01",
    slug: "best-of-java",
    title: {
      en: "Best of Java: Temples, Tea Hills & Volcanoes",
      id: "Terbaik dari Jawa: Candi, Perbukitan Teh & Gunung Berapi",
      cn: "爪哇精华：寺庙、茶山与火山",
    },
    description: {
      en: "A 9-day journey through Java's cultural treasures — explore Jakarta, visit Bandung's tea plantations, discover Yogyakarta's ancient temples, and witness the sunrise over Mt Bromo.",
      id: "9 hari perjalanan melalui harta karun budaya Jawa — jelajahi Jakarta, kunjungi perkebunan teh Bandung, temukan candi kuno Yogyakarta, dan saksikan matahari terbit di Gunung Bromo.",
      cn: "9天爪哇文化之旅——探索雅加达、参观万隆茶园、发现日惹古寺、观赏布罗莫火山日出。",
    },
    durationDays: 9,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 1399, discountedAmount: 1199},
      IDR: {amount: 24000000, discountedAmount: 20600000},
      CNY: {amount: 9544, discountedAmount: 8180},
    },
    regionId: "region-east-java",
    startingPoint: "Sanur",
    route: {
      en: "Jakarta to Sanur",
      id: "Jakarta ke Sanur",
      cn: "雅加达至萨努尔",
    },
    highlights: ["jakarta", "bandung", "yogyakarta", "mount-bromo", "malang"],
    featured: false,
    image: "/assets/packages/best-of-java",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Jakarta",
        location: "Jakarta",
        description: `Arrive at any time. Welcome to Indonesia's modern metropolis, and capital city, on the coast of Java. There are no planned activities until the evening welcome meeting, so get out there and explore. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.`,
        accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Jakarta/Bandung",
        location: "Jakarta/Bandung",
        description: `Enjoy a guided city tour of Jakarta visiting the former Batavia area, remnants of the colonial past, and stroll through the Sunda Kelapa Harbour. In the afternoon, depart for Bandung surrounded by volcanic peaks and tea plantations. Opt to see the Angklung Orchestra, where you'll hear resonating traditional melodies created by shaking bamboo instruments. Jakarta City TourJakarta Tour Bandung and see the former Batavia area, where Jakarta began before it grew to its current size. Visit the Sunda Kelapa Harbour — once the main port of the Sunda Kingdom, it’s now a bustling port full of Makassar schooners. Private VehicleJakarta – Bandung3h150km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeBandung Use some free time to make the most of Bandung. Hide Angklung Orchestra PerformanceBandung Opt to go to the Angklung Orchestra — a unique musical treat. Be moved by beautiful melodies at this traditional bamboo instrument concert performed by students.`,
        accommodation: "Arion Suite Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Bandung/Yogyakarta",
        location: "Bandung/Yogyakarta",
        description: `Board a morning train and take in the beautiful scenery on the ride to Yogyakarta, steeped in ancient ruins and culture. On arrival, opt to go on a cycling tour or take in a Ramayana dance performance. TrainBandung – Yogyakarta7h402km Climb aboard, take a seat, and enjoy the ride. Free TimeYogyakartaAfternoon Get out and discover more of Java's cultural heart. Hide Ramayana Dance PerformanceYogyakarta Opt to see a Ramayana Dance performance, an Indonesian ballet that is a beautiful form of kinetic storytelling that incorporates acrobatics.`,
        accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Yogyakarta",
        location: "Yogyakarta",
        description: `Venture to the Prambanan Hindu temple complex, a UNESCO World Heritage Site, and wander through the remains of some 244 temples, with some towering out of the rubble. Spend the afternoon at leisure. Prambanan Hindu Temple Complex ExcursionYogyakarta Tour Prambanan, the largest Hindu temple complex in Java, and learn about the history of the temples. Built between the eighth and tenth centuries, these temples now stand as one of the most outstanding works of Hindu art. View their intricate design, particularly on the Shiva temple.`,
        accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Yogyakarta",
        location: "Yogyakarta",
        description: `Visit Borobudur, the largest Buddhist sanctuary in the world and another UNESCO World Heritage Site. Spend time exploring the pyramid-like complex, admiring the intricate carvings, and come away with a deeper understanding of Buddhist culture here. Later, enjoy free time to continue exploring Yogyakarta. Private VehicleYogyakarta – Borobudur1h30m Settle in and scan the scenery from the convenience of a private vehicle. Borobudur Temple Complex ExcursionBorobudur Take in the stunning artistic and architectural marvel that is the Buddhist Temple complex of Borobudur, a not-to-be-missed World Heritage Site. Learn about its interesting history and restoration; the site lay undiscovered under layers of volcanic ash until 1815, when Sir Stamford Raffles, then Governor of Java, ordered the area to be cleared. Free TimeYogyakartaAfternoon Get out and discover more of Java's cultural heart.`,
        accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Yogyakarta/Ngadas",
        location: "Yogyakarta/Ngadas",
        description: `Continue the journey across the agricultural heartland of Java to Ngadas, a village in the scenic Mt Bromo region. Experience the local culture with a Pingintrip-supported community homestay. Private VehicleYogyakarta – Desa Ngadas8h400km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Ngadas Homestay Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Overnight with a local family participating in the community's homestay program, a Pingintrip-supported initiative. Learn about the local culture, customs, and traditions from your hosts.`,
        accommodation: "Ngadas Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Ngadas/Malang",
        location: "Ngadas/Malang",
        description: `Start early today (approximately 2:30am) for a pre-dawn trek across the "sea of sand" to Mt Bromo. Watch the sunrise over the crater's rim, popular with both tourists and the local Buddhist Tenggerese, who present offerings seeking blessings from Sang Hyang Widhi Wasa, the supreme deity. Head back to Ngadas for lunch before exploring more of the village on an included walk. Later, travel to Malang for the night. Sunrise Walk to Mount Bromo ViewpointGunung Bromo30m Head out before dawn to visit the viewpoint for magnificent Mt Bromo (2,392m), one of the most spectacular sights in Indonesia. Walk along the "sea of sand" and enjoy stunning views as the sun rises over the edge of the crater and be amazed by the volcano's strange beauty, seemingly from another world. Your G for Good Moment: Village Walk Learn more about daily life in Ngadas with a village walk. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Private VehicleDesa Ngadas – Malang1h30m-2h Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Whiz Prime Malang (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Malang/Sanur",
        location: "Malang/Sanur",
        description: `Drive from Malang to Surabaya airport for a short flight to Sanur, a serene seaside town on the island of Bali. Spend the afternoon on the beach, and cheers to a beautiful sunset. Private VehicleMalang – Juanda International Airport2h95km Settle in and scan the scenery from the convenience of a private vehicle. PlaneJuanda International Airport – Denpasar1h Look! Up in the sky! It's a bird! It's a plane! It's... yup, it is a plane, actually. Private VehicleDenpasar – Sanur30m16km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSanurAfternoon Enjoy some free time back in Sanur.`,
        accommodation: "Swastika Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Sanur",
        location: "Sanur",
        description: `Depart at any time. Departure Day Not ready to leave? Your Tour Leader can help with travel arrangements to extend your adventure.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-indonesia-candidasa-mt-rinjani-the-gilis",
    code: "PT-BALI-05",
    slug: "indonesia-candidasa-mt-rinjani-the-gilis",
    title: {
      en: "Bali & Lombok: Beaches, Rinjani Treks & Gili Islands",
      id: "Bali, Gunung Rinjani & Kepulauan Gili",
      cn: "巴厘岛、林贾尼火山与吉利群岛",
    },
    description: {
      en: "Discover Indonesia's cultural and natural diversity over 9 transformative days. Relax on Candidasa's tranquil shores, trek Mount Rinjani's lush foothills with expert local guides, master Sasak culinary traditions, and snorkel Gili Trawangan's turquoise reefs.",
      id: "9 hari budaya, trekking dan kebahagiaan pulau — jelajahi Candidasa, mendaki kaki bukit Gunung Rinjani dengan pemandu wanita lokal, belajar masak Sasak, dan snorkeling di Gili Trawangan.",
      cn: "9天文化、徒步与海岛之旅——探索坎迪达萨、与当地女导游徒步林贾尼火山山麓、学习萨萨克烹饪、在吉利特拉旺安浮潜。",
    },
    durationDays: 9,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1599, discountedAmount: 1399},
      IDR: {amount: 27500000, discountedAmount: 24000000},
      CNY: {amount: 10909, discountedAmount: 9544},
    },
    regionId: "region-bali",
    startingPoint: "Ubud",
    route: {
      en: "Candi Dasa to Gili Trawangan",
      id: "Candi Dasa ke Gili Trawangan",
      cn: "坎迪达萨至吉利特拉旺安",
    },
    highlights: [
      "candidasa",
      "mount-rinjani",
      "sasak-cooking",
      "gili-trawangan",
    ],
    featured: false,
    image: "/assets/packages/bali-lombok-beaches-rinjani",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Candi Dasa",
        location: "Candi Dasa",
        description: `Touch down in Bali and transfer to Candidasa, a serene coastal village on the island's eastern shore—far removed from the tourist crowds of Kuta and Seminyak. Arrive at your beachfront resort and settle in before joining your Tour Leader and fellow travelers for a welcome meeting. Review the week ahead, ask questions, and connect over dinner (optional). Check the lobby for exact meeting time and location.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Candi Dasa",
        location: "Candi Dasa",
        description: `Candidasa reveals itself at your pace today. Join a Balinese cooking class to master Chicken Tum (spiced chicken wrapped in banana leaves) and Gado-Gado (vegetable salad with peanut sauce). Alternatively, snorkel the Blue Lagoon's coral gardens where colorful fish dart through crystal-clear shallows. Or simply lounge on black-sand beaches, explore nearby temples, or indulge in a seaside massage. Your day, your choice.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Candi Dasa/Sembalun",
        location: "Candi Dasa/Sembalun",
        description: `Sail to Lombok via morning ferry, arriving late morning to begin your Mount Rinjani adventure. Journey north to Senaru village, where expert local guides lead you through Gunung Rinjani National Park's foothills. Hike shaded pathways through bamboo groves and village gardens, following ancient irrigation channels to the thundering Sindang Gile and Tiu Kelep waterfalls within Senaru Reserve. Local legend claims these falls possess healing powers. Spot long-tailed monkeys and, if fortunate, the rare ebony leaf monkey. Learn how Sasak communities utilize medicinal plants along the trail.`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Sembalun/Pringgasela",
        location: "Sembalun/Pringgasela",
        description: `Continue exploring Rinjani's foothills on a leisurely half-day trek showcasing lush valleys, traditional heritage houses, and sweeping rice terraces backed by volcanic peaks. Visit a weaving community preserving generations-old backstrap loom techniques before driving 2 hours and 15 minutes (80km) south to Pringgasela. Settle into your lodge and join a hands-on cooking class where local chefs teach you to prepare semur ayam (braised chicken) using banana root and bamboo shoots—uniquely Lombok ingredients.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Pringgasela/Kuta",
        location: "Pringgasela/Kuta",
        description: `Choose your morning adventure: trek through pineapple and cassava plantations to a riverside rest stop, then climb a hilltop for panoramic Rinjani and rice terrace views—or simply relax at the lodge. After lunch, drive 2–2.5 hours south to Kuta, stopping at a traditional Sasak village to witness Gendang Beleq—a thunderous drum performance featuring massive drums and traditional instruments. Observe bamboo, wood, and clay thatched-roof houses while interacting with villagers about their customs and daily life.`,
        accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Kuta",
        location: "Kuta",
        description: `Kuta, Lombok (not to be confused with Bali's surf capital) unfolds before you today. This southern coast village offers pristine beaches ideal for swimming, sunbathing, or learning to surf with local instructors. Wander the coastline at your leisure, discovering hidden coves and traditional fishing boats. The day belongs entirely to you—adventure or relaxation, activity or stillness.`,
        accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Kuta/Gili Trawangan",
        location: "Kuta/Gili Trawangan",
        description: `Journey north toward the legendary Gili Islands with a stop in Bonjeruk Village, home to a youth-led English learning initiative. A student guide accompanies you on a 60-minute village cycling tour before you feast on a home-cooked Lombok lunch featuring regional specialties. Dessert comes courtesy of village women presenting handcrafted cakes made from sweet potato flour and sticky rice. Continue 90 minutes–2 hours to Bangsal harbor for the 30-minute ferry to Gili Trawangan—the car-free paradise where your island chapter begins.`,
        accommodation: "Hotel Vila Ombak (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Your final full day on Gili T is a blank canvas. Snorkel vibrant reefs independently or on guided trips, cycle the island's perimeter (90 minutes by bike), practice beachfront yoga beneath swaying palms, or simply stake your claim on soft white sand. No motorized vehicles interrupt the island's tranquility—only bicycle bells and lapping waves. Design your perfect tropical finale.`,
        accommodation: "Hotel Vila Ombak (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Your Bali-Lombok journey concludes today. Depart Gili Trawangan at your convenience, carrying memories of Rinjani treks, Sasak traditions, volcanic sunrises, and endless turquoise horizons.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-highlights-of-java-temples-the-dieng-plateau",
    code: "PT-JAVA-02",
    slug: "highlights-of-java-temples-the-dieng-plateau",
    title: {
      en: "Highlights of Java: Temples & the Dieng Plateau",
      id: "Sorotan Jawa: Candi & Dataran Tinggi Dieng",
      cn: "爪哇亮点：寺庙与迪恩高原",
    },
    description: {
      en: "8 days discovering Java's hidden gems — explore Jakarta's energy, Bandung's colonial charm, the mystical Dieng Plateau, and Yogyakarta's world-famous temples.",
      id: "8 hari menemukan permata tersembunyi Jawa — jelajahi energi Jakarta, pesona kolonial Bandung, Dataran Tinggi Dieng yang mistis, dan candi-candi terkenal Yogyakarta.",
      cn: "8天发现爪哇隐藏宝石——探索雅加达的活力、万隆的殖民魅力、神秘的迪恩高原和日惹的世界著名寺庙。",
    },
    durationDays: 8,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 1299, discountedAmount: 1099},
      IDR: {amount: 22300000, discountedAmount: 18900000},
      CNY: {amount: 8862, discountedAmount: 7497},
    },
    regionId: "region-central-java",
    startingPoint: "Canggu",
    route: {
      en: "Jakarta to Yogyakarta",
      id: "Jakarta ke Yogyakarta",
      cn: "雅加达至日惹",
    },
    highlights: [
      "jakarta",
      "bandung",
      "dieng-plateau",
      "semarang",
      "yogyakarta",
    ],
    featured: false,
    image: "/assets/packages/highlights-java-dieng",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Jakarta",
        location: "Jakarta",
        description: `Welcome to Java! Arrive at any time. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.`,
        accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Jakarta",
        location: "Jakarta",
        description: `Explore the capital city of Indonesia's 17,000+ islands. Today in this bustling metropolis, we'll visit Istiqlal Mosque, the largest mosque in all of Southeast Asia, the neo-Gothic Jakarta Cathedral, and the cobble stoned colonial Kota Tua Old Town. Explore Sunda Kelapa Harbor and the historic pinisi ships. After a full day of adventure, head out for dinner along Sabang street at a local warung (local Indonesian restaurant). Kota Tua Old Town Jakarta & Jamu DrinksJakarta Follow your Tour Leader on a tour of Kota Tua, Jakarta's original downtown. Lined with Dutch Colonial buildings and cobblestone streets, this area was also known as Old Batavia during the 17th century. Visit a modern Javanese herbal cafe and try the historic Jamu drink. Indonesia's traditional herbal drink Jamu is losing popularity among young people, who find its bitter taste and old-fashioned image unappealing. With the rise of modern beverages and global drink trends, Jamu is often seen as a drink of the past. Cafes around Jakarta are working to change this narrative by reimagining Jamu for a new generation, using modern brewing methods, unique flavor combinations, and sleek presentation to make this traditional drink appealing and relevant once again. Sunda Kelapa HarborJakarta Visit Sunda Kelapa Harbor - a historic port that has been in operation for centuries. It’s the perfect spot to see traditional wooden schooners, or \"phinisi\" ships, still in use today. You’ll be able to take in the lively atmosphere of the harbor, as merchants and fishermen go about their work, offering a unique insight into the life of Jakarta’s maritime culture. Istiqlal Mosque VisitJakarta Visit the largest mosque in all of Southeast Asia, the Istiqlal Mosque. This national mosque of Indonesia was built to commemorate Indonesian independence and named \"Istiqlal\", an Arabic word for \"independence.\" Jakarta CathedralJakarta Admire the impressive stained-glass windows, intricate sculptures, and the grand altar as you learn about the country’s Christian history and the harmony between different faiths in Jakarta. Your Foodie Moment: Sabang Street Dinner Enjoy dinner like the locals on Sabang Street, Jakarta's culinary center. We'll find a fun warung, local Indonesian restaurant, and try traditional meals like Lontong Sayur (rice cake with veggies and coconut milk broth), Ketoprak (a veggie dish with a splash of peanut sauce), or Gado-gado (local salad with peanut sauce dressing).`,
        accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Jakarta/Bandung",
        location: "Jakarta/Bandung",
        description: `Travel southeast towards Bandung, another major city in West Java. After arriving, sit down for a traditional Sundanese lunch, eaten family-style. Explore this historic city & Indonesia's natural heritage with time to visit the Geological Museum of Bandung. We'll drive to Gedung Sate for a photo stop on our way to visit Jalan Asia Afrika for some free time to explore. Private VehicleJakarta – Bandung4h150km Settle in and scan the scenery from the convenience of a private vehicle. Your Foodie Moment: Sundanese Lunch The Sundanese, one of Indonesia's largest ethnic groups, bring their rich cultural heritage to the table. Enjoy signature dishes, served family style, like nasi timbel (banana leaf-wrapped rice), karedok (raw vegetable salad with peanut sauce), and ikan bakar (grilled fish). Enjoy the freshness, light flavors and aromatic herbs celebrating the region's natural bounty. Badung Geological MuseumBandung Visit to the Geological Museum of Bandung. Exploring exhibits on fossils, minerals, and geological history, offering a fascinating insight into Indonesia's natural heritage. Gedung Sate Photo StopBadung Drive to visit the beautiful Dutch architecture of Gedung Sate. Jalan Asia AfrikaBandung Walk along Jalan Asia Afrika and do some shopping along the row of white columns. Admire the classic Dutch colonial architecture as it starts to turn pink and orange at sunset.`,
        accommodation: "Arion Suite Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Bandung",
        location: "Bandung",
        description: `Today is a free day to explore Bandung however you'd like. Choose to explore the vibrant city or stay active with a visit to Tangkuban Prahu volcano or Kawah Putih crater for some easy hiking. Combo that with a visit to a local tea plantation for lunch and a tea tasting. Free TimeBandungFull Day Enjoy a full day to explore the city of Bandung. Show`,
        accommodation: "Arion Suite Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Bandung/Semarang",
        location: "Bandung/Semarang",
        description: `Depart Bandung this morning and drive to Semarang to arrive in the early afternoon. Explore the sights of the city like Greja Blenduk and Lawang Sewu for the charming Dutch architecture. Visit Sam Poo Kong Temple, a historic Chinese temple, and Kota Lama, the historic downtown of Semarang. Save room after lunch as you will try the local favorite, Lumpia, a delicious Javanese spring roll. Private VehicleBandung – Semarang5h360km Settle in and scan the scenery from the convenience of a private vehicle. Semarang Kota LamaSemarang Take a walking tour of the historic downtown of Semarang Kota Lama. This area is known for its charming colonial-era buildings and old streets. You can stop by some iconic spots such as the Semarang City Hall, Café Taman Sari and Greja Blenduk, one of the oldest churches in Semarang. Sam Poo Kong TempleSemarang Visit the oldest Chinese temple in Semarang, originally built in the early 1400's. This temple was established by Chinese Muslim explorer Cheng Ho. The original temple was a cave the explorer found on one of his expeditions, but after an avalanche in the 18th century, the current temple was reconstructed in a cave next door. Lawang SewuSemarang Explore this colonial-era building with its grand architecture and fascinating history. It was originally built by the Dutch East Indies Railway company, and nowadays is said to be haunted due to the tragic activities that took place here in the 20th century.`,
        accommodation: "Santika Premiere Semarang (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Semarang/Dieng Plateau",
        location: "Semarang/Dieng Plateau",
        description: `Leave the city behind and head into the central Java mountains today. The first stop today will be to Gedong Songo Temple, on the slopes of Mount Ungaran. This beautiful Hindu temple is perched on the mountain in solitude surrounded by nothing but forests. After some time to explore and take photos, we'll visit the Ambarawa Train Museum, where 21 historic locomotives still reside in Java today. Make your way to Wonosobo in the Dieng Plateau region and enjoy a free evening. Private VehicleAmbarawa – Wonosobo3h80km Settle in and scan the scenery from the convenience of a private vehicle. Gedong Songo Temple VisitUngaran Visit the stunning Gedong Songo Temple, nestled on the slopes of Mount Ungaran. This beautiful site is so peaceful and the stone carvings are extremely impressive. It is an excellent opportunity to learn about Java's ancient history and take in the panoramic views of the surrounding mountains. Take a walk around the temple grounds and enjoy the incredible views of Sindoro and Sumbing mountains. Railway Museum AmbarawaAmbarawa Visit the Ambarawa Railway Museum which preserves 21 steam locomotives, with four still operational. Historic furniture, telephones, train signals and bells are also part of the collection that reveal exciting stories about old Java adventures. Private VehicleSemarang – Ungaran2h45km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "DAFAM Hotel Wonosobo (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Dieng Plateau",
        location: "Dieng Plateau",
        description: `Visit the breathtaking Dieng Plateau and enjoy the day to explore with your Tour Leader as your guide! We'll see the sights like the colorful Telaga Warna Lake, misty Arjuna Temple and sulphurous Si Kidang Crater. After an adventurous day in nature, spend the evening in Wonosobo town square, where the locals gather to see what the evening food vendors are selling. Wonosobo Town SquareWonosobo Explore Wonosobo town square with your Tour Leader. This is where locals gather and hang out after a long day. The northern part of this town square is famous for its snacks and food vendors (a must-try dish is called Serabi). Older ladies are always found there cooking their snacks using traditional cooking utensils called “anglo.” Serabi is a traditional Balinese–Javanese snack, similar to a pancake, made of a rice flour-based batter with coconut milk or coconut. Dieng Plateau AdventureDieng Plateau A visit to Dieng Plateau takes you to a high-altitude wonderland, known for its cool climate, volcanic craters, and ancient temples. Located in Central Java, the plateau features stunning natural landscapes, including colorful sulfur lakes and geothermal vents. Alongside your Tour Leader, explore the historic temples, enjoy the breathtaking views, and experience the unique cultural and natural beauty of this serene, highland destination.`,
        accommodation: "DAFAM Hotel Wonosobo (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Dieng Plateau/Yogyakarta",
        location: "Dieng Plateau/Yogyakarta",
        description: `On the way to Yogyakarta, stop at the spectacular Selogriyo Temple, a gorgeous Hindu temple dedicated to the Goddess of Fertility in central Java. Enjoy the uphill scenic walk through the complex. Continue on to Yogyakarta where your tour ends on arrival. Please do not book onward travel earlier than 7:00pm. Private VehicleWonosobo – Magelang2h60km Settle in and scan the scenery from the convenience of a private vehicle. Selogriyo TempleMagelang Visit the small, hidden Hindu temple complex dated from the 9th century, Selogriyo. Located in a small village in the city of Magelang, explore the village and lush rice paddies with your local guide. You're welcome to get a little muddy in the rice fields or stay clean on the small street. Private VehicleMagelang – Yogyakarta2h60km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-classic-java-borobudur-mt-bromo",
    code: "PT-JAVA-03",
    slug: "classic-java-borobudur-mt-bromo",
    title: {
      en: "Classic Java: Borobudur & Mt Bromo",
      id: "Java Klasik: Borobudur & Gunung Bromo",
      cn: "经典爪哇：婆罗浮屠与布罗莫火山",
    },
    description: {
      en: "8 days through Central and East Java — explore Yogyakarta, witness sunrise at Borobudur, discover Solo's batik heritage, and trek across Mt Bromo's otherworldly sand sea.",
      id: "8 hari melalui Jawa Tengah dan Timur — jelajahi Yogyakarta, saksikan matahari terbit di Borobudur, temukan warisan batik Solo, dan trekking di lautan pasir Gunung Bromo.",
      cn: "8天穿越中爪哇和东爪哇——探索日惹、在婆罗浮屠观日出、发现梭罗的蜡染遗产、徒步穿越布罗莫火山的超现实沙海。",
    },
    durationDays: 8,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1199, discountedAmount: 999},
      IDR: {amount: 20600000, discountedAmount: 17200000},
      CNY: {amount: 8180, discountedAmount: 6815},
    },
    regionId: "region-central-java",
    startingPoint: "Prambanan Temple",
    route: {
      en: "Yogyakarta to Surabaya",
      id: "Yogyakarta ke Surabaya",
      cn: "日惹至泗水",
    },
    highlights: ["yogyakarta", "borobudur", "solo", "mount-bromo", "surabaya"],
    featured: false,
    image: "/assets/packages/classic-java-borobudur",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Yogyakarta",
        location: "Yogyakarta",
        description: `Welcome to Java. Arrive at any time. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.`,
        accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Yogyakarta",
        location: "Yogyakarta",
        description: `There's so much to discover in Yogyakarta today! Explore some Javanese temples, bike to rice paddies on the outskirts of the city, or go for a foodie tour and try street food like gudeg (curry made from unripe jackfruit). Free TimeYogyakartaFull Day Get out and explore Yogyakarta and its surrounding attractions. Show`,
        accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Yogyakarta/Magelang",
        location: "Yogyakarta/Magelang",
        description: `Visit Candirejo Village on the way to Magelang today. Accompanied by a local guide, learn more about this village and why its known as a symbol of Javanese culture. Here you will gain more insight into daily activities, the multiple-crop farming system, and their traditions. After a delicious local lunch, drive to Magelang for the night. Private VehicleYogyakarta – Candirejo1h30m45km Settle in and scan the scenery from the convenience of a private vehicle. Candirejo Village VisitCandirejo Visit Candirejo, a captivating village sitting among vibrant green fields. Meet friendly residents, and learn all about ancient traditions and Javanese culture. This community directly supports women’s empowerment in the Candirejo Ecotourism Village Development. Women play a central role in the home industry sector, which we have a chance to see on this visit. Take home the perfect souvenir — homemade handicrafts and furniture can be found here, including wonderful pieces made of bamboo made by the local women's initiative.`,
        accommodation: "Puri Asri Magelang Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Magelang/Solo",
        location: "Magelang/Solo",
        description: `We'll rise before the sun today in order to catch a beautiful sunrise atop Setumbu Hill. This easy hike will bring you above the early morning fog for a gorgeous view of the jungly temple topped mountains. After descending, return to the village for an easy biking tour to see its beautiful sites like Borobudur Temple and the traditional market. This evening, drive to Solo. Setumbu Hill Sunrise HikeMagelang This is a perfect place for a sunrise, with the temples and jungle encapsulated by fog with a mountain backdrop. The hike to Setumbu is doable for all fitness levels. It can be steep in parts, but it’s not too difficult. It takes about 30-45 mins. The trail is a dirt path with some steps. Wanurejo & Borobudur Village Biking TourMagelang Explore the local villages by bicycle to visit its local businesses, traditional markets and outside around Borobudur Temple. The cycling is on a flat paved village road and total cycling distance is under 7km. Private VehicleMagelang – Solo3h90km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "The Royal Surakarta Heritage (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Solo",
        location: "Solo",
        description: `Spend the day getting to know the history and traditions of Central Java in Solo, known as the center of Javanese culture. With visits to Mangkunegaran Palace, Triwindhu Market and Laweyan Village, you'll have the chance to see how traditional heritage is still alive today. Triwindhu MarketSolo Visit the Triwindhu Market. This is a great place to find traditional Javanese items, antiques, textiles, and local handicrafts. If you're interested in souvenirs, this is the place to be! Don’t hesitate to bargain a little with the vendors. Mangkunegaran Palace VisitSurakarta Take in the mix of Javanese and European architecture at this charming palace. Keep an eye out for royalty -- members of the aristocratic family still reside in the palace. Your Hands-On Moment: Traditional Batik Making Learn about the traditional process of Batik-making. Then, have the chance to create your own batik piece, guided by skilled artisans. It’s a fantastic hands-on experience and a great souvenir opportunity!`,
        accommodation: "The Royal Surakarta Heritage (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Solo/Bromo",
        location: "Solo/Bromo",
        description: `After breakfast, continue east to Ngadas Village. On the way, make stops to explore Alun Alun Malang City Square and colorful Jodipan Village. Arrive to Ngadas in the late afternoon. This picturesque village in the foothills of Mt Bromo is known for its Javanese traditions and beautiful nature. Your G for Good Moment: Ngadas Homestay Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Overnight with a local family participating in the community's homestay program, a Pingintrip-supported initiative. Learn about the local culture, customs, and traditions from your hosts. Jodipan Colorful Village VisitMalang Grab your camera for a visit to the picture perfect Jodipan Village. Known for its colorful rainbow homes, like the while town is a mural. Private VehicleSolo – Ngadas5h370km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Ngadas Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Bromo",
        location: "Bromo",
        description: `An early morning jeep ride is the best way to see the Bromo Crater this morning. Followed by a 45 minute hike to reach Penanjakan Hill view point just in time for sunrise! Admire the oranges and pinks before continuing the hike through the Sea of Sands to the top of Bromo Crater. Enjoy a picnic breakfast at Teletubbies Hill. Return to Ngadas Village for a walking tour (and maybe a coffee?) to see the temples, the tomb of mbah Sedek and the holy forest. Enjoy a local lunch and dinner at the homestay with free time to explore how you wish in between. Your G for Good Moment: Village Walk Learn more about daily life in Ngadas with a village walk. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Your G for Good Moment: Lunch at Ngadas Village Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Enjoy a village walk and local lunch at this Pingintrip-supported initiative. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Learn about the local culture, customs, and traditions from your hosts. Free TimeNgadas Enjoy a free afternoon in Ngadas Village. Mount Bromo Jeep ExcursionGunung Bromo4h Jump in a jeep and explore the winding landscape of Eastern Java, climbing upwards and outwards towards the grandeur of Mt Bromo to witness a stunning sunrise. Hike to the peak of Mt Bromo, part of the Tengger Calder, the largest volcanic range in the area. A distinct site, the volcano blew its top off completely and is constantly smouldering with white smoke.`,
        accommodation: "Ngadas Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Bromo/Surabaya",
        location: "Bromo/Surabaya",
        description: `Fill up on breakfast, then load into the bus to drive to Surabaya. Your tours ends on arrival at the Surabaya Airport. Please book onward travel after 3pm. Private VehicleBromo – Surabaya4h130km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-classic-lombok",
    code: "PT-LMBK-01",
    slug: "classic-lombok",
    title: {
      en: "Classic Lombok: Beaches, Culture & Gili Islands",
      id: "Lombok Klasik: Pantai, Budaya & Kepulauan Gili",
      cn: "经典龙目岛：海滩、文化与吉利群岛",
    },
    description: {
      en: "8 days exploring Lombok's raw beauty — snorkel Candidasa's coast, discover Kuta Lombok's untouched beaches, sail to the Gili Islands, and experience authentic Sasak culture.",
      id: "8 hari menjelajahi keindahan mentah Lombok — snorkeling di pantai Candidasa, temukan pantai Kuta Lombok yang belum tersentuh, berlayar ke Kepulauan Gili, dan rasakan budaya Sasak asli.",
      cn: "8天探索龙目岛的原始之美——在坎迪达萨海岸浮潜、发现库塔龙目岛的原始海滩、航行到吉利群岛、体验正宗的萨萨克文化。",
    },
    durationDays: 8,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 1399, discountedAmount: 1199},
      IDR: {amount: 24000000, discountedAmount: 20600000},
      CNY: {amount: 9544, discountedAmount: 8180},
    },
    regionId: "region-lombok",
    startingPoint: "Ubud",
    route: {
      en: "Candi Dasa to Sanur",
      id: "Candi Dasa ke Sanur",
      cn: "坎迪达萨至萨努尔",
    },
    highlights: ["candidasa", "kuta-lombok", "senggigi", "gili-trawangan"],
    featured: false,
    image: "/assets/lombok",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Candi Dasa",
        location: "Candi Dasa",
        description: `Arrive at any time. The welcome moment begins at 18:00. Please ensure you arrive at the joining hotel by then to ensure you do not miss the meeting. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Candi Dasa/Kuta",
        location: "Candi Dasa/Kuta",
        description: `Take a local ferry to Lombok and visit a Sasak traditional village en route to Kuta. Arrive at the shores of Lombok and head to a traditional Sasak village. Meet the locals and learn more about their unique culture and way of life. Continue on to Kuta for the night. FerryCandi Dasa – Lembar6h Get to the next spot on your route aboard a ferry boat. Private VehicleLembar – Kuta1h30m50km Stop to visit a Sasak village on the way. Sasak Village VisitLembar Visit this village of farmers and weavers and discover their way of life. Listen to the history of the community as you wander the paths between the traditional homes.`,
        accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Kuta",
        location: "Kuta",
        description: `Enjoy a full day exploring the area around Kuta. Opt for a surf lesson or visit one of the beautiful beaches nearby. Hide Surf LessonKuta48USD per person Ready to ride the waves? Head to scenic Seger beach for a morning surf lesson.`,
        accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Kuta/Senggigi",
        location: "Kuta/Senggigi",
        description: `Enjoy a spectacular drive through the middle of Lombok. Stop at the Tetebatu community to enjoy an easy trek led by a local guide. Explore the surrounding plantation to see rice cultivation and, weather permitting, views of Mt. Rinjani. Opt for a buffet lunch in the Tetebatu community before continuing on to visit the slopes of the Rinjani Volcano. Hike to a secluded waterfall and take a dip in the fresh water. Continue on to Senggigi for the night. Private VehicleKuta – Tetebatu2h60km Settle in and scan the scenery from the convenience of a private vehicle. Tetebatu Countryside TrekTetebatu2h Head out for a couple hours of easy trekking. Pass local homes and rice fields while learning more about the region. Private VehicleTetebatu – Batukliang1h20km Settle in and scan the scenery from the convenience of a private vehicle. Benang Kelambu Waterfall SwimBatukliang30m-1h Enjoy a walk through the tropical forest and be rewarded by the beauty of the Benang Kelambu Waterfall and swim in its deep pool. Private VehicleBatukliang – Senggigi2h-2h15m60km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Senggigi/Gili Trawangan",
        location: "Senggigi/Gili Trawangan",
        description: `This morning we head to the stunning Gili Islands. Once at the islands enjoy a half-day snorkelling trip and check out what's living under the sea. Drive to the coast and hop on a speedboat to Gili and settle in for a few days on the islands. The Gilis are paradise incarnate with a tiny population, no cars, and gorgeous white-sand beaches. Please note there is limited fresh water available on the Gilis and electricity is supplied by generators. Showers often use desalinated salt water and rooms are typically fan-cooled (no air conditioning). Private VehicleSenggigi – Pemenang45m24km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPemenang – Gili Trawangan15m Cut swiftly through the water en route to the next stop (and hang on to your hat). Snorkelling ExcursionGili Trawangan3h-4h Grab a mask and swim amongst the tropical fish. If you're lucky spot a turtle.`,
        accommodation: "Hotel Vila Ombak (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Today is free for exploring. Opt to rent a bike and cycle around the island, visit the shopping area, or try some yoga. Free TimeGili TrawanganHalf Day Get active or just chill out— the choice is yours. Hide YogaGili Trawangan What's better than a relaxing yoga class in paradise? Get your om on in the Gilis.`,
        accommodation: "Hotel Vila Ombak (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Gili Trawangan/Sanur",
        location: "Gili Trawangan/Sanur",
        description: `Travel back to Bali by boat for a final dinner and farewells. Spend the final evening with an optional dinner together, reflecting on the adventure under a beautiful Balinese sunset. FerryGili Trawangan – Padangbai1h30m-2h65km Get to the next spot on your route aboard a convenient and efficient ferry boat. Private VehiclePadangbai – Sanur1h-1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSanurAfternoon Enjoy a free afternoon to explore a bit of Sanur.`,
        accommodation: "Swastika Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Sanur",
        location: "Sanur",
        description: `Depart at any time.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-indonesia-bali-adventure",
    code: "PT-BALI-06",
    slug: "indonesia-bali-adventure",
    title: {
      en: "Bali Adventure: Temples, Hot Springs & Culture",
      id: "Petualangan Bali: Candi, Sumber Air Panas & Budaya",
      cn: "巴厘岛探险：寺庙、温泉与文化",
    },
    description: {
      en: "9 days immersed in Bali's spiritual heart — explore Seminyak, trek through Munduk's waterfalls, stay in Bulian village, summit Mount Batur, and relax in Candidasa.",
      id: "9 hari tenggelam di jantung spiritual Bali — jelajahi Seminyak, trekking di air terjun Munduk, menginap di desa Bulian, mendaki Gunung Batur, dan bersantai di Candidasa.",
      cn: "9天沉浸在巴厘岛的精神中心——探索塞米亚克、徒步穿越蒙杜克瀑布、住在布利安村、登顶巴图尔火山、在坎迪达萨放松。",
    },
    durationDays: 9,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1599, discountedAmount: 1399},
      IDR: {amount: 27500000, discountedAmount: 24000000},
      CNY: {amount: 10909, discountedAmount: 9544},
    },
    regionId: "region-bali",
    startingPoint: "Seminyak",
    route: {
      en: "Seminyak to Candi Dasa",
      id: "Seminyak ke Candi Dasa",
      cn: "塞米亚克至坎迪达萨",
    },
    highlights: [
      "seminyak",
      "munduk",
      "bulian-village",
      "mount-batur",
      "ubud",
      "candidasa",
    ],
    featured: false,
    image: "/assets/packages/bali-adventure",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Seminyak",
        location: "Seminyak",
        description: `Welcome to Bali! Arrive at any time and enjoy the exciting beach town of Seminyak. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.`,
        accommodation: "Puri Saron Hotel Seminyak (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Seminyak/Munduk",
        location: "Seminyak/Munduk",
        description: `Head north this morning as we say goodbye to Seminyak and travel toward Munduk. Our day will be filled with exciting stops along the way, starting with the UNESCO World Heritage Site Jatiluwih Rice Terraces where we can explore the ancient emerald-green fields. The second stop is Baturiti Fruit Market where we can wander through the colorful stalls and try fresh fruits like rambutan and dragon fruit, depending on the season. Continue on to the gorgeous temple in the middle of the lake, at Ulun Danu Temple. Take the scenic route to Munduk with one final pit stop at the Twin Lake photo spot. Arrive to Munduk in the evening, check in the hotel and enjoy some free time. Private VehicleDesa Jatiluwih – Munduk2h15m48km Settle in and scan the scenery from the convenience of a private vehicle. On the way, explore Baturit Fruit Market and try some local fresh fruit, and continue on with other awesome pit stops along the way. Jatiluwih Rice Terraces VisitTabanan1h Follow your Tour Leader down narrow paths as you explore the UNESCO-protected Jatiluwih Rice Terraces. Stop to enjoy the view as you trek around the area. Private VehicleSeminyak – Desa Jatiluwih2h50km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples.`,
        accommodation: "Meme Surung Guesthouse (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Munduk/Bulian",
        location: "Munduk/Bulian",
        description: `We're off to our G for Good supported community homestay in Bulian today but not without some adventure along the way. A dip in Banjar Hot Springs is without a doubt the perfect way to start today. From a relaxing moment to some upbeat adventuring, we head to lively and exciting Pasar Anyar Singaraja, a traditional market full of fresh produce and handmade homeware where locals come to haggle. The last stop of today is Beji Temple where we'll explore this historic complex before finally arriving to Bulian in the afternoon. Embark on a village tour and traditional Balinese offering making workshop as you immerse yourself in our homestay in Bulian. Banjar Hot SpringsMunduk Take a dip at Air Panas Banjar, a centuries-old therapeutic sulfur hot springs bathing spot nestled in lush vegetation in the hills of Bali. It is renowned for its therapeutic mineral-rich waters sourced from a natural volcanic spring. Spend time in the relaxing waters of Banjar’s three-tiered pools, each varying in temperature and offering a unique bathing experience. The soothing warmth of the mineral-rich waters is said to alleviate muscle tension and promote overall well-being. Singaraja Traditional MarketSingaraja Pasar Anyar Singaraja, also known as Singaraja Traditional Market, is one of the main traditional markets of the area. Once here, you can see first hand what's sold like fresh produce, rice and tobacco, or household necessities like locally made kitchenware and utensils on display across various stalls. For first-timers, the scene here may seem a bit chaotic, with cluttered stalls. But it’s one of the best places for bargains, and you might score a unique souvenir like gemstones and jewelry. Beji TempleBanjar Pabean The temple was built in the 15th century during the Majapahit period and is considered to be one of the oldest temples in Bali.The timeworn structures and walls within the temple complex are exquisitely contrasted by the manicured green lawns and tropical gardens. Shrine bases and white sandstone walls are covered in arrays of carvings, inspired by the great Hindu epics with a mixture of characters from fables and legends such as serpents, menacing demons and guardians. The stone staircases and temple gates of Pura Beji temple also feature intact statues. It's a great stopover for lovers of art and ancient architecture. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Private VehicleMunduk – Bulian2h15m54km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.`,
        accommodation: "Bulian Guesthouse (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Bulian/Kintamani",
        location: "Bulian/Kintamani",
        description: `After a delicious breakfast, we're off to Lemukih Village for the day. Trek through rice paddies, a durian plantation, a coffee plantation and even a natural waterslide that we'll get a chance to enjoy. After lunch in a local warung, we'll continue our trek to visit 2 beautiful waterfalls, where we can swim and relax. Head towards Kintamani, a highland region in Bali known for its stunning volcanic landscapes, like the active Mount Batur and the serene Lake Batur. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Lemukih Village TrekBulian5h-6h2km Trek up the 300 stairs from Lemukih Village and enjoy the view of rice terrace fields. Stop at a durian plantation and natural water slide, where of course we will have a chance to slide down the water slide! Trek through a coffee plantation, and stop at a local warung for lunch before continuing to two of Bali's most incredible but still undiscovered waterfalls, Fiji and Sekumpul.`,
        accommodation: "Lake View Kintamani Bali Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Kintamani/Ubud",
        location: "Kintamani/Ubud",
        description: `Don't miss the opportunity to explore Mt Batur at sunrise today! Choose the more active option of trekking to the sunrise point or choose the thrilling jeep sunrise adventure. After breakfast at the hotel, we'll visit the well preserved Penglipuran Village to experience picturesque Balinese culture. Afterwards, stop at the beautiful Pura Gunung Kawi Sebatu Temple on the way to Ubud. In the evening, arrive to Ubud. Free TimeBatur A sunrise visit to Mt Batur is a must! Opt to join a trek or jeep adventure this morning. Penglipuran Village VisitBangli Step into a timeless Balinese village known for its well-preserved traditional layout and culture. Wander its narrow lanes, interact with locals, and take in the authentic cultural atmosphere. Take up the opportunity to purchase locally made handicrafts as souvenirs. Pura Gunung Kawi Sebatu TempleSebatu Visit Pura Gunung Kawi Sebatu Temple. This serene temple complex is a hidden gem, offering a peaceful escape from the bustling tourist crowds. Explore the ancient carvings, tranquil pools, and lush gardens. Take time to soak in the spiritual atmosphere and admire the intricate details of the temple architecture. It's a wonderful place for reflection and appreciation of Balinese artistry. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Show`,
        accommodation: "Champlung Sari Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Ubud",
        location: "Ubud",
        description: `Ubud is often considered the cultural heart of Bali. Today you have the opportunity to explore however you'd like. From monkey forests, local cooking classes, making spiritual offerings and Balinese village experiences, your options for today are endless. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your Tour Leader has more ideas if you need them. Just ask! Show`,
        accommodation: "Champlung Sari Hotel (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Ubud/Candi Dasa",
        location: "Ubud/Candi Dasa",
        description: `After a yummy breakfast, we drive from Ubud to the coast! Arrive in Candi Dasa in eastern Bali this afternoon and enjoy some free time. Private VehicleUbud – Candi Dasa1h30m-2h43km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeCandi Dasa Enjoy a free afternoon in the seaside town of Candi Dasa.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Candi Dasa",
        location: "Candi Dasa",
        description: `Enjoy the amazing chance to explore Candidasa however you'd like! Opt to join a local Balinese cooking class and learn to make local favorites like Chicken Tum and Gado-Gado. Or take a snorkeling trip to the beautiful Blue Lagoon! The choice is yours. Free TimeCandi DasaFull Day Spend today exactly how you'd like in Candi Dasa! Show`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Candi Dasa",
        location: "Candi Dasa",
        description: `Depart at any time.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-bali-to-lembongan-island-hopping-bliss",
    code: "PT-BALI-07",
    slug: "bali-to-lembongan-island-hopping-bliss",
    title: {
      en: "Bali to Lembongan: Island Hopping Bliss",
      id: "Bali ke Lembongan: Jelajah Pulau Penuh Kebahagiaan",
      cn: "巴厘岛到蓝梦岛：跳岛幸福之旅",
    },
    description: {
      en: "11 days of island-hopping magic — surf Canggu, live village life in Bulian, trek Mount Batur, explore Ubud, and finish with crystal-clear waters on Nusa Lembongan.",
      id: "11 hari keajaiban jelajah pulau — berselancar di Canggu, hidup di desa Bulian, mendaki Gunung Batur, jelajahi Ubud, dan akhiri di perairan jernih Nusa Lembongan.",
      cn: "11天跳岛魔力之旅——在仓古冲浪、在布利安村体验乡村生活、徒步巴图尔火山、探索乌布、在蓝梦岛清澈海水中结束旅程。",
    },
    durationDays: 11,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1999, discountedAmount: 1799},
      IDR: {amount: 34300000, discountedAmount: 30900000},
      CNY: {amount: 13637, discountedAmount: 12273},
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Nusa Lembongan",
      id: "Canggu ke Nusa Lembongan",
      cn: "仓古至蓝梦岛",
    },
    highlights: [
      "canggu",
      "bulian-village",
      "mount-batur",
      "ubud",
      "nusa-lembongan",
    ],
    featured: true,
    image: "/assets/packages/bali-to-lembongan",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Canggu",
        location: "Canggu",
        description: `Welcome to Bali-a literal island paradise! Known for incredible surf, wild nightlife, with somehow both a hectic yet relaxed hippie vibe! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu! Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Canggu",
        location: "Canggu",
        description: `You came to an island known around the world for having epic surf, so whether you shred or have never seen a board, today is for you! Join a surf lesson for all levels, getting your footing on land before hitting the water to practice with the instructors. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer at a cute warung, local Indonesian restaurant. Free TimeCanggu Enjoy the rest of the day in Canggu! Surf Lesson in CangguCanggu You came to the one of the world's surf capitals! Now it's time to try it out for yourself! Join a lesson on land to learn the basics and some safety tips. Then catch some waves and shred the gnar.`,
        accommodation: "Roomates Hostel Canggu (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Canggu/Bulian",
        location: "Canggu/Bulian",
        description: `Take a break from Bali's wild side and head north to Bulian. Here we can connect will locals, slow down and enjoy Bali's famed rice terraces. On the way up, we'll stop at the breathtaking Ulundanu Temple, sitting on the edge of Lake Beratan. Continue to Bulian where we'll be welcomed with a drink and lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village to connect with the natural and cultural side of Bali. Learn to make Balinese offerings then head to the nearby temple and join a local priest for the ceremony. Private VehicleCanggu – Ulundanu2h55km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples. Private VehicleUlundanu – Bulian2h45km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Bulian",
        location: "Bulian",
        description: `Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village to see a durian plantation, beautiful rice terraces, coffee fields and waterfalls! You'll even have the chance to slide down a natural waterslide! Or choose to head out on a bike tour through Bulian to get acquainted with Northern Bali. Free TimeBulianFull Day Take today to explore Bulian your way! Show`,
        accommodation: "Bulian Homestay (or similar)Homestay",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Bulian/Kintamani",
        location: "Bulian/Kintamani",
        description: `A free morning gives you the chance to explore the rest of Bulian on your terms. Choose to just chill, or join a local cooking class or sunrise fishing trip. Then jump in the van and drive to Kintamani, the town nestled at the base of Mt Batur to arrive to our campsite for the night. Did we mention this campsite has a hot spring pool? Soak in the hot springs then join us 'round the campfire for a cozy night of camping! Free TimeBulianMorning Spend the morning free in Bulian. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Free TimeKintamani Enjoy the afternoon free to explore Toya Bungkah in Kintamani. Show`,
        accommodation: "Accommodation",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Kintamani/Ubud",
        location: "Kintamani/Ubud",
        description: `Rise and shine as we are getting after it today! Waking well before the sun, we'll start our 2 hour trek to reach the Mt Batur summit in time to enjoy an absolutely stunning sunrise. And what's a picturesque sunrise without a lil picnic breakfast, amirite? With the sun finally up, we'll hike back down for a proper breakfast and a well-deserved hot spring soak. Then it's goodbye Kintamani and hello Ubud! On the way, we'll stop at Pingintrip-supported PKP Community to meet with the women leaders, visit the garden and enjoy a local lunch. Then, the rest of the afternoon is yours to explore Ubud. But in the evening, put your party hat on because we're going out! Join your group and Tour Leader for your Big Night Out in Ubud. Mount Batur Sunrise TrekKintamani5h7km Climb to the summit of Mt Batur (1700m), for an amazing sunrise and scenic views. The climb is an experience that will afford anyone who does it a sense of accomplishment and appreciation for the natural beauty this island has. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Pusat Kegiatan Perempuan (PKP) Community Visit Visit the PKP Community, a Pingintrip supported project, for a delicious local lunch made by the women of this enterprise. This centre works to support gender equality and help empower local women through job skill training. PKP is a safe space for women in the community who have experienced discrimination from divorce. We'll meet them over a cup of their specially made tea, tour the garden and learn about the amazing work this organization is doing over lunch. Free TimeUbud Spend the rest of the day free to explore Ubud. Your Big Night Out Moment: in Ubud We're going out! Get yourself a beer, or maybe some cacao and be ready for a fun night out with your crew in Ubud!`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Ubud",
        location: "Ubud",
        description: `There is always something to discover in the great town of Ubud. Today is yours to explore however you’d like. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your Tour Leader has more ideas if you need them. Just ask! Show`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Ubud",
        location: "Ubud",
        description: `With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your Tour Leader has more ideas if you need them. Just ask! Show`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Ubud/Nusa Lembongan",
        location: "Ubud/Nusa Lembongan",
        description: `Say bye-bye to Bali because today we head to another island, Nusa Lembongan! Jump in the car with the breeze in your hair to the Yellow suspension bridge, an icon of the island. Walk across and admire the oh-so-stunning views. Then we continue on to the seaweed farm (yes, people actually farm seaweed!) Next, we visit Dream Beach, but not without a stop at Devil’s Tear, an incredible lookout point, first. At Dream Beach, dig your toes in the soft white sand, take a dip, or rot in the sun! This evening, at the hotel, don’t miss some time to chill by the pool or walk to Mushroom Bay! Nusa Lembongan is way less touristy than Bali- so much less so that it doesn’t have a harbour. Our feet will get wet as we disembark onto the island so wear appropriate clothing. Don’t worry- our team will keep your bags dry! Private VehicleUbud – Sanur1h30m18km Settle in and scan the scenery from the convenience of a private vehicle. BoatSanur – Nusa Lembongan45m Climb aboard and get your float on. Seaweed FarmNusa Lembongan Visit the beautiful Seaweed farm where local farmers work in the ocean to sow seeds, harvest and use it to craft seaweed-based products. These farming techniques are a major part of the island's economy. We'll have a chance to see the process, learn about its importance and meet the farmers in this beautiful coastal farm. Devil's TearNusa Lembongan Watch as the powerful waves crash into the cliff to make the beautiful, dramatic landscape of Devil's Tear. The natural phenomenon creates a stunning view, especially at high tide. It's a popular spot to witness the raw beauty of the ocean and enjoy breathtaking coastal views. Yellow BridgeNusa Lembongan See the amazing contrast of the bright yellow bridge above the sparkling turquoise water and walk across the suspension bridge. A picture perfect spot! Dream BeachNusa Lembongan So perfect, it feels like a dream! Dream beach lives up to the hype as one of Nusa Lembongan's most beautiful beaches. Enjoy the perfectly white sand contrasting with the crystal clear water.`,
        accommodation: "Good Cheer Hostel Lembongan (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 10,
        title: "Day 10: Nusa Lembongan",
        location: "Nusa Lembongan",
        description: `Free day in Nusa Lembongan! Woop Woop! How do you want to spend today? Fancy an off-the-beaten-path adventure to see the beighbouring island of Nusa Penida's temples, caves and beaches? Maybe a day trip to Nusa Penida for a chance to see snorkel the vibrant reefs of this other b-e-a-utiful island! Or how about a snorkel trip around Nusa Lembongan to see manta rays in the coral reefs and to admire the interesting ecosystems around the mangroves. So many good choices! Free TimeNusa LembonganFull Day Today is yours to explore the island of Nusa Lembongan! Show`,
        accommodation: "Good Cheer Hostel Lembongan (or similar)Hostel",
        meals: [],
      },
      {
        dayNumber: 11,
        title: "Day 11: Nusa Lembongan",
        location: "Nusa Lembongan",
        description: `Depart at any time. If you are headed home, take a ferry back to the Bali to get to the international airport. Make sure to give yourself plenty of time to take the ferry and drive to the airport, arriving to the airport 4 hours before your flight. We suggest taking the 10:00 am ferry for a flight after 4:00 pm.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-ubud-to-lombok-temples-jungles-island-vibes",
    code: "PT-BALI-08",
    slug: "ubud-to-lombok-temples-jungles-island-vibes",
    title: {
      en: "Ubud to Lombok: Temples, Jungles & Island Vibes",
      id: "Ubud ke Lombok: Candi, Hutan & Suasana Pulau",
      cn: "乌布到龙目岛：寺庙、丛林与海岛风情",
    },
    description: {
      en: "9 days from Bali's cultural capital to Lombok's wild shores — stay in Ubud, trek through Tempasan village, explore Senggigi, and end on the white sands of Gili Trawangan.",
      id: "9 hari dari ibu kota budaya Bali ke pantai liar Lombok — menginap di Ubud, trekking desa Tempasan, jelajahi Senggigi, dan berakhir di pasir putih Gili Trawangan.",
      cn: "9天从巴厘岛文化之都到龙目岛狂野海岸——住在乌布、徒步坦帕山村、探索森吉吉、在吉利特拉旺安白色沙滩结束。",
    },
    durationDays: 9,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1499, discountedAmount: 1299},
      IDR: {amount: 25700000, discountedAmount: 22300000},
      CNY: {amount: 10226, discountedAmount: 8862},
    },
    regionId: "region-bali",
    startingPoint: "Ubud",
    route: {
      en: "Ubud to Gili Trawangan",
      id: "Ubud ke Gili Trawangan",
      cn: "乌布至吉利特拉旺安",
    },
    highlights: ["ubud", "tempasan", "senggigi", "gili-trawangan"],
    featured: false,
    image: "/assets/packages/ubud-to-lombok",
    itinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Ubud",
        location: "Ubud",
        description: `Welcome to Ubud, arguably the most famous city in Bali! Settle in and explore this funky town then meet your group for a welcome meeting this evening. But stick around because we’re heading out on our First Night Out! Get to know each other and Ubud a bit better. Your opportunity to meet your Tour Leader and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Day 2: Ubud",
        location: "Ubud",
        description: `With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your Tour Leader has more ideas if you need them. Just ask! Show`,
        accommodation: "Pande Permai Bungalow (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Day 3: Ubud/Tempasan",
        location: "Ubud/Tempasan",
        description: `Drive to the harbour and take a speed boat to the island of Lombok. Drive to Tempasan village and meet the villagers for a group dinner. Private VehicleUbud – Padangbai1h30m36km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPadangbai – Bangsal1h30m Climb aboard and get your float on. Private VehicleBangsal – Tempasan2h30m72km Settle in and scan the scenery from the convenience of a private vehicle.`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Day 4: Tempasan",
        location: "Tempasan",
        description: `Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers to learn about village life firsthand, wander through the instagramable rice terraces and maybe sample some local fruit on the various plantations. Then join the local women to learn about their gorgeous traditional weaving styles and a yummy lunch. The rest of the day is yours to explore Lombok how you'd like. Opt to join a local cooking class, take a bike tour or join a yoga class. Then join the group for an after-dinner campfire. If you choose to join the optional 2-day 1-night Rinjani summit trek, will have the chance to join the Rice Terrace Village Walk and Weaving Demonstration after your return on day 3. Your Local Living Moment: Rice Terrace Village Walk and Weaving Demonstration Explore the beautiful Tempasan Village with your Tour Leader. Walk along the path through the rice field like the local people do. During the walk we will meet the farmer for their daily activities. Wander through pineapple, cassava and coffee plantations, the chicken and cow farm and take a short stop at the top of the hill for the amazing panoramic view of rice fields and Rinjani Mountain. Then hop in some local transport and drive to Pringgasela Village where you will learn about this unique and sole weaving village in east Lombok. Learn about their local textile, traditional looms and natural dyes. Free TimeTempasan The afternoon if yours to explore Lombok! Show`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Day 5: Tempasan",
        location: "Tempasan",
        description: `From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls? A cooking class? Options on options! So get out there how you want! Free TimeTempasanFull Day A free day in Tempasan means you get to explore how you want! Show`,
        accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Day 6: Tempasan/Senggigi",
        location: "Tempasan/Senggigi",
        description: `Drive to Bonjeruk Village this morning for an opportunity to connect with the local villagers. Here we will work up our appetite for a yummy Lombok lunch from a cycle tour around the village. Afterwards, continue on to Senggigi for a free afternoon at the beach. Private VehicleTempasan – Bonjeruk1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Bonjeruk Village ExperienceSenggigi Receive a warm welcome by the the villagers of Bonjeruk Village and learn about the youth development organization they support. Your guide, a student from the English learning program, will lead you on a short cycling around the village (approx 45 mins - 1 hr). You will have lunch at a lovely spot in the village and enjoy a home-cooked meal giving you a taste of Lombok traditional food. After lunch, join some of the women of the village to try the local cakes and snacks made from flour sourced from locally grown potatoes or sticky rice. Private VehicleBonjeruk – Senggigi1h37km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSenggigi Spend the rest of the day free in Senggigi, on the coast in Lombok.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Day 7: Senggigi/Gili Trawangan",
        location: "Senggigi/Gili Trawangan",
        description: `Get ready for the ultimate island paradise as we travel to Gili Trawangan, an island with no motorized vehicles and the freshest air! After dropping our things off at the hotel, we head back out to sea for a snorkel trip. On board the boat, we’ll jet around to various islands and picturesque snorkel spots in search of sea turtles, rays and if we’re lucky, a cute lil reef shark. Grab your sunscreen and a snorkel and get ready for an epic day. Tonight, as if today could get any better, we head out on our big night out! Want a drank? Wanna dance? Well let’s do it! As there are no motorized vehicles on Gili Trawangan, you will need to carry your luggage from the speed boat to the hotel, approximately 300m. Private VehicleSenggigi – Bangsal30m-45m22km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatSenggigi – Gili Trawangan30m Climb aboard and get your float on. The Gili Islands Snorkel TripGili Trawangan Visit all 3 islands that make up the famous Gili Islands. Starting from Gili Trawangan, snorkel around the best spots like Turtle Point. Then head to Gili Meno by boat to snorkel through the perfect water on the most tranquil of the 3 islands. Next is Gili Air, with our final chance to swim through the vibrant coral reefs before returning to Gili T. Your Big Night Out Moment: in Gili Trawangan The Gili Islands are known for having the best parties in the world! Tonight, let's see what its all about together on our Big Night Out! Grab yourself your drink of choice and let's kick it!`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Day 8: Gili Trawangan",
        location: "Gili Trawangan",
        description: `There are 2 types of beach people. The rotters-who want to lay in the sun all day, and the adventurers! Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill, get your tan on and take a dip in the perfect blue water. Looking for something more to do? How does stand up paddle board yoga sound? Maybe a leisurely bike ride around the island? However you choose to spend it, Gili T is yours to see. Free TimeGili TrawanganFull Day Enjoy a free day to explore Gili Trawangan on your terms! Show`,
        accommodation: "Gili Amor Boutique Resort (or similar)Resort",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Day 9: Gili Trawangan",
        location: "Gili Trawangan",
        description: `Depart at any time. Hide Bali Express: Gili Trawangan to KutaGili Trawangan – Kuta Want to take the hassle out of getting back to Bali? Book the “Bali Express: Gili Trawangan to Kuta” post-tour Extra and make your way back to Kuta with the guidance of a Tour Leader. On the final day of the tour, board a fast boat back to Bali and transfer to Kuta.`,
        accommodation: "Accommodation",
        meals: [],
      },
    ],
  },
  {
    id: "trip-lombok-gili-adventure",
    code: "PT-LMBK-02",
    slug: "lombok-gili-adventure",
    title: {
      en: "Lombok & Gili Adventure: Treks, Reefs & Local Life",
      id: "Petualangan Lombok & Gili: Trekking, Terumbu & Kehidupan Lokal",
      cn: "龙目岛与吉利冒险：徒步、珊瑚礁与当地生活",
    },
    description: {
      en: "7 days of raw Lombok adventure — trek through rice paddies, cook with locals in Tempasan village, snorkel crystal reefs, and kick back on Gili Trawangan's sandy shores.",
      id: "7 hari petualangan liar Lombok — trekking melewati sawah, memasak bersama penduduk lokal di desa Tempasan, snorkeling di terumbu karang, dan bersantai di pantai Gili Trawangan.",
      cn: "7天龙目岛原始冒险——穿越稻田徒步、在坦帕山村与当地人一起烹饪、浮潜水晶般的珊瑚礁、在吉利特拉旺安沙滩放松。",
    },
    durationDays: 7,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1099, discountedAmount: 899},
      IDR: {amount: 18900000, discountedAmount: 15400000},
      CNY: {amount: 7497, discountedAmount: 6133},
    },
    regionId: "region-lombok",
    startingPoint: "Senggigi",
    route: {
      en: "Tempasan to Gili Trawangan",
      id: "Tempasan ke Gili Trawangan",
      cn: "坦帕山至吉利特拉旺安",
    },
    highlights: ["tempasan", "senggigi", "gili-trawangan", "snorkeling"],
    featured: false,
    image: "/assets/packages/lombok-gili-adventure",
    itinerary: [
      {
        dayNumber: 1,
        title: "Tempasan Arrival",
        location: "Tempasan",
        description: `Welcome to Lombok! Meet your group and Tour Leader at a welcome meeting. Then meet the local villagers at dinner accompanied by some live music.`,
        accommodation: "Aranka Tempasan Lodge (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Tempasan Village Life",
        location: "Tempasan",
        description: `Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers, wander through rice terraces and visit plantations. Afterwards, learn about traditional weaving styles.`,
        accommodation: "Aranka Tempasan Lodge (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Tempasan Free Day",
        location: "Tempasan",
        description: `From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls?`,
        accommodation: "Aranka Tempasan Lodge (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Tempasan to Senggigi",
        location: "Tempasan/Senggigi",
        description: `Drive to Bonjeruk Village for a cycle tour and lunch. Afterwards, continue on to Senggigi for a free afternoon at the beach.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Senggigi to Gili Trawangan",
        location: "Senggigi/Gili Trawangan",
        description: `Get ready for the ultimate island paradise as we travel to Gili Trawangan. Head out to sea for a snorkel trip around the 3 islands. Tonight, big night out!`,
        accommodation: "Gili Amor Boutique Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Gili Trawangan Free Day",
        location: "Gili Trawangan",
        description: `Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill or try stand up paddle board yoga.`,
        accommodation: "Gili Amor Boutique Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Departure",
        location: "Gili Trawangan",
        description: `Depart at any time.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
  {
    id: "trip-classic-bali",
    code: "PT-BALI-09",
    slug: "classic-bali",
    title: {
      en: "Classic Bali: Temples, Rice Terraces & Hidden Gems",
      id: "Bali Klasik: Candi, Sawah Terasering & Permata Tersembunyi",
      cn: "经典巴厘岛：寺庙、梯田与隐藏宝石",
    },
    description: {
      en: "8 days through Bali's cultural highlights — from Sanur's coastal calm to Munduk's misty waterfalls, Kintamani's volcanic views, Ubud's artsy soul, and Candidasa's historic coast.",
      id: "8 hari melalui sorotan budaya Bali — dari ketenangan pesisir Sanur ke air terjun berkabut Munduk, pemandangan vulkanik Kintamani, jiwa seni Ubud, dan pantai bersejarah Candidasa.",
      cn: "8天巴厘岛文化之旅——从萨努尔的海岸宁静到蒙杜克的迷雾瀑布、金塔马尼的火山景观、乌布的艺术灵魂和坎迪达萨的历史海岸。",
    },
    durationDays: 8,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 1299, discountedAmount: 1099},
      IDR: {amount: 22300000, discountedAmount: 18900000},
      CNY: {amount: 8862, discountedAmount: 7497},
    },
    regionId: "region-bali",
    startingPoint: "Sanur",
    route: {
      en: "Sanur to Candi Dasa",
      id: "Sanur ke Candi Dasa",
      cn: "萨努尔至坎迪达萨",
    },
    highlights: ["sanur", "munduk", "kintamani", "ubud", "candidasa"],
    featured: true,
    image: "/assets/packages/classic-bali",
    itinerary: [
      {
        dayNumber: 1,
        title: "Sanur Arrival",
        location: "Sanur",
        description: `Arrive at any time. The welcome moment begins at 18:00.`,
        accommodation: "Swastika Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Sanur to Munduk",
        location: "Sanur/Munduk",
        description: `Visit the Lake Danu Bratan Temple and take a walk through the Jatiluwih Rice Terraces before arriving at the guesthouse in Munduk.`,
        accommodation: "Meme Surung Guesthouse (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Munduk to Kintamani",
        location: "Munduk/Kintamani",
        description: `Drive through lush rice fields and winding mountain roads to Kintamani, then take a dip in the local hot springs.`,
        accommodation: "Lake View Kintamani Bali Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Kintamani to Ubud",
        location: "Kintamani/Ubud",
        description: `Opt for a sunrise hike to the top of Mt Batur before travelling to the cultural heart of Bali. Stop for lunch at the Bali Community Training Lunch Program.`,
        accommodation: "Champlung Sari Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Ubud Free Day",
        location: "Ubud",
        description: `Enjoy a free day to explore exactly what interests you in Ubud. Opt to visit the Monkey Forest, numerous temples, rice paddies, and markets.`,
        accommodation: "Champlung Sari Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Ubud to Candi Dasa",
        location: "Ubud/Candi Dasa",
        description: `Visit Kerta Gosa, the historic court of justice, before the journey to Candidasa, a superb beach location perfect for relaxing.`,
        accommodation: "Ashyana Candidasa Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Candi Dasa Free Day",
        location: "Candi Dasa",
        description: `Continue exploring or relaxing on the beach—the choice is yours.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Departure",
        location: "Candi Dasa",
        description: `Depart at any time.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
  {
    id: "trip-classic-bali-lombok",
    code: "PT-BALI-10",
    slug: "classic-bali-lombok",
    title: {
      en: "Bali & Lombok: The Complete Island Experience",
      id: "Bali & Lombok: Pengalaman Pulau Lengkap",
      cn: "巴厘岛与龙目岛：完整的海岛体验",
    },
    description: {
      en: "14 days of the ultimate Bali and Lombok combo — explore temples, snorkel warm waters, trek through villages, sail to the Gilis, and watch traditional shadow puppets dance in the night.",
      id: "14 hari kombinasi Bali dan Lombok terbaik — jelajahi candi, snorkeling perairan hangat, trekking desa, berlayar ke Gili, dan saksikan wayang kulit menari di malam hari.",
      cn: "14天终极巴厘岛和龙目岛组合——探索寺庙、在温暖水域浮潜、穿越村庄徒步、航行到吉利群岛、观看传统皮影戏在夜晚跳舞。",
    },
    durationDays: 14,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 2599, discountedAmount: 2399},
      IDR: {amount: 44600000, discountedAmount: 41200000},
      CNY: {amount: 17731, discountedAmount: 16366},
    },
    regionId: "region-bali",
    startingPoint: "Sanur",
    route: {
      en: "Sanur to Sanur",
      id: "Sanur ke Sanur",
      cn: "萨努尔至萨努尔",
    },
    highlights: [
      "sanur",
      "munduk",
      "ubud",
      "candidasa",
      "kuta-lombok",
      "gili-trawangan",
    ],
    featured: true,
    image: "/assets/packages/bali-lombok-complete",
    itinerary: [
      {
        dayNumber: 1,
        title: "Sanur Arrival",
        location: "Sanur",
        description: `Arrive at any time. The welcome moment begins at 18:00.`,
        accommodation: "Swastika Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Sanur to Munduk",
        location: "Sanur/Munduk",
        description: `Visit the Lake Danu Bratan Temple and take a walk through the Jatiluwih Rice Terraces before arriving at the guesthouse in Munduk.`,
        accommodation: "Meme Surung Guesthouse (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Munduk to Kintamani",
        location: "Munduk/Kintamani",
        description: `Drive through lush rice fields and winding mountain roads to Kintamani, then take a dip in the local hot springs.`,
        accommodation: "Lake View Kintamani Bali Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Kintamani to Ubud",
        location: "Kintamani/Ubud",
        description: `Opt for a sunrise hike to the top of Mt Batur before travelling to the cultural heart of Bali.`,
        accommodation: "Champlung Sari Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Ubud Exploration",
        location: "Ubud",
        description: `Enjoy a free day to explore exactly what interests you in Ubud.`,
        accommodation: "Champlung Sari Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Ubud to Candi Dasa",
        location: "Ubud/Candi Dasa",
        description: `Visit Kerta Gosa, the historic court of justice, before the journey to Candidasa.`,
        accommodation: "Ashyana Candidasa Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Candi Dasa Leisure",
        location: "Candi Dasa",
        description: `With more free time here, opt to visit the Tirta Gangga temple or the traditional village of Tenganan.`,
        accommodation: "Ashyana Candidasa Beach Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Candi Dasa to Kuta (Lombok)",
        location: "Candi Dasa/Kuta",
        description: `Take a local ferry to Lombok and visit a Sasak traditional village en route to Kuta.`,
        accommodation: "Puri Rinjani Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Kuta Exploration",
        location: "Kuta",
        description: `Enjoy a full day exploring the area around Kuta. Opt for a surf lesson.`,
        accommodation: "Puri Rinjani Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 10,
        title: "Kuta to Senggigi",
        location: "Kuta/Senggigi",
        description: `Enjoy a spectacular drive through the middle of Lombok. Stop at the Tetebatu community to enjoy an easy trek led by a local guide.`,
        accommodation: "Puri Saron Hotel Senggigi Beach (or similar)",
        meals: [],
      },
      {
        dayNumber: 11,
        title: "Senggigi to Gili Trawangan",
        location: "Senggigi/Gili Trawangan",
        description: `This morning we head to the stunning Gili Islands. Once at the islands enjoy a half-day snorkelling trip.`,
        accommodation: "Hotel Vila Ombak (or similar)",
        meals: [],
      },
      {
        dayNumber: 12,
        title: "Gili Trawangan Free Time",
        location: "Gili Trawangan",
        description: `Today is free for exploring. Opt to rent a bike and cycle around the island.`,
        accommodation: "Hotel Vila Ombak (or similar)",
        meals: [],
      },
      {
        dayNumber: 13,
        title: "Gili Trawangan to Sanur",
        location: "Gili Trawangan/Sanur",
        description: `Travel back to Bali by boat for a final dinner and farewells.`,
        accommodation: "Swastika Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 14,
        title: "Departure",
        location: "Sanur",
        description: `Depart at any time.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
  {
    id: "trip-bali-wild-heart",
    code: "PT-BALI-11",
    slug: "bali-wild-heart",
    title: {
      en: "Bali's Wild Heart: Surfing, Volcanoes & Village Soul",
      id: "Jantung Liar Bali: Selancar, Gunung Berapi & Jiwa Desa",
      cn: "巴厘岛的狂野之心：冲浪、火山与乡村灵魂",
    },
    description: {
      en: "9 days beyond the brochure — ride Canggu's iconic waves, trek up a volcano in the dark for sunrise, stay in a traditional village, cycle past rice paddies, and dig into Ubud's artsy buzz.",
      id: "9 hari di luar brosur — selancar di ombak ikonik Canggu, mendaki gunung berapi dalam gelap untuk matahari terbit, menginap di desa tradisional, bersepeda melewati sawah, dan nikmati suasana seni Ubud.",
      cn: "9天超越画册——驾驭仓古标志性的海浪、黑夜中徒步火山观日出、住在传统村庄、骑自行车穿过稻田、深入乌布的艺术氛围。",
    },
    durationDays: 9,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: {amount: 1499, discountedAmount: 1299},
      IDR: {amount: 25700000, discountedAmount: 22300000},
      CNY: {amount: 10226, discountedAmount: 8862},
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Ubud",
      id: "Canggu ke Ubud",
      cn: "仓古至乌布",
    },
    highlights: [
      "canggu-surfing",
      "bulian-village",
      "mount-batur-sunrise",
      "ubud",
    ],
    featured: false,
    image: "/assets/packages/bali-wild-heart",
    itinerary: [
      {
        dayNumber: 1,
        title: "Canggu Arrival",
        location: "Canggu",
        description: `Welcome to Bali-a literal island paradise! After arrival, check into the hostel and meet your crew of travelers. This evening, join your group for your first night out in crazy-fun Canggu!`,
        accommodation: "Roomates Hostel Canggu (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Canggu Surf",
        location: "Canggu",
        description: `Join a surf lesson for all levels. After the lesson, the day is yours!`,
        accommodation: "Roomates Hostel Canggu (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Canggu to Bulian",
        location: "Canggu/Bulian",
        description: `Head north to Bulian. Stop at Ulundanu Temple. Continue to Bulian for lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Bulian Adventure",
        location: "Bulian",
        description: `Enjoy all that the beautiful village of Bulian has to offer today on a free day. Choose to trek through Lemukih Village or head out on a bike tour.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Bulian to Kintamani",
        location: "Bulian/Kintamani",
        description: `Drive to Kintamani to our campsite. Soak in the hot springs then join us 'round the campfire.`,
        accommodation: "D'Stone Glamping Ground (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Kintamani to Ubud",
        location: "Kintamani/Ubud",
        description: `Start our 2 hour trek to reach the Mt Batur summit for sunrise. Hike back down for breakfast and hot springs. Travel to Ubud, stopping at PKP Community for lunch. Evening Big Night Out.`,
        accommodation: "Pande Permai Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Ubud Exploration",
        location: "Ubud",
        description: `Today is yours to explore however you’d like. There is always something to discover in the great town of Ubud.`,
        accommodation: "Pande Permai Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Ubud Free Day",
        location: "Ubud",
        description: `With seemingly never-ending things to do in Ubud, choose to spend it how you want!`,
        accommodation: "Pande Permai Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Departure",
        location: "Ubud",
        description: `Depart at any time.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
  {
    id: "trip-bali-unplugged",
    code: "PT-BALI-12",
    slug: "bali-unplugged",
    title: {
      en: "Bali Unplugged: 7 Days Off the Beaten Path",
      id: "Bali Unplugged: 7 Hari di Jalur Tak Biasa",
      cn: "巴厘岛真实之旅：7天偏离寻常路线",
    },
    description: {
      en: "7 days of real Bali — surf Canggu, stay with locals in Bulian village, camp under stars at Mount Batur, chase hidden waterfalls, and cycle past lush rice paddies. Raw, real, ridiculously fun.",
      id: "7 hari Bali yang sesungguhnya — selancar di Canggu, menginap bersama penduduk lokal di desa Bulian, berkemah di bawah bintang di Gunung Batur, mengejar air terjun tersembunyi, dan bersepeda melewati sawah.",
      cn: "7天真实的巴厘岛——在仓古冲浪、与当地人住在布利安村、在巴图尔火山星空下露营、追寻隐藏瀑布、骑自行车穿过翠绿稻田。原始、真实、有趣到不行。",
    },
    durationDays: 7,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 899, discountedAmount: 699},
      IDR: {amount: 15400000, discountedAmount: 12000000},
      CNY: {amount: 6133, discountedAmount: 4769},
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Ubud",
      id: "Canggu ke Ubud",
      cn: "仓古至乌布",
    },
    highlights: ["canggu-surfing", "bulian-village", "mount-batur", "ubud"],
    featured: true,
    image: "/assets/packages/bali-unplugged",
    itinerary: [
      {
        dayNumber: 1,
        title: "Canggu Arrival",
        location: "Canggu",
        description: `Welcome to Bali-a literal island paradise! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu!`,
        accommodation: "Roomates Hostel Canggu (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Canggu Surf & Chill",
        location: "Canggu",
        description: `Join a surf lesson for all levels. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer.`,
        accommodation: "Roomates Hostel Canggu (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Canggu to Bulian",
        location: "Canggu/Bulian",
        description: `Take a break from Bali's wild side and head north to Bulian. Stop at Ulundanu Temple. Continue to Bulian for lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Bulian Adventure",
        location: "Bulian",
        description: `Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village or head out on a bike tour.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Bulian to Kintamani",
        location: "Bulian/Kintamani",
        description: `A free morning gives you the chance to explore the rest of Bulian. Then jump in the van and drive to Kintamani. Soak in the hot springs then join us 'round the campfire.`,
        accommodation: "D'Stone Glamping Ground (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Kintamani to Ubud",
        location: "Kintamani/Ubud",
        description: `Start our 2 hour trek to reach the Mt Batur summit in time for sunrise. Then it's goodbye Kintamani and hello Ubud! Stop at Pingintrip-supported PKP Community. In the evening, join your group for your Big Night Out in Ubud.`,
        accommodation: "Pande Permai Bungalow (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Departure",
        location: "Ubud",
        description: `Say goodbye to your fellow travel buds and depart at any time.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
  {
    id: "trip-bali-beaches-boat-rides",
    code: "PT-BALI-13",
    slug: "bali-beaches-boat-rides",
    title: {
      en: "Bali Beaches & Boat Rides: Kuta to Gili",
      id: "Pantai & Perahu Bali: Kuta ke Gili",
      cn: "巴厘岛海滩与船旅：库塔到吉利",
    },
    description: {
      en: "9 days exploring Bali's coast and islands — surf in Kuta, explore Bulian's village life, wander Ubud's temples and lotus ponds, and sail to the paradise of Gili Trawangan.",
      id: "9 hari menjelajahi pantai dan pulau Bali — berselancar di Kuta, jelajahi kehidupan desa Bulian, berkeliaran di candi dan kolam teratai Ubud, dan berlayar ke surga Gili Trawangan.",
      cn: "9天探索巴厘岛海岸和岛屿——在库塔冲浪、探索布利安村落生活、漫步乌布寺庙和莲花池、航行到吉利特拉旺安天堂。",
    },
    durationDays: 9,
    physicalRating: 2,
    difficulty: "easy",
    maxPax: 15,
    price: {
      USD: {amount: 1299, discountedAmount: 1099},
      IDR: {amount: 22300000, discountedAmount: 18900000},
      CNY: {amount: 8862, discountedAmount: 7497},
    },
    regionId: "region-bali",
    startingPoint: "Kuta",
    route: {
      en: "Kuta to Gili Trawangan",
      id: "Kuta ke Gili Trawangan",
      cn: "库塔至吉利特拉旺安",
    },
    highlights: ["kuta", "bulian-village", "ubud", "gili-trawangan"],
    featured: false,
    image: "/assets/packages/bali-beaches-boat-rides",
    itinerary: [
      {
        dayNumber: 1,
        title: "Kuta Arrival",
        location: "Kuta",
        description: `Arrive at any time. For your first night out, explore the exciting paradise of Kuta with your Tour Leader and fellow travellers.`,
        accommodation: "The Rivavi Legian (or similar)",
        meals: [],
      },
      {
        dayNumber: 2,
        title: "Kuta Beach & Surf",
        location: "Kuta",
        description: `Today, take it easy in beachside Kuta. Take a surf lesson (which you can book ahead of time), relax on the beach, or head to one of the nearby towns.`,
        accommodation: "The Rivavi Legian (or similar)",
        meals: [],
      },
      {
        dayNumber: 3,
        title: "Kuta to Bulian",
        location: "Kuta/Bulian",
        description: `It's off to Bulian today. Breathe in the beautiful scenery before stopping for lunch en route at the Pingintrip supported Bali Community Training Lunch Program.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 4,
        title: "Bulian Village Life",
        location: "Bulian",
        description: `Get ready to liven up your tastebuds with a Balinese cooking lesson. After, you can trek around the village, visit a waterfall, swim in a natural spring.`,
        accommodation: "Bulian Homestay (or similar)",
        meals: [],
      },
      {
        dayNumber: 5,
        title: "Bulian to Ubud",
        location: "Bulian/Ubud",
        description: `This morning's free for you to explore or relax. Later, check out Ubud and visit the picturesque Gitgit Waterfall or Pura Taman Saraswati.`,
        accommodation: "MaxOne Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 6,
        title: "Ubud Exploration",
        location: "Ubud",
        description: `Today is full of possibilities. Stop by the monkey forest, a sanctuary for the long-tailed Balinese monkey, before checking out more of Ubud.`,
        accommodation: "MaxOne Hotel (or similar)",
        meals: [],
      },
      {
        dayNumber: 7,
        title: "Ubud to Gili Trawangan",
        location: "Ubud/Gili Trawangan",
        description: `It's off to the beautifully laid-back island of Gili Trawangan today. Slow it all down with relaxing at a beachfront bar.`,
        accommodation: "Gili Amor Boutique Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 8,
        title: "Gili Trawangan Paradise",
        location: "Gili Trawangan",
        description: `Spend another day in paradise. Explore the island by bicycle, or just kick back on the beach.`,
        accommodation: "Gili Amor Boutique Resort (or similar)",
        meals: [],
      },
      {
        dayNumber: 9,
        title: "Departure",
        location: "Gili Trawangan",
        description: `Today, it’s time to say goodbye to your group of newfound friends as the tour ends.`,
        accommodation: "",
        meals: [],
      },
    ],
  },
];

// Backward compatibility alias
export const tourPackages = openTrips;

// ============================
// HELPER FUNCTIONS
// ============================

/**
 * Get an open trip by its slug
 */
export function getOpenTripBySlug(slug: string): OpenTrip | undefined {
  return getOpenTrips().find((t) => t.slug === slug);
}

/**
 * Get open trips by region ID
 */
export function getOpenTripsByRegion(regionId: string): OpenTrip[] {
  return getOpenTrips().filter((t) => t.regionId === regionId);
}

/**
 * Get open trip title by locale
 */
export function getOpenTripTitle(trip: OpenTrip, locale: string): string {
  return trip.title[locale as keyof typeof trip.title] || trip.title.en;
}

/**
 * Get open trip description by locale
 */
export function getOpenTripDescription(trip: OpenTrip, locale: string): string {
  return (
    trip.description[locale as keyof typeof trip.description] ||
    trip.description.en
  );
}

/**
 * Get open trip route by locale
 */
export function getOpenTripRoute(trip: OpenTrip, locale: string): string {
  return trip.route[locale as keyof typeof trip.route] || trip.route.en;
}

// ============================
// TRIAL PACKAGE & getOpenTrips
// ============================

export const trialPackage: OpenTrip = {
  id: "trip-trial-pingintrip",
  code: "PT-TRIAL-01",
  slug: "trial-pingintrip",
  title: {
    en: "[TRIAL] Pingintrip Test Package",
    id: "[TRIAL] Paket Test Pingintrip",
    cn: "[试用] Pingintrip 测试套餐",
  },
  description: {
    en: "Trial package for testing payment flow. Price: Rp 10,000.",
    id: "Paket uji coba untuk menguji alur pembayaran. Harga: Rp 10.000.",
    cn: "用于测试支付流程的试用套餐。价格：Rp 10,000。",
  },
  durationDays: 1,
  physicalRating: 1,
  difficulty: "easy",
  maxPax: 1,
  price: {
    USD: {amount: 1},
    IDR: {amount: 10000},
    CNY: {amount: 5},
  },
  regionId: "region-bali",
  startingPoint: "Bali",
  route: {en: "Bali", id: "Bali", cn: "巴厘岛"},
  highlights: [],
  featured: false,
  isTrial: true,
  image: "/assets/bali",
  itinerary: [
    {
      dayNumber: 1,
      title: "Trial Package",
      location: "Bali",
      description:
        "Trial package for testing the Xendit payment integration. Admin use only.",
      accommodation: "-",
      meals: [],
    },
  ],
};

/**
 * Get all open trips — includes trial package if NEXT_PUBLIC_SHOW_TRIAL_PACKAGE=true
 */
export function getOpenTrips(): OpenTrip[] {
  if (process.env.NEXT_PUBLIC_SHOW_TRIAL_PACKAGE === "true") {
    return [trialPackage, ...openTrips];
  }
  return openTrips;
}

/**
 * Filter open trips by criteria
 */
export interface OpenTripFilters {
  regionId?: string;
  minDuration?: number;
  maxDuration?: number;
  difficulty?: "easy" | "moderate" | "challenging";
  search?: string;
  locale?: string;
}

export function filterOpenTrips(filters: OpenTripFilters): OpenTrip[] {
  const locale = filters.locale || "en";

  return getOpenTrips().filter((trip) => {
    // Region filter
    if (filters.regionId && trip.regionId !== filters.regionId) return false;

    // Duration filter
    if (filters.minDuration && trip.durationDays < filters.minDuration)
      return false;
    if (filters.maxDuration && trip.durationDays > filters.maxDuration)
      return false;

    // Difficulty filter
    if (filters.difficulty && trip.difficulty !== filters.difficulty)
      return false;

    // Search filter (searches title, description, highlights, route, locations)
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      if (!q) return true;

      const title = getOpenTripTitle(trip, locale).toLowerCase();
      const desc = getOpenTripDescription(trip, locale).toLowerCase();
      const route = getOpenTripRoute(trip, locale).toLowerCase();
      const highlights = trip.highlights.join(" ").toLowerCase();
      const locations = trip.itinerary
        .map((d) => d.location)
        .join(" ")
        .toLowerCase();
      const searchable = `${title} ${desc} ${route} ${highlights} ${locations}`;

      return searchable.includes(q);
    }

    return true;
  });
}

/**
 * Get all unique locations from a trip's itinerary
 */
export function getTripLocations(trip: OpenTrip): string[] {
  const locations = new Set<string>();
  trip.itinerary.forEach((day) => {
    // Split compound locations like "Canggu/Bulian"
    day.location.split("/").forEach((loc) => {
      locations.add(loc.trim());
    });
  });
  return Array.from(locations);
}

/**
 * Generate available dates for an open trip based on duration.
 * Dates accumulate from January 1st of the given year.
 * Gap between trips = 1 day.
 *
 * Example: 3-day tour → Jan 1, Jan 5, Jan 9, Jan 13, ...
 */
export function getAvailableDates(durationDays: number, year?: number): Date[] {
  const currentYear = year || new Date().getFullYear();
  const dates: Date[] = [];
  const startDate = new Date(currentYear, 0, 1); // January 1st
  const endDate = new Date(currentYear, 11, 31); // December 31st
  const gap = durationDays + 1; // duration + 1 day gap

  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + gap);
  }

  return dates;
}

/**
 * Get future available dates (from today onwards)
 */
export function getFutureAvailableDates(durationDays: number): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allDates = getAvailableDates(durationDays);
  return allDates.filter((d) => d >= today);
}

/**
 * Get all open trip slugs (for generateStaticParams)
 */
export function getAllOpenTripSlugs(): string[] {
  return getOpenTrips().map((t) => t.slug);
}

/**
 * Get featured open trips
 */
export function getFeaturedOpenTrips(): OpenTrip[] {
  return getOpenTrips().filter((t) => t.featured);
}

/**
 * Get physical rating label
 */
export function getPhysicalRatingLabel(rating: number): {
  en: string;
  id: string;
  cn: string;
} {
  const labels: Record<number, {en: string; id: string; cn: string}> = {
    1: {en: "Easy", id: "Mudah", cn: "轻松"},
    2: {en: "Light", id: "Ringan", cn: "轻度"},
    3: {en: "Moderate", id: "Sedang", cn: "中等"},
    4: {en: "Demanding", id: "Berat", cn: "较难"},
    5: {en: "Challenging", id: "Sangat Berat", cn: "挑战性"},
  };
  return labels[rating] || labels[3];
}
