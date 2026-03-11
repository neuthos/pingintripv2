export type Currency = "USD" | "IDR" | "CNY";

export interface Price {
  amount: number;
  discountedAmount?: number;
}

export type MultiCurrencyPrice = Record<Currency, Price>;

export interface TourPackage {
  id: string;
  slug: string;
  name: {
    en: string;
    id: string;
    cn: string;
  };
  duration: number; // in days
  route: {
    en: string;
    id: string;
    cn: string;
  };
  price: MultiCurrencyPrice;
  image: string;
  destinationIds: string[]; // relates to destination IDs
  highlights: string[];
  difficulty: "easy" | "moderate" | "challenging";
  groupSize: { min: number; max: number };
  featured: boolean;
}

/**
 * Currency display config
 */
export const currencyConfig: Record<
  Currency,
  { symbol: string; locale: string; decimals: number }
> = {
  USD: { symbol: "$", locale: "en-US", decimals: 2 },
  IDR: { symbol: "Rp", locale: "id-ID", decimals: 0 },
  CNY: { symbol: "¥", locale: "zh-CN", decimals: 0 },
};

/**
 * Format price with currency
 */
export function formatPrice(amount: number, currency: Currency): string {
  const config = currencyConfig[currency];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount);
}

/**
 * Get default currency based on locale
 */
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

export const tourPackages: TourPackage[] = [
  {
    id: "pkg-bali-cultural",
    slug: "bali-cultural-immersion",
    name: {
      en: "Bali Cultural Immersion",
      id: "Pendalaman Budaya Bali",
      cn: "巴厘岛文化深度游",
    },
    duration: 7,
    route: {
      en: "Denpasar to Ubud",
      id: "Denpasar ke Ubud",
      cn: "登巴萨至乌布",
    },
    price: {
      USD: { amount: 1899, discountedAmount: 1329 },
      IDR: { amount: 29900000, discountedAmount: 20930000 },
      CNY: { amount: 13699, discountedAmount: 9589 },
    },
    image: "/assets/bali",
    destinationIds: ["region-bali"],
    highlights: ["ubud", "uluwatu", "seminyak"],
    difficulty: "easy",
    groupSize: { min: 2, max: 10 },
    featured: true,
  },
  {
    id: "pkg-lombok-adventure",
    slug: "lombok-adventure-trek",
    name: {
      en: "Lombok Adventure Trek",
      id: "Petualangan Trekking Lombok",
      cn: "龙目岛冒险徒步",
    },
    duration: 10,
    route: {
      en: "Mataram to Gili Islands",
      id: "Mataram ke Kepulauan Gili",
      cn: "马塔兰至吉利群岛",
    },
    price: {
      USD: { amount: 2499, discountedAmount: 1749 },
      IDR: { amount: 39400000, discountedAmount: 27580000 },
      CNY: { amount: 17999, discountedAmount: 12599 },
    },
    image: "/assets/lombok",
    destinationIds: ["region-lombok"],
    highlights: ["rinjani", "gili-trawangan", "gili-air"],
    difficulty: "challenging",
    groupSize: { min: 2, max: 8 },
    featured: true,
  },
  {
    id: "pkg-komodo-sailing",
    slug: "komodo-sailing-expedition",
    name: {
      en: "Komodo Sailing Expedition",
      id: "Ekspedisi Berlayar Komodo",
      cn: "科莫多帆船探险",
    },
    duration: 5,
    route: {
      en: "Labuan Bajo to Komodo",
      id: "Labuan Bajo ke Komodo",
      cn: "拉布汉巴焦至科莫多",
    },
    price: {
      USD: { amount: 3299, discountedAmount: 2639 },
      IDR: { amount: 51900000, discountedAmount: 41520000 },
      CNY: { amount: 23799, discountedAmount: 19039 },
    },
    image: "/assets/komodo",
    destinationIds: ["region-komodo"],
    highlights: ["komodo-np", "padar-island", "pink-beach", "manta-point"],
    difficulty: "moderate",
    groupSize: { min: 2, max: 12 },
    featured: true,
  },
  {
    id: "pkg-east-java-volcanoes",
    slug: "east-java-volcano-trail",
    name: {
      en: "East Java Volcano Trail",
      id: "Jejak Gunung Berapi Jawa Timur",
      cn: "东爪哇火山之旅",
    },
    duration: 6,
    route: {
      en: "Surabaya to Banyuwangi",
      id: "Surabaya ke Banyuwangi",
      cn: "泗水至巴纽旺宜",
    },
    price: {
      USD: { amount: 1599, discountedAmount: 1119 },
      IDR: { amount: 25200000, discountedAmount: 17640000 },
      CNY: { amount: 11499, discountedAmount: 8049 },
    },
    image: "/assets/east-java",
    destinationIds: ["region-east-java"],
    highlights: ["bromo", "ijen", "tumpak-sewu"],
    difficulty: "challenging",
    groupSize: { min: 2, max: 8 },
    featured: true,
  },
  {
    id: "pkg-sumba-hidden",
    slug: "sumba-hidden-paradise",
    name: {
      en: "Sumba Hidden Paradise",
      id: "Surga Tersembunyi Sumba",
      cn: "松巴岛隐秘天堂",
    },
    duration: 8,
    route: {
      en: "Tambolaka to Waingapu",
      id: "Tambolaka ke Waingapu",
      cn: "坦博拉卡至万加普",
    },
    price: {
      USD: { amount: 2199, discountedAmount: 1759 },
      IDR: { amount: 34600000, discountedAmount: 27680000 },
      CNY: { amount: 15899, discountedAmount: 12719 },
    },
    image: "/assets/sumba",
    destinationIds: ["region-sumba"],
    highlights: ["nihiwatu", "weekuri-lagoon", "tarimbang"],
    difficulty: "moderate",
    groupSize: { min: 2, max: 6 },
    featured: true,
  },
  {
    id: "pkg-bali-lombok-combo",
    slug: "bali-lombok-island-hopping",
    name: {
      en: "Bali & Lombok Island Hopping",
      id: "Jelajah Pulau Bali & Lombok",
      cn: "巴厘岛与龙目岛跳岛游",
    },
    duration: 14,
    route: {
      en: "Denpasar to Mataram",
      id: "Denpasar ke Mataram",
      cn: "登巴萨至马塔兰",
    },
    price: {
      USD: { amount: 4299, discountedAmount: 3009 },
      IDR: { amount: 67700000, discountedAmount: 47390000 },
      CNY: { amount: 30999, discountedAmount: 21699 },
    },
    image: "/assets/lombok",
    destinationIds: ["region-bali", "region-lombok"],
    highlights: ["ubud", "uluwatu", "rinjani", "gili-trawangan"],
    difficulty: "moderate",
    groupSize: { min: 2, max: 10 },
    featured: true,
  },
];
