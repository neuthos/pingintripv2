import type {Place} from "./destinations";

// ============================
// ALL PLACES DATA
// ============================

// Helper to create place with defaults
function p(
  id: string,
  slug: string,
  regionId: string,
  name: {en: string; id: string; cn: string},
  desc: {en: string; id: string; cn: string},
  longDesc: {en: string; id: string; cn: string},
  category: Place["category"],
  duration: string,
): Place {
  return {
    id: `place-${id}`,
    slug,
    regionId,
    name,
    description: desc,
    longDescription: longDesc,
    image: `/assets/${slug}`,
    gallery: [],
    category,
    estimatedDuration: duration,
  };
}

// ============================
// BALI PLACES
// ============================

const baliPlaces: Place[] = [
  p(
    "ubud",
    "ubud",
    "region-bali",
    {en: "Ubud", id: "Ubud", cn: "乌布"},
    {
      en: "The cultural heart of Bali — lush rice terraces, sacred monkey forests, and world-class art galleries.",
      id: "Jantung budaya Bali — sawah terasering hijau, hutan monyet sakral, dan galeri seni kelas dunia.",
      cn: "巴厘岛的文化中心——翠绿的梯田、神圣的猴林和世界级的艺术画廊。",
    },
    {
      en: "Nestled in the verdant highlands of central Bali, Ubud has long been regarded as the island's cultural and spiritual heart. Ancient temples sit alongside terraced rice paddies that cascade down hillsides like emerald staircases. The town is a haven for artists, yogis, and travelers seeking meaningful experiences.",
      id: "Terletak di dataran tinggi hijau Bali tengah, Ubud telah lama dikenal sebagai jantung budaya dan spiritual pulau ini. Pura kuno berdampingan dengan sawah terasering yang mengalir menuruni bukit bak tangga zamrud.",
      cn: "乌布坐落在巴厘岛中部翠绿的高地上，长期以来被视为这座岛屿的文化和精神中心。古老的寺庙与层层叠叠的梯田相映成趣。",
    },
    "culture",
    "Full day",
  ),
  p(
    "nusa-penida",
    "nusa-penida",
    "region-bali",
    {en: "Nusa Penida", id: "Nusa Penida", cn: "努沙佩尼达"},
    {
      en: "Rugged island off Bali's coast with jaw-dropping cliffs, turquoise bays, and pristine dive sites with manta rays.",
      id: "Pulau terjal di lepas pantai Bali dengan tebing menakjubkan, teluk biru kehijauan, dan spot diving manta ray.",
      cn: "巴厘岛海岸外的崎岖岛屿，有令人叹为观止的悬崖、碧绿的海湾和原始的潜水点。",
    },
    {
      en: "Just a 45-minute fast boat ride from Bali's mainland, Nusa Penida feels like an entirely different world. This rugged island is home to some of Bali's most jaw-dropping natural formations — from the iconic Kelingking Beach cliff to the crystal-clear Angel's Billabong.",
      id: "Hanya 45 menit naik speed boat dari daratan Bali, Nusa Penida terasa seperti dunia yang berbeda. Pulau terjal ini memiliki formasi alam paling menakjubkan di Bali.",
      cn: "从巴厘岛大陆乘坐45分钟快艇即可到达，努沙佩尼达感觉像是一个完全不同的世界。",
    },
    "beach",
    "Full day",
  ),
  p(
    "nusa-lembongan",
    "nusa-lembongan",
    "region-bali",
    {en: "Nusa Lembongan", id: "Nusa Lembongan", cn: "蓝梦岛"},
    {
      en: "A tranquil island paradise with crystal-clear waters, mangrove forests, and vibrant coral reefs perfect for snorkeling.",
      id: "Surga pulau yang tenang dengan perairan jernih, hutan bakau, dan terumbu karang berwarna-warni sempurna untuk snorkeling.",
      cn: "宁静的岛屿天堂，拥有清澈的海水、红树林和适合浮潜的多彩珊瑚礁。",
    },
    {
      en: "Nusa Lembongan is a small island southeast of Bali that offers a peaceful escape from the bustle. Explore the Devil's Tear blowhole, kayak through enchanting mangrove forests, and snorkel over pristine coral gardens teeming with tropical fish.",
      id: "Nusa Lembongan adalah pulau kecil di tenggara Bali yang menawarkan pelarian damai. Jelajahi Devil's Tear, kayak melewati hutan bakau, dan snorkeling di taman karang.",
      cn: "蓝梦岛是巴厘岛东南部的一个小岛，提供远离喧嚣的宁静逃离。",
    },
    "beach",
    "Full day",
  ),
  p(
    "mount-batur",
    "mount-batur",
    "region-bali",
    {en: "Mount Batur", id: "Gunung Batur", cn: "巴图尔火山"},
    {
      en: "Iconic sunrise trek up an active volcano with panoramic views over a stunning crater lake.",
      id: "Trekking sunrise ikonik ke gunung berapi aktif dengan pemandangan panorama danau kawah yang menakjubkan.",
      cn: "攀登活火山的标志性日出徒步，俯瞰壮丽的火山口湖全景。",
    },
    {
      en: "Rising 1,717 meters above sea level, Mount Batur is one of Bali's most accessible active volcanoes. The pre-dawn trek rewards hikers with a breathtaking panorama of the sun over Mount Agung and the serene Danau Batur crater lake below.",
      id: "Menjulang 1.717 meter di atas permukaan laut, Gunung Batur adalah salah satu gunung berapi aktif yang paling mudah diakses di Bali.",
      cn: "巴图尔火山海拔1717米，是巴厘岛最容易到达的活火山之一。",
    },
    "mountain",
    "Full day",
  ),
  p(
    "jimbaran",
    "jimbaran",
    "region-bali",
    {en: "Jimbaran", id: "Jimbaran", cn: "金巴兰"},
    {
      en: "Famous for beachside seafood dining at sunset with fresh catches grilled right on the sand.",
      id: "Terkenal dengan makan malam seafood di tepi pantai saat matahari terbenam dengan ikan segar yang dibakar langsung di pasir.",
      cn: "以海滩边的海鲜大餐和日落闻名，新鲜渔获直接在沙滩上烤。",
    },
    {
      en: "Jimbaran Bay is Bali's premier beachfront seafood destination. As the sun sets over the Indian Ocean, dozens of seafood warung set up candlelit tables right on the sand, offering the freshest catches grilled over coconut husks.",
      id: "Teluk Jimbaran adalah destinasi seafood tepi pantai utama Bali. Saat matahari terbenam, warung seafood menata meja lilin di atas pasir.",
      cn: "金巴兰湾是巴厘岛首屈一指的海滨海鲜目的地。日落时分，数十家海鲜餐厅在沙滩上摆放烛光餐桌。",
    },
    "beach",
    "Half day",
  ),
  p(
    "nusa-dua",
    "nusa-dua",
    "region-bali",
    {en: "Nusa Dua", id: "Nusa Dua", cn: "努沙杜瓦"},
    {
      en: "Bali's luxurious resort enclave with pristine beaches, water sports, and world-class hotels.",
      id: "Enklave resor mewah Bali dengan pantai bersih, olahraga air, dan hotel kelas dunia.",
      cn: "巴厘岛的豪华度假胜地，拥有原始海滩、水上运动和世界级酒店。",
    },
    {
      en: "Nusa Dua is Bali's gated luxury resort area, offering calm turquoise waters perfect for swimming and water sports. Home to international five-star resorts, championship golf courses, and the scenic Water Blow rock formation.",
      id: "Nusa Dua adalah area resor mewah Bali dengan perairan biru tenang sempurna untuk berenang dan olahraga air.",
      cn: "努沙杜瓦是巴厘岛的豪华度假区，拥有平静的碧绿海水，非常适合游泳和水上运动。",
    },
    "beach",
    "Half day",
  ),
  p(
    "tanah-lot",
    "tanah-lot-temple",
    "region-bali",
    {en: "Tanah Lot Temple", id: "Pura Tanah Lot", cn: "海神庙"},
    {
      en: "Bali's most photographed sea temple, perched on a rocky outcrop surrounded by crashing waves.",
      id: "Pura laut paling banyak difoto di Bali, bertengger di atas batu karang dikelilingi ombak.",
      cn: "巴厘岛最常被拍照的海上寺庙，坐落在被波浪环绕的岩石上。",
    },
    {
      en: "Tanah Lot is one of Bali's most important Hindu temples, built on a rock formation in the sea during the 16th century. At high tide, the temple appears to float on the ocean. At low tide, visitors can walk across to the base of the rock.",
      id: "Tanah Lot adalah salah satu pura Hindu terpenting di Bali, dibangun di atas formasi batu di laut pada abad ke-16.",
      cn: "海神庙是巴厘岛最重要的印度教寺庙之一，建于16世纪的海上岩石之上。",
    },
    "temple",
    "Half day",
  ),
  p(
    "melasti-beach",
    "melasti-beach",
    "region-bali",
    {en: "Melasti Beach", id: "Pantai Melasti", cn: "梅拉斯提海滩"},
    {
      en: "A stunning hidden beach with towering limestone cliffs, turquoise water, and white sand in South Bali.",
      id: "Pantai tersembunyi yang menakjubkan dengan tebing batu kapur tinggi, air biru kehijauan, dan pasir putih di Bali Selatan.",
      cn: "南巴厘岛隐藏的迷人海滩，有高耸的石灰岩悬崖、碧绿海水和白色沙滩。",
    },
    {
      en: "Melasti Beach is one of Bali's most beautiful hidden gems, accessed via a dramatic clifftop road that descends through towering limestone formations. The crescent-shaped beach boasts crystal-clear turquoise waters and pristine white sand.",
      id: "Pantai Melasti adalah salah satu permata tersembunyi Bali terindah, diakses melalui jalan tebing dramatis melewati formasi batu kapur.",
      cn: "梅拉斯提海滩是巴厘岛最美丽的隐藏宝石之一。",
    },
    "beach",
    "Half day",
  ),
  p(
    "balangan-beach",
    "balangan-beach",
    "region-bali",
    {en: "Balangan Beach", id: "Pantai Balangan", cn: "巴兰安海滩"},
    {
      en: "A surfer's paradise with golden sand, consistent waves, and dramatic cliff views on the Bukit Peninsula.",
      id: "Surga peselancar dengan pasir emas, ombak konsisten, dan pemandangan tebing dramatis di Semenanjung Bukit.",
      cn: "冲浪者天堂，金色沙滩、稳定的浪花和布基特半岛的壮观悬崖景色。",
    },
    {
      en: "Balangan Beach is a beautiful golden-sand beach tucked below the cliffs of the Bukit Peninsula. Known for its consistent left-hand reef break, it attracts surfers from around the world while remaining quieter than Bali's busier surf spots.",
      id: "Pantai Balangan adalah pantai pasir emas indah di bawah tebing Semenanjung Bukit. Terkenal dengan ombak reef break kiri yang konsisten.",
      cn: "巴兰安海滩是一个美丽的金色沙滩，藏在布基特半岛的悬崖下方。",
    },
    "beach",
    "Half day",
  ),
  p(
    "seminyak",
    "seminyak",
    "region-bali",
    {en: "Seminyak", id: "Seminyak", cn: "水明漾"},
    {
      en: "Bali's chic coastal hub — upscale beach clubs, designer boutiques, world-class dining, and legendary sunsets.",
      id: "Pusat pantai chic Bali — beach club mewah, butik desainer, kuliner kelas dunia, dan sunset legendaris.",
      cn: "巴厘岛时尚海滨中心——高端海滩俱乐部、设计师精品店、世界级餐饮和传奇日落。",
    },
    {
      en: "Seminyak is where Bali's traditional charm meets contemporary sophistication. Home to world-renowned beach clubs like Potato Head and Ku De Ta, with designer boutiques and fine dining restaurants lining the streets.",
      id: "Seminyak adalah tempat pesona tradisional Bali bertemu kecanggihan kontemporer. Rumah bagi beach club terkenal dunia.",
      cn: "水明漾是巴厘岛传统魅力与现代精致完美交融的地方。",
    },
    "beach",
    "Half day",
  ),
  p(
    "uluwatu",
    "uluwatu",
    "region-bali",
    {en: "Uluwatu", id: "Uluwatu", cn: "乌鲁瓦图"},
    {
      en: "Dramatic clifftop temple above the Indian Ocean, famous for sunset Kecak dance and world-class surf.",
      id: "Pura dramatis di tebing tinggi Samudra Hindia, terkenal dengan tarian Kecak saat sunset.",
      cn: "坐落在印度洋上方悬崖的壮观寺庙，以日落克差克舞和冲浪闻名。",
    },
    {
      en: "Perched on a dramatic cliff 70 meters above the roaring Indian Ocean, Pura Luhur Uluwatu is one of Bali's most iconic sea temples. Every evening, the open-air amphitheatre hosts the mesmerizing Kecak Fire Dance.",
      id: "Bertengger di tebing dramatis 70 meter di atas Samudra Hindia, Pura Luhur Uluwatu adalah salah satu pura laut paling ikonik di Bali.",
      cn: "坐落在印度洋上方70米高的壮观悬崖上，乌鲁瓦图海神庙是巴厘岛最具标志性的海上寺庙之一。",
    },
    "temple",
    "Half day",
  ),
  p(
    "sanur",
    "sanur",
    "region-bali",
    {en: "Sanur", id: "Sanur", cn: "沙努尔"},
    {
      en: "A laid-back coastal town with calm waters, a scenic beachfront boardwalk, and traditional fishing village charm.",
      id: "Kota pantai santai dengan perairan tenang, trotoar tepi pantai yang indah, dan pesona desa nelayan tradisional.",
      cn: "悠闲的海滨小镇，拥有平静的海水、美丽的海滨步道和传统渔村魅力。",
    },
    {
      en: "Sanur is Bali's original beach resort area, offering a more relaxed, family-friendly atmosphere. The paved beachfront boardwalk stretches for kilometers, and the calm reef-protected waters make it perfect for swimming and sunrise viewing.",
      id: "Sanur adalah area resor pantai tertua Bali, menawarkan suasana lebih santai dan ramah keluarga.",
      cn: "沙努尔是巴厘岛最早的海滩度假区，提供更轻松的家庭友好氛围。",
    },
    "beach",
    "Half day",
  ),
  p(
    "tegallalang",
    "tegallalang-rice-terrace",
    "region-bali",
    {
      en: "Tegallalang Rice Terrace",
      id: "Terasering Tegallalang",
      cn: "德格拉朗梯田",
    },
    {
      en: "Iconic cascading rice terraces carved into steep hillsides, showcasing Bali's ancient subak irrigation system.",
      id: "Sawah terasering ikonik yang dipahat di lereng curam, menampilkan sistem irigasi subak kuno Bali.",
      cn: "标志性的层叠梯田，展示巴厘岛古老的苏巴克灌溉系统。",
    },
    {
      en: "The Tegallalang Rice Terraces are one of Bali's most iconic landscapes, featuring dramatic cascading paddies carved into a steep valley. The terraces showcase the traditional Balinese subak cooperative irrigation system, a UNESCO World Heritage practice.",
      id: "Terasering Sawah Tegallalang adalah salah satu lanskap paling ikonik di Bali, menampilkan sawah bertingkat dramatis yang dipahat di lembah curam.",
      cn: "德格拉朗梯田是巴厘岛最具标志性的景观之一，展示了传统的苏巴克灌溉系统。",
    },
    "nature",
    "Half day",
  ),
  p(
    "kuta",
    "kuta",
    "region-bali",
    {en: "Kuta", id: "Kuta", cn: "库塔"},
    {
      en: "Bali's most famous beach town — vibrant nightlife, beginner-friendly surf, and endless entertainment.",
      id: "Kota pantai paling terkenal di Bali — kehidupan malam semarak, ombak untuk pemula, dan hiburan tanpa henti.",
      cn: "巴厘岛最著名的海滩小镇——充满活力的夜生活、适合初学者的冲浪和无尽的娱乐。",
    },
    {
      en: "Kuta is where Bali's tourism story began. This bustling beach town offers a long stretch of golden sand with gentle waves ideal for learning to surf, along with vibrant nightlife, shopping, and entertainment options.",
      id: "Kuta adalah tempat cerita pariwisata Bali dimulai. Kota pantai yang ramai ini menawarkan hamparan pasir emas panjang dengan ombak lembut ideal untuk belajar berselancar.",
      cn: "库塔是巴厘岛旅游故事的起点。这个繁华的海滩小镇提供绵长的金色沙滩和温柔的海浪。",
    },
    "beach",
    "Half day",
  ),
  p(
    "canggu",
    "canggu",
    "region-bali",
    {en: "Canggu", id: "Canggu", cn: "仓古"},
    {
      en: "Bali's hipster haven — surf culture, trendy cafés, co-working spaces, and world-class beach clubs.",
      id: "Surga hipster Bali — budaya surfing, kafe trendi, co-working space, dan beach club kelas dunia.",
      cn: "巴厘岛的潮流天堂——冲浪文化、时尚咖啡馆、联合办公空间和世界级海滩俱乐部。",
    },
    {
      en: "Canggu has emerged as Bali's coolest coastal village, attracting digital nomads, surfers, and creatives from around the world. The area blends rice paddy scenery with trendy beach clubs like Finns and Atlas, surf breaks at Echo Beach and Batu Bolong.",
      id: "Canggu telah muncul sebagai desa pantai paling keren di Bali, menarik digital nomad, peselancar, dan kreator dari seluruh dunia.",
      cn: "仓古已成为巴厘岛最酷的海滨村庄，吸引着来自世界各地的数字游民和冲浪者。",
    },
    "beach",
    "Half day",
  ),
];

