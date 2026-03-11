// ============================
// REGION (formerly "Destination")
// ============================

export interface Region {
  id: string;
  slug: string;
  name: {
    en: string;
    id: string;
    cn: string;
  };
  tagline: {
    en: string;
    id: string;
    cn: string;
  };
  description: {
    en: string;
    id: string;
    cn: string;
  };
  image: string; // path to /assets/<name> folder for OptimizedImage
  province: string;
  popularFor: string[];
}

// ============================
// PLACE (specific spots within a region)
// ============================

export interface Place {
  id: string;
  slug: string;
  regionId: string; // FK → region.id
  name: {
    en: string;
    id: string;
    cn: string;
  };
  description: {
    en: string;
    id: string;
    cn: string;
  };
  longDescription: {
    en: string;
    id: string;
    cn: string;
  };
  image: string; // "/assets/<name>" for OptimizedImage
  gallery: string[]; // additional image paths
  category:
    | "beach"
    | "mountain"
    | "waterfall"
    | "temple"
    | "culture"
    | "nature"
    | "adventure"
    | "village";
  estimatedDuration: string; // "Half day" | "Full day" | "2 days" etc.
}

// ============================
// REGIONS DATA
// ============================

export const regions: Region[] = [
  {
    id: "region-bali",
    slug: "bali",
    name: {
      en: "Bali",
      id: "Bali",
      cn: "巴厘岛",
    },
    tagline: {
      en: "Island of the Gods",
      id: "Pulau Dewata",
      cn: "众神之岛",
    },
    description: {
      en: "Explore ancient temples, lush rice terraces, world-class surf breaks, and vibrant nightlife. Bali offers the perfect blend of culture, adventure, and relaxation.",
      id: "Jelajahi pura kuno, sawah terasering hijau, ombak kelas dunia, dan kehidupan malam yang semarak. Bali menawarkan perpaduan sempurna budaya, petualangan, dan relaksasi.",
      cn: "探索古老的寺庙、翠绿的梯田、世界级的冲浪胜地和充满活力的夜生活。巴厘岛完美融合了文化、冒险和休闲。",
    },
    image: "/assets/bali",
    province: "Bali",
    popularFor: ["temples", "surfing", "rice-terraces", "nightlife", "yoga"],
  },
  {
    id: "region-lombok",
    slug: "lombok",
    name: {
      en: "Lombok",
      id: "Lombok",
      cn: "龙目岛",
    },
    tagline: {
      en: "Unspoiled Paradise",
      id: "Surga yang Masih Alami",
      cn: "未被开发的天堂",
    },
    description: {
      en: "Discover pristine beaches, the majestic Mount Rinjani, and the crystal-clear waters of the Gili Islands. Lombok is Bali's quieter, more untouched neighbor.",
      id: "Temukan pantai perawan, Gunung Rinjani yang megah, dan perairan jernih Kepulauan Gili. Lombok adalah tetangga Bali yang lebih tenang dan masih alami.",
      cn: "发现原始海滩、雄伟的林贾尼火山和吉利群岛的清澈海水。龙目岛是巴厘岛更安静、更原始的邻居。",
    },
    image: "/assets/lombok",
    province: "Nusa Tenggara Barat",
    popularFor: ["trekking", "diving", "beaches", "snorkeling", "culture"],
  },
  {
    id: "region-komodo",
    slug: "komodo",
    name: {
      en: "Komodo Island",
      id: "Pulau Komodo",
      cn: "科莫多岛",
    },
    tagline: {
      en: "Land of the Dragons",
      id: "Tanah Para Naga",
      cn: "巨龙之地",
    },
    description: {
      en: "Walk among the legendary Komodo dragons, dive into some of the world's most biodiverse waters, and sail through breathtaking island landscapes.",
      id: "Berjalan di antara komodo yang legendaris, menyelam di perairan paling kaya hayati di dunia, dan berlayar melewati lanskap pulau yang menakjubkan.",
      cn: "与传说中的科莫多巨蜥同行，潜入世界上生物多样性最丰富的水域，航行穿越令人叹为观止的岛屿景观。",
    },
    image: "/assets/komodo",
    province: "Nusa Tenggara Timur",
    popularFor: ["wildlife", "diving", "sailing", "photography", "adventure"],
  },
  {
    id: "region-sumba",
    slug: "sumba",
    name: {
      en: "Sumba",
      id: "Sumba",
      cn: "松巴岛",
    },
    tagline: {
      en: "The Hidden Gem",
      id: "Permata Tersembunyi",
      cn: "隐藏的宝石",
    },
    description: {
      en: "Experience raw, untouched beauty — dramatic cliffs, turquoise lagoons, ancient megalithic villages, and the iconic Nihiwatu beach.",
      id: "Rasakan keindahan mentah yang belum tersentuh — tebing dramatis, laguna biru kehijauan, desa megalitik kuno, dan pantai Nihiwatu yang ikonik.",
      cn: "体验原始未开发的美景——壮观的悬崖、碧绿的泻湖、古老的巨石村庄和标志性的尼希瓦图海滩。",
    },
    image: "/assets/sumba",
    province: "Nusa Tenggara Timur",
    popularFor: [
      "beaches",
      "culture",
      "surfing",
      "photography",
      "off-the-beaten-path",
    ],
  },
  {
    id: "region-east-java",
    slug: "east-java",
    name: {
      en: "East Java",
      id: "Jawa Timur",
      cn: "东爪哇",
    },
    tagline: {
      en: "Volcanoes & Wonders",
      id: "Gunung Berapi & Keajaiban",
      cn: "火山与奇观",
    },
    description: {
      en: "Home to the ethereal blue flames of Ijen, the vast sea of sand at Mount Bromo, and the stunning Tumpak Sewu waterfall. East Java is an adventurer's dream.",
      id: "Rumah bagi api biru mistis Ijen, lautan pasir luas Gunung Bromo, dan air terjun Tumpak Sewu yang menakjubkan. Jawa Timur adalah impian para petualang.",
      cn: "伊真火山的空灵蓝色火焰、布罗莫火山广阔的沙海和壮丽的通帕瑟武瀑布的家园。东爪哇是冒险家的梦想。",
    },
    image: "/assets/east-java",
    province: "Jawa Timur",
    popularFor: [
      "volcanoes",
      "trekking",
      "waterfalls",
      "photography",
      "nature",
    ],
  },
  {
    id: "region-west-java",
    slug: "west-java",
    name: {
      en: "West Java",
      id: "Jawa Barat",
      cn: "西爪哇",
    },
    tagline: {
      en: "Tea Hills & Culture",
      id: "Perbukitan Teh & Budaya",
      cn: "茶山与文化",
    },
    description: {
      en: "Wander through rolling tea plantations in Bandung, marvel at the otherworldly Kawah Putih crater, and explore the Sundanese cultural heartland.",
      id: "Jelajahi perkebunan teh berbukit di Bandung, kagumi kawah Kawah Putih yang menakjubkan, dan telusuri jantung budaya Sunda.",
      cn: "漫步万隆的起伏茶园，惊叹于白火山口的超凡景象，探索巽他文化的心脏地带。",
    },
    image: "/assets/west-java",
    province: "Jawa Barat",
    popularFor: [
      "tea-plantations",
      "culture",
      "nature",
      "culinary",
      "hot-springs",
    ],
  },
  {
    id: "region-central-java",
    slug: "central-java",
    name: {
      en: "Central Java",
      id: "Jawa Tengah",
      cn: "中爪哇",
    },
    tagline: {
      en: "Temples & Traditions",
      id: "Candi & Tradisi",
      cn: "寺庙与传统",
    },
    description: {
      en: "Stand in awe before the ancient Borobudur and Prambanan temples, explore the cultural capital of Yogyakarta, and witness centuries-old Javanese traditions.",
      id: "Berdiri takjub di depan candi kuno Borobudur dan Prambanan, jelajahi ibu kota budaya Yogyakarta, dan saksikan tradisi Jawa yang berusia berabad-abad.",
      cn: "在古老的婆罗浮屠和普兰巴南寺庙前驻足感叹，探索文化之都日惹，见证数百年的爪哇传统。",
    },
    image: "/assets/central-java",
    province: "Jawa Tengah",
    popularFor: ["temples", "history", "culture", "batik", "culinary"],
  },
  {
    id: "region-sumbawa",
    slug: "sumbawa",
    name: {
      en: "Sumbawa",
      id: "Sumbawa",
      cn: "松巴哇岛",
    },
    tagline: {
      en: "Wild & Untamed",
      id: "Liar & Tak Terjamah",
      cn: "狂野未驯",
    },
    description: {
      en: "Ride world-class waves at Lakey Peak, explore the remote beauty of Moyo Island, and trek through lush forests to hidden waterfalls. Sumbawa is raw adventure.",
      id: "Berselancar di ombak kelas dunia Lakey Peak, jelajahi keindahan terpencil Pulau Moyo, dan trekking melewati hutan lebat menuju air terjun tersembunyi. Sumbawa adalah petualangan sejati.",
      cn: "在拉基峰冲击世界级浪潮，探索莫约岛的偏远之美，徒步穿越茂密森林到达隐藏的瀑布。松巴哇是原始的冒险。",
    },
    image: "/assets/sumbawa",
    province: "Nusa Tenggara Barat",
    popularFor: [
      "surfing",
      "diving",
      "trekking",
      "off-the-beaten-path",
      "nature",
    ],
  },
];

