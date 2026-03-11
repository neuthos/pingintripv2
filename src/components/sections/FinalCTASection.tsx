"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export default function FinalCTASection() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#8b4a2a]">
      {/* Wave texture */}
      <div className="absolute inset-0 z-0 opacity-[0.1]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1400 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="#fff" strokeWidth="1">
            <path d="M-20,40 C80,10 180,70 280,40 C380,10 480,70 580,40 C680,10 780,70 880,40 C980,10 1080,70 1180,40 C1280,10 1380,70 1420,40" />
            <path d="M-20,80 C100,50 200,110 300,80 C400,50 500,110 600,80 C700,50 800,110 900,80 C1000,50 1100,110 1200,80 C1300,50 1400,110 1420,80" />
            <path d="M-20,120 C60,90 160,150 260,120 C360,90 460,150 560,120 C660,90 760,150 860,120 C960,90 1060,150 1160,120 C1260,90 1360,150 1420,120" />
            <path d="M-20,160 C120,130 220,190 320,160 C420,130 520,190 620,160 C720,130 820,190 920,160 C1020,130 1120,190 1220,160 C1320,130 1420,190 1420,160" />
            <path d="M-20,200 C80,170 180,230 280,200 C380,170 480,230 580,200 C680,170 780,230 880,200 C980,170 1080,230 1180,200 C1280,170 1380,230 1420,200" />
            <path d="M-20,240 C100,210 200,270 300,240 C400,210 500,270 600,240 C700,210 800,270 900,240 C1000,210 1100,270 1200,240 C1300,210 1400,270 1420,240" />
            <path d="M-20,280 C60,250 160,310 260,280 C360,250 460,310 560,280 C660,250 760,310 860,280 C960,250 1060,310 1160,280 C1260,250 1360,310 1420,280" />
            <path d="M-20,320 C120,290 220,350 320,320 C420,290 520,350 620,320 C720,290 820,350 920,320 C1020,290 1120,350 1220,320 C1320,290 1420,350 1420,320" />
            <path d="M-20,360 C80,330 180,390 280,360 C380,330 480,390 580,360 C680,330 780,390 880,360 C980,330 1080,390 1180,360 C1280,330 1380,390 1420,360" />
            <path d="M-20,400 C100,370 200,430 300,400 C400,370 500,430 600,400 C700,370 800,430 900,400 C1000,370 1100,430 1200,400 C1300,370 1400,430 1420,400" />
            <path d="M-20,440 C60,410 160,470 260,440 C360,410 460,470 560,440 C660,410 760,470 860,440 C960,410 1060,470 1160,440 C1260,410 1360,470 1420,440" />
            <path d="M-20,480 C120,450 220,510 320,480 C420,450 520,510 620,480 C720,450 820,510 920,480 C1020,450 1120,510 1220,480 C1320,450 1420,510 1420,480" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-1 text-center px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-white mb-6">
          {t("heading")}
        </h2>
        <Link
          href="/destinations"
          className="inline-block bg-neutral text-white text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 hover:bg-gray-800 transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