// ============================
// LOMBOK PLACES
// ============================

const lombokPlaces: Place[] = [
  p(
    "gili-trawangan",
    "gili-trawangan",
    "region-lombok",
    {en: "Gili Trawangan", id: "Gili Trawangan", cn: "吉利特拉旺安"},
    {
      en: "The largest and liveliest of the Gili Islands — no motorized vehicles, stunning coral reefs, and legendary nightlife.",
      id: "Pulau terbesar dan paling ramai dari Kepulauan Gili — tanpa kendaraan bermotor, terumbu karang indah, dan nightlife legendaris.",
      cn: "吉利群岛中最大最热闹的岛屿——没有机动车辆、美丽的珊瑚礁和传奇的夜生活。",
    },
    {
      en: "Known as the party island of the Gilis, Gili Trawangan offers a unique car-free experience. Horse-drawn carts and bicycles are the main transportation. By day, snorkel with sea turtles; by night, enjoy beachfront bars and live music.",
      id: "Dikenal sebagai party island Gili, Gili Trawangan menawarkan pengalaman unik tanpa kendaraan bermotor. Cidomo dan sepeda adalah transportasi utama.",
      cn: "吉利特拉旺安被誉为吉利群岛的派对岛，提供独特的无车体验。",
    },
    "beach",
    "2 days",
  ),
  p(
    "gili-meno",
    "gili-meno",
    "region-lombok",
    {en: "Gili Meno", id: "Gili Meno", cn: "吉利美诺"},
    {
      en: "The most serene of the three Gili Islands — perfect for honeymooners with pristine beaches and underwater sculptures.",
      id: "Pulau paling tenang dari tiga Gili — sempurna untuk bulan madu dengan pantai perawan dan patung bawah air.",
      cn: "三个吉利岛中最宁静的——蜜月旅行者的完美选择，拥有原始海滩和水下雕塑。",
    },
    {
      en: "Gili Meno is the smallest and quietest of the three Gili Islands, making it the ultimate romantic getaway. The island is famous for its underwater sculpture garden, Nest, and abundant sea turtle sightings.",
      id: "Gili Meno adalah yang terkecil dan paling tenang dari tiga Gili, menjadikannya pelarian romantis terbaik. Pulau ini terkenal dengan taman patung bawah air Nest.",
      cn: "吉利美诺是三个吉利岛中最小最安静的，是浪漫度假的理想之地。",
    },
    "beach",
    "Full day",
  ),
  p(
    "gili-air",
    "gili-air",
    "region-lombok",
    {en: "Gili Air", id: "Gili Air", cn: "吉利艾尔"},
    {
      en: "The perfect balance between Trawangan's energy and Meno's tranquility — relaxed vibes with great snorkeling.",
      id: "Keseimbangan sempurna antara energi Trawangan dan ketenangan Meno — suasana santai dengan snorkeling luar biasa.",
      cn: "特拉旺安的活力与美诺的宁静之间的完美平衡——轻松的氛围和出色的浮潜。",
    },
    {
      en: "Gili Air strikes the perfect balance between lively and laid-back. It's closest to Lombok's mainland, with a strong local Sasak presence, excellent snorkeling right off the beach, and a growing yoga and wellness scene.",
      id: "Gili Air adalah keseimbangan sempurna antara ramai dan santai. Paling dekat dengan daratan Lombok dengan kehadiran suku Sasak yang kuat.",
      cn: "吉利艾尔在热闹与悠闲之间取得了完美的平衡。",
    },
    "beach",
    "Full day",
  ),
  p(
    "mandalika",
    "mandalika",
    "region-lombok",
    {en: "Mandalika", id: "Mandalika", cn: "曼达利卡"},
    {
      en: "A world-class resort and racing circuit destination on Lombok's stunning southern coast.",
      id: "Destinasi resor dan sirkuit balap kelas dunia di pantai selatan Lombok yang menakjubkan.",
      cn: "龙目岛南部海岸的世界级度假和赛车胜地。",
    },
    {
      en: "Mandalika is Indonesia's emerging premium destination, home to the Pertamina Mandalika International Street Circuit for MotoGP. Beyond the racing, discover pristine beaches, luxury resorts, and traditional Sasak culture.",
      id: "Mandalika adalah destinasi premium Indonesia yang sedang berkembang, rumah sirkuit MotoGP Pertamina Mandalika.",
      cn: "曼达利卡是印度尼西亚新兴的高端目的地，拥有MotoGP赛道。",
    },
    "beach",
    "Full day",
  ),
  p(
    "kuta-lombok",
    "kuta-lombok",
    "region-lombok",
    {en: "Kuta Lombok", id: "Kuta Lombok", cn: "库塔龙目"},
    {
      en: "Not to be confused with Bali's Kuta — a laid-back surf town with turquoise bays and rolling hills.",
      id: "Jangan keliru dengan Kuta Bali — kota surfing santai dengan teluk biru kehijauan dan bukit bergelombang.",
      cn: "不要与巴厘岛的库塔混淆——一个悠闲的冲浪小镇，拥有碧绿的海湾。",
    },
    {
      en: "Kuta Lombok is the gateway to some of Lombok's most spectacular southern beaches. This relaxed village is surrounded by emerald hills and pristine bays, with world-class surf breaks nearby.",
      id: "Kuta Lombok adalah pintu gerbang ke pantai-pantai selatan Lombok yang paling spektakuler. Desa santai ini dikelilingi bukit zamrud.",
      cn: "库塔龙目是通往龙目岛南部壮观海滩的门户。",
    },
    "beach",
    "Half day",
  ),
  p(
    "sembalun",
    "sembalun",
    "region-lombok",
    {en: "Sembalun", id: "Sembalun", cn: "森巴伦"},
    {
      en: "A highland valley at Mount Rinjani's base — the starting point for the famous trek with strawberry farms and savanna.",
      id: "Lembah dataran tinggi di kaki Gunung Rinjani — titik awal trek terkenal dengan kebun stroberi dan savana.",
      cn: "林贾尼火山脚下的高地山谷——著名徒步旅行的起点，有草莓农场和草原。",
    },
    {
      en: "Sembalun is a picturesque highland valley nestled at the foot of Mount Rinjani. It's the primary starting point for trekking to Rinjani's summit, surrounded by strawberry farms, tobacco fields, and sweeping savanna views.",
      id: "Sembalun adalah lembah dataran tinggi indah di kaki Gunung Rinjani. Titik awal utama untuk trekking ke puncak Rinjani.",
      cn: "森巴伦是林贾尼火山脚下风景如画的高地山谷。",
    },
    "mountain",
    "Full day",
  ),
  p(
    "mount-rinjani",
    "mount-rinjani",
    "region-lombok",
    {en: "Mount Rinjani", id: "Gunung Rinjani", cn: "林贾尼火山"},
    {
      en: "Indonesia's second-highest volcano with a breathtaking crater lake — a bucket-list multi-day trek.",
      id: "Gunung berapi tertinggi kedua Indonesia dengan danau kawah menakjubkan — trekking multi-hari yang wajib dicoba.",
      cn: "印度尼西亚第二高火山，拥有令人叹为观止的火山口湖——必去的多日徒步旅行。",
    },
    {
      en: "Mount Rinjani stands at 3,726 meters and is one of Indonesia's most rewarding trekking destinations. The multi-day trek leads to the stunning Segara Anak crater lake and a challenging summit push for sunrise views.",
      id: "Gunung Rinjani berdiri setinggi 3.726 meter dan merupakan salah satu destinasi trekking paling menakjubkan di Indonesia.",
      cn: "林贾尼火山海拔3726米，是印度尼西亚最值得的徒步目的地之一。",
    },
    "mountain",
    "3 days",
  ),
  p(
    "senggigi",
    "senggigi",
    "region-lombok",
    {en: "Senggigi", id: "Senggigi", cn: "圣吉吉"},
    {
      en: "Lombok's main tourist strip with beach resorts, seafood restaurants, and stunning sunset views over Bali.",
      id: "Strip wisata utama Lombok dengan resor pantai, restoran seafood, dan pemandangan sunset memukau ke arah Bali.",
      cn: "龙目岛的主要旅游区，有海滩度假村、海鲜餐厅和壮丽的日落景色。",
    },
    {
      en: "Senggigi is Lombok's most established tourist area, stretching along the island's west coast. Enjoy sunset views of Mount Agung across the Lombok Strait, beachfront dining, and easy access to the Gili Islands by boat.",
      id: "Senggigi adalah area wisata paling mapan di Lombok, membentang di sepanjang pantai barat pulau.",
      cn: "圣吉吉是龙目岛最成熟的旅游区，沿岛屿西海岸延伸。",
    },
    "beach",
    "Half day",
  ),
  p(
    "pink-beach-lombok",
    "pink-beach-lombok",
    "region-lombok",
    {en: "Pink Beach Lombok", id: "Pantai Pink Lombok", cn: "龙目岛粉红沙滩"},
    {
      en: "One of the world's rare pink-sand beaches — coral fragments mix with white sand creating a blush-colored shoreline.",
      id: "Salah satu pantai pasir merah muda langka di dunia — fragmen karang bercampur pasir putih menciptakan garis pantai berwarna pink.",
      cn: "世界上罕见的粉红沙滩——珊瑚碎片与白沙混合形成粉红色海岸线。",
    },
    {
      en: "Pink Beach on Lombok's east coast is one of only a handful of pink-sand beaches in the world. The unique color comes from microscopic coral fragments (Foraminifera) that blend with the white sand, creating a stunning blush-pink hue.",
      id: "Pantai Pink di pantai timur Lombok adalah salah satu dari sedikit pantai pasir merah muda di dunia.",
      cn: "龙目岛东海岸的粉红沙滩是世界上为数不多的粉红色沙滩之一。",
    },
    "beach",
    "Full day",
  ),
  p(
    "tanjung-aan",
    "tanjung-aan",
    "region-lombok",
    {en: "Tanjung Aan", id: "Tanjung Aan", cn: "丹绒安"},
    {
      en: "A picture-perfect twin bay with unique pepper-grain sand and calm, crystal-clear turquoise waters.",
      id: "Teluk kembar yang sempurna dengan pasir butir merica unik dan perairan biru kehijauan yang tenang.",
      cn: "如画的双湾，拥有独特的胡椒粒沙和平静清澈的碧绿海水。",
    },
    {
      en: "Tanjung Aan features two beautiful bays separated by a small hill, with uniquely textured sand that feels like tiny pepper grains. The calm, shallow turquoise waters make it perfect for swimming.",
      id: "Tanjung Aan memiliki dua teluk indah yang dipisahkan bukit kecil, dengan pasir bertekstur unik seperti butiran merica.",
      cn: "丹绒安有两个美丽的海湾，被小山丘隔开，沙子质地独特。",
    },
    "beach",
    "Half day",
  ),
  p(
    "selong-belanak",
    "selong-belanak",
    "region-lombok",
    {en: "Selong Belanak", id: "Selong Belanak", cn: "塞隆贝拉纳克"},
    {
      en: "A crescent-shaped beach with gentle waves ideal for beginner surfers and a stunning hillside panorama.",
      id: "Pantai berbentuk bulan sabit dengan ombak lembut ideal untuk peselancar pemula dan panorama bukit yang menakjubkan.",
      cn: "月牙形海滩，温柔的海浪适合初学冲浪者，还有令人惊叹的山坡全景。",
    },
    {
      en: "Selong Belanak is one of Lombok's most beautiful beaches, a sweeping crescent of fine white sand backed by green hills. Its gentle waves make it the perfect spot for learning to surf.",
      id: "Selong Belanak adalah salah satu pantai terindah di Lombok, hamparan pasir putih halus berbentuk bulan sabit.",
      cn: "塞隆贝拉纳克是龙目岛最美丽的海滩之一，月牙形的白色细沙海滩。",
    },
    "beach",
    "Half day",
  ),
  p(
    "merese-hill",
    "merese-hill",
    "region-lombok",
    {en: "Merese Hill", id: "Bukit Merese", cn: "梅雷斯山"},
    {
      en: "A scenic hilltop viewpoint offering panoramic views over Tanjung Aan bay and Lombok's southern coastline.",
      id: "Titik pandang puncak bukit indah dengan pemandangan panorama Teluk Tanjung Aan dan pantai selatan Lombok.",
      cn: "风景优美的山顶观景点，俯瞰丹绒安湾和龙目岛南部海岸线。",
    },
    {
      en: "Merese Hill is a grassy hilltop overlooking the stunning bays of Tanjung Aan and the vast Indian Ocean. A short hike rewards visitors with one of Lombok's most breathtaking panoramic views, especially at sunset.",
      id: "Bukit Merese adalah puncak bukit berumput yang menghadap teluk Tanjung Aan dan Samudra Hindia.",
      cn: "梅雷斯山是一座草地覆盖的山顶，俯瞰丹绒安湾和浩瀚的印度洋。",
    },
    "nature",
    "Half day",
  ),
  p(
    "benang-stokel",
    "benang-stokel-waterfall",
    "region-lombok",
    {
      en: "Benang Stokel Waterfall",
      id: "Air Terjun Benang Stokel",
      cn: "贝南斯托克尔瀑布",
    },
    {
      en: "A majestic tiered waterfall cascading through lush tropical rainforest in central Lombok.",
      id: "Air terjun bertingkat megah yang mengalir melewati hutan hujan tropis lebat di Lombok tengah.",
      cn: "中部龙目岛郁郁葱葱的热带雨林中壮丽的阶梯瀑布。",
    },
    {
      en: "Benang Stokel is a magnificent multi-tiered waterfall tucked within a lush tropical forest on the slopes of Mount Rinjani. The water cascades over moss-covered rocks, creating a magical curtain-like effect.",
      id: "Benang Stokel adalah air terjun bertingkat megah tersembunyi dalam hutan tropis lebat di lereng Gunung Rinjani.",
      cn: "贝南斯托克尔是一座壮丽的多层瀑布，隐藏在林贾尼火山山坡的热带森林中。",
    },
    "waterfall",
    "Half day",
  ),
  p(
    "sendang-gile",
    "sendang-gile-waterfall",
    "region-lombok",
    {
      en: "Sendang Gile Waterfall",
      id: "Air Terjun Sendang Gile",
      cn: "森当吉莱瀑布",
    },
    {
      en: "A powerful 31-meter waterfall at the foot of Mount Rinjani, accessible via a scenic trek through forest.",
      id: "Air terjun kuat setinggi 31 meter di kaki Gunung Rinjani, dapat diakses melalui trek indah melewati hutan.",
      cn: "林贾尼火山脚下31米高的壮丽瀑布，需穿过森林步行到达。",
    },
    {
      en: "Sendang Gile is a powerful waterfall plunging 31 meters into a pool at the base of Mount Rinjani. The trek through lush forest to reach it is part of the adventure, passing through traditional Sasak villages.",
      id: "Sendang Gile adalah air terjun yang jatuh 31 meter ke kolam di kaki Gunung Rinjani.",
      cn: "森当吉莱瀑布从31米高处倾泻而下，流入林贾尼火山脚下的水池。",
    },
    "waterfall",
    "Half day",
  ),
  p(
    "pusuk-monkey-forest",
    "pusuk-monkey-forest",
    "region-lombok",
    {en: "Pusuk Monkey Forest", id: "Hutan Monyet Pusuk", cn: "普苏克猴林"},
    {
      en: "A scenic mountain road winding through dense forest populated by playful wild macaques.",
      id: "Jalan pegunungan indah yang berkelok melewati hutan lebat dihuni kera liar yang suka bermain.",
      cn: "蜿蜒穿过茂密森林的风景优美山路，栖息着顽皮的野生猕猴。",
    },
    {
      en: "Pusuk Monkey Forest is a scenic stretch of mountain road cutting through dense tropical forest on Lombok's northern highlands. Hundreds of wild macaques inhabit the area, often coming to the roadside.",
      id: "Hutan Monyet Pusuk adalah jalan pegunungan indah menembus hutan tropis lebat di dataran tinggi utara Lombok.",
      cn: "普苏克猴林是龙目岛北部高地一段风景优美的山路，穿过茂密的热带森林。",
    },
    "nature",
    "Half day",
  ),
  p(
    "gili-nanggu",
    "gili-nanggu",
    "region-lombok",
    {en: "Gili Nanggu", id: "Gili Nanggu", cn: "吉利南古"},
    {
      en: "A tranquil private island off southwest Lombok with pristine snorkeling and powdery white sand.",
      id: "Pulau pribadi tenang di barat daya Lombok dengan snorkeling bersih dan pasir putih halus.",
      cn: "龙目岛西南部宁静的私人岛屿，拥有原始的浮潜和细白沙滩。",
    },
    {
      en: "Gili Nanggu is a peaceful private island off Lombok's southwest coast, offering pristine coral reefs for snorkeling and a beautiful white sand beach with crystal-clear waters.",
      id: "Gili Nanggu adalah pulau pribadi yang tenang di lepas pantai barat daya Lombok, menawarkan terumbu karang bersih untuk snorkeling.",
      cn: "吉利南古是龙目岛西南海岸外的一个宁静私人岛屿。",
    },
    "beach",
    "Full day",
  ),
  p(
    "sade-village",
    "sade-village",
    "region-lombok",
    {en: "Sade Village", id: "Desa Sade", cn: "萨德村"},
    {
      en: "An ancient Sasak village preserving traditional thatched-roof houses and centuries-old weaving traditions.",
      id: "Desa Sasak kuno yang melestarikan rumah atap jerami tradisional dan tradisi tenun berusia berabad-abad.",
      cn: "古老的萨萨克村庄，保留着传统茅草屋顶房屋和数百年的编织传统。",
    },
    {
      en: "Sade Village is a living museum of Sasak culture, Lombok's indigenous people. The village preserves traditional thatched-roof houses (bale) and centuries-old weaving traditions that produce the island's iconic ikat textiles.",
      id: "Desa Sade adalah museum hidup budaya Sasak, penduduk asli Lombok. Desa ini melestarikan rumah tradisional beratap jerami.",
      cn: "萨德村是龙目岛原住民萨萨克文化的活博物馆。",
    },
    "village",
    "Half day",
  ),
  p(
    "batu-payung",
    "batu-payung",
    "region-lombok",
    {en: "Batu Payung", id: "Batu Payung", cn: "伞石"},
    {
      en: "An iconic umbrella-shaped rock formation standing in the sea near Tanjung Aan beach.",
      id: "Formasi batu berbentuk payung ikonik yang berdiri di laut dekat Pantai Tanjung Aan.",
      cn: "丹绒安海滩附近海中标志性的伞形岩石。",
    },
    {
      en: "Batu Payung, meaning 'Umbrella Rock', is a unique natural rock formation that resembles a giant umbrella standing in the turquoise sea near Tanjung Aan.",
      id: "Batu Payung adalah formasi batu alam unik yang menyerupai payung raksasa berdiri di laut dekat Tanjung Aan.",
      cn: "伞石是一块独特的天然岩石，形似巨大的雨伞，矗立在丹绒安附近的碧绿海水中。",
    },
    "nature",
    "Half day",
  ),
  p(
    "mawun-beach",
    "mawun-beach",
    "region-lombok",
    {en: "Mawun Beach", id: "Pantai Mawun", cn: "马翁海滩"},
    {
      en: "A secluded horseshoe-shaped bay with calm turquoise waters, flanked by green hills on both sides.",
      id: "Teluk berbentuk tapal kuda terpencil dengan perairan biru kehijauan tenang, diapit bukit hijau di kedua sisi.",
      cn: "僻静的马蹄形海湾，平静的碧绿海水，两侧被绿色山丘环绕。",
    },
    {
      en: "Mawun Beach is a stunning horseshoe bay flanked by lush green hills, creating a sheltered cove with calm, crystal-clear waters perfect for swimming.",
      id: "Pantai Mawun adalah teluk tapal kuda menakjubkan yang diapit bukit hijau lebat, menciptakan teluk terlindung.",
      cn: "马翁海滩是一个令人惊叹的马蹄形海湾，两侧被郁郁葱葱的绿色山丘环绕。",
    },
    "beach",
    "Half day",
  ),
  p(
    "gili-gede",
    "gili-gede",
    "region-lombok",
    {en: "Gili Gede", id: "Gili Gede", cn: "吉利格德"},
    {
      en: "A peaceful island off southwest Lombok offering authentic village life, snorkeling, and uncrowded beaches.",
      id: "Pulau damai di barat daya Lombok menawarkan kehidupan desa asli, snorkeling, dan pantai sepi.",
      cn: "龙目岛西南部的和平岛屿，提供真实的村庄生活和人少的海滩。",
    },
    {
      en: "Gili Gede is the largest of the southwest Gili Islands, offering an authentic island experience away from tourist crowds. Explore quiet villages, snorkel in clear waters, and enjoy uninterrupted ocean views.",
      id: "Gili Gede adalah yang terbesar dari Kepulauan Gili barat daya, menawarkan pengalaman pulau otentik jauh dari keramaian.",
      cn: "吉利格德是西南吉利群岛中最大的岛屿，提供远离游客人群的真实岛屿体验。",
    },
    "beach",
    "Full day",
  ),
];

