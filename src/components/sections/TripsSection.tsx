"use client";

import {useTranslations} from "next-intl";
import {useLocale} from "next-intl";
import {tourPackages, formatPrice, getDefaultCurrency} from "@/data/packages";
import {Link} from "@/i18n/navigation";
import OptimizedImage from "@/components/ui/optimized-image";
import {ArrowRight} from "lucide-react";

export default function TripsSection() {
  const t = useTranslations("Trips");
  const locale = useLocale();
  const currency = getDefaultCurrency(locale);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#1a1a1a]">
      {/* SVG Topographic Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1400 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="#aaa" strokeWidth="0.6">
            {/* Cluster A — upper left */}
            {[18, 30, 44, 60, 78, 98, 120, 144].map((r, i) => (
              <ellipse key={`a${i}`} cx="180" cy="160" rx={r} ry={r * 0.7} transform={`rotate(${-8 - i * 2} 180 160)`} />
            ))}

            {/* Cluster B — center-left */}
            {[15, 28, 42, 58, 76, 96, 118].map((r, i) => (
              <ellipse key={`b${i}`} cx="480" cy="380" rx={r * 0.8} ry={r} transform={`rotate(${12 + i * 3} 480 380)`} />
            ))}

            {/* Cluster C — center */}
            {[20, 35, 52, 70, 90, 112, 136, 162].map((r, i) => (
              <ellipse key={`c${i}`} cx="700" cy="280" rx={r} ry={r * 0.75} transform={`rotate(${20 - i * 2} 700 280)`} />
            ))}

            {/* Cluster D — upper right */}
            {[16, 30, 46, 64, 84, 106].map((r, i) => (
              <ellipse key={`d${i}`} cx="1050" cy="120" rx={r * 0.85} ry={r} transform={`rotate(${-25 + i * 4} 1050 120)`} />
            ))}

            {/* Cluster E — lower right */}
            {[22, 38, 56, 76, 98, 122, 148].map((r, i) => (
              <ellipse key={`e${i}`} cx="1150" cy="520" rx={r} ry={r * 0.65} transform={`rotate(${5 + i * 2} 1150 520)`} />
            ))}

            {/* Cluster F — bottom center */}
            {[14, 26, 40, 56, 74, 94].map((r, i) => (
              <ellipse key={`f${i}`} cx="650" cy="600" rx={r} ry={r * 0.8} transform={`rotate(${-5 + i} 650 600)`} />
            ))}

            {/* Cluster G — far left */}
            {[12, 22, 34, 48, 64, 82].map((r, i) => (
              <ellipse key={`g${i}`} cx="50" cy="450" rx={r * 0.7} ry={r} transform={`rotate(${15 - i * 3} 50 450)`} />
            ))}

            {/* Cluster H — upper center */}
            {[10, 20, 32, 46, 62, 80].map((r, i) => (
              <ellipse key={`h${i}`} cx="400" cy="80" rx={r} ry={r * 0.6} transform={`rotate(${-12 + i * 2} 400 80)`} />
            ))}

            {/* Cluster I — right edge */}
            {[18, 32, 48, 66, 86].map((r, i) => (
              <ellipse key={`i${i}`} cx="1350" cy="300" rx={r * 0.75} ry={r} transform={`rotate(${30 - i * 5} 1350 300)`} />
            ))}

            {/* Flowing contour paths */}
            <path d="M 0,120 Q 80,180 180,160 Q 280,140 380,200 Q 480,260 580,240" />
            <path d="M 0,150 Q 90,210 200,190 Q 310,170 420,230 Q 530,290 620,270" />
            <path d="M 300,0 Q 380,60 460,50 Q 540,40 620,100 Q 700,160 780,140" />
            <path d="M 330,20 Q 410,80 490,70 Q 570,60 650,120 Q 730,180 810,160" />
            <path d="M 600,500 Q 700,460 800,480 Q 900,500 1000,460 Q 1100,420 1200,450" />
            <path d="M 580,530 Q 680,490 780,510 Q 880,530 980,490 Q 1080,450 1180,480" />
            <path d="M 900,600 Q 1000,560 1100,580 Q 1200,600 1300,550 Q 1400,500 1400,520" />
            <path d="M 0,350 Q 60,320 120,340 Q 180,360 240,330 Q 300,300 360,330" />
            <path d="M 0,380 Q 70,350 140,370 Q 210,390 280,360 Q 350,330 420,360" />
            <path d="M 800,0 Q 860,40 920,20 Q 980,0 1040,40 Q 1100,80 1160,50" />
            <path d="M 820,25 Q 880,65 940,45 Q 1000,25 1060,65 Q 1120,105 1180,75" />
            <path d="M 1100,200 Q 1160,240 1220,220 Q 1280,200 1340,240 Q 1400,280 1400,260" />
          </g>
        </svg>
      </div>

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Heading */}
          <div className="lg:w-[260px] shrink-0 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-white mb-3">
              {t("heading")}
            </h2>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              {t("subtitle")}
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/80 hover:text-white font-medium transition-colors"
            >
              {t("viewAll")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: Horizontal scroll cards */}
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mr-4 pr-4 lg:-mr-8 lg:pr-8"
            style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
          >
            {tourPackages
              .filter((pkg) => pkg.featured)
              .map((pkg) => {
                const name =
                  pkg.title[locale as keyof typeof pkg.title] || pkg.title.en;
                const route =
                  pkg.route[locale as keyof typeof pkg.route] || pkg.route.en;
                const price = pkg.price[currency];

                return (
                  <Link
                    key={pkg.id}
                    href={`/packages/${pkg.slug}`}
                    className="flex-none w-[220px] md:w-[240px] snap-start group"
                  >
                    {/* Card */}
                    <div className="relative aspect-3/4 rounded-xl overflow-hidden">
                      {/* Image */}
                      <OptimizedImage
                        src={pkg.image}
                        alt={name}
                        fill
                        objectFit="cover"
                      />

                      {/* Duration badge */}
                      <div className="absolute top-3 right-3 z-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {pkg.durationDays} {t("days")}
                      </div>

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-2" />

                      {/* Content at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-3">
                        <h3 className="text-white font-bold text-sm leading-tight mb-1">
                          {name}
                        </h3>
                        <p className="text-white/50 text-[11px] mb-3">
                          {route}
                        </p>

                        {/* Price */}
                        <div className="mb-3">
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">
                            {t("from")}
                          </p>
                          {price.discountedAmount ? (
                            <div className="flex items-baseline gap-2">
                              <span className="text-white/40 line-through text-xs">
                                {formatPrice(price.amount, currency)}
                              </span>
                              <span className="text-white font-bold text-base">
                                {formatPrice(
                                  price.discountedAmount,
                                  currency
                                )}
                              </span>
                            </div>
                          ) : (
                            <span className="text-white font-bold text-base">
                              {formatPrice(price.amount, currency)}
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/70 group-hover:text-white font-semibold border border-white/30 group-hover:border-white/60 rounded-md px-3 py-1.5 transition-all">
                          {t("exploreTrip")}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
