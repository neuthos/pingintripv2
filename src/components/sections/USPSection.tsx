"use client";

import {useTranslations} from "next-intl";
import {Shield, Compass, Heart, Sparkles} from "lucide-react";

const uspIcons = [Shield, Compass, Heart, Sparkles];

export default function USPSection() {
  const t = useTranslations("USP");

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-center text-neutral mb-14">
          {t("heading")}
        </h2>

        {/* 4 USP items in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {uspIcons.map((Icon, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral mb-2">
                {t(`items.${index}.title`)}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {t(`items.${index}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