// ============================
// KOMODO ISLAND PLACES
// ============================

const komodoPlaces: Place[] = [
  p(
    "labuan-bajo",
    "labuan-bajo",
    "region-komodo",
    {en: "Labuan Bajo", id: "Labuan Bajo", cn: "拉布安巴焦"},
    {
      en: "The gateway town to Komodo National Park with a vibrant waterfront, dive shops, and island-hopping tours.",
      id: "Kota gerbang ke Taman Nasional Komodo dengan tepi laut yang semarak, toko selam, dan tur island-hopping.",
      cn: "科莫多国家公园的门户城镇，拥有充满活力的海滨和跳岛游。",
    },
    {
      en: "Labuan Bajo is a bustling fishing town on the western tip of Flores island, serving as the primary gateway to Komodo National Park. The waterfront comes alive at sunset with seafood markets and liveaboard boats.",
      id: "Labuan Bajo adalah kota nelayan ramai di ujung barat Pulau Flores, berfungsi sebagai pintu gerbang utama Taman Nasional Komodo.",
      cn: "拉布安巴焦是弗洛勒斯岛西端的繁华渔镇，是科莫多国家公园的主要门户。",
    },
    "nature",
    "Half day",
  ),
  p(
    "padar-island",
    "padar-island",
    "region-komodo",
    {en: "Padar Island", id: "Pulau Padar", cn: "帕达尔岛"},
    {
      en: "Famous for its dramatic three-bay viewpoint — hike to the summit for one of Indonesia's most iconic panoramas.",
      id: "Terkenal dengan viewpoint tiga teluk dramatis — naik ke puncak untuk salah satu panorama paling ikonik Indonesia.",
      cn: "以其壮观的三湾景观闻名——登上山顶欣赏印尼最标志性的全景之一。",
    },
    {
      en: "Padar Island offers one of the most photographed viewpoints in all of Indonesia. A 30-minute hike to the summit reveals a breathtaking panorama of three bays — each with differently colored sand.",
      id: "Pulau Padar menawarkan salah satu viewpoint paling banyak difoto di Indonesia. Pendakian 30 menit ke puncak mengungkap panorama menakjubkan.",
      cn: "帕达尔岛提供了印度尼西亚最值得拍照的观景点之一。",
    },
    "nature",
    "Half day",
  ),
  p(
    "komodo-island",
    "komodo-island",
    "region-komodo",
    {en: "Komodo Island", id: "Pulau Komodo", cn: "科莫多岛"},
    {
      en: "Home of the legendary Komodo dragons — the world's largest living lizard in their natural habitat.",
      id: "Rumah komodo legendaris — kadal terbesar di dunia yang hidup di habitat aslinya.",
      cn: "传说中科莫多巨蜥的家园——世界上最大的现存蜥蜴在其自然栖息地。",
    },
    {
      en: "Komodo Island is the namesake of Komodo National Park, where you can observe the world's largest lizard — the Komodo dragon — in its natural habitat. Guided treks through the island reveal these ancient predators alongside deer, buffalo, and other wildlife.",
      id: "Pulau Komodo adalah nama dari Taman Nasional Komodo, tempat Anda bisa mengamati kadal terbesar di dunia di habitat aslinya.",
      cn: "科莫多岛是科莫多国家公园的同名岛屿，您可以在此观察世界上最大的蜥蜴。",
    },
    "adventure",
    "Full day",
  ),
  p(
    "pink-beach-komodo",
    "pink-beach-komodo",
    "region-komodo",
    {en: "Pink Beach Komodo", id: "Pantai Pink Komodo", cn: "科莫多粉红沙滩"},
    {
      en: "A rare pink-sand beach within Komodo National Park with spectacular snorkeling over vibrant coral reefs.",
      id: "Pantai pasir merah muda langka di Taman Nasional Komodo dengan snorkeling spektakuler di terumbu karang.",
      cn: "科莫多国家公园内罕见的粉红沙滩，拥有壮观的珊瑚礁浮潜。",
    },
    {
      en: "Pink Beach in Komodo National Park is one of only seven pink-sand beaches in the world. The stunning pink hue comes from red coral fragments mixing with white sand, while the underwater world offers world-class snorkeling.",
      id: "Pantai Pink di Taman Nasional Komodo adalah salah satu dari hanya tujuh pantai pasir merah muda di dunia.",
      cn: "科莫多国家公园的粉红沙滩是世界上仅有的七个粉红沙滩之一。",
    },
    "beach",
    "Half day",
  ),
  p(
    "manta-point",
    "manta-point",
    "region-komodo",
    {en: "Manta Point", id: "Manta Point", cn: "蝠鲼观赏点"},
    {
      en: "One of the world's best spots to swim with majestic manta rays in crystal-clear waters.",
      id: "Salah satu spot terbaik di dunia untuk berenang bersama pari manta megah di perairan jernih.",
      cn: "世界上与壮丽蝠鲼共游的最佳地点之一。",
    },
    {
      en: "Manta Point is a world-renowned dive and snorkel site in Komodo National Park where giant oceanic manta rays congregate at cleaning stations. Divers and snorkelers can observe these gentle giants with wingspans up to 7 meters.",
      id: "Manta Point adalah situs selam dan snorkeling terkenal dunia di Taman Nasional Komodo tempat pari manta raksasa berkumpul.",
      cn: "蝠鲼观赏点是科莫多国家公园中世界著名的潜水和浮潜地点。",
    },
    "adventure",
    "Half day",
  ),
  p(
    "rinca-island",
    "rinca-island",
    "region-komodo",
    {en: "Rinca Island", id: "Pulau Rinca", cn: "林卡岛"},
    {
      en: "The more accessible island for Komodo dragon encounters with a modern visitor center and guided treks.",
      id: "Pulau yang lebih mudah diakses untuk bertemu komodo dengan pusat pengunjung modern dan trek berpemandu.",
      cn: "更容易到达的科莫多龙观赏岛屿，设有现代游客中心。",
    },
    {
      en: "Rinca Island is closer to Labuan Bajo than Komodo Island, making it a popular choice for dragon encounters. The island has a modern visitor center and well-maintained trails where rangers guide visitors through Komodo dragon habitat.",
      id: "Pulau Rinca lebih dekat ke Labuan Bajo dibanding Pulau Komodo, menjadikannya pilihan populer untuk bertemu komodo.",
      cn: "林卡岛比科莫多岛更靠近拉布安巴焦，是观赏科莫多龙的热门选择。",
    },
    "adventure",
    "Half day",
  ),
  p(
    "kelor-island",
    "kelor-island",
    "region-komodo",
    {en: "Kelor Island", id: "Pulau Kelor", cn: "克洛尔岛"},
    {
      en: "A tiny island with a short hilltop hike offering 360-degree views and excellent snorkeling nearby.",
      id: "Pulau kecil dengan pendakian bukit singkat menawarkan pemandangan 360 derajat dan snorkeling luar biasa.",
      cn: "一座小岛，短暂的山顶徒步可欣赏360度全景和附近出色的浮潜。",
    },
    {
      en: "Kelor Island is a small, picturesque island near Labuan Bajo. A quick hike to the hilltop rewards visitors with stunning 360-degree views of the surrounding islands and turquoise seas.",
      id: "Pulau Kelor adalah pulau kecil indah dekat Labuan Bajo. Pendakian singkat ke puncak bukit memberikan pemandangan 360 derajat.",
      cn: "克洛尔岛是拉布安巴焦附近的一个小型风景如画的岛屿。",
    },
    "nature",
    "Half day",
  ),
  p(
    "taka-makassar",
    "taka-makassar",
    "region-komodo",
    {en: "Taka Makassar", id: "Taka Makassar", cn: "塔卡望加锡"},
    {
      en: "A stunning sandbar that emerges at low tide, surrounded by crystal-clear turquoise waters.",
      id: "Gundukan pasir menakjubkan yang muncul saat air surut, dikelilingi perairan biru kehijauan-kristal.",
      cn: "退潮时出现的令人惊叹的沙洲，被清澈的碧绿海水环绕。",
    },
    {
      en: "Taka Makassar is a magical sandbar that appears at low tide in the middle of the Flores Sea. This ephemeral strip of white sand surrounded by impossibly turquoise water creates one of the most surreal photo opportunities.",
      id: "Taka Makassar adalah gundukan pasir ajaib yang muncul saat air surut di tengah Laut Flores.",
      cn: "塔卡望加锡是弗洛勒斯海中退潮时出现的神奇沙洲。",
    },
    "beach",
    "Half day",
  ),
  p(
    "kanawa-island",
    "kanawa-island",
    "region-komodo",
    {en: "Kanawa Island", id: "Pulau Kanawa", cn: "卡纳瓦岛"},
    {
      en: "A small private island resort with world-class snorkeling right from the beach and stunning coral gardens.",
      id: "Resor pulau pribadi kecil dengan snorkeling kelas dunia langsung dari pantai dan taman karang menakjubkan.",
      cn: "小型私人度假岛屿，可直接从海滩浮潜，拥有美丽的珊瑚花园。",
    },
    {
      en: "Kanawa Island is a small, privately managed island with pristine coral reefs accessible right from the beach. The crystal-clear waters teem with colorful fish, sea turtles, and vibrant soft corals.",
      id: "Pulau Kanawa adalah pulau kecil yang dikelola swasta dengan terumbu karang bersih yang bisa diakses langsung dari pantai.",
      cn: "卡纳瓦岛是一个小型私人管理的岛屿，原始的珊瑚礁可直接从海滩到达。",
    },
    "beach",
    "Full day",
  ),
  p(
    "kalong-island",
    "kalong-island",
    "region-komodo",
    {en: "Kalong Island", id: "Pulau Kalong", cn: "蝙蝠岛"},
    {
      en: "Famous for the spectacular sunset exodus of thousands of giant fruit bats flying out from the mangroves.",
      id: "Terkenal dengan pemandangan sunset spektakuler ribuan kelelawar buah raksasa terbang keluar dari bakau.",
      cn: "以数千只大型果蝠从红树林飞出的壮观日落景象而闻名。",
    },
    {
      en: "Kalong Island, meaning 'Bat Island', is famous for the nightly exodus of thousands of giant flying foxes (fruit bats) that depart the island's mangroves at sunset to feed on the surrounding islands.",
      id: "Pulau Kalong terkenal dengan eksodus malam ribuan kelelawar buah raksasa yang meninggalkan bakau pulau saat matahari terbenam.",
      cn: "蝙蝠岛以数千只大型飞狐（果蝠）在日落时从红树林飞出觅食的壮观景象而闻名。",
    },
    "nature",
    "Half day",
  ),
];

