export interface Review {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
}

export const reviews: Review[] = [
  {
    id: "review-1",
    quote:
      "The custom itinerary was absolutely perfect. Every detail was taken care of, from hidden waterfalls to sunset dinners on the beach.",
    name: "Sarah M.",
    location: "Melbourne, Australia",
    rating: 5,
  },
  {
    id: "review-2",
    quote:
      "最高の家族旅行でした。子供たちはシュノーケリングが大好きで、文化体験は一生忘れられません。",
    name: "Yuta Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
  },
  {
    id: "review-3",
    quote:
      "From hidden temples to private beach picnics — this trip exceeded every expectation. Truly a dream come true.",
    name: "Yuki T.",
    location: "Osaka, Japan",
    rating: 5,
  },
  {
    id: "review-4",
    quote:
      "Perjalanan honeymoon kami luar biasa! Setiap momen terasa ajaib, dari sunrise di Rinjani sampai dinner di tepi pantai.",
    name: "Rina & Budi",
    location: "Jakarta, Indonesia",
    rating: 5,
  },
  {
    id: "review-5",
    quote:
      "从隐秘的寺庙到私人海滩野餐——这次旅行超出了我们所有的期望。真正的梦想成真。",
    name: "Chen Wei",
    location: "Shanghai, China",
    rating: 5,
  },
  {
    id: "review-6",
    quote:
      "Seamless from start to finish. The booking was easy, the communication was excellent, and the trip itself was pure magic.",
    name: "Maria S.",
    location: "Barcelona, Spain",
    rating: 5,
  },
  {
    id: "review-7",
    quote:
      "Liburan keluarga terbaik yang pernah kami alami. Anak-anak suka snorkeling dan pengalaman budayanya tak terlupakan.",
    name: "Santoso Family",
    location: "Surabaya, Indonesia",
    rating: 5,
  },
  {
    id: "review-8",
    quote:
      "定制行程安排得完美无缺。每一个细节都被照顾到了，从隐藏的瀑布到海边的日落晚餐。",
    name: "Li Ming",
    location: "Beijing, China",
    rating: 5,
  },
];
