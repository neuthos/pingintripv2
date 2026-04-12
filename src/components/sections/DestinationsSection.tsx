"use client";

import {useTranslations} from "next-intl";
import {useLocale} from "next-intl";
import {regions} from "@/data/destinations";
import {Link} from "@/i18n/navigation";
import OptimizedImage from "@/components/ui/optimized-image";
import {ArrowRight} from "lucide-react";
import {trackEvent} from "@/lib/gtag";

export default function DestinationsSection() {
  const t = useTranslations("Destinations");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-neutral mb-4">
            {t("heading")}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Preview Grid — show first 4 on mobile, all 8 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {regions.map((dest, index) => {
            const name =
              dest.name[locale as keyof typeof dest.name] || dest.name.en;
            const tagline =
              dest.tagline[locale as keyof typeof dest.tagline] ||
              dest.tagline.en;

            return (
              <Link
                key={dest.id}
                href={`/destinations/region/${dest.slug}`}
                onClick={() =>
                  trackEvent({
                    action: "click",
                    category: "destination_card",
                    label: dest.slug,
                  })
                }
                className={`group relative aspect-4/5 rounded-xl overflow-hidden cursor-pointer ${
                  index >= 4 ? "hidden md:block" : ""
                }`}
              >
                {/* Background Image */}
                <OptimizedImage
                  src={dest.image}
                  alt={name}
                  fill
                  objectFit="cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-2 group-hover:from-black/80 transition-all duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-3">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                    {name}
                  </h3>
                  <p className="text-white/60 text-[11px] md:text-xs mt-0.5">
                    {tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/destinations"
            className="btn btn-primary btn-md rounded-lg text-sm font-semibold gap-2 px-8"
            onClick={() =>
              trackEvent({
                action: "click",
                category: "destinations_cta",
                label: "explore_all_destinations",
              })
            }
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 mt-3">{t("ctaHint")}</p>
        </div>
      </div>
    </section>
  );
}