// ============================
// SUMBA PLACES
// ============================

const sumbaPlaces: Place[] = [
  p(
    "nihiwatu-beach",
    "nihiwatu-beach",
    "region-sumba",
    {en: "Nihiwatu Beach", id: "Pantai Nihiwatu", cn: "尼希瓦图海滩"},
    {
      en: "A world-famous luxury surf break consistently ranked among the world's best hotel beaches.",
      id: "Spot surfing mewah terkenal dunia yang secara konsisten masuk peringkat pantai hotel terbaik dunia.",
      cn: "世界著名的豪华冲浪胜地，一直被评为世界最佳酒店海滩之一。",
    },
    {
      en: "Nihiwatu Beach, on Sumba's west coast, has been ranked the number one hotel beach in the world. It offers a legendary left-hand reef break accessible to only a handful of surfers per day.",
      id: "Pantai Nihiwatu di pantai barat Sumba pernah dinobatkan sebagai pantai hotel nomor satu di dunia.",
      cn: "尼希瓦图海滩位于松巴岛西海岸，曾被评为世界第一酒店海滩。",
    },
    "beach",
    "Full day",
  ),
  p(
    "weekuri-lagoon",
    "weekuri-lagoon",
    "region-sumba",
    {en: "Weekuri Lagoon", id: "Laguna Weekuri", cn: "维库里泻湖"},
    {
      en: "A stunning saltwater lagoon with crystal-clear turquoise water, perfect for swimming and cliff jumping.",
      id: "Laguna air asin menakjubkan dengan air biru kehijauan jernih, sempurna untuk berenang dan cliff jumping.",
      cn: "令人惊叹的咸水泻湖，清澈的碧绿海水，适合游泳和悬崖跳水。",
    },
    {
      en: "Weekuri Lagoon is a breathtaking natural saltwater pool enclosed by limestone rocks on Sumba's southwest coast. The crystal-clear turquoise water is calm and perfect for swimming.",
      id: "Laguna Weekuri adalah kolam air asin alami menakjubkan yang dikelilingi batu kapur di pantai barat daya Sumba.",
      cn: "维库里泻湖是松巴岛西南海岸被石灰岩围绕的天然咸水池。",
    },
    "nature",
    "Half day",
  ),
  p(
    "ratenggaro-village",
    "ratenggaro-village",
    "region-sumba",
    {en: "Ratenggaro Village", id: "Kampung Ratenggaro", cn: "拉滕加罗村"},
    {
      en: "An ancient megalithic village with towering traditional houses and stone tombs overlooking the ocean.",
      id: "Desa megalitik kuno dengan rumah tradisional tinggi dan makam batu menghadap lautan.",
      cn: "古老的巨石村庄，高耸的传统房屋和石墓俯瞰大海。",
    },
    {
      en: "Ratenggaro is one of Sumba's most iconic traditional villages, perched on a cliff overlooking the sea with towering peaked-roof houses (uma mbatangu) and ancient megalithic stone tombs.",
      id: "Ratenggaro adalah salah satu desa tradisional paling ikonik di Sumba, bertengger di tebing menghadap laut.",
      cn: "拉滕加罗是松巴岛最具标志性的传统村庄之一，矗立在俯瞰大海的悬崖上。",
    },
    "village",
    "Half day",
  ),
  p(
    "wairinding-hill",
    "wairinding-hill",
    "region-sumba",
    {en: "Wairinding Hill", id: "Bukit Wairinding", cn: "瓦伊林丁山"},
    {
      en: "Sumba's most iconic viewpoint — rolling savanna hills with panoramic views of the coastline.",
      id: "Viewpoint paling ikonik Sumba — bukit savana bergelombang dengan panorama garis pantai.",
      cn: "松巴岛最标志性的观景点——起伏的草原山丘和海岸线全景。",
    },
    {
      en: "Wairinding Hill offers Sumba's most photographed landscape — endless rolling savanna hills that turn golden at sunset, with the coastline visible in the distance.",
      id: "Bukit Wairinding menawarkan lanskap paling banyak difoto di Sumba — bukit savana bergelombang tanpa ujung yang berubah keemasan saat sunset.",
      cn: "瓦伊林丁山提供松巴岛最常被拍照的景观——无尽起伏的草原山丘在日落时变成金色。",
    },
    "nature",
    "Half day",
  ),
  p(
    "lapopu-waterfall",
    "lapopu-waterfall",
    "region-sumba",
    {en: "Lapopu Waterfall", id: "Air Terjun Lapopu", cn: "拉波普瀑布"},
    {
      en: "The highest and most powerful waterfall in Sumba, cascading 80 meters through pristine wilderness.",
      id: "Air terjun tertinggi dan paling kuat di Sumba, jatuh 80 meter melewati alam liar perawan.",
      cn: "松巴岛最高最壮观的瀑布，80米落差穿越原始荒野。",
    },
    {
      en: "Lapopu Waterfall is the tallest waterfall in Sumba, plunging approximately 80 meters through dense tropical forest within the Manupeu Tanah Daru National Park.",
      id: "Air Terjun Lapopu adalah air terjun tertinggi di Sumba, jatuh sekitar 80 meter melewati hutan tropis lebat.",
      cn: "拉波普瀑布是松巴岛最高的瀑布，约80米高，穿过茂密的热带森林。",
    },
    "waterfall",
    "Half day",
  ),
  p(
    "walakiri-beach",
    "walakiri-beach",
    "region-sumba",
    {en: "Walakiri Beach", id: "Pantai Walakiri", cn: "瓦拉基里海滩"},
    {
      en: "Famous for its row of dancing mangrove trees silhouetted against spectacular sunsets.",
      id: "Terkenal dengan deretan pohon bakau menari yang berlatar belakang sunset spektakuler.",
      cn: "以一排在壮观日落中剪影般的'舞蹈'红树林而闻名。",
    },
    {
      en: "Walakiri Beach is famous for its unique row of mangrove trees that appear to dance at the water's edge, creating stunning silhouettes against golden and crimson sunsets.",
      id: "Pantai Walakiri terkenal dengan deretan unik pohon bakau yang tampak menari di tepi air, menciptakan siluet menakjubkan.",
      cn: "瓦拉基里海滩以其独特的一排红树林而闻名，在金色和深红色的日落中形成迷人的剪影。",
    },
    "beach",
    "Half day",
  ),
  p(
    "mandorak-beach",
    "mandorak-beach",
    "region-sumba",
    {en: "Mandorak Beach", id: "Pantai Mandorak", cn: "曼多拉克海滩"},
    {
      en: "A hidden turquoise cove framed by dramatic cliffs, one of Sumba's most secluded beaches.",
      id: "Teluk tersembunyi berwarna biru kehijauan dibingkai tebing dramatis, salah satu pantai paling terpencil di Sumba.",
      cn: "被壮丽悬崖环绕的隐秘碧绿海湾，松巴岛最僻静的海滩之一。",
    },
    {
      en: "Mandorak Beach is a secluded paradise tucked between dramatic limestone cliffs on Sumba's west coast, with crystal-clear turquoise waters and powdery white sand.",
      id: "Pantai Mandorak adalah surga terpencil yang tersembunyi di antara tebing batu kapur dramatis di pantai barat Sumba.",
      cn: "曼多拉克海滩是松巴岛西海岸藏在壮丽石灰岩悬崖之间的僻静天堂。",
    },
    "beach",
    "Half day",
  ),
  p(
    "tanggedu-waterfall",
    "tanggedu-waterfall",
    "region-sumba",
    {en: "Tanggedu Waterfall", id: "Air Terjun Tanggedu", cn: "唐格杜瀑布"},
    {
      en: "A unique canyon waterfall where water flows through narrow limestone gorges into emerald pools.",
      id: "Air terjun ngarai unik di mana air mengalir melewati gorong batu kapur sempit ke kolam zamrud.",
      cn: "独特的峡谷瀑布，水流穿过狭窄的石灰岩峡谷流入碧绿的水池。",
    },
    {
      en: "Tanggedu Waterfall is one of Sumba's most unique natural wonders — water flows through a series of narrow limestone canyon walls into terraced emerald pools, creating a miniature canyon landscape.",
      id: "Air Terjun Tanggedu adalah salah satu keajaiban alam paling unik di Sumba — air mengalir melewati serangkaian dinding ngarai batu kapur sempit.",
      cn: "唐格杜瀑布是松巴岛最独特的自然奇观之一——水流穿过一系列狭窄的石灰岩峡谷壁流入阶梯状的碧绿水池。",
    },
    "waterfall",
    "Half day",
  ),
  p(
    "praijing-village",
    "praijing-village",
    "region-sumba",
    {en: "Praijing Village", id: "Kampung Praijing", cn: "普拉京村"},
    {
      en: "A well-preserved traditional Sumbanese village with soaring peaked-roof houses and megalithic tombs.",
      id: "Desa tradisional Sumba yang terjaga baik dengan rumah beratap tinggi dan makam megalitik.",
      cn: "保存完好的松巴传统村庄，拥有高耸尖顶房屋和巨石墓。",
    },
    {
      en: "Praijing Village is one of the most accessible traditional villages in Sumba, featuring rows of towering peaked-roof ancestral houses surrounding ancient megalithic stone tombs.",
      id: "Kampung Praijing adalah salah satu desa tradisional paling mudah diakses di Sumba, dengan deretan rumah leluhur beratap tinggi.",
      cn: "普拉京村是松巴岛最容易到达的传统村庄之一，拥有成排的高耸尖顶祖先房屋。",
    },
    "village",
    "Half day",
  ),
  p(
    "bwanna-beach",
    "bwanna-beach",
    "region-sumba",
    {en: "Bwanna Beach", id: "Pantai Bwanna", cn: "布瓦纳海滩"},
    {
      en: "A pristine, secluded beach with powdery white sand and turquoise waters, largely untouched by tourism.",
      id: "Pantai bersih terpencil dengan pasir putih halus dan perairan biru kehijauan, hampir tak tersentuh pariwisata.",
      cn: "原始僻静的海滩，细白沙和碧绿海水，几乎未受旅游业影响。",
    },
    {
      en: "Bwanna Beach is one of Sumba's hidden treasures — a long stretch of pristine white sand with warm turquoise waters, largely untouched and uncrowded, offering a true off-the-beaten-path experience.",
      id: "Pantai Bwanna adalah salah satu harta tersembunyi Sumba — hamparan panjang pasir putih bersih yang hampir tak tersentuh.",
      cn: "布瓦纳海滩是松巴岛的隐藏宝藏之一——绵长的原始白色沙滩，几乎无人打扰。",
    },
    "beach",
    "Half day",
  ),
];

