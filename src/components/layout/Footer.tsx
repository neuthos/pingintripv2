"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import Image from "next/image";
import {companyInfo, socialLinks, footerNavColumns} from "@/data/company";
import {Mail, Phone, MapPin, Facebook, Instagram, Youtube} from "lucide-react";

/* TikTok icon — not in lucide */
function TikTokIcon({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.83 4.83 0 01-1-.1z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon,
};

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = 2025;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src={companyInfo.logoWhite}
                alt={companyInfo.name}
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p
              className="text-sm text-white/50 mb-6 max-w-xs leading-relaxed"
              style={{
                fontFamily: "var(--font-lora), serif",
                fontStyle: "italic",
              }}
            >
              {t("tagline")}
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-white/60 text-xs">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                <span className="leading-relaxed">{companyInfo.address}</span>
              </div>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-white/60 text-xs hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-white/40" />
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white/60 text-xs hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-white/40" />
                {companyInfo.phoneFormatted}
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav column: Information */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white/60 mb-4">
              {t("infoTitle")}
            </h4>
            <ul className="space-y-2.5">
              {footerNavColumns.information.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav column: Destinations */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white/60 mb-4">
              {t("destinationsTitle")}
            </h4>
            <ul className="space-y-2.5">
              {footerNavColumns.destinations.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/60">
            © {currentYear} {companyInfo.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5 text-[11px] text-white/60">
            <Link
              href="/privacy"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/60 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