// ============================
// PLACES DATA — imported from places.ts
// ============================

import {allPlaces} from "./places";

export const places: Place[] = allPlaces;

// ============================
// HELPER FUNCTIONS
// ============================

/**
 * Get region name by locale
 */
export function getRegionName(region: Region, locale: string): string {
  return region.name[locale as keyof typeof region.name] || region.name.en;
}

/**
 * Get region by slug
 */
export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

/**
 * Get region by ID
 */
export function getRegionById(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

/**
 * Get all places for a given region ID
 */
export function getPlacesByRegion(regionId: string): Place[] {
  return places.filter((p) => p.regionId === regionId);
}

/**
 * Get place by slug
 */
export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}

/**
 * Get all place slugs (used for generateStaticParams)
 */
export function getAllPlaceSlugs(): string[] {
  return places.map((p) => p.slug);
}

/**
 * Smart search across regions and places — matches name in all locales,
 * tagline, description, and category. Case-insensitive.
 */
export function searchRegionsAndPlaces(
  query: string,
  locale: string = "en"
): { regions: Region[]; places: Place[] } {
  const q = query.toLowerCase().trim();
  if (!q) return {regions: [...regions], places: [...places]};

  const matchedRegions = regions.filter((r) => {
    const searchable = [
      r.name.en,
      r.name.id,
      r.name.cn,
      r.tagline.en,
      r.tagline.id,
      r.tagline.cn,
      r.description[locale as keyof typeof r.description] || r.description.en,
      r.province,
      ...r.popularFor,
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  });

  const matchedPlaces = places.filter((p) => {
    const searchable = [
      p.name.en,
      p.name.id,
      p.name.cn,
      p.description[locale as keyof typeof p.description] || p.description.en,
      p.category,
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  });

  return {regions: matchedRegions, places: matchedPlaces};
}

// ============================
// BACKWARD COMPATIBILITY
// ============================
// These aliases ensure existing code using the old names still works
// TODO: Remove after all references are updated

/** @deprecated Use Region instead */
export type Destination = Region;

/** @deprecated Use regions instead */
export const destinations = regions;

/** @deprecated Use getRegionName instead */
export const getDestinationName = getRegionName;

/** @deprecated Use getRegionBySlug instead */
export function getDestinationBySlug(slug: string): Region | undefined {
  return getRegionBySlug(slug);
}

/** @deprecated Use getRegionById instead */
export function getDestinationById(id: string): Region | undefined {
  return getRegionById(id);
}