// ============================
// SUMBAWA PLACES
// ============================

const sumbawaPlaces: Place[] = [
  p(
    "moyo-island",
    "moyo-island",
    "region-sumbawa",
    {en: "Moyo Island", id: "Pulau Moyo", cn: "莫约岛"},
    {
      en: "A pristine nature reserve island with waterfalls, bat caves, and exclusive luxury camping.",
      id: "Pulau cagar alam perawan dengan air terjun, gua kelelawar, dan kemah mewah eksklusif.",
      cn: "原始的自然保护区岛屿，拥有瀑布、蝙蝠洞和豪华露营。",
    },
    {
      en: "Moyo Island is a nature reserve off Sumbawa's north coast, famous for its pristine coral reefs, dramatic waterfalls, and bat-filled caves. The island gained international fame as a luxury eco-retreat destination.",
      id: "Pulau Moyo adalah cagar alam di lepas pantai utara Sumbawa, terkenal dengan terumbu karang bersih dan air terjun dramatis.",
      cn: "莫约岛是松巴哇北海岸外的自然保护区，以原始珊瑚礁和瀑布闻名。",
    },
    "nature",
    "2 days",
  ),
  p(
    "maluk-beach",
    "maluk-beach",
    "region-sumbawa",
    {en: "Maluk Beach", id: "Pantai Maluk", cn: "马卢克海滩"},
    {
      en: "A beautiful crescent beach with consistent surf in southwest Sumbawa, popular with surfers.",
      id: "Pantai bulan sabit indah dengan ombak konsisten di Sumbawa barat daya, populer di kalangan peselancar.",
      cn: "松巴哇西南部美丽的月牙形海滩，浪花稳定，深受冲浪者欢迎。",
    },
    {
      en: "Maluk Beach is a stunning crescent bay in southwest Sumbawa offering consistent surf breaks and golden sand, surrounded by lush green hills.",
      id: "Pantai Maluk adalah teluk bulan sabit menakjubkan di barat daya Sumbawa dengan ombak konsisten dan pasir emas.",
      cn: "马卢克海滩是松巴哇西南部一个令人惊叹的月牙形海湾。",
    },
    "beach",
    "Half day",
  ),
  p(
    "saleh-bay",
    "saleh-bay",
    "region-sumbawa",
    {en: "Saleh Bay", id: "Teluk Saleh", cn: "萨莱湾"},
    {
      en: "A massive natural bay with volcanic islands, whale sightings, and some of Indonesia's best diving.",
      id: "Teluk alam besar dengan pulau vulkanik, penampakan paus, dan beberapa diving terbaik Indonesia.",
      cn: "巨大的天然海湾，有火山岛屿、观鲸和印尼顶级潜水点。",
    },
    {
      en: "Saleh Bay is one of the largest bays in Indonesia, dotted with volcanic islets and home to incredible marine biodiversity including whale sightings.",
      id: "Teluk Saleh adalah salah satu teluk terbesar di Indonesia, dihiasi pulau-pulau vulkanik kecil.",
      cn: "萨莱湾是印度尼西亚最大的海湾之一，点缀着火山小岛。",
    },
    "nature",
    "Full day",
  ),
  p(
    "kenawa-island",
    "kenawa-island",
    "region-sumbawa",
    {en: "Kenawa Island", id: "Pulau Kenawa", cn: "克纳瓦岛"},
    {
      en: "A tiny uninhabited island with a hilltop viewpoint and pristine surrounding coral reefs.",
      id: "Pulau kecil tak berpenghuni dengan viewpoint puncak bukit dan terumbu karang bersih di sekitarnya.",
      cn: "一座小型无人岛，拥有山顶观景点和周围原始的珊瑚礁。",
    },
    {
      en: "Kenawa Island is a small, uninhabited island near Sumbawa's west coast. A short hike up the hill reveals breathtaking 360-degree views, while the surrounding waters offer pristine snorkeling.",
      id: "Pulau Kenawa adalah pulau kecil tak berpenghuni dekat pantai barat Sumbawa.",
      cn: "克纳瓦岛是松巴哇西海岸附近的一个小型无人岛。",
    },
    "beach",
    "Half day",
  ),
  p(
    "lakey-peak",
    "lakey-peak",
    "region-sumbawa",
    {en: "Lakey Peak", id: "Lakey Peak", cn: "拉基峰"},
    {
      en: "One of the world's best surf breaks — a world-class left and right barrel reef break.",
      id: "Salah satu spot surfing terbaik dunia — reef break barrel kiri dan kanan kelas dunia.",
      cn: "世界上最好的冲浪点之一——世界级的左右管浪礁石浪。",
    },
    {
      en: "Lakey Peak is a legendary surf break on Sumbawa's south coast, offering both left and right reef breaks that produce perfect barrels — consistently ranked among the world's best waves.",
      id: "Lakey Peak adalah spot surfing legendaris di pantai selatan Sumbawa, menawarkan reef break kiri dan kanan.",
      cn: "拉基峰是松巴哇南海岸的传奇冲浪点，提供完美的管浪。",
    },
    "adventure",
    "Full day",
  ),
  p(
    "satonda-island",
    "satonda-island",
    "region-sumbawa",
    {en: "Satonda Island", id: "Pulau Satonda", cn: "萨通达岛"},
    {
      en: "A volcanic island with a unique saltwater crater lake surrounded by pristine coral reefs.",
      id: "Pulau vulkanik dengan danau kawah air asin unik dikelilingi terumbu karang bersih.",
      cn: "一座火山岛，拥有独特的咸水火山口湖，周围环绕着原始珊瑚礁。",
    },
    {
      en: "Satonda Island is a small volcanic island with a unique saltwater crater lake at its center, formed by the massive 1815 eruption of Mount Tambora. Surrounding coral reefs offer excellent snorkeling.",
      id: "Pulau Satonda adalah pulau vulkanik kecil dengan danau kawah air asin unik di tengahnya, terbentuk dari letusan Gunung Tambora 1815.",
      cn: "萨通达岛是一座小型火山岛，中心有独特的咸水火山口湖。",
    },
    "nature",
    "Full day",
  ),
  p(
    "mantar-hill",
    "mantar-hill",
    "region-sumbawa",
    {en: "Mantar Hill", id: "Bukit Mantar", cn: "曼塔尔山"},
    {
      en: "A scenic hilltop offering sunrise views over the sea of clouds and surrounding islands.",
      id: "Puncak bukit indah yang menawarkan pemandangan sunrise di atas lautan awan dan pulau-pulau sekitar.",
      cn: "风景优美的山顶，可欣赏云海和周围岛屿的日出美景。",
    },
    {
      en: "Mantar Hill is one of Sumbawa's most breathtaking viewpoints, offering spectacular sunrise views above a sea of clouds with panoramic vistas of surrounding islands.",
      id: "Bukit Mantar adalah salah satu viewpoint paling menakjubkan di Sumbawa, menawarkan pemandangan sunrise di atas lautan awan.",
      cn: "曼塔尔山是松巴哇最令人叹为观止的观景点之一，可以欣赏云海上的壮丽日出。",
    },
    "nature",
    "Half day",
  ),
  p(
    "sumbawa-besar",
    "sumbawa-besar",
    "region-sumbawa",
    {en: "Sumbawa Besar", id: "Sumbawa Besar", cn: "大松巴哇"},
    {
      en: "The island's main town with the historic Sultan's Palace and gateway to Sumbawa's natural attractions.",
      id: "Kota utama pulau dengan Istana Sultan bersejarah dan gerbang menuju atraksi alam Sumbawa.",
      cn: "岛上的主要城镇，拥有历史悠久的苏丹宫殿，是通往松巴哇自然景点的门户。",
    },
    {
      en: "Sumbawa Besar is the main town and cultural center of Sumbawa, home to the historic Dalam Loka Sultan's Palace — one of the largest wooden palaces in Indonesia.",
      id: "Sumbawa Besar adalah kota utama dan pusat budaya Sumbawa, rumah bagi Istana Dalam Loka Sultan yang bersejarah.",
      cn: "大松巴哇是松巴哇的主要城镇和文化中心，拥有历史悠久的苏丹宫殿。",
    },
    "culture",
    "Half day",
  ),
];

