"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {trackEvent} from "@/lib/gtag";

export default function MissionSection() {
  const t = useTranslations("Mission");

  const paragraphs = [
    t("paragraphs.0"),
    t("paragraphs.1"),
    t("paragraphs.2"),
    t("paragraphs.3"),
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-neutral mb-8">
          {t("heading")}
        </h2>

        {/* Paragraphs */}
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base md:text-lg leading-relaxed text-gray-600 italic"
              style={{fontFamily: "var(--font-lora), Georgia, serif"}}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/enquiry"
            onClick={() => trackEvent({action: "click", category: "mission_section", label: "get_in_touch"})}
            className="btn btn-neutral btn-md rounded-lg uppercase tracking-wider text-xs font-semibold px-8"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
