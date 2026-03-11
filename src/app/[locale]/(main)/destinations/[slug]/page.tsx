import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {
  getPlaceBySlug,
  getRegionById,
  getPlacesByRegion,
  getAllPlaceSlugs,
  type Place,
} from "@/data/destinations";
import {companyInfo} from "@/data/company";
import OptimizedImage from "@/components/ui/optimized-image";
import AddToTripButton from "@/components/ui/add-to-trip-button";
import {ArrowLeft, Clock, Tag, MapPin, ChevronRight} from "lucide-react";

// ============================
// Static Generation
// ============================

export async function generateStaticParams() {
  return getAllPlaceSlugs().map((slug) => ({slug}));
}

// ============================
// Dynamic Metadata
// ============================

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({params}: PageProps) {
  const {locale, slug} = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const region = getRegionById(place.regionId);
  const getName = (obj: {en: string; id: string; cn: string}) =>
    obj[locale as keyof typeof obj] || obj.en;

  const placeName = getName(place.name);
  const regionName = region ? getName(region.name) : "";
  const description = getName(place.description);

  return {
    title: `${placeName} — ${regionName} | ${companyInfo.name}`,
    description,
    openGraph: {
      title: `${placeName} — ${regionName}`,
      description,
      type: "website",
      siteName: companyInfo.name,
    },
  };
}

// ============================
// Page Component (Server)
// ============================

export default async function PlaceDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const region = getRegionById(place.regionId);
  const relatedPlaces = getPlacesByRegion(place.regionId)
    .filter((p) => p.id !== place.id)
    .slice(0, 6);

  const t = await getTranslations("PlaceDetailPage");

  const getName = (obj: {en: string; id: string; cn: string}) =>
    obj[locale as keyof typeof obj] || obj.en;

  const placeName = getName(place.name);
  const regionName = region ? getName(region.name) : "";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: placeName,
    description: getName(place.longDescription),
    touristType: place.category,
    ...(region && {
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: regionName,
      },
    }),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {/* Hero */}
      <header className="relative h-[50vh] md:h-[60vh] min-h-[360px]">
        <OptimizedImage
          src={place.image}
          alt={placeName}
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
              {region && (
                <>
                  <span className="text-white/60">
                    {regionName}
                  </span>
                  <ChevronRight className="w-3 h-3" />
                </>
              )}
              <span className="text-white/90">{placeName}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {placeName}
            </h1>

            <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed">
              {getName(place.description)}
            </p>

            {/* Meta chips */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 text-white/70 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock className="w-3 h-3" />
                {place.estimatedDuration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/70 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full capitalize">
                <Tag className="w-3 h-3" />
                {place.category}
              </span>
              {region && (
                <span className="inline-flex items-center gap-1.5 text-white/70 text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  {regionName}
                </span>
              )}
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
              {t("aboutPlace", {place: placeName})}
            </h2>
            <p
              className="text-base md:text-lg text-gray-600 leading-relaxed"
              style={{fontFamily: "var(--font-lora), serif"}}
            >
              {getName(place.longDescription)}
            </p>

            {/* Gallery */}
            {place.gallery.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">
                  {t("gallery")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[place.image, ...place.gallery].map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-4/3 rounded-xl overflow-hidden"
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${placeName} ${i + 1}`}
                        fill
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-sm font-bold text-neutral mb-4">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {t("duration")}
                    </span>
                    <span className="font-semibold text-neutral">
                      {place.estimatedDuration}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      {t("category")}
                    </span>
                    <span className="font-semibold text-neutral capitalize">
                      {place.category}
                    </span>
                  </div>
                  {region && (
                    <>
                      <div className="h-px bg-gray-200" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          Region
                        </span>
                        <span className="font-semibold text-neutral">
                          {regionName}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Add to Trip CTA */}
              <div className="bg-[#1a1a1a] rounded-2xl p-5 text-center">
                <h3 className="text-white font-bold text-base mb-2">
                  {t("addToTrip")}
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  {t("addToTripDesc")}
                </p>
                <AddToTripButton
                  placeId={place.id}
                  addLabel={t("addToTripBtn")}
                  addedLabel={t("addedToTrip")}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Places */}
      {relatedPlaces.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-lg md:text-xl font-bold text-neutral mb-6">
              {t("relatedPlaces", {region: regionName})}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPlaces.map((rp) => (
                <RelatedPlaceCard
                  key={rp.id}
                  place={rp}
                  getName={getName}
                  viewDetailsLabel={t("viewDetails")}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ============================
// Related Place Card
// ============================

function RelatedPlaceCard({
  place,
  getName,
  viewDetailsLabel,
}: {
  place: Place;
  getName: (obj: {en: string; id: string; cn: string}) => string;
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