// ============================
// EAST JAVA PLACES
// ============================

const eastJavaPlaces: Place[] = [
  p(
    "mount-bromo",
    "mount-bromo",
    "region-east-java",
    {en: "Mount Bromo", id: "Gunung Bromo", cn: "布罗莫火山"},
    {
      en: "Indonesia's most iconic volcano — an active crater set within the vast Tengger caldera sea of sand.",
      id: "Gunung berapi paling ikonik Indonesia — kawah aktif di dalam kaldera Tengger yang luas.",
      cn: "印度尼西亚最标志性的火山——活火山口坐落在广阔的腾格尔破火山口沙海中。",
    },
    {
      en: "Mount Bromo is arguably Indonesia's most photographed landscape. The active volcano sits within the massive Tengger caldera, surrounded by a sea of volcanic sand. Sunrise from the viewpoint at Mount Penanjakan reveals one of the most otherworldly panoramas on Earth.",
      id: "Gunung Bromo bisa dibilang lanskap paling banyak difoto di Indonesia. Gunung berapi aktif ini berada di dalam kaldera Tengger yang masif.",
      cn: "布罗莫火山可以说是印度尼西亚最常被拍照的景观。",
    },
    "mountain",
    "Full day",
  ),
  p(
    "ijen-crater",
    "ijen-crater",
    "region-east-java",
    {en: "Ijen Crater", id: "Kawah Ijen", cn: "伊真火山口"},
    {
      en: "Famous for its mesmerizing blue flames and the world's largest acidic crater lake.",
      id: "Terkenal dengan api biru memesona dan danau kawah asam terbesar di dunia.",
      cn: "以其迷人的蓝色火焰和世界上最大的酸性火山口湖而闻名。",
    },
    {
      en: "Kawah Ijen is renowned for two natural phenomena: the ethereal blue flames visible in the pre-dawn darkness (caused by igniting sulfuric gases) and the world's largest acidic crater lake, a stunning turquoise-green expanse.",
      id: "Kawah Ijen terkenal dengan dua fenomena alam: api biru mistis yang terlihat dalam kegelapan sebelum fajar dan danau kawah asam terbesar di dunia.",
      cn: "伊真火山口以两种自然现象而闻名：黎明前黑暗中可见的蓝色火焰和世界上最大的酸性火山口湖。",
    },
    "mountain",
    "Full day",
  ),
  p(
    "tumpak-sewu",
    "tumpak-sewu-waterfall",
    "region-east-java",
    {
      en: "Tumpak Sewu Waterfall",
      id: "Air Terjun Tumpak Sewu",
      cn: "通帕瑟武瀑布",
    },
    {
      en: "A breathtaking 120-meter curtain-like waterfall often called the 'Niagara of Indonesia'.",
      id: "Air terjun tirai setinggi 120 meter yang menakjubkan, sering disebut 'Niagara Indonesia'.",
      cn: "令人叹为观止的120米帘状瀑布，常被称为'印度尼西亚的尼亚加拉'。",
    },
    {
      en: "Tumpak Sewu is a stunning 120-meter waterfall that fans out like a massive curtain across a wide cliff face. Often called the 'Niagara of Indonesia', it's considered one of the most beautiful waterfalls in Southeast Asia.",
      id: "Tumpak Sewu adalah air terjun menakjubkan setinggi 120 meter yang membentang seperti tirai raksasa. Sering disebut 'Niagara Indonesia'.",
      cn: "通帕瑟武瀑布是一座壮丽的120米瀑布，像巨大的帘幕般展开。",
    },
    "waterfall",
    "Full day",
  ),
  p(
    "madakaripura",
    "madakaripura-waterfall",
    "region-east-java",
    {
      en: "Madakaripura Waterfall",
      id: "Air Terjun Madakaripura",
      cn: "马达卡里普拉瀑布",
    },
    {
      en: "A mystical waterfall hidden inside a narrow lush canyon, associated with the legend of Gajah Mada.",
      id: "Air terjun mistis tersembunyi di ngarai sempit hijau, terkait dengan legenda Gajah Mada.",
      cn: "隐藏在狭窄峡谷中的神秘瀑布，与卢·格查·毛达传说有关。",
    },
    {
      en: "Madakaripura Waterfall is a mystical waterfall hidden within a narrow, moss-covered canyon. Water cascades from nearly 200 meters high, creating a magical amphitheater of water droplets. Legend connects it to the meditation site of Gajah Mada.",
      id: "Air Terjun Madakaripura adalah air terjun mistis tersembunyi dalam ngarai sempit berlumut. Air jatuh dari ketinggian hampir 200 meter.",
      cn: "马达卡里普拉瀑布是隐藏在狭窄苔藓覆盖峡谷中的神秘瀑布。",
    },
    "waterfall",
    "Half day",
  ),
  p(
    "malang",
    "malang",
    "region-east-java",
    {en: "Malang", id: "Malang", cn: "玛琅"},
    {
      en: "A charming highland city with Dutch colonial architecture, vibrant food scene, and gateway to East Java's nature.",
      id: "Kota dataran tinggi menawan dengan arsitektur kolonial Belanda, kuliner semarak, dan gerbang alam Jawa Timur.",
      cn: "迷人的高地城市，拥有荷兰殖民建筑、丰富的美食和通往东爪哇自然景观的门户。",
    },
    {
      en: "Malang is a charming highland city in East Java known for its cool climate, Dutch colonial heritage buildings, and vibrant food scene. It serves as an ideal base for exploring East Java's natural wonders.",
      id: "Malang adalah kota dataran tinggi menawan di Jawa Timur yang dikenal dengan iklim sejuknya, bangunan warisan kolonial Belanda, dan kuliner semarak.",
      cn: "玛琅是东爪哇一个迷人的高地城市，以其凉爽的气候和荷兰殖民遗产建筑闻名。",
    },
    "culture",
    "Full day",
  ),
];

