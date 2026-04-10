"use client";

import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  Compass,
  Heart,
  Leaf,
  MapPin,
  Quote,
  Users,
} from "lucide-react";
import {places, regions} from "@/data/destinations";

import {Link} from "@/i18n/navigation";
import OptimizedImage from "@/components/ui/optimized-image";
import {companyInfo} from "@/data/company";
import {useTranslations} from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - companyInfo.founded;
  const totalDestinations = places.length;
  const totalRegions = regions.length;

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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-white/40 mb-6">
            {t("heroTag")}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            {t("heroTitle")}
          </h1>

          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("heroDesc")}
          </p>
        </div>
      </section>

      {/* ============================
          ORIGIN STORY
          ============================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                {/* Placeholder for founder image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <OptimizedImage
                    src="/assets/reza"
                    alt="Reza guiding travelers through Indonesia"
                  />
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-content rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-2xl font-bold">{yearsActive}+</p>
                <p className="text-xs font-medium opacity-80">
                  {t("statsYears")}
                </p>
              </div>
            </div>

            {/* Story text */}
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
                {t("storyTag")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-6 leading-tight">
                {t("storyTitle")}
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>

                <div className="bg-gray-50 border-l-4 border-primary rounded-r-xl px-5 py-4 my-6">
                  <Quote className="w-5 h-5 text-primary mb-2 opacity-50" />
                  <p className="text-neutral font-medium italic leading-relaxed">
                    {t("storyP3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          PHILOSOPHY / VALUES
          ============================ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
              {t("philoTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("philoTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: t("philo1Title"),
                desc: t("philo1Desc"),
                color: "bg-rose-50 text-rose-500",
              },
              {
                icon: BookOpen,
                title: t("philo2Title"),
                desc: t("philo2Desc"),
                color: "bg-amber-50 text-amber-500",
              },
              {
                icon: Leaf,
                title: t("philo3Title"),
                desc: t("philo3Desc"),
                color: "bg-emerald-50 text-emerald-500",
              },
            ].map(({icon: Icon, title, desc, color}) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          STATS
          ============================ */}
      <section className="py-16 md:py-20 bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-white/40 mb-4">
              {t("statsTag")}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                value: `${yearsActive}+`,
                label: t("statsYears"),
                icon: CalendarCheck,
              },
              {value: "500+", label: t("statsGuests"), icon: Users},
              {value: "50+", label: t("statsGuides"), icon: Compass},
              {
                value: `${totalDestinations}`,
                label: t("statsDestinations"),
                icon: MapPin,
              },
            ].map(({value, label, icon: Icon}) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{value}</p>
                <p className="text-xs text-white/50 font-medium uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          TEAM
          ============================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
              {t("teamTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("teamTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Reza */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <OptimizedImage
                  width={96}
                  height={96}
                  className="mx-auto rounded-full text-gray-400"
                  src="/assets/reza"
                  alt={"reza"}
                />
              </div>
              <h3 className="text-lg font-bold text-neutral mb-1">Reza</h3>
              <p className="text-xs uppercase tracking-wider text-primary font-bold mb-4">
                {t("teamRezaRole")}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t("teamRezaBio")}
              </p>
            </div>

            {/* Galang */}
            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <OptimizedImage
                  width={96}
                  height={96}
                  className="mx-auto rounded-full text-gray-400"
                  src="/assets/galang"
                  alt={"galang-ardian"}
                />
              </div>
              <h3 className="text-lg font-bold text-neutral mb-1">
                Galang Ardian
              </h3>
              <p className="text-xs uppercase tracking-wider text-primary font-bold mb-4">
                {t("teamGalangRole")}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t("teamGalangBio")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          GALLERY
          ============================ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
              {t("galleryTag")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              {t("galleryTitle")}
            </h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Row 1 — large + 2 small */}
            <div className="col-span-2 row-span-2 aspect-square rounded-2xl overflow-hidden relative group">
              <OptimizedImage
                src="/assets/pingintrip"
                alt="Group photo with travelers exploring Indonesia"
                fill
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/reza-tour"
                alt="Reza guiding travelers on hiking adventure"
                fill
                objectFit="cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/beach-enjoy"
                alt="Travelers enjoying beach moment in Indonesia"
                fill
                objectFit="cover"
              />
            </div>

            {/* Row 2 */}
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/our-agenda-to-local"
                alt="Local cultural experience and community visit"
                fill
                objectFit="cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/girl-with-cup-of-coffee"
                alt="Traveler enjoying local coffee experience"
                fill
                objectFit="cover"
              />
            </div>

            {/* Row 3 — 2 small + large */}
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/share-drawing-book-to-cildren"
                alt="Sharing moments with local children"
                fill
                objectFit="cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/travel-discussion"
                alt="Travel discussion and planning with travelers"
                fill
                objectFit="cover"
              />
            </div>
            <div className="col-span-2 aspect-video rounded-2xl overflow-hidden relative">
              <OptimizedImage
                src="/assets/woman-in-boat"
                alt="Traveler enjoying boat experience in Indonesia"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          TRUST
          ============================ */}
      {/* <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-6 h-6 text-gray-400" />
          </div>
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-primary mb-4">
            {t("trustTag")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
            {t("trustTitle")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            {t("trustDesc")}
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-3xl mx-auto">
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] bg-white rounded-xl border border-gray-200 flex items-center justify-center p-4 hover:shadow-sm transition-shadow"
              >
                <div className="text-center">
                  <Building2 className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                  <p className="text-[9px] text-gray-300 font-medium">
                    Company Logo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ============================
          CTA
          ============================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed max-w-xl mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-black transition-colors"
            >
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-neutral text-sm font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
