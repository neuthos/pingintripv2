"use client";

import {useState, useMemo, useCallback} from "react";
import {useTranslations, useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import {
  getOpenTrips,
  filterOpenTrips,
  formatPrice,
  getDefaultCurrency,
  getOpenTripTitle,
  getOpenTripRoute,
  getPhysicalRatingLabel,
  type OpenTrip,
  type Currency,
} from "@/data/packages";
import {regions} from "@/data/destinations";
import OptimizedImage from "@/components/ui/optimized-image";
import {
  Search,
  X,
  MapPin,
  Calendar,
  Users,
  Gauge,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

// ============================
// Sort options
// ============================

type SortOption = "popular" | "price-low" | "price-high" | "duration-short" | "duration-long";

function sortTrips(trips: OpenTrip[], sort: SortOption, currency: Currency): OpenTrip[] {
  const sorted = [...trips];
  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    case "price-low":
      return sorted.sort(
        (a, b) =>
          (a.price[currency].discountedAmount || a.price[currency].amount) -
          (b.price[currency].discountedAmount || b.price[currency].amount),
      );
    case "price-high":
      return sorted.sort(
        (a, b) =>
          (b.price[currency].discountedAmount || b.price[currency].amount) -
          (a.price[currency].discountedAmount || a.price[currency].amount),
      );
    case "duration-short":
      return sorted.sort((a, b) => a.durationDays - b.durationDays);
    case "duration-long":
      return sorted.sort((a, b) => b.durationDays - a.durationDays);
    default:
      return sorted;
  }
}

// ============================
// Duration range options
// ============================

const durationRanges = [
  {label: "All", min: 0, max: 99},
  {label: "7 days or less", min: 0, max: 7},
  {label: "8-10 days", min: 8, max: 10},
  {label: "11-14 days", min: 11, max: 14},
  {label: "15+ days", min: 15, max: 99},
];

// ============================
// Main Page Component
// ============================

export default function OpenTripsPage() {
  const t = useTranslations("OpenTripsPage");
  const locale = useLocale();
  const currency = getDefaultCurrency(locale);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters
  const filteredTrips = useMemo(() => {
    const range = durationRanges[selectedDuration];
    const filtered = filterOpenTrips({
      regionId: selectedRegion || undefined,
      minDuration: range.min || undefined,
      maxDuration: range.max < 99 ? range.max : undefined,
      search: searchQuery || undefined,
      locale,
    });
    return sortTrips(filtered, sortBy, currency);
  }, [searchQuery, selectedRegion, selectedDuration, sortBy, locale, currency]);

  // Get localized name helper
  const getName = useCallback(
    (obj: {en: string; id: string; cn: string}) =>
      obj[locale as keyof typeof obj] || obj.en,
    [locale],
  );

  // Active filter count (excluding "All" states)
  const activeFilterCount = [
    selectedRegion !== "",
    selectedDuration !== 0,
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRegion("");
    setSelectedDuration(0);
  };

  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero Header */}
      <header className="bg-[#1a1a1a] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.15em] mb-3">
            {t("title")}
          </h1>
          <p
            className="text-sm md:text-base text-white/50 max-w-lg mx-auto mb-6"
            style={{fontFamily: "var(--font-lora), serif", fontStyle: "italic"}}
          >
            {t("subtitle")}
          </p>
          <p className="text-white/30 text-xs uppercase tracking-wider">
            {t("tourCount", {count: getOpenTrips().length})}
          </p>
        </div>
      </header>

      {/* Google Signup Discount Banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-center">
          <span className="text-amber-600 text-lg">🎉</span>
          <p className="text-xs md:text-sm text-amber-800/80">
            {t("googleDiscount")}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-3 py-3">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-gray-50 border border-gray-200 text-sm pl-10 pr-8 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2 rounded-lg focus:outline-none focus:border-gray-400 cursor-pointer"
              >
                <option value="">{t("allRegions")}</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {getName(r.name)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                className="appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2 rounded-lg focus:outline-none focus:border-gray-400 cursor-pointer"
              >
                {durationRanges.map((range, i) => (
                  <option key={i} value={i}>
                    {i === 0 ? t("allDurations") : range.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2 rounded-lg focus:outline-none focus:border-gray-400 cursor-pointer"
              >
                <option value="popular">{t("sortPopular")}</option>
                <option value="price-low">{t("sortPriceLow")}</option>
                <option value="price-high">{t("sortPriceHigh")}</option>
                <option value="duration-short">{t("sortDurationShort")}</option>
                <option value="duration-long">{t("sortDurationLong")}</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-700 underline shrink-0"
              >
                {t("clearFilters")}
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex md:hidden items-center justify-between py-3">
            <p className="text-sm text-gray-600">
              <span className="font-bold">{filteredTrips.length}</span> {t("tripsFound")}
            </p>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {t("filters")}
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filters Panel */}
          {showMobileFilters && (
            <div className="md:hidden pb-4 space-y-3 border-t border-gray-100 pt-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full bg-gray-50 border border-gray-200 text-sm pl-10 pr-8 py-2.5 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Region */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2.5 rounded-lg"
                  >
                    <option value="">{t("allRegions")}</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {getName(r.name)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* Duration */}
                <div className="relative">
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2.5 rounded-lg"
                  >
                    {durationRanges.map((range, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? t("allDurations") : range.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort + Clear */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-sm pl-3 pr-8 py-2.5 rounded-lg"
                  >
                    <option value="popular">{t("sortPopular")}</option>
                    <option value="price-low">{t("sortPriceLow")}</option>
                    <option value="price-high">{t("sortPriceHigh")}</option>
                    <option value="duration-short">{t("sortDurationShort")}</option>
                    <option value="duration-long">{t("sortDurationLong")}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    {t("clearFilters")}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count (Desktop) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <p className="text-sm text-gray-500">
          {t("showing")} <span className="font-bold text-gray-700">{filteredTrips.length}</span> {t("tripsFound")}
        </p>
      </div>

      {/* Tour Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                locale={locale}
                currency={currency}
                getName={getName}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-base font-medium mb-2">{t("noResultsTitle")}</p>
            <p className="text-gray-400 text-sm mb-6">{t("noResultsDesc")}</p>
            <button
              onClick={clearAllFilters}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("clearFilters")}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

// ============================
// Trip Card Component
// ============================

interface TripCardProps {
  trip: OpenTrip;
  locale: string;
  currency: Currency;
  getName: (obj: {en: string; id: string; cn: string}) => string;
  t: ReturnType<typeof useTranslations>;
}

function TripCard({trip, locale, currency, getName, t}: TripCardProps) {
  const title = getOpenTripTitle(trip, locale);
  const route = getOpenTripRoute(trip, locale);
  const price = trip.price[currency];
  const physicalLabel = getName(getPhysicalRatingLabel(trip.physicalRating));
  const region = regions.find((r) => r.id === trip.regionId);
  const regionName = region ? getName(region.name) : "";

  // Discount percentage
  const discountPercent =
    price.discountedAmount && price.amount > 0
      ? Math.round(((price.amount - price.discountedAmount) / price.amount) * 100)
      : 0;

  return (
    <Link
      href={`/packages/${trip.slug}`}
      className="group block"
    >
      <div className="relative aspect-3/4 rounded-xl overflow-hidden">
        {/* Image */}
        <OptimizedImage
          src={trip.image}
          alt={title}
          fill
          objectFit="cover"
        />

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 z-3 flex flex-col gap-1.5">
          {trip.featured && (
            <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {t("popular")}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Duration badge top-right */}
        <div className="absolute top-3 right-3 z-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {trip.durationDays} {t("days")}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-2" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-3">
          {/* Region tag */}
          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1.5">
            {regionName}
          </p>

          {/* Title */}
          <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2 group-hover:text-white/90 transition-colors">
            {title}
          </h3>

          {/* Route & Physical Rating */}
          <div className="flex items-center gap-3 mb-3">
            <p className="text-white/50 text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {route}
            </p>
            <p className="text-white/40 text-[10px] flex items-center gap-1">
              <Gauge className="w-3 h-3" />
              {physicalLabel}
            </p>
          </div>

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
                  {formatPrice(price.discountedAmount, currency)}
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
            {t("viewTrip")}
          </span>
        </div>
      </div>
    </Link>
  );
}
