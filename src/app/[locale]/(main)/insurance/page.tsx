"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {
  essentialCoverages,
  recommendedProviders,
  insuranceTips,
  insuranceMeta,
} from "@/data/travel-insurance";
import {
  ShieldCheck,
  HeartPulse,
  CalendarX,
  Plane,
  Luggage,
  Clock,
  Mountain,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

const coverageIconMap: Record<string, React.ElementType> = {
  "heart-pulse": HeartPulse,
  "calendar-x": CalendarX,
  plane: Plane,
  luggage: Luggage,
  clock: Clock,
  mountain: Mountain,
};

export default function InsurancePage() {
  const t = useTranslations("InsurancePage");

  const formattedDate = new Date(
    insuranceMeta.lastUpdated
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-3xl mx-auto">
            {t("heroTitle")}
          </h1>

          <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />

          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            {t("heroDesc")}
          </p>

          <p className="text-xs text-white/30 mt-6">
            {t("lastUpdated")}: {formattedDate}
          </p>
        </div>
      </section>

      {/* ============================
          RECOMMENDATION BANNER
          ============================ */}
      <section className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="shrink-0 w-5 h-5 text-amber-500 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              {t("recommendation")}
            </p>
          </div>
        </div>
      </section>

      {/* ============================
          ESSENTIAL COVERAGES
          ============================ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-3">
              {t("coverageTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("coverageTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {essentialCoverages.map((coverage) => {
              const Icon = coverageIconMap[coverage.icon] || ShieldCheck;
              return (
                <div
                  key={coverage.title}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-neutral mb-2">
                    {coverage.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {coverage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          RECOMMENDED PROVIDERS
          ============================ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-3">
              {t("providersTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("providersTitle")}
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
              {t("providersDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {recommendedProviders.map((provider) => (
              <div
                key={provider.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-base font-bold text-neutral mb-2">
                  {provider.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {provider.description}
                </p>
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  {t("visitWebsite")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          TIPS
          ============================ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-3">
              {t("tipsTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("tipsTitle")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {insuranceTips.map((tip, index) => (
              <div
                key={tip.title}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <div className="shrink-0 w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral mb-1">
                    {String(index + 1)}. {tip.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          CTA
          ============================ */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 text-center">
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
      </section>
    </main>
  );
}
