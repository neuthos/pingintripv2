"use client";

import {useTranslations} from "next-intl";
import {reviews} from "@/data/reviews";
import {useState, useRef, useEffect} from "react";

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.ceil(reviews.length / 4);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current) return;
    const scrollWidth = scrollRef.current.scrollWidth;
    const containerWidth = scrollRef.current.clientWidth;
    const maxScroll = scrollWidth - containerWidth;
    const targetScroll = (maxScroll / (totalPages - 1)) * page;
    scrollRef.current.scrollTo({left: targetScroll, behavior: "smooth"});
    setActivePage(page);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      if (scrollWidth <= 0) return;
      const progress = container.scrollLeft / scrollWidth;
      const page = Math.round(progress * (totalPages - 1));
      setActivePage(page);
    };

    container.addEventListener("scroll", handleScroll, {passive: true});
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalPages]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-center text-neutral mb-14">
          {t("heading")}
        </h2>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-none w-[260px] md:w-[280px] snap-start text-center flex flex-col"
            >
              {/* Quote mark */}
              <div
                className="text-primary/40 text-4xl mb-4 leading-none"
                style={{fontFamily: "Georgia, serif"}}
              >
                &ldquo;&ldquo;
              </div>

              {/* Quote text — uppercase, small, tracked */}
              <p className="text-[11px] md:text-xs uppercase tracking-wider leading-relaxed text-gray-700 font-medium mb-5 flex-1">
                {review.quote}
              </p>

              {/* Name — handwriting font */}
              <p
                className="text-base text-primary mt-auto"
                style={{fontFamily: "var(--font-caveat), cursive"}}
              >
                {review.name}, {review.location}
              </p>
            </div>
          ))}
        </div>

        {/* Dot pagination */}
        <div className="flex justify-center gap-2.5 mt-10">
          {Array.from({length: totalPages}).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activePage
                  ? "bg-neutral"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