// ============================
// WEST JAVA PLACES
// ============================

const westJavaPlaces: Place[] = [
  p(
    "bandung",
    "bandung",
    "region-west-java",
    {en: "Bandung", id: "Bandung", cn: "万隆"},
    {
      en: "Indonesia's creative capital — a highland city famous for tea plantations, fashion outlets, and vibrant café culture.",
      id: "Ibukota kreatif Indonesia — kota dataran tinggi terkenal dengan perkebunan teh, factory outlet, dan budaya kafe.",
      cn: "印度尼西亚的创意之都——以茶园、工厂直销店和充满活力的咖啡文化闻名的高地城市。",
    },
    {
      en: "Bandung is West Java's capital and Indonesia's third-largest city, set in a highland basin surrounded by volcanic peaks. Known as the 'Paris of Java', it's famous for Art Deco architecture, creative industries, and abundant factory outlets.",
      id: "Bandung adalah ibukota Jawa Barat dan kota terbesar ketiga Indonesia. Dijuluki 'Paris van Java', terkenal dengan arsitektur Art Deco.",
      cn: "万隆是西爪哇省会和印度尼西亚第三大城市，被称为'爪哇的巴黎'。",
    },
    "culture",
    "Full day",
  ),
  p(
    "kawah-putih",
    "kawah-putih",
    "region-west-java",
    {en: "Kawah Putih", id: "Kawah Putih", cn: "白火山口"},
    {
      en: "An ethereal volcanic crater lake with milky-white turquoise water surrounded by pale crater walls.",
      id: "Danau kawah vulkanik eteral dengan air biru kehijauan putih susu dikelilingi dinding kawah pucat.",
      cn: "飘渺的火山口湖，奶白色碧绿的湖水被苍白的火山口壁环绕。",
    },
    {
      en: "Kawah Putih is an otherworldly volcanic crater lake at 2,430 meters elevation south of Bandung. The lake's water changes color from milky white to turquoise green depending on the sulfur content and temperature.",
      id: "Kawah Putih adalah danau kawah vulkanik di ketinggian 2.430 meter di selatan Bandung. Warna air danau berubah dari putih susu ke hijau kehijauan.",
      cn: "白火山口是万隆南部海拔2430米的火山口湖，湖水颜色随硫磺含量而变化。",
    },
    "nature",
    "Half day",
  ),
  p(
    "tangkuban-perahu",
    "tangkuban-perahu",
    "region-west-java",
    {en: "Tangkuban Perahu", id: "Tangkuban Perahu", cn: "覆舟火山"},
    {
      en: "An active volcano with drive-up crater access, bubbling hot springs, and Sundanese legend.",
      id: "Gunung berapi aktif dengan akses kawah berkendara, sumber air panas, dan legenda Sunda.",
      cn: "一座活火山，可驾车直达火山口，有温泉和巽他传说。",
    },
    {
      en: "Tangkuban Perahu is one of the few volcanoes where visitors can drive right up to the crater rim. The crater emits sulfurous steam, and local legend says the mountain was formed by an upturned boat.",
      id: "Tangkuban Perahu adalah salah satu dari sedikit gunung berapi di mana pengunjung bisa berkendara langsung ke tepi kawah.",
      cn: "覆舟火山是为数不多的可以直接开车到火山口边缘的火山之一。",
    },
    "mountain",
    "Half day",
  ),
  p(
    "situ-patenggang",
    "situ-patenggang",
    "region-west-java",
    {en: "Situ Patenggang", id: "Situ Patenggang", cn: "帕腾甘湖"},
    {
      en: "A serene highland lake surrounded by tea plantations with a romantic island at its center.",
      id: "Danau dataran tinggi tenang dikelilingi perkebunan teh dengan pulau romantis di tengahnya.",
      cn: "宁静的高地湖泊，被茶园环绕，中心有一座浪漫的小岛。",
    },
    {
      en: "Situ Patenggang is a picturesque lake at 1,600 meters elevation near Bandung, surrounded by rolling tea plantations. A heart-shaped island in the lake is associated with a romantic Sundanese love legend.",
      id: "Situ Patenggang adalah danau indah di ketinggian 1.600 meter dekat Bandung, dikelilingi perkebunan teh.",
      cn: "帕腾甘湖是万隆附近海拔1600米的风景如画的湖泊，被起伏的茶园环绕。",
    },
    "nature",
    "Half day",
  ),
  p(
    "puncak",
    "puncak",
    "region-west-java",
    {en: "Puncak", id: "Puncak", cn: "本查克"},
    {
      en: "A popular highland retreat between Jakarta and Bandung with tea gardens, theme parks, and cool mountain air.",
      id: "Tempat peristirahatan dataran tinggi populer antara Jakarta dan Bandung dengan kebun teh dan udara sejuk.",
      cn: "雅加达和万隆之间受欢迎的高地度假地，拥有茶园和凉爽的山间空气。",
    },
    {
      en: "Puncak is a popular mountain resort area on the border of West Java's Bogor and Cianjur regencies. The cool highland climate, panoramic mountain views, and lush tea gardens make it a favorite weekend escape from Jakarta.",
      id: "Puncak adalah area resor pegunungan populer di perbatasan Kabupaten Bogor dan Cianjur.",
      cn: "本查克是西爪哇博戈尔和展玉县交界处的热门山地度假区。",
    },
    "nature",
    "Half day",
  ),
  p(
    "pangandaran",
    "pangandaran",
    "region-west-java",
    {en: "Pangandaran", id: "Pangandaran", cn: "庞岸达兰"},
    {
      en: "West Java's premier beach destination with a unique peninsula, nature reserve, and the stunning Green Canyon.",
      id: "Destinasi pantai utama Jawa Barat dengan semenanjung unik, cagar alam, dan Green Canyon yang menakjubkan.",
      cn: "西爪哇首屈一指的海滩目的地，拥有独特的半岛、自然保护区和壮丽的绿色峡谷。",
    },
    {
      en: "Pangandaran is West Java's most popular beach destination, featuring a unique peninsula with a nature reserve, beautiful beaches on both sides, and the spectacular Green Canyon (Cukang Taneuh) river gorge.",
      id: "Pangandaran adalah destinasi pantai paling populer di Jawa Barat, dengan semenanjung unik dan Green Canyon yang spektakuler.",
      cn: "庞岸达兰是西爪哇最受欢迎的海滩目的地，拥有独特的半岛和壮观的绿色峡谷。",
    },
    "beach",
    "Full day",
  ),
];

