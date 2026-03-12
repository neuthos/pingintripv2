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
  title: { en: string; id: string; cn: string };
  description: { en: string; id: string; cn: string };
  durationDays: number;
  physicalRating: number;
  difficulty: "easy" | "moderate" | "challenging";
  maxPax: number;
  price: MultiCurrencyPrice;
  regionId: string;
  startingPoint: string;
  route: { en: string; id: string; cn: string };
  highlights: string[];
  featured: boolean;
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
  { symbol: string; locale: string; decimals: number }
> = {
  USD: { symbol: "$", locale: "en-US", decimals: 2 },
  IDR: { symbol: "Rp", locale: "id-ID", decimals: 0 },
  CNY: { symbol: "¥", locale: "zh-CN", decimals: 0 },
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
      en: "Bali & Beyond: The Perfect Island Loop",
      id: "Bali & Sekitarnya: Lingkaran Pulau Sempurna",
      cn: "巴厘岛环岛之旅：完美岛屿环线",
    },
    description: {
      en: "A 16-day adventure through Bali and Lombok — surf Canggu, trek volcanoes, stay in traditional villages, snorkel the Gili Islands, and discover the soul of Indonesia.",
      id: "Petualangan 16 hari melalui Bali dan Lombok — berselancar di Canggu, mendaki gunung berapi, menginap di desa tradisional, snorkeling di Kepulauan Gili, dan temukan jiwa Indonesia.",
      cn: "16天巴厘岛和龙目岛冒险之旅——在仓古冲浪、徒步火山、住传统村庄、在吉利群岛浮潜，发现印度尼西亚的灵魂。",
    },
    durationDays: 16,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: { amount: 2499, discountedAmount: 1999 },
      IDR: { amount: 39400000, discountedAmount: 31500000 },
      CNY: { amount: 17999, discountedAmount: 14399 },
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Seminyak",
      id: "Canggu ke Seminyak",
      cn: "仓古至塞米亚克",
    },
    highlights: ["canggu-surfing", "bulian-village", "mount-batur-sunrise", "ubud-temples", "gili-trawangan", "senggigi"],
    featured: true,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Canggu",
      location: "Canggu",
      description: "Welcome to Bali-a literal island paradise! Known for incredible surf, wild nightlife, with somehow both a hectic yet relaxed hippie vibe! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu! Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Canggu",
      location: "Canggu",
      description: "You came to an island known around the world for having epic surf, so whether you shred or have never seen a board, today is for you! Join a surf lesson for all levels, getting your footing on land before hitting the water to practice with the instructors. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer at a cute warung, local Indonesian restaurant. Free TimeCanggu Enjoy the rest of the day in Canggu! Surf Lesson in CangguCanggu You came to the one of the world's surf capitals! Now it's time to try it out for yourself! Join a lesson on land to learn the basics and some safety tips. Then catch some waves and shred the gnar.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Canggu/Bulian",
      location: "Canggu/Bulian",
      description: "Take a break from Bali's wild side and head north to Bulian. Here we can connect will locals, slow down and enjoy Bali's famed rice terraces. On the way up, we'll stop at the breathtaking Ulundanu Temple, sitting on the edge of Lake Beratan. Continue to Bulian where we'll be welcomed with a drink and lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village to connect with the natural and cultural side of Bali. Learn to make Balinese offerings then head to the nearby temple and join a local priest for the ceremony. Private VehicleCanggu – Ulundanu2h55km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples. Private VehicleUlundanu – Bulian2h45km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bulian",
      location: "Bulian",
      description: "Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village to see a durian plantation, beautiful rice terraces, coffee fields and waterfalls! You'll even have the chance to slide down a natural waterslide! Or choose to head out on a bike tour through Bulian to get acquainted with Northern Bali. Free TimeBulianFull Day Take today to explore Bulian your way! Show",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Bulian/Kintamani",
      location: "Bulian/Kintamani",
      description: "A free morning gives you the chance to explore the rest of Bulian on your terms. Choose to just chill, or join a local cooking class or sunrise fishing trip. Then jump in the van and drive to Kintamani, the town nestled at the base of Mt Batur to arrive to our campsite for the night. Did we mention this campsite has a hot spring pool? Soak in the hot springs then join us 'round the campfire for a cozy night of camping! Free TimeBulianMorning Spend the morning free in Bulian. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Free TimeKintamani Enjoy the afternoon free to explore Toya Bungkah in Kintamani. Show",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Kintamani/Ubud",
      location: "Kintamani/Ubud",
      description: "Rise and shine as we are getting after it today! Waking well before the sun, we'll start our 2 hour trek to reach the Mt Batur summit in time to enjoy an absolutely stunning sunrise. And what's a picturesque sunrise without a lil picnic breakfast, amirite? With the sun finally up, we'll hike back down for a proper breakfast and a well-deserved hot spring soak. Then it's goodbye Kintamani and hello Ubud! On the way, we'll stop at G Adventures-supported PKP Community to meet with the women leaders, visit the garden and enjoy a local lunch. Then, the rest of the afternoon is yours to explore Ubud. But in the evening, put your party hat on because we're going out! Join your group and CEO for your Big Night Out in Ubud. Mount Batur Sunrise TrekKintamani5h7km Climb to the summit of Mt Batur (1700m), for an amazing sunrise and scenic views. The climb is an experience that will afford anyone who does it a sense of accomplishment and appreciation for the natural beauty this island has. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Pusat Kegiatan Perempuan (PKP) Community Visit Visit the PKP Community, a G-Adventures supported project, for a delicious local lunch made by the women of this enterprise. This centre works to support gender equality and help empower local women through job skill training. PKP is a safe space for women in the community who have experienced discrimination from divorce. We'll meet them over a cup of their specially made tea, tour the garden and learn about the amazing work this organization is doing over lunch. Free TimeUbud Spend the rest of the day free to explore Ubud. Your Big Night Out Moment: in Ubud We're going out! Get yourself a beer, or maybe some cacao and be ready for a fun night out with your crew in Ubud!",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Ubud",
      location: "Ubud",
      description: "There is always something to discover in the great town of Ubud. Today is yours to explore however you’d like. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Ubud",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Ubud/Tempasan",
      location: "Ubud/Tempasan",
      description: "Drive to the harbour and take a speed boat to the island of Lombok. Drive to Tempasan village and meet the villagers for a group dinner. Private VehicleUbud – Padangbai1h30m36km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPadangbai – Bangsal1h30m Climb aboard and get your float on. Private VehicleBangsal – Tempasan2h30m72km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Day 10: Tempasan",
      location: "Tempasan",
      description: "Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers to learn about village life firsthand, wander through the instagramable rice terraces and maybe sample some local fruit on the various plantations. Then join the local women to learn about their gorgeous traditional weaving styles and a yummy lunch. The rest of the day is yours to explore Lombok how you'd like. Opt to join a local cooking class, take a bike tour or join a yoga class. Then join the group for an after-dinner campfire. If you choose to join the optional 2-day 1-night Rinjani summit trek, will have the chance to join the Rice Terrace Village Walk and Weaving Demonstration after your return on day 3. Your Local Living Moment: Rice Terrace Village Walk and Weaving Demonstration Explore the beautiful Tempasan Village with your CEO. Walk along the path through the rice field like the local people do. During the walk we will meet the farmer for their daily activities. Wander through pineapple, cassava and coffee plantations, the chicken and cow farm and take a short stop at the top of the hill for the amazing panoramic view of rice fields and Rinjani Mountain. Then hop in some local transport and drive to Pringgasela Village where you will learn about this unique and sole weaving village in east Lombok. Learn about their local textile, traditional looms and natural dyes. Free TimeTempasan The afternoon if yours to explore Lombok! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 11,
      title: "Day 11: Tempasan",
      location: "Tempasan",
      description: "From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls? A cooking class? Options on options! So get out there how you want! Free TimeTempasanFull Day A free day in Tempasan means you get to explore how you want! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 12,
      title: "Day 12: Tempasan/Senggigi",
      location: "Tempasan/Senggigi",
      description: "Drive to Bonjeruk Village this morning for an opportunity to connect with the local villagers. Here we will work up our appetite for a yummy Lombok lunch from a cycle tour around the village. Afterwards, continue on to Senggigi for a free afternoon at the beach. Private VehicleTempasan – Bonjeruk1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Bonjeruk Village ExperienceSenggigi Receive a warm welcome by the the villagers of Bonjeruk Village and learn about the youth development organization they support. Your guide, a student from the English learning program, will lead you on a short cycling around the village (approx 45 mins - 1 hr). You will have lunch at a lovely spot in the village and enjoy a home-cooked meal giving you a taste of Lombok traditional food. After lunch, join some of the women of the village to try the local cakes and snacks made from flour sourced from locally grown potatoes or sticky rice. Private VehicleBonjeruk – Senggigi1h37km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSenggigi Spend the rest of the day free in Senggigi, on the coast in Lombok.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 13,
      title: "Day 13: Senggigi/Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "Get ready for the ultimate island paradise as we travel to Gili Trawangan, an island with no motorized vehicles and the freshest air! After dropping our things off at the hotel, we head back out to sea for a snorkel trip. On board the boat, we’ll jet around to various islands and picturesque snorkel spots in search of sea turtles, rays and if we’re lucky, a cute lil reef shark. Grab your sunscreen and a snorkel and get ready for an epic day. Tonight, as if today could get any better, we head out on our big night out! Want a drank? Wanna dance? Well let’s do it! As there are no motorized vehicles on Gili Trawangan, you will need to carry your luggage from the speed boat to the hotel, approximately 300m. Private VehicleSenggigi – Bangsal30m-45m22km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatSenggigi – Gili Trawangan30m Climb aboard and get your float on. The Gili Islands Snorkel TripGili Trawangan Visit all 3 islands that make up the famous Gili Islands. Starting from Gili Trawangan, snorkel around the best spots like Turtle Point. Then head to Gili Meno by boat to snorkel through the perfect water on the most tranquil of the 3 islands. Next is Gili Air, with our final chance to swim through the vibrant coral reefs before returning to Gili T. Your Big Night Out Moment: in Gili Trawangan The Gili Islands are known for having the best parties in the world! Tonight, let's see what its all about together on our Big Night Out! Grab yourself your drink of choice and let's kick it!",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 14,
      title: "Day 14: Gili Trawangan",
      location: "Gili Trawangan",
      description: "There are 2 types of beach people. The rotters-who want to lay in the sun all day, and the adventurers! Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill, get your tan on and take a dip in the perfect blue water. Looking for something more to do? How does stand up paddle board yoga sound? Maybe a leisurely bike ride around the island? However you choose to spend it, Gili T is yours to see. Free TimeGili TrawanganFull Day Enjoy a free day to explore Gili Trawangan on your terms! Show",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 15,
      title: "Day 15: Gili Trawangan/Seminyak",
      location: "Gili Trawangan/Seminyak",
      description: "Head back to Bali on a speed boat today for one final adventure in Indonesia. Arrive to the harbour and drive to Seminyak, known for its super fun nightlife, amazing shopping, beautiful beaches and incredible restaurants! The rest of the day is yours to enjoy this awesome town! SpeedboatGili Trawangan – Padangbai2h Climb aboard and get your float on. Private VehiclePadangbai – Seminyak1h52km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSeminyak Spend the evening free in Seminyak!",
      accommodation: "The Rivavi Legian (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 16,
      title: "Day 16: Seminyak",
      location: "Seminyak",
      description: "Depart at any time.\"",
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
      en: "Ubud to Flores: Dragons, Beaches & Tribal Treks",
      id: "Ubud ke Flores: Komodo, Pantai & Trekking Suku",
      cn: "乌布到弗洛雷斯：巨蜥、海滩与部落徒步",
    },
    description: {
      en: "From Bali's spiritual heart to Flores' wild frontier — discover ancient villages, hike to Waerebo, sail with Komodo dragons, and dive into pristine coral reefs.",
      id: "Dari jantung spiritual Bali ke perbatasan liar Flores — temukan desa kuno, mendaki ke Waerebo, berlayar bersama komodo, dan menyelam di terumbu karang.",
      cn: "从巴厘岛的精神中心到弗洛雷斯的荒野前沿——探索古老村庄、徒步到瓦埃勒博、与科莫多巨蜥同行、潜入原始珊瑚礁。",
    },
    durationDays: 10,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: { amount: 1899, discountedAmount: 1519 },
      IDR: { amount: 29900000, discountedAmount: 23920000 },
      CNY: { amount: 13699, discountedAmount: 10959 },
    },
    regionId: "region-bali",
    startingPoint: "Ubud",
    route: {
      en: "Ubud to Labuan Bajo",
      id: "Ubud ke Labuan Bajo",
      cn: "乌布至拉布汉巴焦",
    },
    highlights: ["ubud", "labuan-bajo", "waerebo-village", "komodo", "snorkeling"],
    featured: true,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Ubud",
      location: "Ubud",
      description: "Welcome to Ubud, arguably the most famous city in Bali! Settle in and explore this funky town then meet your group for a welcome meeting this evening. But stick around because we’re heading out on our First Night Out! Get to know each other and Ubud a bit better. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Ubud",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Ubud/Labuan Bajo",
      location: "Ubud/Labuan Bajo",
      description: "We're off the gateway of Komodo National Park! Welcome to Labuan Bajo on the island of Flores. Arrive in the afternoon and enjoy the rest of the day to explore, chill on the beach and get ready for an epic adventure through the Komodo islands. Private VehicleUbud – Denpasar Settle in and scan the scenery from the convenience of a private vehicle. PlaneDenpasar – Labuan Bajo1h15m Look! Up in the sky! It's a bird! It's a plane! It's... yup, it is a plane, actually.",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Labuan Bajo/Dintor",
      location: "Labuan Bajo/Dintor",
      description: "Venture inland this morning to Tado Village, full of beautiful rice terraces, and 15th generation descendants of immigrant Sulawesi ancestry who fled Islamic persecution in the 16th & 17th century. Join our local guide to hike up the mountain, about 1.5 km uphill then back. The views are well worth the effort so don’t forget your camera. Hike down, enjoy some lunch then continue on to Dintor Village for the night. We'll prep for our overnight trek to Waerebo Village that starts tomorrow morning. Private VehicleLabuan Bajo – Tado2h65km Settle in and scan the scenery from the convenience of a private vehicle. Private VehicleTado – Dintor2h55km Settle in and scan the scenery from the convenience of a private vehicle. Tado Village HikeTado2h Hike to the top of Tado Village, a community of Sulawesi descendants. Meet with a local guide and together hike to the top of the mountain — approximately a 2-hour journey — and enjoy a stunning bird’s-eye view of the iconic spiderweb rice fields. The trail is rocky and unpaved, with about 70% uphill and 20% relatively flat sections. The same path is used for both going and returning. The total trekking distance is 1.5 km.",
      accommodation: "Wae Rebo Lodge (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Dintor/Waerebo",
      location: "Dintor/Waerebo",
      description: "Today we trek into the jungle! A drive and a motorbike ride brings us to the starting point of the hike. We’re headed to the remote Waerebo Village, famous for its traditional circular and cone-shaped houses called Mbaru Niang. Trek through the tropical jungle and up hill for about 2-3 hours, with plenty of stops to rest. We’ll be greeted with a welcome ceremony by the local villagers, followed by lunch. In the afternoon, we’ll enjoy a little pick me up where we’ll learn to harvest coffee beans and prep them for our own drinking. Tonight we will sleep in a Mbaru Niang together. These accommodations are basic but offer an extremely unique opportunity to experience this beautiful and cozy village. No need to bring yours entire suitcase with you into the jungle overnight. Make sure to pack a small overnight bag with the few items you need tonight and tomorrow. You’ll be reunited with your main bags again tomorrow evening. Private VehicleDintor – Denge Drive to Denge Village from Dintor. Hop on the back of a motorbike to the start of the trek. Trek to Waerebo VillageDenge – Waerebo2h-3h5km Today we trek to the legendary UNESCO World Heritage village, Waerebo, known as Mbaru Niang in Manggarai culture. This community, known for its cone-shaped houses is nestled deep in the Todo forest. We'll meet our guide and hike for 2-3 hours through the jungle with our small overnight bag. We'll be greeted by the villagers in a welcome ceremony, followed by a local lunch. Waerebo Coffee ExperienceWaerebo Join a local from Waerebo village for a tour of the coffee garden. Go through the steps of coffee cultivation-from harvesting the fruit, using traditional tools to separate the bean from the skin and prepping it before we sample some ourselves!",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Waerebo/Labuan Bajo",
      location: "Waerebo/Labuan Bajo",
      description: "Say goodbye to our friends in Waerebo Village and trek back to the place we started yesterday. Take a motorbike to meet our transport and luggage. Then drive back to Labuan Bajo for a much deserved rest. This evening, repack your smaller bag for the 3-day, 2-night Komodo National Park boat excursion. Your main luggage will be stored safely at the hotel in the Labuan Bajo. Private VehicleDenge – Labuan Bajo3h-4h105km Settle in and scan the scenery from the convenience of a private vehicle. Waerebo Trek Day 2Waerebo – Denge1h30m-2h30m5km Enjoy the morning to explore Waerebo before hiking back to the starting point. Because we are going down hill, the hike will be about 30 minutes faster.",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Labuan Bajo/Komodo National Park",
      location: "Labuan Bajo/Komodo National Park",
      description: "And today we’re off to the famous Komodo National Park! Walk to the harbour then board the boat. And yes! We are exploring Komodo by boat! The First stop-Kelor Island. We’ll take a short hike to an incredible view and then jump into kayaks to Strawberry Rock. Admire the incredible, picturesque, crystal-clear water then jump in to snorkel and watch the fish swim through the coral. After lunch back onboard, it’s off to our next island-Rinca Island. The trek on this island has one point… to spot the worlds largest lizard, the Komodo Dragon! Afterwards, enjoy relaxing on the boat for the rest of evening. Make sure not to miss the stellar sunset onboard as you watch thousands of flying foxes take flight in the colorful sky anchored at our third island, Padar. The boat itinerary may shift depending on the season and weather. Komodo Island Day 1Labuan Bajo – Pulau Padar Besar Explore the amazing islands of Komodo National Park on board a Phinisii boat. Trek through Kelor Island, snorkel Strawberry rock, hike Rinca Island in search of Komodo Dragons, watch the bats fly over Kalong Island and anchor at Padar Island.",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Komodo National Park",
      location: "Komodo National Park",
      description: "No better way to start a day at sea than a beautiful sunrise. Trek up Padar Island and reach the top just in time for the colorful view. Back on the boat, we head to Long Beach for some chillin’, swimmin’ and kayakin’. Next stop-Manta Point. And yes.. those mantas! Jump in the water with a snorkel in hopes to see this magnificent (and giant) sea creature. Then to the last stop of the day, Sebayur Island. Here we’ll catch the sunset on a kayak. Then head to the beach for a bonfire and star gazing. Doesn’t get much better than this, huh? Komodo Island Day 2Pulau Padar Besar – Pulau Sebayur Besar Another day on the sea-it's about to be another epic day! Catch the sunrise over Padar Island, kayak around Long Beach, snorkel at Manta Point and enjoy a nighttime bonfire on Sebayur Island. Para... para.... paradise!",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Komodo National Park/Labuan Bajo",
      location: "Komodo National Park/Labuan Bajo",
      description: "Last day on the boat so let’s make it count (don’t worry-we’ve got you covered!) Today will be epic- think snorkeling through the reefs, kayaking to the picture perfect Kanawa Island, and some final time to soak up life on the phinisi boat. This afternoon, we’ll dock back in Labuan Bajo, say goodbye to our boat crew and reunite with our suitcases. Take some time to relax in the hotel but not for long. Tonight, and our last night may I remind you, is our Big Night Out! One more time, we’ll hit the town together for a last hoorah! Join us at a beach bar, grab your drink of choice and celebrate together! Komodo Island Day 3Pulau Sebayur Besar – Labuan Bajo Enjoy the last day on the Phinisi boat! Snorkel around Sebayur Island, kayak around Kanawa Island, and cruise through the incredible natural beauty until you reach the harbor in Labuan Bajo! Your Big Night Out Moment: in Labuan Bajo Hit up a beach bar with the crew and and enjoy a night out on the town!",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Day 10: Labuan Bajo",
      location: "Labuan Bajo",
      description: "Say goodbye to the many islands of Indonesia and depart at any time.",
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
      en: "Indonesia: Hammocks & Hikes — Java to Bali",
      id: "Indonesia: Hammock & Hiking — Jawa ke Bali",
      cn: "印度尼西亚：吊床与徒步——爪哇到巴厘岛",
    },
    description: {
      en: "Cross Java's volcanic heartland to Bali's beaches over 14 epic days. Visit Bandung, explore Yogyakarta's temples, witness Mt Bromo at sunrise, and end with Bali surf vibes.",
      id: "14 hari melintasi jantung vulkanik Jawa ke pantai Bali. Kunjungi Bandung, jelajahi candi Yogyakarta, saksikan Gunung Bromo saat matahari terbit, dan akhiri dengan vibes selancar Bali.",
      cn: "14天从爪哇火山中心区穿越到巴厘岛海滩。访问万隆、探索日惹寺庙、日出时分观赏布罗莫火山，以巴厘岛冲浪氛围结束。",
    },
    durationDays: 14,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: { amount: 2299, discountedAmount: 1839 },
      IDR: { amount: 36200000, discountedAmount: 28960000 },
      CNY: { amount: 16599, discountedAmount: 13279 },
    },
    regionId: "region-bali",
    startingPoint: "Kuta",
    route: {
      en: "Jakarta to Kuta",
      id: "Jakarta ke Kuta",
      cn: "雅加达至库塔",
    },
    highlights: ["jakarta", "bandung", "yogyakarta", "mount-bromo", "pemuteran", "kuta"],
    featured: false,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Jakarta",
      location: "Jakarta",
      description: "Arrive at any time. For your first night out with the group and CEO, visit a local favourite Jakarta restaurant. Get to know your fellow travellers over drinks and local delicacies as you take in the bustling capital. Have a toast to new adventures and friends! Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Jakarta/Bandung",
      location: "Jakarta/Bandung",
      description: "Ride to Bandung and let the scenery guide you to some serenity. Tea plantations, waterfalls, and hot springs —this side of paradise is looking mighty fine. Private VehicleJakarta – Bandung Settle in and scan the scenery from the convenience of a private vehicle. Bandung Orientation WalkBandung Take an orientation walk led by your CEO to get your bearings of Bandung.",
      accommodation: "Mutiara Hotel Bandung (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Bandung",
      location: "Bandung",
      description: "Spend the day with your group Ciater Tea Plantation to learn how tea is made, then walk to a waterfall nearby and relax in the hot springs. Ciater Tea Plantation, Hot Spring and WaterfallBandung Located on the hills of Mount Tangkuban Perahu is the scenic Ciater Tea Plantation. Spend the day here touring the tea plantation, hiking to a waterfall and relaxing in hot springs.",
      accommodation: "Mutiara Hotel Bandung (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bandung/Yogyakarta",
      location: "Bandung/Yogyakarta",
      description: "Watch the world go by on a scenic train ride to Yogyakarta. Once you arrive, and if you're not feeling too beat, check out Sosrowijayan and Prawirotaman Streets for unwinding with drinks and local eats. TrainBandung – Yogyakarta7h402km Climb aboard, take a seat, and enjoy the ride.",
      accommodation: "Hotel Indah Palace Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Yogyakarta/Ngadas",
      location: "Yogyakarta/Ngadas",
      description: "Take the scenic route to Ngadas via private vehicle. Here, you'll spend the evening at a local G Adventures-supported community homestay. Get a taste of local culture with a home-cooked dinner and time with a community leader to learn about the region's unique customs and history. Your G for Good Moment: Ngadas Homestay Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Overnight with a local family participating in the community's homestay program, a G Adventures-supported initiative. Learn about the local culture, customs, and traditions from your hosts. Private VehicleYogyakarta – Malang8h400km Settle in and scan the scenery from the convenience of a private vehicle. Private VehicleMalang – Desa Ngadas1h Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Ngadas Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Desa Ngadas/Bromo",
      location: "Desa Ngadas/Bromo",
      description: "Today's for reaching new heights. Start the day with a trek along the Ancestor Trail to Mt Bromo, led by a local guide trained through the G Adventures-supported capacity building program. Then get a chance to hike to the volcano's crater (and take some pictures!) before going on to the hotel. Mount Bromo Crater WalkGunung Bromo2km Walk to the famed crater of Mount Bromo, part of the Tengger Calder, the largest volcanic range in the area. A distinct site, the volcano blew its top off completely and is constantly smouldering with white smoke. Your G for Good Moment: Village Walk Learn more about daily life in Ngadas with a village walk. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Your G for Good Moment: Ancestor Trail Trek10km Follow the historic route the villagers of Ngadas once used to make pilgrimage to Mt Bromo and pay their respects to the gods. Trek about 10km through farmland, forest, and grasslands to reach the volcano, stopping for lunch near a cave en route.",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Bromo/Red Island",
      location: "Bromo/Red Island",
      description: "Skip sleeping in today for a pre-dawn hike across the Sea of Sand to Mt Bromo, where you can catch a final glimpse of the moon before the sunrise. Stop to breathe it all in before you head to a beachside surf camp. On your way to Mt Bromo, catch a breath and see the local Buddhist Tenggerese giving offerings to the Supreme God Hyang Widi Wasa. Private VehicleBromo – Red Island8h Settle in and scan the scenery from the convenience of a private vehicle. Sunrise Walk to Mount Bromo ViewpointGunung Bromo30m Head out before dawn to visit the viewpoint for magnificent Mt Bromo (2,392m), one of the most spectacular sights in Indonesia. Walk along the \"sea of sand\" and enjoy stunning views as the sun rises over the edge of the crater and be amazed by the volcano’s strange beauty, seemingly from another world.",
      accommodation: "Red Island Villa (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Day 10: Red Island",
      location: "Red Island",
      description: "Wake up and catch a wave on a morning surf lesson, then take the rest of the day to explore the nearby fishing village, surf some more, or rest easy in a beachside hammock. Your Hands-On Moment: Surfing Lesson Grab your swimsuit and get ready to hang ten! Learn how to find and ride the waves with surfing lessons from local experts. Enjoy the fresh sea air, and try to spot local marine life while enjoying the waters. Free TimeRed IslandHalf Day Spend more time on the beach or explore the local village—the choice is yours.",
      accommodation: "Red Island Villa (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 11,
      title: "Day 11: Red Island/Pemuteran",
      location: "Red Island/Pemuteran",
      description: "Head back to Bali for a chill day of relaxing on the beach. Sit back, grab a drink, and soak up some sunshine. This is the place for it. Private VehicleRed Island – Ketapang1h30m-2h Settle in and scan the scenery from the convenience of a private vehicle. FerryKetapang – Gilimanuk1h30m Get to the next spot on your route aboard a convenient and efficient ferry boat. Private VehicleGilimanuk – Pemuteran45m Settle in and scan the scenery from the convenience of a private vehicle. Free TimePemuteranAfternoon Get out and explore the beautiful beaches of Bali. Hide SnorkellingPemuteran Grab a snorkel and dive into the water. The waters are calm, visibility is clear, and the sea life and coral are colourful and aplenty.",
      accommodation: "Rich Farmer House (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 12,
      title: "Day 12: Pemuteran",
      location: "Pemuteran",
      description: "No need to say goodbye to the beach just yet — it's another day of chilling out in Bali. If you'd like, break up the beachside naps with a snorkelling trip. Free TimePemuteran Get out and explore coastal Bali, or enjoy a day lounging at the beach. The choice is yours! Hide SnorkellingPemuteran Grab a snorkel and dive into the water. The waters are calm, visibility is clear, and the sea life and coral are colourful and aplenty.",
      accommodation: "Rich Farmer House (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 13,
      title: "Day 13: Pemuteran/Kuta",
      location: "Pemuteran/Kuta",
      description: "Take it easy this morning before we cross rich tropical jungle and idyllic rice fields on the ride to Kuta. Catch up on sleep on the drive over — you're going to need it for your big night out tonight. Spend the evening getting to know Legian Street, the legendary party street, then dance the night away! Private VehiclePemuteran – Kuta5h-5h30m Settle in and scan the scenery from the convenience of a private vehicle. Free TimeKutaEvening Enjoy some free time to explore Kuta. Your Big Night Out Moment: Kuta Dance Party Kuta is the perfect place to celebrate all the new exciting and humbling adventures you've just experienced with newfound friends. Cheers to keeping life interesting and dance the night away!",
      accommodation: "The Rivavi Legian (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 14,
      title: "Day 14: Kuta",
      location: "Kuta",
      description: "Today, it’s time to say goodbye to your group of newfound friends as this tour comes to an end. Be sure to sneak in some last-minute photos and exchange social medias before you head on your way. Departure Day Not ready to leave? Your CEO can help with travel arrangements to extend your adventure.",
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
      en: "Bali to Gili: The Ultimate Island Adventure",
      id: "Bali ke Gili: Petualangan Pulau Terbaik",
      cn: "巴厘岛到吉利：终极海岛冒险",
    },
    description: {
      en: "15 days of pure island magic — surf in Canggu, stay in Bulian village, summit Mount Batur, explore Ubud, trek Lombok's wilderness, and chill on Gili Trawangan's pristine beaches.",
      id: "15 hari keajaiban pulau — berselancar di Canggu, menginap di desa Bulian, mendaki puncak Gunung Batur, jelajahi Ubud, trekking di alam liar Lombok, dan bersantai di pantai Gili Trawangan.",
      cn: "15天纯粹的海岛魔力——在仓古冲浪、住在布利安村、登顶巴图尔火山、探索乌布、徒步龙目岛荒野、在吉利特拉旺安的原始海滩放松。",
    },
    durationDays: 15,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: { amount: 2399, discountedAmount: 1919 },
      IDR: { amount: 37800000, discountedAmount: 30240000 },
      CNY: { amount: 17299, discountedAmount: 13839 },
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Gili Trawangan",
      id: "Canggu ke Gili Trawangan",
      cn: "仓古至吉利特拉旺安",
    },
    highlights: ["canggu", "bulian-village", "mount-batur", "ubud", "senggigi", "gili-trawangan"],
    featured: true,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Canggu",
      location: "Canggu",
      description: "Welcome to Bali-a literal island paradise! Known for incredible surf, wild nightlife, with somehow both a hectic yet relaxed hippie vibe! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu! Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Canggu",
      location: "Canggu",
      description: "You came to an island known around the world for having epic surf, so whether you shred or have never seen a board, today is for you! Join a surf lesson for all levels, getting your footing on land before hitting the water to practice with the instructors. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer at a cute warung, local Indonesian restaurant. Free TimeCanggu Enjoy the rest of the day in Canggu! Surf Lesson in CangguCanggu You came to the one of the world's surf capitals! Now it's time to try it out for yourself! Join a lesson on land to learn the basics and some safety tips. Then catch some waves and shred the gnar.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Canggu/Bulian",
      location: "Canggu/Bulian",
      description: "Take a break from Bali's wild side and head north to Bulian. Here we can connect will locals, slow down and enjoy Bali's famed rice terraces. On the way up, we'll stop at the breathtaking Ulundanu Temple, sitting on the edge of Lake Beratan. Continue to Bulian where we'll be welcomed with a drink and lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village to connect with the natural and cultural side of Bali. Learn to make Balinese offerings then head to the nearby temple and join a local priest for the ceremony. Private VehicleCanggu – Ulundanu2h55km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples. Private VehicleUlundanu – Bulian2h45km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bulian",
      location: "Bulian",
      description: "Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village to see a durian plantation, beautiful rice terraces, coffee fields and waterfalls! You'll even have the chance to slide down a natural waterslide! Or choose to head out on a bike tour through Bulian to get acquainted with Northern Bali. Free TimeBulianFull Day Take today to explore Bulian your way! Show",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Bulian/Kintamani",
      location: "Bulian/Kintamani",
      description: "A free morning gives you the chance to explore the rest of Bulian on your terms. Choose to just chill, or join a local cooking class or sunrise fishing trip. Then jump in the van and drive to Kintamani, the town nestled at the base of Mt Batur to arrive to our campsite for the night. Did we mention this campsite has a hot spring pool? Soak in the hot springs then join us 'round the campfire for a cozy night of camping! Free TimeBulianMorning Spend the morning free in Bulian. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Free TimeKintamani Enjoy the afternoon free to explore Toya Bungkah in Kintamani. Show",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Kintamani/Ubud",
      location: "Kintamani/Ubud",
      description: "Rise and shine as we are getting after it today! Waking well before the sun, we'll start our 2 hour trek to reach the Mt Batur summit in time to enjoy an absolutely stunning sunrise. And what's a picturesque sunrise without a lil picnic breakfast, amirite? With the sun finally up, we'll hike back down for a proper breakfast and a well-deserved hot spring soak. Then it's goodbye Kintamani and hello Ubud! On the way, we'll stop at G Adventures-supported PKP Community to meet with the women leaders, visit the garden and enjoy a local lunch. Then, the rest of the afternoon is yours to explore Ubud. But in the evening, put your party hat on because we're going out! Join your group and CEO for your Big Night Out in Ubud. Mount Batur Sunrise TrekKintamani5h7km Climb to the summit of Mt Batur (1700m), for an amazing sunrise and scenic views. The climb is an experience that will afford anyone who does it a sense of accomplishment and appreciation for the natural beauty this island has. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Pusat Kegiatan Perempuan (PKP) Community Visit Visit the PKP Community, a G-Adventures supported project, for a delicious local lunch made by the women of this enterprise. This centre works to support gender equality and help empower local women through job skill training. PKP is a safe space for women in the community who have experienced discrimination from divorce. We'll meet them over a cup of their specially made tea, tour the garden and learn about the amazing work this organization is doing over lunch. Free TimeUbud Spend the rest of the day free to explore Ubud. Your Big Night Out Moment: in Ubud We're going out! Get yourself a beer, or maybe some cacao and be ready for a fun night out with your crew in Ubud!",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Ubud",
      location: "Ubud",
      description: "There is always something to discover in the great town of Ubud. Today is yours to explore however you’d like. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Ubud",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Ubud/Tempasan",
      location: "Ubud/Tempasan",
      description: "Drive to the harbour and take a speed boat to the island of Lombok. Drive to Tempasan village and meet the villagers for a group dinner. Private VehicleUbud – Padangbai1h30m36km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPadangbai – Bangsal1h30m Climb aboard and get your float on. Private VehicleBangsal – Tempasan2h30m72km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Day 10: Tempasan",
      location: "Tempasan",
      description: "Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers to learn about village life firsthand, wander through the instagramable rice terraces and maybe sample some local fruit on the various plantations. Then join the local women to learn about their gorgeous traditional weaving styles and a yummy lunch. The rest of the day is yours to explore Lombok how you'd like. Opt to join a local cooking class, take a bike tour or join a yoga class. Then join the group for an after-dinner campfire. If you choose to join the optional 2-day 1-night Rinjani summit trek, will have the chance to join the Rice Terrace Village Walk and Weaving Demonstration after your return on day 3. Your Local Living Moment: Rice Terrace Village Walk and Weaving Demonstration Explore the beautiful Tempasan Village with your CEO. Walk along the path through the rice field like the local people do. During the walk we will meet the farmer for their daily activities. Wander through pineapple, cassava and coffee plantations, the chicken and cow farm and take a short stop at the top of the hill for the amazing panoramic view of rice fields and Rinjani Mountain. Then hop in some local transport and drive to Pringgasela Village where you will learn about this unique and sole weaving village in east Lombok. Learn about their local textile, traditional looms and natural dyes. Free TimeTempasan The afternoon if yours to explore Lombok! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 11,
      title: "Day 11: Tempasan",
      location: "Tempasan",
      description: "From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls? A cooking class? Options on options! So get out there how you want! Free TimeTempasanFull Day A free day in Tempasan means you get to explore how you want! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 12,
      title: "Day 12: Tempasan/Senggigi",
      location: "Tempasan/Senggigi",
      description: "Drive to Bonjeruk Village this morning for an opportunity to connect with the local villagers. Here we will work up our appetite for a yummy Lombok lunch from a cycle tour around the village. Afterwards, continue on to Senggigi for a free afternoon at the beach. Private VehicleTempasan – Bonjeruk1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Bonjeruk Village ExperienceSenggigi Receive a warm welcome by the the villagers of Bonjeruk Village and learn about the youth development organization they support. Your guide, a student from the English learning program, will lead you on a short cycling around the village (approx 45 mins - 1 hr). You will have lunch at a lovely spot in the village and enjoy a home-cooked meal giving you a taste of Lombok traditional food. After lunch, join some of the women of the village to try the local cakes and snacks made from flour sourced from locally grown potatoes or sticky rice. Private VehicleBonjeruk – Senggigi1h37km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSenggigi Spend the rest of the day free in Senggigi, on the coast in Lombok.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 13,
      title: "Day 13: Senggigi/Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "Get ready for the ultimate island paradise as we travel to Gili Trawangan, an island with no motorized vehicles and the freshest air! After dropping our things off at the hotel, we head back out to sea for a snorkel trip. On board the boat, we’ll jet around to various islands and picturesque snorkel spots in search of sea turtles, rays and if we’re lucky, a cute lil reef shark. Grab your sunscreen and a snorkel and get ready for an epic day. Tonight, as if today could get any better, we head out on our big night out! Want a drank? Wanna dance? Well let’s do it! As there are no motorized vehicles on Gili Trawangan, you will need to carry your luggage from the speed boat to the hotel, approximately 300m. Private VehicleSenggigi – Bangsal30m-45m22km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatSenggigi – Gili Trawangan30m Climb aboard and get your float on. The Gili Islands Snorkel TripGili Trawangan Visit all 3 islands that make up the famous Gili Islands. Starting from Gili Trawangan, snorkel around the best spots like Turtle Point. Then head to Gili Meno by boat to snorkel through the perfect water on the most tranquil of the 3 islands. Next is Gili Air, with our final chance to swim through the vibrant coral reefs before returning to Gili T. Your Big Night Out Moment: in Gili Trawangan The Gili Islands are known for having the best parties in the world! Tonight, let's see what its all about together on our Big Night Out! Grab yourself your drink of choice and let's kick it!",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 14,
      title: "Day 14: Gili Trawangan",
      location: "Gili Trawangan",
      description: "There are 2 types of beach people. The rotters-who want to lay in the sun all day, and the adventurers! Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill, get your tan on and take a dip in the perfect blue water. Looking for something more to do? How does stand up paddle board yoga sound? Maybe a leisurely bike ride around the island? However you choose to spend it, Gili T is yours to see. Free TimeGili TrawanganFull Day Enjoy a free day to explore Gili Trawangan on your terms! Show",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 15,
      title: "Day 15: Gili Trawangan",
      location: "Gili Trawangan",
      description: "Depart at any time. Hide Bali Express: Gili Trawangan to KutaGili Trawangan – Kuta Want to take the hassle out of getting back to Bali? Book the “Bali Express: Gili Trawangan to Kuta” post-tour Extra and make your way back to Kuta with the guidance of a CEO. On the final day of the tour, board a fast boat back to Bali and transfer to Kuta.",
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
      USD: { amount: 1699, discountedAmount: 1359 },
      IDR: { amount: 26800000, discountedAmount: 21440000 },
      CNY: { amount: 12299, discountedAmount: 9839 },
    },
    regionId: "region-komodo",
    startingPoint: "Labuan Bajo",
    route: {
      en: "Labuan Bajo roundtrip",
      id: "Labuan Bajo PP",
      cn: "拉布汉巴焦往返",
    },
    highlights: ["labuan-bajo", "waerebo", "komodo-np", "snorkeling", "manta-rays"],
    featured: true,
    image: "/assets/komodo",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Labuan Bajo",
      location: "Labuan Bajo",
      description: "Welcome to the island of Flores, the gateway to Komodo National Park! Arrive at any time today. Then meet your CEO and group at a welcome meeting this evening. Get ready for an epic adventure! Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Labuan Bajo/Dintor",
      location: "Labuan Bajo/Dintor",
      description: "Venture inland this morning to Tado Village, full of beautiful rice terraces, and 15th generation descendants of immigrant Sulawesi ancestry who fled Islamic persecution in the 16th & 17th century. Join our local guide to hike up the mountain, about 1.5 km uphill then back. The views are well worth the effort so don’t forget your camera. Hike down, enjoy some lunch then continue on to Dintor Village for the night. We'll prep for our overnight trek to Waerebo Village that starts tomorrow morning. Private VehicleLabuan Bajo – Tado2h65km Settle in and scan the scenery from the convenience of a private vehicle. Private VehicleTado – Dintor2h55km Settle in and scan the scenery from the convenience of a private vehicle. Tado Village HikeTado2h Hike to the top of Tado Village, a community of Sulawesi descendants. Meet with a local guide and together hike to the top of the mountain — approximately a 2-hour journey — and enjoy a stunning bird’s-eye view of the iconic spiderweb rice fields. The trail is rocky and unpaved, with about 70% uphill and 20% relatively flat sections. The same path is used for both going and returning. The total trekking distance is 1.5 km.",
      accommodation: "Wae Rebo Lodge (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Dintor/Waerebo",
      location: "Dintor/Waerebo",
      description: "Today we trek into the jungle! A drive and a motorbike ride brings us to the starting point of the hike. We’re headed to the remote Waerebo Village, famous for its traditional circular and cone-shaped houses called Mbaru Niang. Trek through the tropical jungle and up hill for about 2-3 hours, with plenty of stops to rest. We’ll be greeted with a welcome ceremony by the local villagers, followed by lunch. In the afternoon, we’ll enjoy a little pick me up where we’ll learn to harvest coffee beans and prep them for our own drinking. Tonight we will sleep in a Mbaru Niang together. These accommodations are basic but offer an extremely unique opportunity to experience this beautiful and cozy village. No need to bring yours entire suitcase with you into the jungle overnight. Make sure to pack a small overnight bag with the few items you need tonight and tomorrow. You’ll be reunited with your main bags again tomorrow evening. Private VehicleDintor – Denge Drive to Denge Village from Dintor. Hop on the back of a motorbike to the start of the trek. Trek to Waerebo VillageDenge – Waerebo2h-3h5km Today we trek to the legendary UNESCO World Heritage village, Waerebo, known as Mbaru Niang in Manggarai culture. This community, known for its cone-shaped houses is nestled deep in the Todo forest. We'll meet our guide and hike for 2-3 hours through the jungle with our small overnight bag. We'll be greeted by the villagers in a welcome ceremony, followed by a local lunch. Waerebo Coffee ExperienceWaerebo Join a local from Waerebo village for a tour of the coffee garden. Go through the steps of coffee cultivation-from harvesting the fruit, using traditional tools to separate the bean from the skin and prepping it before we sample some ourselves!",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Waerebo/Labuan Bajo",
      location: "Waerebo/Labuan Bajo",
      description: "Say goodbye to our friends in Waerebo Village and trek back to the place we started yesterday. Take a motorbike to meet our transport and luggage. Then drive back to Labuan Bajo for a much deserved rest. This evening, repack your smaller bag for the 3-day, 2-night Komodo National Park boat excursion. Your main luggage will be stored safely at the hotel in the Labuan Bajo. Private VehicleDenge – Labuan Bajo3h-4h105km Settle in and scan the scenery from the convenience of a private vehicle. Waerebo Trek Day 2Waerebo – Denge1h30m-2h30m5km Enjoy the morning to explore Waerebo before hiking back to the starting point. Because we are going down hill, the hike will be about 30 minutes faster.",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Labuan Bajo/Komodo National Park",
      location: "Labuan Bajo/Komodo National Park",
      description: "And today we’re off to the famous Komodo National Park! Walk to the harbour then board the boat. And yes! We are exploring Komodo by boat! The First stop-Kelor Island. We’ll take a short hike to an incredible view and then jump into kayaks to Strawberry Rock. Admire the incredible, picturesque, crystal-clear water then jump in to snorkel and watch the fish swim through the coral. After lunch back onboard, it’s off to our next island-Rinca Island. The trek on this island has one point… to spot the worlds largest lizard, the Komodo Dragon! Afterwards, enjoy relaxing on the boat for the rest of evening. Make sure not to miss the stellar sunset onboard as you watch thousands of flying foxes take flight in the colorful sky anchored at our third island, Padar. The boat itinerary may shift depending on the season and weather. Komodo Island Day 1Labuan Bajo – Pulau Padar Besar Explore the amazing islands of Komodo National Park on board a Phinisii boat. Trek through Kelor Island, snorkel Strawberry rock, hike Rinca Island in search of Komodo Dragons, watch the bats fly over Kalong Island and anchor at Padar Island.",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Komodo National Park",
      location: "Komodo National Park",
      description: "No better way to start a day at sea than a beautiful sunrise. Trek up Padar Island and reach the top just in time for the colorful view. Back on the boat, we head to Long Beach for some chillin’, swimmin’ and kayakin’. Next stop-Manta Point. And yes.. those mantas! Jump in the water with a snorkel in hopes to see this magnificent (and giant) sea creature. Then to the last stop of the day, Sebayur Island. Here we’ll catch the sunset on a kayak. Then head to the beach for a bonfire and star gazing. Doesn’t get much better than this, huh? Komodo Island Day 2Pulau Padar Besar – Pulau Sebayur Besar Another day on the sea-it's about to be another epic day! Catch the sunrise over Padar Island, kayak around Long Beach, snorkel at Manta Point and enjoy a nighttime bonfire on Sebayur Island. Para... para.... paradise!",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Komodo National Park/Labuan Bajo",
      location: "Komodo National Park/Labuan Bajo",
      description: "Last day on the boat so let’s make it count (don’t worry-we’ve got you covered!) Today will be epic- think snorkeling through the reefs, kayaking to the picture perfect Kanawa Island, and some final time to soak up life on the phinisi boat. This afternoon, we’ll dock back in Labuan Bajo, say goodbye to our boat crew and reunite with our suitcases. Take some time to relax in the hotel but not for long. Tonight, and our last night may I remind you, is our Big Night Out! One more time, we’ll hit the town together for a last hoorah! Join us at a beach bar, grab your drink of choice and celebrate together! Komodo Island Day 3Pulau Sebayur Besar – Labuan Bajo Enjoy the last day on the Phinisi boat! Snorkel around Sebayur Island, kayak around Kanawa Island, and cruise through the incredible natural beauty until you reach the harbor in Labuan Bajo! Your Big Night Out Moment: in Labuan Bajo Hit up a beach bar with the crew and and enjoy a night out on the town!",
      accommodation: "Flamingo Ceria Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Labuan Bajo",
      location: "Labuan Bajo",
      description: "Say goodbye to the many islands of Indonesia and depart at any time.",
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
      USD: { amount: 1399, discountedAmount: 1119 },
      IDR: { amount: 22000000, discountedAmount: 17600000 },
      CNY: { amount: 10099, discountedAmount: 8079 },
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
    image: "/assets/east-java",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Jakarta",
      location: "Jakarta",
      description: "Arrive at any time. Welcome to Indonesia's modern metropolis, and capital city, on the coast of Java. There are no planned activities until the evening welcome meeting, so get out there and explore. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Jakarta/Bandung",
      location: "Jakarta/Bandung",
      description: "Enjoy a guided city tour of Jakarta visiting the former Batavia area, remnants of the colonial past, and stroll through the Sunda Kelapa Harbour. In the afternoon, depart for Bandung surrounded by volcanic peaks and tea plantations. Opt to see the Angklung Orchestra, where you'll hear resonating traditional melodies created by shaking bamboo instruments. Jakarta City TourJakarta Tour Bandung and see the former Batavia area, where Jakarta began before it grew to its current size. Visit the Sunda Kelapa Harbour — once the main port of the Sunda Kingdom, it’s now a bustling port full of Makassar schooners. Private VehicleJakarta – Bandung3h150km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeBandung Use some free time to make the most of Bandung. Hide Angklung Orchestra PerformanceBandung Opt to go to the Angklung Orchestra — a unique musical treat. Be moved by beautiful melodies at this traditional bamboo instrument concert performed by students.",
      accommodation: "Arion Suite Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Bandung/Yogyakarta",
      location: "Bandung/Yogyakarta",
      description: "Board a morning train and take in the beautiful scenery on the ride to Yogyakarta, steeped in ancient ruins and culture. On arrival, opt to go on a cycling tour or take in a Ramayana dance performance. TrainBandung – Yogyakarta7h402km Climb aboard, take a seat, and enjoy the ride. Free TimeYogyakartaAfternoon Get out and discover more of Java's cultural heart. Hide Ramayana Dance PerformanceYogyakarta Opt to see a Ramayana Dance performance, an Indonesian ballet that is a beautiful form of kinetic storytelling that incorporates acrobatics.",
      accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Yogyakarta",
      location: "Yogyakarta",
      description: "Venture to the Prambanan Hindu temple complex, a UNESCO World Heritage Site, and wander through the remains of some 244 temples, with some towering out of the rubble. Spend the afternoon at leisure. Prambanan Hindu Temple Complex ExcursionYogyakarta Tour Prambanan, the largest Hindu temple complex in Java, and learn about the history of the temples. Built between the eighth and tenth centuries, these temples now stand as one of the most outstanding works of Hindu art. View their intricate design, particularly on the Shiva temple.",
      accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Yogyakarta",
      location: "Yogyakarta",
      description: "Visit Borobudur, the largest Buddhist sanctuary in the world and another UNESCO World Heritage Site. Spend time exploring the pyramid-like complex, admiring the intricate carvings, and come away with a deeper understanding of Buddhist culture here. Later, enjoy free time to continue exploring Yogyakarta. Private VehicleYogyakarta – Borobudur1h30m Settle in and scan the scenery from the convenience of a private vehicle. Borobudur Temple Complex ExcursionBorobudur Take in the stunning artistic and architectural marvel that is the Buddhist Temple complex of Borobudur, a not-to-be-missed World Heritage Site. Learn about its interesting history and restoration; the site lay undiscovered under layers of volcanic ash until 1815, when Sir Stamford Raffles, then Governor of Java, ordered the area to be cleared. Free TimeYogyakartaAfternoon Get out and discover more of Java's cultural heart.",
      accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Yogyakarta/Ngadas",
      location: "Yogyakarta/Ngadas",
      description: "Continue the journey across the agricultural heartland of Java to Ngadas, a village in the scenic Mt Bromo region. Experience the local culture with a G Adventures-supported community homestay. Private VehicleYogyakarta – Desa Ngadas8h400km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Ngadas Homestay Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Overnight with a local family participating in the community's homestay program, a G Adventures-supported initiative. Learn about the local culture, customs, and traditions from your hosts.",
      accommodation: "Ngadas Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Ngadas/Malang",
      location: "Ngadas/Malang",
      description: "Start early today (approximately 2:30am) for a pre-dawn trek across the “sea of sand” to Mt Bromo. Watch the sunrise over the crater’s rim, popular with both tourists and the local Buddhist Tenggerese, who can be seen giving offerings to receive blessings from the Supreme God Hyang Widi Wasa. Head back to Ngadas for lunch before exploring more of the village on an included walk. Later, travel to Malang for the night. Sunrise Walk to Mount Bromo ViewpointGunung Bromo30m Head out before dawn to visit the viewpoint for magnificent Mt Bromo (2,392m), one of the most spectacular sights in Indonesia. Walk along the \"sea of sand\" and enjoy stunning views as the sun rises over the edge of the crater and be amazed by the volcano’s strange beauty, seemingly from another world. Your G for Good Moment: Village Walk Learn more about daily life in Ngadas with a village walk. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Private VehicleDesa Ngadas – Malang1h30m-2h Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Whiz Prime Malang (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Malang/Sanur",
      location: "Malang/Sanur",
      description: "Drive from Malang to Surabaya airport for a short flight to Sanur, a serene seaside town on the island of Bali. Spend the afternoon on the beach, and cheers to a beautiful sunset. Private VehicleMalang – Juanda International Airport2h95km Settle in and scan the scenery from the convenience of a private vehicle. PlaneJuanda International Airport – Denpasar1h Look! Up in the sky! It's a bird! It's a plane! It's... yup, it is a plane, actually. Private VehicleDenpasar – Sanur30m16km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSanurAfternoon Enjoy some free time back in Sanur.",
      accommodation: "Swastika Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Sanur",
      location: "Sanur",
      description: "Depart at any time. Departure Day Not ready to leave? Your CEO can help with travel arrangements to extend your adventure.",
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
      en: "Bali, Mt Rinjani & the Gili Islands",
      id: "Bali, Gunung Rinjani & Kepulauan Gili",
      cn: "巴厘岛、林贾尼火山与吉利群岛",
    },
    description: {
      en: "9 days of culture, trekking and island bliss — explore Candidasa, trek Mt Rinjani's foothills with local female guides, learn Sasak cooking, and snorkel Gili Trawangan.",
      id: "9 hari budaya, trekking dan kebahagiaan pulau — jelajahi Candidasa, mendaki kaki bukit Gunung Rinjani dengan pemandu wanita lokal, belajar masak Sasak, dan snorkeling di Gili Trawangan.",
      cn: "9天文化、徒步与海岛之旅——探索坎迪达萨、与当地女导游徒步林贾尼火山山麓、学习萨萨克烹饪、在吉利特拉旺安浮潜。",
    },
    durationDays: 9,
    physicalRating: 3,
    difficulty: "moderate",
    maxPax: 15,
    price: {
      USD: { amount: 1599, discountedAmount: 1279 },
      IDR: { amount: 25200000, discountedAmount: 20160000 },
      CNY: { amount: 11499, discountedAmount: 9199 },
    },
    regionId: "region-bali",
    startingPoint: "Ubud",
    route: {
      en: "Candi Dasa to Gili Trawangan",
      id: "Candi Dasa ke Gili Trawangan",
      cn: "坎迪达萨至吉利特拉旺安",
    },
    highlights: ["candidasa", "mount-rinjani", "sasak-cooking", "gili-trawangan"],
    featured: false,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Candi Dasa",
      location: "Candi Dasa",
      description: "Welcome to Bali! Arrive at any time. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Candi Dasa",
      location: "Candi Dasa",
      description: "Enjoy the amazing chance to explore Candidasa however you'd like! Opt to join a local Balinese cooking class and learn to make local favorites like Chicken Tum and Gado-Gado. Or take a snorkeling trip to the beautiful Blue Lagoon! The choice is yours. Free TimeCandi DasaFull Day Spend today exactly how you'd like in Candi Dasa! Show",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Candi Dasa/Sembalun",
      location: "Candi Dasa/Sembalun",
      description: "Our Lombok adventure begins today as we take a ferry leaving Bali and arriving to Lombok in the late morning. Make your way north of Mt Rinjani and stop in Senaru where we'll be accompanied by a local tour guide who is part of the Rinjani Women Guide association. Head out on an easy trek passing small hamlets where age-old traditions still are in practice, gaining insight into the colourful village life of the Sasak. There is always something interesting happening here as you meet local people and admire traditional houses along the way. You may even see a few cheeky long-tailed monkeys and, with a bit of luck, spot the rare ebony leaf monkey. Women led Senaru Village TourSenaru Led by local female guides, explore the foothills of spectacular Rinjani volcano in Lombok's northern district of Bayan. Starting near the border of Gunung Rinjani National Park, your route follows old pathways amongst shady bamboo groves and village gardens. Following a winding irrigation channel, you reach the lush rainforest of the famous Sindang Gile and Tiu Kelep Waterfall in Senaru Reserve. The local people believe that a refreshing bath behind these thundering falls can cure any disease. Along the way, discover tropical plants as your guide explains how the local people make practical use of them.",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Sembalun/Pringgasela",
      location: "Sembalun/Pringgasela",
      description: "In the morning enjoy a leisurely half-day trek that takes you through the foothills of the majestic Rinjani volcano. This easy walk offers breathtaking views of lush landscapes, traditional villages, and expansive rice fields, all set against the backdrop of towering peaks. While trekking, visit a local community weaving using traditional techniques. Later head to central Lombok, south of Mt Rinjani and join a local cooking class learning to make local specialties with banana root and bamboo shoots. Sembalun Village TrekSembalun Enjoy an easy half-day walk exploring the foothills of the spectacular Rinjani volcano. Visit a traditional heritage house, meander through bamboo groves and visit a local community of traditional weavers. Private VehicleSembalun – Pringgasela2h15m80km Settle in and scan the scenery from the convenience of a private vehicle. Lombok Cooking ClassAranka Tempasan Enjoy a cooking class alongside your local hosts. Dig into local favorites like semur ayam, a braised chicken dish that uses many ingredients you may know, and some that will be completely new to you!",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Pringgasela/Kuta",
      location: "Pringgasela/Kuta",
      description: "This morning, choose to join your CEO and local guides on a light trek through the lush pineapple and cassava plantations. Trek by a local river where you can take some time to refresh before ascending a hilltop for breathtaking panoramic views of emerald rice fields and the majestic Rinjani Mountain – a perfect photo opportunity! Or choose to take a morning to relax and enjoy the incredible scenery and peace at your local lodge. In the afternoon, make your way to Kuta, with a stop at a traditional Sasak village to witness a traditional performance. Traditional Sasak VillageEnde1h-1h15mAfternoon Join your CEO to visit a traditional Sasak village that offers a glimpse into the authentic culture and way of life of the Sasak people of Lombok. Wander through the village and observe the traditional houses made of bamboo, wood, and clay with distinctive thatched roofs. Interact with the local villagers, learn about their customs, traditions, and daily routines. Experience the vibrant and energetic traditional drum performance known as 'Gendang Beleq'. This is a dynamic musical performance featuring large drums and traditional instruments, showcasing Lombok's cultural heritage. Private VehiclePringgasela – Kuta2h-2h30mAfternoon Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Kuta",
      location: "Kuta",
      description: "After a few days of incredible exploration of northern Lombok, enjoy a day at leisure to take life at your own pace. Enjoy Kuta's tropical beaches on foot or choose to take a surf lesson at a local surf school. Free TimeKutaFull Day Spend a free day in Kuta exploring at leisure.",
      accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Kuta/Gili Trawangan",
      location: "Kuta/Gili Trawangan",
      description: "Bid farewell to Kuta's beautiful beaches, heading north to the Gili Islands. Make a stop en route in Bonjeruk Village. The village has implemented an English Camp for older high school students to learn to improve their English skills on weekends by leading various activities in their communities. Join a community member for a short cycle through town and stop to enjoy a home-cooked lunch that will give you a taste of the specialities of traditional Lombok food. After filling up, continue on to grab the ferry to the Gili Islands. Bonjeruk Village Cycle and LunchBonjerukMorning Join a community member for a short cycle through town and stop to enjoy home-cooked meals that will give you a taste of the specialities of Lombok traditional food. After a savory lunch, don't miss dessert as you join some local women of the village that will introduce you to their creations of local cakes and snacks made of flour from the locally grown potatoes or sticky rice. FerryBangsal – Gili Trawangan30m Get to the next spot on your route aboard a convenient and efficient ferry boat. Private VehicleKuta – Bonjeruk1h-1h15mMorning Settle in and scan the scenery from the convenience of a private vehicle. Private VehicleBonjeruk – Bangsal1h30m-2hAfternoon Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Hotel Vila Ombak (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Gili Trawangan",
      location: "Gili Trawangan",
      description: "Spend a free day in Gili Trawangan. Spend a half day underwater on an optional snorkeling trip or choose to rent a bike and cycle around the island at your own pace. Enjoy a final day in Lombok doing exactly as you please! Free TimeGili Trawangan Enjoy free time in beautiful Gili Trawangan. Hide YogaGili Trawangan What's better than a relaxing yoga class in paradise? Get your om on in the Gilis.",
      accommodation: "Hotel Vila Ombak (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Gili Trawangan",
      location: "Gili Trawangan",
      description: "Depart at any time.",
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
      USD: { amount: 1299, discountedAmount: 1039 },
      IDR: { amount: 20500000, discountedAmount: 16400000 },
      CNY: { amount: 9399, discountedAmount: 7519 },
    },
    regionId: "region-central-java",
    startingPoint: "Canggu",
    route: {
      en: "Jakarta to Yogyakarta",
      id: "Jakarta ke Yogyakarta",
      cn: "雅加达至日惹",
    },
    highlights: ["jakarta", "bandung", "dieng-plateau", "semarang", "yogyakarta"],
    featured: false,
    image: "/assets/central-java",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Jakarta",
      location: "Jakarta",
      description: "Welcome to Java! Arrive at any time. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Jakarta",
      location: "Jakarta",
      description: "Explore the capital city of Indonesia's 17,000+ islands. Today in this bustling metropolis, we'll visit Istiqlal Mosque, the largest mosque in all of Southeast Asia, the neo-Gothic Jakarta Cathedral, and the cobble stoned colonial Kota Tua Old Town. Explore Sunda Kelapa Harbor and the historic pinisi ships. After a full day of adventure, head out for dinner along Sabang street at a local warung (local Indonesian restaurant). Kota Tua Old Town Jakarta & Jamu DrinksJakarta Follow your CEO on a tour of Kota Tua, Jakarta's original downtown. Lined with Dutch Colonial buildings and cobblestone streets, this area was also known as Old Batavia during the 17th century. Visit a modern Javanese herbal cafe and try the historic Jamu drink. Indonesia's traditional herbal drink Jamu is losing popularity among young people, who find its bitter taste and old-fashioned image unappealing. With the rise of modern beverages and global drink trends, Jamu is often seen as a drink of the past. Cafes around Jakarta are working to change this narrative by reimagining Jamu for a new generation, using modern brewing methods, unique flavor combinations, and sleek presentation to make this traditional drink appealing and relevant once again. Sunda Kelapa HarborJakarta Visit Sunda Kelapa Harbor - a historic port that has been in operation for centuries. It’s the perfect spot to see traditional wooden schooners, or \"phinisi\" ships, still in use today. You’ll be able to take in the lively atmosphere of the harbor, as merchants and fishermen go about their work, offering a unique insight into the life of Jakarta’s maritime culture. Istiqlal Mosque VisitJakarta Visit the largest mosque in all of Southeast Asia, the Istiqlal Mosque. This national mosque of Indonesia was built to commemorate Indonesian independence and named \"Istiqlal\", an Arabic word for \"independence.\" Jakarta CathedralJakarta Admire the impressive stained-glass windows, intricate sculptures, and the grand altar as you learn about the country’s Christian history and the harmony between different faiths in Jakarta. Your Foodie Moment: Sabang Street Dinner Enjoy dinner like the locals on Sabang Street, Jakarta's culinary center. We'll find a fun warung, local Indonesian restaurant, and try traditional meals like Lontong Sayur (rice cake with veggies and coconut milk broth), Ketoprak (a veggie dish with a splash of peanut sauce), or Gado-gado (local salad with peanut sauce dressing).",
      accommodation: "1O1 URBAN Jakarta Thamrin Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Jakarta/Bandung",
      location: "Jakarta/Bandung",
      description: "Travel southeast towards Bandung, another major city in West Java. After arriving, sit down for a traditional Sundanese lunch, eaten family-style. Explore this historic city & Indonesia's natural heritage with time to visit the Geological Museum of Bandung. We'll drive to Gedung Sate for a photo stop on our way to visit Jalan Asia Afrika for some free time to explore. Private VehicleJakarta – Bandung4h150km Settle in and scan the scenery from the convenience of a private vehicle. Your Foodie Moment: Sundanese Lunch The Sundanese, one of Indonesia's largest ethnic groups, bring their rich cultural heritage to the table. Enjoy signature dishes, served family style, like nasi timbel (banana leaf-wrapped rice), karedok (raw vegetable salad with peanut sauce), and ikan bakar (grilled fish). Enjoy the freshness, light flavors and aromatic herbs celebrating the region's natural bounty. Badung Geological MuseumBandung Visit to the Geological Museum of Bandung. Exploring exhibits on fossils, minerals, and geological history, offering a fascinating insight into Indonesia's natural heritage. Gedung Sate Photo StopBadung Drive to visit the beautiful Dutch architecture of Gedung Sate. Jalan Asia AfrikaBandung Walk along Jalan Asia Afrika and do some shopping along the row of white columns. Admire the classic Dutch colonial architecture as it starts to turn pink and orange at sunset.",
      accommodation: "Arion Suite Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bandung",
      location: "Bandung",
      description: "Today is a free day to explore Bandung however you'd like. Choose to explore the vibrant city or stay active with a visit to Tangkuban Prahu volcano or Kawah Putih crater for some easy hiking. Combo that with a visit to a local tea plantation for lunch and a tea tasting. Free TimeBandungFull Day Enjoy a full day to explore the city of Bandung. Show",
      accommodation: "Arion Suite Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Bandung/Semarang",
      location: "Bandung/Semarang",
      description: "Depart Bandung this morning and drive to Semarang to arrive in the early afternoon. Explore the sights of the city like Greja Blenduk and Lawang Sewu for the charming Dutch architecture. Visit Sam Poo Kong Temple, a historic Chinese temple, and Kota Lama, the historic downtown of Semarang. Save room after lunch as you will try the local favorite, Lumpia, a delicious Javanese spring roll. Private VehicleBandung – Semarang5h360km Settle in and scan the scenery from the convenience of a private vehicle. Semarang Kota LamaSemarang Take a walking tour of the historic downtown of Semarang Kota Lama. This area is known for its charming colonial-era buildings and old streets. You can stop by some iconic spots such as the Semarang City Hall, Café Taman Sari and Greja Blenduk, one of the oldest churches in Semarang. Sam Poo Kong TempleSemarang Visit the oldest Chinese temple in Semarang, originally built in the early 1400's. This temple was established by Chinese Muslim explorer Cheng Ho. The original temple was a cave the explorer found on one of his expeditions, but after an avalanche in the 18th century, the current temple was reconstructed in a cave next door. Lawang SewuSemarang Explore this colonial-era building with its grand architecture and fascinating history. It was originally built by the Dutch East Indies Railway company, and nowadays is said to be haunted due to the tragic activities that took place here in the 20th century.",
      accommodation: "Santika Premiere Semarang (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Semarang/Dieng Plateau",
      location: "Semarang/Dieng Plateau",
      description: "Leave the city behind and head into the central Java mountains today. The first stop today will be to Gedong Songo Temple, on the slopes of Mount Ungaran. This beautiful Hindu temple is perched on the mountain in solitude surrounded by nothing but forests. After some time to explore and take photos, we'll visit the Ambarawa Train Museum, where 21 historic locomotives still reside in Java today. Make your way to Wonosobo in the Dieng Plateau region and enjoy a free evening. Private VehicleAmbarawa – Wonosobo3h80km Settle in and scan the scenery from the convenience of a private vehicle. Gedong Songo Temple VisitUngaran Visit the stunning Gedong Songo Temple, nestled on the slopes of Mount Ungaran. This beautiful site is so peaceful and the stone carvings are extremely impressive. It is an excellent opportunity to learn about Java's ancient history and take in the panoramic views of the surrounding mountains. Take a walk around the temple grounds and enjoy the incredible views of Sindoro and Sumbing mountains. Railway Museum AmbarawaAmbarawa Visit the Ambarawa Railway Museum which preserves 21 steam locomotives, with four still operational. Historic furniture, telephones, train signals and bells are also part of the collection that reveal exciting stories about old Java adventures. Private VehicleSemarang – Ungaran2h45km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "DAFAM Hotel Wonosobo (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Dieng Plateau",
      location: "Dieng Plateau",
      description: "Visit the breathtaking Dieng Plateau and enjoy the day to explore with your CEO as your guide! We'll see the sights like the colorful Telaga Warna Lake, misty Arjuna Temple and sulphurous Si Kidang Crater. After an adventurous day in nature, spend the evening in Wonosobo town square, where the locals gather to see what the evening food vendors are selling. Wonosobo Town SquareWonosobo Explore Wonosobo town square with your CEO. This is where locals gather and hang out after a long day. The northern part of this town square is famous for its snacks and food vendors (a must-try dish is called Serabi). Older ladies are always found there cooking their snacks using traditional cooking utensils called “anglo.” Serabi is a traditional Balinese–Javanese snack, similar to a pancake, made of a rice flour-based batter with coconut milk or coconut. Dieng Plateau AdventureDieng Plateau A visit to Dieng Plateau takes you to a high-altitude wonderland, known for its cool climate, volcanic craters, and ancient temples. Located in Central Java, the plateau features stunning natural landscapes, including colorful sulfur lakes and geothermal vents. Alongside your CEO, explore the historic temples, enjoy the breathtaking views, and experience the unique cultural and natural beauty of this serene, highland destination.",
      accommodation: "DAFAM Hotel Wonosobo (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Dieng Plateau/Yogyakarta",
      location: "Dieng Plateau/Yogyakarta",
      description: "On the way to Yogyakarta, stop at the spectacular Selogriyo Temple, a gorgeous Hindu temple dedicated to the Goddess of Fertility in central Java. Enjoy the uphill scenic walk through the complex. Continue on to Yogyakarta where your tour ends on arrival. Please do not book onward travel earlier than 7:00pm. Private VehicleWonosobo – Magelang2h60km Settle in and scan the scenery from the convenience of a private vehicle. Selogriyo TempleMagelang Visit the small, hidden Hindu temple complex dated from the 9th century, Selogriyo. Located in a small village in the city of Magelang, explore the village and lush rice paddies with your local guide. You're welcome to get a little muddy in the rice fields or stay clean on the small street. Private VehicleMagelang – Yogyakarta2h60km Settle in and scan the scenery from the convenience of a private vehicle.",
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
      USD: { amount: 1199, discountedAmount: 959 },
      IDR: { amount: 18900000, discountedAmount: 15120000 },
      CNY: { amount: 8699, discountedAmount: 6959 },
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
    image: "/assets/central-java",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Yogyakarta",
      location: "Yogyakarta",
      description: "Welcome to Java. Arrive at any time. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Yogyakarta",
      location: "Yogyakarta",
      description: "There's so much to discover in Yogyakarta today! Explore some Javanese temples, bike to rice paddies on the outskirts of the city, or go for a foodie tour and try street food like gudeg (curry made from unripe jackfruit). Free TimeYogyakartaFull Day Get out and explore Yogyakarta and its surrounding attractions. Show",
      accommodation: "KJ Hotel Yogyakarta (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Yogyakarta/Magelang",
      location: "Yogyakarta/Magelang",
      description: "Visit Candirejo Village on the way to Magelang today. Accompanied by a local guide, learn more about this village and why its known as a symbol of Javanese culture. Here you will gain more insight into daily activities, the multiple-crop farming system, and their traditions. After a delicious local lunch, drive to Magelang for the night. Private VehicleYogyakarta – Candirejo1h30m45km Settle in and scan the scenery from the convenience of a private vehicle. Candirejo Village VisitCandirejo Visit Candirejo, a captivating village sitting among vibrant green fields. Meet friendly residents, and learn all about ancient traditions and Javanese culture. This community directly supports women’s empowerment in the Candirejo Ecotourism Village Development. Women play a central role in the home industry sector, which we have a chance to see on this visit. Take home the perfect souvenir — homemade handicrafts and furniture can be found here, including wonderful pieces made of bamboo made by the local women's initiative.",
      accommodation: "Puri Asri Magelang Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Magelang/Solo",
      location: "Magelang/Solo",
      description: "We'll rise before the sun today in order to catch a beautiful sunrise atop Setumbu Hill. This easy hike will bring you above the early morning fog for a gorgeous view of the jungly temple topped mountains. After descending, return to the village for an easy biking tour to see its beautiful sites like Borobudur Temple and the traditional market. This evening, drive to Solo. Setumbu Hill Sunrise HikeMagelang This is a perfect place for a sunrise, with the temples and jungle encapsulated by fog with a mountain backdrop. The hike to Setumbu is doable for all fitness levels. It can be steep in parts, but it’s not too difficult. It takes about 30-45 mins. The trail is a dirt path with some steps. Wanurejo & Borobudur Village Biking TourMagelang Explore the local villages by bicycle to visit its local businesses, traditional markets and outside around Borobudur Temple. The cycling is on a flat paved village road and total cycling distance is under 7km. Private VehicleMagelang – Solo3h90km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "The Royal Surakarta Heritage (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Solo",
      location: "Solo",
      description: "Spend the day getting to know the history and traditions of Central Java in Solo, known as the center of Javanese culture. With visits to Mangkunegaran Palace, Triwindhu Market and Laweyan Village, you'll have the chance to see how traditional heritage is still alive today. Triwindhu MarketSolo Visit the Triwindhu Market. This is a great place to find traditional Javanese items, antiques, textiles, and local handicrafts. If you're interested in souvenirs, this is the place to be! Don’t hesitate to bargain a little with the vendors. Mangkunegaran Palace VisitSurakarta Take in the mix of Javanese and European architecture at this charming palace. Keep an eye out for royalty -- members of the aristocratic family still reside in the palace. Your Hands-On Moment: Traditional Batik Making Learn about the traditional process of Batik-making. Then, have the chance to create your own batik piece, guided by skilled artisans. It’s a fantastic hands-on experience and a great souvenir opportunity!",
      accommodation: "The Royal Surakarta Heritage (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Solo/Bromo",
      location: "Solo/Bromo",
      description: "After breakfast, continue east to Ngadas Village. On the way, make stops to explore Alun Alun Malang City Square and colorful Jodipan Village. Arrive to Ngadas in the late afternoon. This picturesque village in the foothills of Mt Bromo is known for its Javanese traditions and beautiful nature. Your G for Good Moment: Ngadas Homestay Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Overnight with a local family participating in the community's homestay program, a G Adventures-supported initiative. Learn about the local culture, customs, and traditions from your hosts. Jodipan Colorful Village VisitMalang Grab your camera for a visit to the picture perfect Jodipan Village. Known for its colorful rainbow homes, like the while town is a mural. Private VehicleSolo – Ngadas5h370km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Ngadas Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Bromo",
      location: "Bromo",
      description: "An early morning jeep ride is the best way to see the Bromo Crater this morning. Followed by a 45 minute hike to reach Penanjakan Hill view point just in time for sunrise! Admire the oranges and pinks before continuing the hike through the Sea of Sands to the top of Bromo Crater. Enjoy a picnic breakfast at Teletubbies Hill. Return to Ngadas Village for a walking tour (and maybe a coffee?) to see the temples, the tomb of mbah Sedek and the holy forest. Enjoy a local lunch and dinner at the homestay with free time to explore how you wish in between. Your G for Good Moment: Village Walk Learn more about daily life in Ngadas with a village walk. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Your G for Good Moment: Lunch at Ngadas Village Nestled amongst the green hills of the Mt Bromo region, the village of Ngadas is home to a Tengger farming community. Enjoy a village walk and local lunch at this G Adventures-supported initiative. Take in views of the scenic hills as you walk along, passing farming areas and stopping to visit the local temple, vihara, and mosque. Learn about the local culture, customs, and traditions from your hosts. Free TimeNgadas Enjoy a free afternoon in Ngadas Village. Mount Bromo Jeep ExcursionGunung Bromo4h Jump in a jeep and explore the winding landscape of Eastern Java, climbing upwards and outwards towards the grandeur of Mt Bromo to witness a stunning sunrise. Hike to the peak of Mt Bromo, part of the Tengger Calder, the largest volcanic range in the area. A distinct site, the volcano blew its top off completely and is constantly smouldering with white smoke.",
      accommodation: "Ngadas Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Bromo/Surabaya",
      location: "Bromo/Surabaya",
      description: "Fill up on breakfast, then load into the bus to drive to Surabaya. Your tours ends on arrival at the Surabaya Airport. Please book onward travel after 3pm. Private VehicleBromo – Surabaya4h130km Settle in and scan the scenery from the convenience of a private vehicle.",
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
      USD: { amount: 1399, discountedAmount: 1119 },
      IDR: { amount: 22000000, discountedAmount: 17600000 },
      CNY: { amount: 10099, discountedAmount: 8079 },
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
      description: "Arrive at any time. The welcome moment begins at 18:00. Please ensure you arrive at the joining hotel by then to ensure you do not miss the meeting. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Candi Dasa/Kuta",
      location: "Candi Dasa/Kuta",
      description: "Take a local ferry to Lombok and visit a Sasak traditional village en route to Kuta. Arrive at the shores of Lombok and head to a traditional Sasak village. Meet the locals and learn more about their unique culture and way of life. Continue on to Kuta for the night. FerryCandi Dasa – Lembar6h Get to the next spot on your route aboard a ferry boat. Private VehicleLembar – Kuta1h30m50km Stop to visit a Sasak village on the way. Sasak Village VisitLembar Visit this village of farmers and weavers and discover their way of life. Listen to the history of the community as you wander the paths between the traditional homes.",
      accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Kuta",
      location: "Kuta",
      description: "Enjoy a full day exploring the area around Kuta. Opt for a surf lesson or visit one of the beautiful beaches nearby. Hide Surf LessonKuta48USD per person Ready to ride the waves? Head to scenic Seger beach for a morning surf lesson.",
      accommodation: "Puri Rinjani Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Kuta/Senggigi",
      location: "Kuta/Senggigi",
      description: "Enjoy a spectacular drive through the middle of Lombok. Stop at the Tetebatu community to enjoy an easy trek led by a local guide. Explore the surrounding plantation to see rice cultivation and, weather permitting, views of Mt. Rinjani. Opt for a buffet lunch in the Tetebatu community before continuing on to visit the slopes of the Rinjani Volcano. Hike to a secluded waterfall and take a dip in the fresh water. Continue on to Senggigi for the night. Private VehicleKuta – Tetebatu2h60km Settle in and scan the scenery from the convenience of a private vehicle. Tetebatu Countryside TrekTetebatu2h Head out for a couple hours of easy trekking. Pass local homes and rice fields while learning more about the region. Private VehicleTetebatu – Batukliang1h20km Settle in and scan the scenery from the convenience of a private vehicle. Benang Kelambu Waterfall SwimBatukliang30m-1h Enjoy a walk through the tropical forest and be rewarded by the beauty of the Benang Kelambu Waterfall and swim in its deep pool. Private VehicleBatukliang – Senggigi2h-2h15m60km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Senggigi/Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "This morning we head to the stunning Gili Islands. Once at the islands enjoy a half-day snorkelling trip and check out what's living under the sea. Drive to the coast and hop on a speedboat to Gili and settle in for a few days on the islands. The Gilis are paradise incarnate with a tiny population, no cars, and gorgeous white-sand beaches. Please note there is limited fresh water available on the Gilis and electricity is supplied by generators. Showers often use desalinated salt water and rooms are typically fan-cooled (no air conditioning). Private VehicleSenggigi – Pemenang45m24km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPemenang – Gili Trawangan15m Cut swiftly through the water en route to the next stop (and hang on to your hat). Snorkelling ExcursionGili Trawangan3h-4h Grab a mask and swim amongst the tropical fish. If you're lucky spot a turtle.",
      accommodation: "Hotel Vila Ombak (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Gili Trawangan",
      location: "Gili Trawangan",
      description: "Today is free for exploring. Opt to rent a bike and cycle around the island, visit the shopping area, or try some yoga. Free TimeGili TrawanganHalf Day Get active or just chill out— the choice is yours. Hide YogaGili Trawangan What's better than a relaxing yoga class in paradise? Get your om on in the Gilis.",
      accommodation: "Hotel Vila Ombak (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Gili Trawangan/Sanur",
      location: "Gili Trawangan/Sanur",
      description: "Travel back to Bali by boat for a final dinner and farewells. Spend the final evening with an optional dinner together, reflecting on the adventure under a beautiful Balinese sunset. FerryGili Trawangan – Padangbai1h30m-2h65km Get to the next spot on your route aboard a convenient and efficient ferry boat. Private VehiclePadangbai – Sanur1h-1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSanurAfternoon Enjoy a free afternoon to explore a bit of Sanur.",
      accommodation: "Swastika Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Sanur",
      location: "Sanur",
      description: "Depart at any time.",
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
      USD: { amount: 1599, discountedAmount: 1279 },
      IDR: { amount: 25200000, discountedAmount: 20160000 },
      CNY: { amount: 11499, discountedAmount: 9199 },
    },
    regionId: "region-bali",
    startingPoint: "Seminyak",
    route: {
      en: "Seminyak to Candi Dasa",
      id: "Seminyak ke Candi Dasa",
      cn: "塞米亚克至坎迪达萨",
    },
    highlights: ["seminyak", "munduk", "bulian-village", "mount-batur", "ubud", "candidasa"],
    featured: false,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Seminyak",
      location: "Seminyak",
      description: "Welcome to Bali! Arrive at any time and enjoy the exciting beach town of Seminyak. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group.",
      accommodation: "Puri Saron Hotel Seminyak (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Seminyak/Munduk",
      location: "Seminyak/Munduk",
      description: "Head north this morning as we say goodbye to Seminyak and travel toward Munduk. Our day will be filled with exciting stops along the way, starting with the UNESCO World Heritage Site Jatiluwih Rice Terraces where we can explore the ancient emerald-green fields. The second stop is Baturiti Fruit Market where we can wander through the colorful stalls and try fresh fruits like rambutan and dragon fruit, depending on the season. Continue on to the gorgeous temple in the middle of the lake, at Ulun Danu Temple. Take the scenic route to Munduk with one final pit stop at the Twin Lake photo spot. Arrive to Munduk in the evening, check in the hotel and enjoy some free time. Private VehicleDesa Jatiluwih – Munduk2h15m48km Settle in and scan the scenery from the convenience of a private vehicle. On the way, explore Baturit Fruit Market and try some local fresh fruit, and continue on with other awesome pit stops along the way. Jatiluwih Rice Terraces VisitTabanan1h Follow your CEO down narrow paths as you explore the UNESCO-protected Jatiluwih Rice Terraces. Stop to enjoy the view as you trek around the area. Private VehicleSeminyak – Desa Jatiluwih2h50km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples.",
      accommodation: "Meme Surung Guesthouse (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Munduk/Bulian",
      location: "Munduk/Bulian",
      description: "We're off to our G for Good supported community homestay in Bulian today but not without some adventure along the way. A dip in Banjar Hot Springs is without a doubt the perfect way to start today. From a relaxing moment to some upbeat adventuring, we head to lively and exciting Pasar Anyar Singaraja, a traditional market full of fresh produce and handmade homeware where locals come to haggle. The last stop of today is Beji Temple where we'll explore this historic complex before finally arriving to Bulian in the afternoon. Embark on a village tour and traditional Balinese offering making workshop as you immerse yourself in our homestay in Bulian. Banjar Hot SpringsMunduk Take a dip at Air Panas Banjar, a centuries-old therapeutic sulfur hot springs bathing spot nestled in lush vegetation in the hills of Bali. It is renowned for its therapeutic mineral-rich waters sourced from a natural volcanic spring. Spend time in the relaxing waters of Banjar’s three-tiered pools, each varying in temperature and offering a unique bathing experience. The soothing warmth of the mineral-rich waters is said to alleviate muscle tension and promote overall well-being. Singaraja Traditional MarketSingaraja Pasar Anyar Singaraja, also known as Singaraja Traditional Market, is one of the main traditional markets of the area. Once here, you can see first hand what's sold like fresh produce, rice and tobacco, or household necessities like locally made kitchenware and utensils on display across various stalls. For first-timers, the scene here may seem a bit chaotic, with cluttered stalls. But it’s one of the best places for bargains, and you might score a unique souvenir like gemstones and jewelry. Beji TempleBanjar Pabean The temple was built in the 15th century during the Majapahit period and is considered to be one of the oldest temples in Bali.The timeworn structures and walls within the temple complex are exquisitely contrasted by the manicured green lawns and tropical gardens. Shrine bases and white sandstone walls are covered in arrays of carvings, inspired by the great Hindu epics with a mixture of characters from fables and legends such as serpents, menacing demons and guardians. The stone staircases and temple gates of Pura Beji temple also feature intact statues. It's a great stopover for lovers of art and ancient architecture. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Private VehicleMunduk – Bulian2h15m54km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.",
      accommodation: "Bulian Guesthouse (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bulian/Kintamani",
      location: "Bulian/Kintamani",
      description: "After a delicious breakfast, we're off to Lemukih Village for the day. Trek through rice paddies, a durian plantation, a coffee plantation and even a natural waterslide that we'll get a chance to enjoy. After lunch in a local warung, we'll continue our trek to visit 2 beautiful waterfalls, where we can swim and relax. Head towards Kintamani, a highland region in Bali known for its stunning volcanic landscapes, like the active Mount Batur and the serene Lake Batur. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Lemukih Village TrekBulian5h-6h2km Trek up the 300 stairs from Lemukih Village and enjoy the view of rice terrace fields. Stop at a durian plantation and natural water slide, where of course we will have a chance to slide down the water slide! Trek through a coffee plantation, and stop at a local warung for lunch before continuing to two of Bali's most incredible but still undiscovered waterfalls, Fiji and Sekumpul.",
      accommodation: "Lake View Kintamani Bali Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Kintamani/Ubud",
      location: "Kintamani/Ubud",
      description: "Don't miss the opportunity to explore Mt Batur at sunrise today! Choose the more active option of trekking to the sunrise point or choose the thrilling jeep sunrise adventure. After breakfast at the hotel, we'll visit the well preserved Penglipuran Village to experience picturesque Balinese culture. Afterwards, stop at the beautiful Pura Gunung Kawi Sebatu Temple on the way to Ubud. In the evening, arrive to Ubud. Free TimeBatur A sunrise visit to Mt Batur is a must! Opt to join a trek or jeep adventure this morning. Penglipuran Village VisitBangli Step into a timeless Balinese village known for its well-preserved traditional layout and culture. Wander its narrow lanes, interact with locals, and take in the authentic cultural atmosphere. Take up the opportunity to purchase locally made handicrafts as souvenirs. Pura Gunung Kawi Sebatu TempleSebatu Visit Pura Gunung Kawi Sebatu Temple. This serene temple complex is a hidden gem, offering a peaceful escape from the bustling tourist crowds. Explore the ancient carvings, tranquil pools, and lush gardens. Take time to soak in the spiritual atmosphere and admire the intricate details of the temple architecture. It's a wonderful place for reflection and appreciation of Balinese artistry. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Show",
      accommodation: "Champlung Sari Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Ubud",
      location: "Ubud",
      description: "Ubud is often considered the cultural heart of Bali. Today you have the opportunity to explore however you'd like. From monkey forests, local cooking classes, making spiritual offerings and Balinese village experiences, your options for today are endless. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Champlung Sari Hotel (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Ubud/Candi Dasa",
      location: "Ubud/Candi Dasa",
      description: "After a yummy breakfast, we drive from Ubud to the coast! Arrive in Candi Dasa in eastern Bali this afternoon and enjoy some free time. Private VehicleUbud – Candi Dasa1h30m-2h43km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeCandi Dasa Enjoy a free afternoon in the seaside town of Candi Dasa.",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Candi Dasa",
      location: "Candi Dasa",
      description: "Enjoy the amazing chance to explore Candidasa however you'd like! Opt to join a local Balinese cooking class and learn to make local favorites like Chicken Tum and Gado-Gado. Or take a snorkeling trip to the beautiful Blue Lagoon! The choice is yours. Free TimeCandi DasaFull Day Spend today exactly how you'd like in Candi Dasa! Show",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Candi Dasa",
      location: "Candi Dasa",
      description: "Depart at any time.",
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
      USD: { amount: 1999, discountedAmount: 1599 },
      IDR: { amount: 31500000, discountedAmount: 25200000 },
      CNY: { amount: 14399, discountedAmount: 11519 },
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Nusa Lembongan",
      id: "Canggu ke Nusa Lembongan",
      cn: "仓古至蓝梦岛",
    },
    highlights: ["canggu", "bulian-village", "mount-batur", "ubud", "nusa-lembongan"],
    featured: true,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Canggu",
      location: "Canggu",
      description: "Welcome to Bali-a literal island paradise! Known for incredible surf, wild nightlife, with somehow both a hectic yet relaxed hippie vibe! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu! Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Canggu",
      location: "Canggu",
      description: "You came to an island known around the world for having epic surf, so whether you shred or have never seen a board, today is for you! Join a surf lesson for all levels, getting your footing on land before hitting the water to practice with the instructors. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer at a cute warung, local Indonesian restaurant. Free TimeCanggu Enjoy the rest of the day in Canggu! Surf Lesson in CangguCanggu You came to the one of the world's surf capitals! Now it's time to try it out for yourself! Join a lesson on land to learn the basics and some safety tips. Then catch some waves and shred the gnar.",
      accommodation: "Roomates Hostel Canggu (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Canggu/Bulian",
      location: "Canggu/Bulian",
      description: "Take a break from Bali's wild side and head north to Bulian. Here we can connect will locals, slow down and enjoy Bali's famed rice terraces. On the way up, we'll stop at the breathtaking Ulundanu Temple, sitting on the edge of Lake Beratan. Continue to Bulian where we'll be welcomed with a drink and lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village to connect with the natural and cultural side of Bali. Learn to make Balinese offerings then head to the nearby temple and join a local priest for the ceremony. Private VehicleCanggu – Ulundanu2h55km Settle in and scan the scenery from the convenience of a private vehicle. Ulun Danu Temple Complex VisitDanau Beratan Bring your camera for this floating temple visit; the captivating Ulun Danu Temple, founded by the King of Mengwi in the 17th century, is one of Bali’s most important and most photographed temples. Private VehicleUlundanu – Bulian2h45km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Bulian Village Tour Learn the unique history of this isolated village and why it's sometimes referred to as the \"Lost Kingdom\" or \"The Land of Curse.\" We'll embark on a tour of the village and get to know the local people as you wander past plantations, schools, and temples. Dress in local clothing and prepare offerings made of leaves and flowers before heading to a spiritual ceremony where you meet a local priest. Your G for Good Moment: Bulian Guesthouse Experience Bulian Homestay is a community run guesthouse, managed by a strong, dedicated woman of that village, who created an employment opportunity for other women and vulnerable youth of the community, with the hope of preserving their culture and preventing rural urban migration. By supporting this experience you will be directly impacting close to 50 people from the local community and indirectly impacting around 100 people living in the community. Bulian Homestay is a traditional Balinese Style house, converted into a comfortable guesthouse for travelers coming to this quaint village, around 2 hours from Ubud, Bali.",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Bulian",
      location: "Bulian",
      description: "Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village to see a durian plantation, beautiful rice terraces, coffee fields and waterfalls! You'll even have the chance to slide down a natural waterslide! Or choose to head out on a bike tour through Bulian to get acquainted with Northern Bali. Free TimeBulianFull Day Take today to explore Bulian your way! Show",
      accommodation: "Bulian Homestay (or similar)Homestay",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Bulian/Kintamani",
      location: "Bulian/Kintamani",
      description: "A free morning gives you the chance to explore the rest of Bulian on your terms. Choose to just chill, or join a local cooking class or sunrise fishing trip. Then jump in the van and drive to Kintamani, the town nestled at the base of Mt Batur to arrive to our campsite for the night. Did we mention this campsite has a hot spring pool? Soak in the hot springs then join us 'round the campfire for a cozy night of camping! Free TimeBulianMorning Spend the morning free in Bulian. Private VehicleBulian – Kintamani1h Settle in and scan the scenery from the convenience of a private vehicle. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Free TimeKintamani Enjoy the afternoon free to explore Toya Bungkah in Kintamani. Show",
      accommodation: "Accommodation",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Kintamani/Ubud",
      location: "Kintamani/Ubud",
      description: "Rise and shine as we are getting after it today! Waking well before the sun, we'll start our 2 hour trek to reach the Mt Batur summit in time to enjoy an absolutely stunning sunrise. And what's a picturesque sunrise without a lil picnic breakfast, amirite? With the sun finally up, we'll hike back down for a proper breakfast and a well-deserved hot spring soak. Then it's goodbye Kintamani and hello Ubud! On the way, we'll stop at G Adventures-supported PKP Community to meet with the women leaders, visit the garden and enjoy a local lunch. Then, the rest of the afternoon is yours to explore Ubud. But in the evening, put your party hat on because we're going out! Join your group and CEO for your Big Night Out in Ubud. Mount Batur Sunrise TrekKintamani5h7km Climb to the summit of Mt Batur (1700m), for an amazing sunrise and scenic views. The climb is an experience that will afford anyone who does it a sense of accomplishment and appreciation for the natural beauty this island has. Your Wellness Moment: Local Hot Spring Pool Relax in the pools filled with warm mineral waters from a local spring to soothe tired muscles and ease worries away. Private VehicleKintamani – Ubud2h53km Settle in and scan the scenery from the convenience of a private vehicle. Your G for Good Moment: Pusat Kegiatan Perempuan (PKP) Community Visit Visit the PKP Community, a G-Adventures supported project, for a delicious local lunch made by the women of this enterprise. This centre works to support gender equality and help empower local women through job skill training. PKP is a safe space for women in the community who have experienced discrimination from divorce. We'll meet them over a cup of their specially made tea, tour the garden and learn about the amazing work this organization is doing over lunch. Free TimeUbud Spend the rest of the day free to explore Ubud. Your Big Night Out Moment: in Ubud We're going out! Get yourself a beer, or maybe some cacao and be ready for a fun night out with your crew in Ubud!",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Ubud",
      location: "Ubud",
      description: "There is always something to discover in the great town of Ubud. Today is yours to explore however you’d like. Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Ubud",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Ubud/Nusa Lembongan",
      location: "Ubud/Nusa Lembongan",
      description: "Say bye-bye to Bali because today we head to another island, Nusa Lembongan! Jump in the car with the breeze in your hair to the Yellow suspension bridge, an icon of the island. Walk across and admire the oh-so-stunning views. Then we continue on to the seaweed farm (yes, people actually farm seaweed!) Next, we visit Dream Beach, but not without a stop at Devil’s Tear, an incredible lookout point, first. At Dream Beach, dig your toes in the soft white sand, take a dip, or rot in the sun! This evening, at the hotel, don’t miss some time to chill by the pool or walk to Mushroom Bay! Nusa Lembongan is way less touristy than Bali- so much less so that it doesn’t have a harbour. Our feet will get wet as we disembark onto the island so wear appropriate clothing. Don’t worry- our team will keep your bags dry! Private VehicleUbud – Sanur1h30m18km Settle in and scan the scenery from the convenience of a private vehicle. BoatSanur – Nusa Lembongan45m Climb aboard and get your float on. Seaweed FarmNusa Lembongan Visit the beautiful Seaweed farm where local farmers work in the ocean to sow seeds, harvest and use it to craft seaweed-based products. These farming techniques are a major part of the island's economy. We'll have a chance to see the process, learn about its importance and meet the farmers in this beautiful coastal farm. Devil's TearNusa Lembongan Watch as the powerful waves crash into the cliff to make the beautiful, dramatic landscape of Devil's Tear. The natural phenomenon creates a stunning view, especially at high tide. It's a popular spot to witness the raw beauty of the ocean and enjoy breathtaking coastal views. Yellow BridgeNusa Lembongan See the amazing contrast of the bright yellow bridge above the sparkling turquoise water and walk across the suspension bridge. A picture perfect spot! Dream BeachNusa Lembongan So perfect, it feels like a dream! Dream beach lives up to the hype as one of Nusa Lembongan's most beautiful beaches. Enjoy the perfectly white sand contrasting with the crystal clear water.",
      accommodation: "Good Cheer Hostel Lembongan (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Day 10: Nusa Lembongan",
      location: "Nusa Lembongan",
      description: "Free day in Nusa Lembongan! Woop Woop! How do you want to spend today? Fancy an off-the-beaten-path adventure to see the beighbouring island of Nusa Penida's temples, caves and beaches? Maybe a day trip to Nusa Penida for a chance to see snorkel the vibrant reefs of this other b-e-a-utiful island! Or how about a snorkel trip around Nusa Lembongan to see manta rays in the coral reefs and to admire the interesting ecosystems around the mangroves. So many good choices! Free TimeNusa LembonganFull Day Today is yours to explore the island of Nusa Lembongan! Show",
      accommodation: "Good Cheer Hostel Lembongan (or similar)Hostel",
      meals: [],
    },
    {
      dayNumber: 11,
      title: "Day 11: Nusa Lembongan",
      location: "Nusa Lembongan",
      description: "Depart at any time. If you are headed home, take a ferry back to the Bali to get to the international airport. Make sure to give yourself plenty of time to take the ferry and drive to the airport, arriving to the airport 4 hours before your flight. We suggest taking the 10:00 am ferry for a flight after 4:00 pm.",
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
      USD: { amount: 1499, discountedAmount: 1199 },
      IDR: { amount: 23600000, discountedAmount: 18880000 },
      CNY: { amount: 10799, discountedAmount: 8639 },
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
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Day 1: Ubud",
      location: "Ubud",
      description: "Welcome to Ubud, arguably the most famous city in Bali! Settle in and explore this funky town then meet your group for a welcome meeting this evening. But stick around because we’re heading out on our First Night Out! Get to know each other and Ubud a bit better. Your opportunity to meet your CEO and fellow travellers, and learn more about your tour. Opt to join the group for a local meal afterwards. Don't forget to see the notice in the lobby (or ask reception) for the official time and place to meet up with the group. Connect with new friends on your first night out in a new destination. Only available on 18-to-Thirtysomethings tours.",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Day 2: Ubud",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want! Choose between incredible local experiences like a Balinese Spiritual tour at Widya Guna Foundation, a cooking class at G for Good PKP Community, a bike tour through the rice terraces or an experience with a local family! The choice is yours! Your Discover MomentUbudFull Day There's plenty to see and do in Ubud, and we wanted to make sure that you had some time to take it all in. Feel free to relax or try optional activities like attending a yoga class, learning about Balinese cuisine with a cooking class, and indulging in a traditional massage. Your CEO has more ideas if you need them. Just ask! Show",
      accommodation: "Pande Permai Bungalow (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Day 3: Ubud/Tempasan",
      location: "Ubud/Tempasan",
      description: "Drive to the harbour and take a speed boat to the island of Lombok. Drive to Tempasan village and meet the villagers for a group dinner. Private VehicleUbud – Padangbai1h30m36km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatPadangbai – Bangsal1h30m Climb aboard and get your float on. Private VehicleBangsal – Tempasan2h30m72km Settle in and scan the scenery from the convenience of a private vehicle.",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Day 4: Tempasan",
      location: "Tempasan",
      description: "Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers to learn about village life firsthand, wander through the instagramable rice terraces and maybe sample some local fruit on the various plantations. Then join the local women to learn about their gorgeous traditional weaving styles and a yummy lunch. The rest of the day is yours to explore Lombok how you'd like. Opt to join a local cooking class, take a bike tour or join a yoga class. Then join the group for an after-dinner campfire. If you choose to join the optional 2-day 1-night Rinjani summit trek, will have the chance to join the Rice Terrace Village Walk and Weaving Demonstration after your return on day 3. Your Local Living Moment: Rice Terrace Village Walk and Weaving Demonstration Explore the beautiful Tempasan Village with your CEO. Walk along the path through the rice field like the local people do. During the walk we will meet the farmer for their daily activities. Wander through pineapple, cassava and coffee plantations, the chicken and cow farm and take a short stop at the top of the hill for the amazing panoramic view of rice fields and Rinjani Mountain. Then hop in some local transport and drive to Pringgasela Village where you will learn about this unique and sole weaving village in east Lombok. Learn about their local textile, traditional looms and natural dyes. Free TimeTempasan The afternoon if yours to explore Lombok! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Day 5: Tempasan",
      location: "Tempasan",
      description: "From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls? A cooking class? Options on options! So get out there how you want! Free TimeTempasanFull Day A free day in Tempasan means you get to explore how you want! Show",
      accommodation: "Aranka Tempasan Lodge (or similar)Lodge",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Day 6: Tempasan/Senggigi",
      location: "Tempasan/Senggigi",
      description: "Drive to Bonjeruk Village this morning for an opportunity to connect with the local villagers. Here we will work up our appetite for a yummy Lombok lunch from a cycle tour around the village. Afterwards, continue on to Senggigi for a free afternoon at the beach. Private VehicleTempasan – Bonjeruk1h30m40km Settle in and scan the scenery from the convenience of a private vehicle. Bonjeruk Village ExperienceSenggigi Receive a warm welcome by the the villagers of Bonjeruk Village and learn about the youth development organization they support. Your guide, a student from the English learning program, will lead you on a short cycling around the village (approx 45 mins - 1 hr). You will have lunch at a lovely spot in the village and enjoy a home-cooked meal giving you a taste of Lombok traditional food. After lunch, join some of the women of the village to try the local cakes and snacks made from flour sourced from locally grown potatoes or sticky rice. Private VehicleBonjeruk – Senggigi1h37km Settle in and scan the scenery from the convenience of a private vehicle. Free TimeSenggigi Spend the rest of the day free in Senggigi, on the coast in Lombok.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)Hotel",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Day 7: Senggigi/Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "Get ready for the ultimate island paradise as we travel to Gili Trawangan, an island with no motorized vehicles and the freshest air! After dropping our things off at the hotel, we head back out to sea for a snorkel trip. On board the boat, we’ll jet around to various islands and picturesque snorkel spots in search of sea turtles, rays and if we’re lucky, a cute lil reef shark. Grab your sunscreen and a snorkel and get ready for an epic day. Tonight, as if today could get any better, we head out on our big night out! Want a drank? Wanna dance? Well let’s do it! As there are no motorized vehicles on Gili Trawangan, you will need to carry your luggage from the speed boat to the hotel, approximately 300m. Private VehicleSenggigi – Bangsal30m-45m22km Settle in and scan the scenery from the convenience of a private vehicle. SpeedboatSenggigi – Gili Trawangan30m Climb aboard and get your float on. The Gili Islands Snorkel TripGili Trawangan Visit all 3 islands that make up the famous Gili Islands. Starting from Gili Trawangan, snorkel around the best spots like Turtle Point. Then head to Gili Meno by boat to snorkel through the perfect water on the most tranquil of the 3 islands. Next is Gili Air, with our final chance to swim through the vibrant coral reefs before returning to Gili T. Your Big Night Out Moment: in Gili Trawangan The Gili Islands are known for having the best parties in the world! Tonight, let's see what its all about together on our Big Night Out! Grab yourself your drink of choice and let's kick it!",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Day 8: Gili Trawangan",
      location: "Gili Trawangan",
      description: "There are 2 types of beach people. The rotters-who want to lay in the sun all day, and the adventurers! Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill, get your tan on and take a dip in the perfect blue water. Looking for something more to do? How does stand up paddle board yoga sound? Maybe a leisurely bike ride around the island? However you choose to spend it, Gili T is yours to see. Free TimeGili TrawanganFull Day Enjoy a free day to explore Gili Trawangan on your terms! Show",
      accommodation: "Gili Amor Boutique Resort (or similar)Resort",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Day 9: Gili Trawangan",
      location: "Gili Trawangan",
      description: "Depart at any time. Hide Bali Express: Gili Trawangan to KutaGili Trawangan – Kuta Want to take the hassle out of getting back to Bali? Book the “Bali Express: Gili Trawangan to Kuta” post-tour Extra and make your way back to Kuta with the guidance of a CEO. On the final day of the tour, board a fast boat back to Bali and transfer to Kuta.",
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
      USD: { amount: 1099, discountedAmount: 879 },
      IDR: { amount: 17300000, discountedAmount: 13840000 },
      CNY: { amount: 7899, discountedAmount: 6319 },
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
    image: "/assets/lombok",
    itinerary: [
    {
      dayNumber: 1,
      title: "Tempasan Arrival",
      location: "Tempasan",
      description: "Welcome to Lombok! Meet your group and CEO at a welcome meeting. Then meet the local villagers at dinner accompanied by some live music.",
      accommodation: "Aranka Tempasan Lodge (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Tempasan Village Life",
      location: "Tempasan",
      description: "Get close to local life in Lombok today on a village tour and rice terrace trek. Meet with local farmers, wander through rice terraces and visit plantations. Afterwards, learn about traditional weaving styles.",
      accommodation: "Aranka Tempasan Lodge (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Tempasan Free Day",
      location: "Tempasan",
      description: "From land to sea, Lombok has a never-ending list of sick adventures for us! Today is yours so do what you want. Yoga? A snorkel trip? Monkeys and waterfalls?",
      accommodation: "Aranka Tempasan Lodge (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Tempasan to Senggigi",
      location: "Tempasan/Senggigi",
      description: "Drive to Bonjeruk Village for a cycle tour and lunch. Afterwards, continue on to Senggigi for a free afternoon at the beach.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Senggigi to Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "Get ready for the ultimate island paradise as we travel to Gili Trawangan. Head out to sea for a snorkel trip around the 3 islands. Tonight, big night out!",
      accommodation: "Gili Amor Boutique Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Gili Trawangan Free Day",
      location: "Gili Trawangan",
      description: "Today, you get to pick your own player and spend today exactly how you want! Feel free to pick your fav beach and just chill or try stand up paddle board yoga.",
      accommodation: "Gili Amor Boutique Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Departure",
      location: "Gili Trawangan",
      description: "Depart at any time.",
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
      USD: { amount: 1299, discountedAmount: 1039 },
      IDR: { amount: 20500000, discountedAmount: 16400000 },
      CNY: { amount: 9399, discountedAmount: 7519 },
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
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Sanur Arrival",
      location: "Sanur",
      description: "Arrive at any time. The welcome moment begins at 18:00.",
      accommodation: "Swastika Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Sanur to Munduk",
      location: "Sanur/Munduk",
      description: "Visit the Lake Danu Bratan Temple and take a walk through the Jatiluwih Rice Terraces before arriving at the guesthouse in Munduk.",
      accommodation: "Meme Surung Guesthouse (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Munduk to Kintamani",
      location: "Munduk/Kintamani",
      description: "Drive through lush rice fields and winding mountain roads to Kintamani, then take a dip in the local hot springs.",
      accommodation: "Lake View Kintamani Bali Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Kintamani to Ubud",
      location: "Kintamani/Ubud",
      description: "Opt for a sunrise hike to the top of Mt Batur before travelling to the cultural heart of Bali. Stop for lunch at the Bali Community Training Lunch Program.",
      accommodation: "Champlung Sari Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Ubud Free Day",
      location: "Ubud",
      description: "Enjoy a free day to explore exactly what interests you in Ubud. Opt to visit the Monkey Forest, numerous temples, rice paddies, and markets.",
      accommodation: "Champlung Sari Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Ubud to Candi Dasa",
      location: "Ubud/Candi Dasa",
      description: "Visit Kerta Gosa, the historic court of justice, before the journey to Candidasa, a superb beach location perfect for relaxing.",
      accommodation: "Ashyana Candidasa Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Candi Dasa Free Day",
      location: "Candi Dasa",
      description: "Continue exploring or relaxing on the beach—the choice is yours.",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Departure",
      location: "Candi Dasa",
      description: "Depart at any time.",
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
      USD: { amount: 2599, discountedAmount: 2079 },
      IDR: { amount: 40900000, discountedAmount: 32720000 },
      CNY: { amount: 18799, discountedAmount: 15039 },
    },
    regionId: "region-bali",
    startingPoint: "Sanur",
    route: {
      en: "Sanur to Sanur",
      id: "Sanur ke Sanur",
      cn: "萨努尔至萨努尔",
    },
    highlights: ["sanur", "munduk", "ubud", "candidasa", "kuta-lombok", "gili-trawangan"],
    featured: true,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Sanur Arrival",
      location: "Sanur",
      description: "Arrive at any time. The welcome moment begins at 18:00.",
      accommodation: "Swastika Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Sanur to Munduk",
      location: "Sanur/Munduk",
      description: "Visit the Lake Danu Bratan Temple and take a walk through the Jatiluwih Rice Terraces before arriving at the guesthouse in Munduk.",
      accommodation: "Meme Surung Guesthouse (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Munduk to Kintamani",
      location: "Munduk/Kintamani",
      description: "Drive through lush rice fields and winding mountain roads to Kintamani, then take a dip in the local hot springs.",
      accommodation: "Lake View Kintamani Bali Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Kintamani to Ubud",
      location: "Kintamani/Ubud",
      description: "Opt for a sunrise hike to the top of Mt Batur before travelling to the cultural heart of Bali.",
      accommodation: "Champlung Sari Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Ubud Exploration",
      location: "Ubud",
      description: "Enjoy a free day to explore exactly what interests you in Ubud.",
      accommodation: "Champlung Sari Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Ubud to Candi Dasa",
      location: "Ubud/Candi Dasa",
      description: "Visit Kerta Gosa, the historic court of justice, before the journey to Candidasa.",
      accommodation: "Ashyana Candidasa Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Candi Dasa Leisure",
      location: "Candi Dasa",
      description: "With more free time here, opt to visit the Tirta Gangga temple or the traditional village of Tenganan.",
      accommodation: "Ashyana Candidasa Beach Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Candi Dasa to Kuta (Lombok)",
      location: "Candi Dasa/Kuta",
      description: "Take a local ferry to Lombok and visit a Sasak traditional village en route to Kuta.",
      accommodation: "Puri Rinjani Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Kuta Exploration",
      location: "Kuta",
      description: "Enjoy a full day exploring the area around Kuta. Opt for a surf lesson.",
      accommodation: "Puri Rinjani Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 10,
      title: "Kuta to Senggigi",
      location: "Kuta/Senggigi",
      description: "Enjoy a spectacular drive through the middle of Lombok. Stop at the Tetebatu community to enjoy an easy trek led by a local guide.",
      accommodation: "Puri Saron Hotel Senggigi Beach (or similar)",
      meals: [],
    },
    {
      dayNumber: 11,
      title: "Senggigi to Gili Trawangan",
      location: "Senggigi/Gili Trawangan",
      description: "This morning we head to the stunning Gili Islands. Once at the islands enjoy a half-day snorkelling trip.",
      accommodation: "Hotel Vila Ombak (or similar)",
      meals: [],
    },
    {
      dayNumber: 12,
      title: "Gili Trawangan Free Time",
      location: "Gili Trawangan",
      description: "Today is free for exploring. Opt to rent a bike and cycle around the island.",
      accommodation: "Hotel Vila Ombak (or similar)",
      meals: [],
    },
    {
      dayNumber: 13,
      title: "Gili Trawangan to Sanur",
      location: "Gili Trawangan/Sanur",
      description: "Travel back to Bali by boat for a final dinner and farewells.",
      accommodation: "Swastika Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 14,
      title: "Departure",
      location: "Sanur",
      description: "Depart at any time.",
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
      USD: { amount: 1499, discountedAmount: 1199 },
      IDR: { amount: 23600000, discountedAmount: 18880000 },
      CNY: { amount: 10799, discountedAmount: 8639 },
    },
    regionId: "region-bali",
    startingPoint: "Canggu",
    route: {
      en: "Canggu to Ubud",
      id: "Canggu ke Ubud",
      cn: "仓古至乌布",
    },
    highlights: ["canggu-surfing", "bulian-village", "mount-batur-sunrise", "ubud"],
    featured: false,
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Canggu Arrival",
      location: "Canggu",
      description: "Welcome to Bali-a literal island paradise! After arrival, check into the hostel and meet your crew of travelers. This evening, join your group for your first night out in crazy-fun Canggu!",
      accommodation: "Roomates Hostel Canggu (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Canggu Surf",
      location: "Canggu",
      description: "Join a surf lesson for all levels. After the lesson, the day is yours!",
      accommodation: "Roomates Hostel Canggu (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Canggu to Bulian",
      location: "Canggu/Bulian",
      description: "Head north to Bulian. Stop at Ulundanu Temple. Continue to Bulian for lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Bulian Adventure",
      location: "Bulian",
      description: "Enjoy all that the beautiful village of Bulian has to offer today on a free day. Choose to trek through Lemukih Village or head out on a bike tour.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Bulian to Kintamani",
      location: "Bulian/Kintamani",
      description: "Drive to Kintamani to our campsite. Soak in the hot springs then join us 'round the campfire.",
      accommodation: "D'Stone Glamping Ground (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Kintamani to Ubud",
      location: "Kintamani/Ubud",
      description: "Start our 2 hour trek to reach the Mt Batur summit for sunrise. Hike back down for breakfast and hot springs. Travel to Ubud, stopping at PKP Community for lunch. Evening Big Night Out.",
      accommodation: "Pande Permai Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Ubud Exploration",
      location: "Ubud",
      description: "Today is yours to explore however you’d like. There is always something to discover in the great town of Ubud.",
      accommodation: "Pande Permai Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Ubud Free Day",
      location: "Ubud",
      description: "With seemingly never-ending things to do in Ubud, choose to spend it how you want!",
      accommodation: "Pande Permai Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Departure",
      location: "Ubud",
      description: "Depart at any time.",
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
      USD: { amount: 899, discountedAmount: 719 },
      IDR: { amount: 14200000, discountedAmount: 11360000 },
      CNY: { amount: 6499, discountedAmount: 5199 },
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
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Canggu Arrival",
      location: "Canggu",
      description: "Welcome to Bali-a literal island paradise! After arrival, check into the hostel and meet your crew of travelers for a welcome meeting. This evening, join your group for your first night out in crazy-fun Canggu!",
      accommodation: "Roomates Hostel Canggu (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Canggu Surf & Chill",
      location: "Canggu",
      description: "Join a surf lesson for all levels. After the lesson, the day is yours! Rent a board to keep practicing, relax on the beach or grab a beer.",
      accommodation: "Roomates Hostel Canggu (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Canggu to Bulian",
      location: "Canggu/Bulian",
      description: "Take a break from Bali's wild side and head north to Bulian. Stop at Ulundanu Temple. Continue to Bulian for lunch. Fuel up for a trek alongside waterfalls, through rice fields and in the local village.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Bulian Adventure",
      location: "Bulian",
      description: "Enjoy all that the beautiful village of Bulian has to offer today on a free day to choose your own adventure. Choose to trek through Lemukih Village or head out on a bike tour.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Bulian to Kintamani",
      location: "Bulian/Kintamani",
      description: "A free morning gives you the chance to explore the rest of Bulian. Then jump in the van and drive to Kintamani. Soak in the hot springs then join us 'round the campfire.",
      accommodation: "D'Stone Glamping Ground (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Kintamani to Ubud",
      location: "Kintamani/Ubud",
      description: "Start our 2 hour trek to reach the Mt Batur summit in time for sunrise. Then it's goodbye Kintamani and hello Ubud! Stop at G Adventures-supported PKP Community. In the evening, join your group for your Big Night Out in Ubud.",
      accommodation: "Pande Permai Bungalow (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Departure",
      location: "Ubud",
      description: "Say goodbye to your fellow travel buds and depart at any time.",
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
      USD: { amount: 1299, discountedAmount: 1039 },
      IDR: { amount: 20500000, discountedAmount: 16400000 },
      CNY: { amount: 9399, discountedAmount: 7519 },
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
    image: "/assets/bali",
    itinerary: [
    {
      dayNumber: 1,
      title: "Kuta Arrival",
      location: "Kuta",
      description: "Arrive at any time. For your first night out, explore the exciting paradise of Kuta with your CEO and fellow travellers.",
      accommodation: "The Rivavi Legian (or similar)",
      meals: [],
    },
    {
      dayNumber: 2,
      title: "Kuta Beach & Surf",
      location: "Kuta",
      description: "Today, take it easy in beachside Kuta. Take a surf lesson (which you can book ahead of time), relax on the beach, or head to one of the nearby towns.",
      accommodation: "The Rivavi Legian (or similar)",
      meals: [],
    },
    {
      dayNumber: 3,
      title: "Kuta to Bulian",
      location: "Kuta/Bulian",
      description: "It's off to Bulian today. Breathe in the beautiful scenery before stopping for lunch en route at the G Adventures supported Bali Community Training Lunch Program.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 4,
      title: "Bulian Village Life",
      location: "Bulian",
      description: "Get ready to liven up your tastebuds with a Balinese cooking lesson. After, you can trek around the village, visit a waterfall, swim in a natural spring.",
      accommodation: "Bulian Homestay (or similar)",
      meals: [],
    },
    {
      dayNumber: 5,
      title: "Bulian to Ubud",
      location: "Bulian/Ubud",
      description: "This morning's free for you to explore or relax. Later, check out Ubud and visit the picturesque Gitgit Waterfall or Pura Taman Saraswati.",
      accommodation: "MaxOne Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 6,
      title: "Ubud Exploration",
      location: "Ubud",
      description: "Today is full of possibilities. Stop by the monkey forest, a sanctuary for the long-tailed Balinese monkey, before checking out more of Ubud.",
      accommodation: "MaxOne Hotel (or similar)",
      meals: [],
    },
    {
      dayNumber: 7,
      title: "Ubud to Gili Trawangan",
      location: "Ubud/Gili Trawangan",
      description: "It's off to the beautifully laid-back island of Gili Trawangan today. Slow it all down with relaxing at a beachfront bar.",
      accommodation: "Gili Amor Boutique Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 8,
      title: "Gili Trawangan Paradise",
      location: "Gili Trawangan",
      description: "Spend another day in paradise. Explore the island by bicycle, or just kick back on the beach.",
      accommodation: "Gili Amor Boutique Resort (or similar)",
      meals: [],
    },
    {
      dayNumber: 9,
      title: "Departure",
      location: "Gili Trawangan",
      description: "Today, it’s time to say goodbye to your group of newfound friends as the tour ends.",
      accommodation: "",
      meals: [],
    },
    ],
  }];

