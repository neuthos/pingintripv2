"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {faqCategories} from "@/data/faq";
import {
  HelpCircle,
  CalendarCheck,
  Map,
  Compass,
  Info,
  RotateCcw,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import {useState} from "react";

const iconMap: Record<string, React.ElementType> = {
  "calendar-check": CalendarCheck,
  map: Map,
  compass: Compass,
  info: Info,
  "rotate-ccw": RotateCcw,
};

export default function FaqPage() {
  const t = useTranslations("FaqPage");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({...prev, [key]: !prev[key]}));
  };

  const filteredCategory = faqCategories.find((c) => c.id === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* ============================
          HERO
          ============================ */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-3xl mx-auto">
            {t("heroTitle")}
          </h1>

          <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />

          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            {t("heroDesc")}
          </p>
        </div>
      </section>

      {/* ============================
          FAQ CONTENT
          ============================ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {faqCategories.map((category) => {
            const Icon = iconMap[category.icon] || HelpCircle;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#1a1a1a] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Accordion items */}
        {filteredCategory && (
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredCategory.items.map((item, index) => {
              const key = `${filteredCategory.id}-${index}`;
              const isOpen = openItems[key] || false;

              return (
                <div
                  key={key}
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen
                      ? "border-primary/30 bg-primary/2 shadow-sm"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(key)}
                    className="w-full flex items-start gap-3 px-5 py-4 text-left"
                  >
                    <span className="shrink-0 w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm md:text-base font-semibold text-neutral leading-snug pt-0.5">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`shrink-0 w-5 h-5 text-gray-400 mt-0.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-4 pl-15">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-neutral mb-2">
            {t("ctaTitle")}
          </h3>
          <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
            {t("ctaDesc")}
          </p>
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-black transition-colors"
          >
            {t("ctaCta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