// ============================
// CENTRAL JAVA PLACES
// ============================

const centralJavaPlaces: Place[] = [
  p(
    "borobudur",
    "borobudur-temple",
    "region-central-java",
    {en: "Borobudur Temple", id: "Candi Borobudur", cn: "婆罗浮屠"},
    {
      en: "The world's largest Buddhist temple — a 9th-century UNESCO masterpiece with 2,672 relief panels and 504 Buddha statues.",
      id: "Candi Buddha terbesar di dunia — mahakarya UNESCO abad ke-9 dengan 2.672 panel relief dan 504 arca Buddha.",
      cn: "世界上最大的佛教寺庙——9世纪的联合国教科文组织杰作，有2672块浮雕和504尊佛像。",
    },
    {
      en: "Borobudur is the world's largest Buddhist temple and Indonesia's most visited tourist attraction. This 9th-century Mahayana Buddhist monument consists of nine stacked platforms, six square and three circular, topped by a central dome. It features 2,672 relief panels and 504 Buddha statues.",
      id: "Borobudur adalah candi Buddha terbesar di dunia dan atraksi wisata paling banyak dikunjungi di Indonesia.",
      cn: "婆罗浮屠是世界上最大的佛教寺庙，也是印度尼西亚最受欢迎的旅游景点。",
    },
    "temple",
    "Full day",
  ),
  p(
    "prambanan",
    "prambanan-temple",
    "region-central-java",
    {en: "Prambanan Temple", id: "Candi Prambanan", cn: "普兰巴南"},
    {
      en: "Indonesia's largest Hindu temple compound — a UNESCO World Heritage site with soaring stone spires.",
      id: "Kompleks candi Hindu terbesar Indonesia — Situs Warisan Dunia UNESCO dengan menara batu menjulang.",
      cn: "印度尼西亚最大的印度教寺庙群——联合国教科文组织世界遗产，拥有高耸的石塔。",
    },
    {
      en: "Prambanan is a 9th-century Hindu temple compound in Central Java dedicated to the Trimurti — Brahma, Vishnu, and Shiva. The tallest temple spire rises 47 meters, making it the largest Hindu temple in Indonesia.",
      id: "Prambanan adalah kompleks candi Hindu abad ke-9 di Jawa Tengah yang didedikasikan untuk Trimurti.",
      cn: "普兰巴南是9世纪的印度教寺庙群，供奉三大神——梵天、毗湿奴和湿婆。",
    },
    "temple",
    "Full day",
  ),
  p(
    "dieng-plateau",
    "dieng-plateau",
    "region-central-java",
    {en: "Dieng Plateau", id: "Dataran Tinggi Dieng", cn: "迪恩高原"},
    {
      en: "A misty volcanic plateau at 2,000m with ancient Hindu temples, colorful crater lakes, and sunrise views.",
      id: "Dataran tinggi vulkanik berkabut di 2.000m dengan candi Hindu kuno, danau kawah berwarna-warni, dan sunrise.",
      cn: "海拔2000米的多雾火山高原，拥有古老的印度教寺庙、多彩的火山口湖和日出景色。",
    },
    {
      en: "The Dieng Plateau is a remote volcanic highland at 2,000 meters in Central Java, often shrouded in mist. It's home to Indonesia's oldest Hindu temples (8th century), colorful volcanic crater lakes, and otherworldly landscapes.",
      id: "Dataran Tinggi Dieng adalah dataran tinggi vulkanik terpencil di 2.000 meter di Jawa Tengah, sering diselimuti kabut.",
      cn: "迪恩高原是中爪哇海拔2000米的偏远火山高地，经常被薄雾笼罩。",
    },
    "nature",
    "Full day",
  ),
  p(
    "karimunjawa",
    "karimunjawa-islands",
    "region-central-java",
    {
      en: "Karimunjawa Islands",
      id: "Kepulauan Karimunjawa",
      cn: "卡里穆爪哇群岛",
    },
    {
      en: "A tropical marine paradise of 27 islands with pristine coral reefs, mangroves, and white sand beaches.",
      id: "Surga bahari tropis 27 pulau dengan terumbu karang bersih, bakau, dan pantai pasir putih.",
      cn: "由27个岛屿组成的热带海洋天堂，拥有原始珊瑚礁、红树林和白色沙滩。",
    },
    {
      en: "Karimunjawa is an archipelago of 27 islands in the Java Sea, part of a national marine park. The islands offer pristine coral reefs for diving and snorkeling, mangrove forests, and beautiful white sand beaches largely untouched by mass tourism.",
      id: "Karimunjawa adalah kepulauan 27 pulau di Laut Jawa, bagian dari taman nasional laut.",
      cn: "卡里穆爪哇是爪哇海中由27个岛屿组成的群岛，是国家海洋公园的一部分。",
    },
    "beach",
    "3 days",
  ),
];

// ============================
// EXPORT ALL PLACES
// ============================

export const allPlaces: Place[] = [
  ...baliPlaces,
  ...lombokPlaces,
  ...komodoPlaces,
  ...sumbaPlaces,
  ...sumbawaPlaces,
  ...eastJavaPlaces,
  ...westJavaPlaces,
  ...centralJavaPlaces,
];
