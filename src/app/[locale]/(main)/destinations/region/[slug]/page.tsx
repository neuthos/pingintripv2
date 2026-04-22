import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {
  getRegionBySlug,
  getPlacesByRegion,
  regions,
  type Place,
} from "@/data/destinations";
import {companyInfo} from "@/data/company";
import OptimizedImage from "@/components/ui/optimized-image";
import {ArrowLeft, MapPin, ChevronRight, Clock, Tag} from "lucide-react";

// ============================
// Static Generation
// ============================

export async function generateStaticParams() {
  return regions.map((r) => ({slug: r.slug}));
}

// ============================
// Dynamic Metadata
// ============================

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({params}: PageProps) {
  const {locale, slug} = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};

  const getName = (obj: {en: string; id: string; zh: string}) =>
    obj[locale as keyof typeof obj] || obj.en;

  const regionName = getName(region.name);
  const tagline = getName(region.tagline);
  const description = getName(region.description);

  return {
    title: `${regionName} — ${tagline} | ${companyInfo.name}`,
    description,
    openGraph: {
      title: `${regionName} — ${tagline}`,
      description,
      type: "website",
      siteName: companyInfo.name,
    },
  };
}

// ============================
// Page Component
// ============================

export default async function RegionDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const region = getRegionBySlug(slug);
  if (!region) notFound();

  const regionPlaces = getPlacesByRegion(region.id);
  const t = await getTranslations("RegionDetailPage");

  const getName = (obj: {en: string; id: string; zh: string}) =>
    obj[locale as keyof typeof obj] || obj.en;

  const regionName = getName(region.name);
  const tagline = getName(region.tagline);
  const description = getName(region.description);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: regionName,
    description,
    touristType: region.popularFor,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: region.province,
      containedInPlace: {
        "@type": "Country",
        name: "Indonesia",
      },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {/* Hero */}
      <header className="relative h-[55vh] md:h-[65vh] min-h-[400px]">
        <OptimizedImage
          src={region.image}
          alt={regionName}
          fill
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-2" />

        {/* Back button */}
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToDestinations")}
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-3 p-6 md:p-10 lg:p-14">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1.5 text-white/50 text-xs mb-3"
              aria-label="Breadcrumb"
            >
              <Link
                href="/destinations"
                className="hover:text-white/80 transition-colors"
              >
                {t("breadcrumbDestinations")}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{regionName}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              {regionName}
            </h1>
            <p className="text-white/60 text-sm md:text-base italic mb-4">
              {tagline}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 text-white/70 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <MapPin className="w-3 h-3" />
                {region.province}
              </span>
              {region.popularFor.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-white/60 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full capitalize"
                >
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-2xl font-bold text-neutral mb-5">
              {t("aboutRegion", {region: regionName})}
            </h2>
            <p
              className="text-base md:text-lg text-gray-600 leading-relaxed"
              style={{fontFamily: "var(--font-lora), serif"}}
            >
              {description}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Quick Info */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-sm font-bold text-neutral mb-4">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Province
                    </span>
                    <span className="font-semibold text-neutral">
                      {region.province}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-start justify-between text-sm gap-3">
                    <span className="text-gray-500 flex items-center gap-2 shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                      {t("popularFor")}
                    </span>
                    <span className="font-semibold text-neutral text-right capitalize text-xs leading-relaxed">
                      {region.popularFor
                        .slice(0, 3)
                        .map((tag) => tag.replace(/-/g, " "))
                        .join(", ")}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {t("places")}
                    </span>
                    <span className="font-semibold text-neutral">
                      {regionPlaces.length} {t("placesCount")}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1a1a1a] rounded-2xl p-5 text-center">
                <h3 className="text-white font-bold text-base mb-2">
                  {t("ctaTitle")}
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  {t("ctaDesc")}
                </p>
                <Link
                  href="/enquiry"
                  className="btn btn-primary btn-sm w-full text-xs font-bold"
                >
                  {t("ctaBtn")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Places Grid */}
      {regionPlaces.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-lg md:text-xl font-bold text-neutral mb-6">
              {t("explorePlaces", {region: regionName})}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  getName={getName}
                  viewDetailsLabel={t("viewDetails")}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse Trips CTA */}
      <section className="border-t border-gray-100 py-12 md:py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-neutral mb-3">
            {t("tripsTitle", {region: regionName})}
          </h2>
          <p className="text-gray-500 text-sm mb-6">{t("tripsDesc")}</p>
          <Link
            href="/packages"
            className="btn btn-primary btn-md rounded-lg text-sm font-semibold gap-2 px-8"
          >
            {t("browseTrips")}
          </Link>
        </div>
      </section>
    </main>
  );
}

// ============================
// Place Card Component
// ============================

function PlaceCard({
  place,
  getName,
  viewDetailsLabel,
}: {
  place: Place;
  getName: (obj: {en: string; id: string; zh: string}) => string;
  viewDetailsLabel: string;
}) {
  return (
    <Link
      href={`/destinations/${place.slug}`}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-3/2">
        <OptimizedImage
          src={place.image}
          alt={getName(place.name)}
          fill
          objectFit="cover"
        />
        <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
          {place.category}
        </span>
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-neutral text-sm mb-1 leading-tight group-hover:text-gray-700 transition-colors">
          {getName(place.name)}
        </h3>
        <p className="text-[11px] text-gray-400 mb-2.5 line-clamp-2">
          {getName(place.description)}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <Clock className="w-3 h-3" />
            {place.estimatedDuration}
          </span>
          <span className="text-[11px] font-bold text-neutral group-hover:underline">
            {viewDetailsLabel} →
          </span>
        </div>
      </div>
    </Link>
  );
}