// Backward compatibility alias
export const tourPackages = openTrips;

// ============================
// HELPER FUNCTIONS
// ============================

/**
 * Get an open trip by its slug
 */
export function getOpenTripBySlug(slug: string): OpenTrip | undefined {
  return openTrips.find((t) => t.slug === slug);
}

/**
 * Get open trips by region ID
 */
export function getOpenTripsByRegion(regionId: string): OpenTrip[] {
  return openTrips.filter((t) => t.regionId === regionId);
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
  return trip.description[locale as keyof typeof trip.description] || trip.description.en;
}

/**
 * Get open trip route by locale
 */
export function getOpenTripRoute(trip: OpenTrip, locale: string): string {
  return trip.route[locale as keyof typeof trip.route] || trip.route.en;
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

  return openTrips.filter((trip) => {
    // Region filter
    if (filters.regionId && trip.regionId !== filters.regionId) return false;

    // Duration filter
    if (filters.minDuration && trip.durationDays < filters.minDuration) return false;
    if (filters.maxDuration && trip.durationDays > filters.maxDuration) return false;

    // Difficulty filter
    if (filters.difficulty && trip.difficulty !== filters.difficulty) return false;

    // Search filter (searches title, description, highlights, route, locations)
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      if (!q) return true;

      const title = getOpenTripTitle(trip, locale).toLowerCase();
      const desc = getOpenTripDescription(trip, locale).toLowerCase();
      const route = getOpenTripRoute(trip, locale).toLowerCase();
      const highlights = trip.highlights.join(" ").toLowerCase();
      const locations = trip.itinerary.map((d) => d.location).join(" ").toLowerCase();
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

  let current = new Date(startDate);
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
  return openTrips.map((t) => t.slug);
}

/**
 * Get featured open trips
 */
export function getFeaturedOpenTrips(): OpenTrip[] {
  return openTrips.filter((t) => t.featured);
}

/**
 * Get physical rating label
 */
export function getPhysicalRatingLabel(rating: number): { en: string; id: string; cn: string } {
  const labels: Record<number, { en: string; id: string; cn: string }> = {
    1: { en: "Easy", id: "Mudah", cn: "轻松" },
    2: { en: "Light", id: "Ringan", cn: "轻度" },
    3: { en: "Moderate", id: "Sedang", cn: "中等" },
    4: { en: "Demanding", id: "Berat", cn: "较难" },
    5: { en: "Challenging", id: "Sangat Berat", cn: "挑战性" },
  };
  return labels[rating] || labels[3];
}
