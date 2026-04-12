"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {trackEvent} from "@/lib/gtag";

export default function HeroCTAButtons() {
  const t = useTranslations("Hero");

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/destinations"
        className="btn btn-primary btn-lg"
        onClick={() =>
          trackEvent({
            action: "click",
            category: "hero_cta",
            label: "build_custom_tour",
          })
        }
      >
        {t("cta")}
      </Link>
      <Link
        href="/packages"
        className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black"
        onClick={() =>
          trackEvent({
            action: "click",
            category: "hero_cta",
            label: "browse_open_trips",
          })
        }
      >
        {t("secondaryCta")}
      </Link>
    </div>
  );
}
