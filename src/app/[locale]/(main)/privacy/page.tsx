"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {privacySections, privacyPolicyMeta} from "@/data/privacy-policy";
import {Shield, ArrowRight, ChevronRight} from "lucide-react";
import {useState, useEffect} from "react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPage");
  const [activeSection, setActiveSection] = useState("");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = privacySections.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (const section of sections.reverse()) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedDate = new Date(privacyPolicyMeta.lastUpdated).toLocaleDateString("en-US", {
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
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-6 h-6 text-primary" />
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
          CONTENT
          ============================ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Sidebar — Table of Contents (desktop only) */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">
                {t("tableOfContents")}
              </p>
              <ul className="space-y-1">
                {privacySections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <article className="min-w-0">
            {/* Mobile: collapsible TOC */}
            <div className="lg:hidden mb-8">
              <details className="group bg-gray-50 rounded-xl border border-gray-100">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-gray-700">
                  {t("tableOfContents")}
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <ul className="px-4 pb-3 space-y-1">
                  {privacySections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block text-sm text-gray-500 hover:text-primary py-1"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {privacySections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  {/* Section number + title */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-neutral leading-tight pt-0.5">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section content paragraphs */}
                  <div className="pl-11 space-y-4">
                    {section.content.map((paragraph, pi) => (
                      <p key={pi} className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))}

                    {/* Subsections */}
                    {section.subsections?.map((sub, si) => (
                      <div key={si} className="mt-6">
                        <h3 className="text-base font-semibold text-neutral mb-2">
                          {sub.title}
                        </h3>
                        {sub.content.map((p, pi) => (
                          <p key={pi} className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">
                            {p}
                          </p>
                        ))}
                        {sub.items && (
                          <ul className="space-y-2 mt-3">
                            {sub.items.map((item, ii) => (
                              <li
                                key={ii}
                                className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base"
                              >
                                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  {index < privacySections.length - 1 && (
                    <div className="mt-10 border-b border-gray-100" />
                  )}
                </section>
              ))}
            </div>

            {/* CTA at bottom */}
            <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 text-center">
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
          </article>
        </div>
      </div>
    </main>
  );
}
