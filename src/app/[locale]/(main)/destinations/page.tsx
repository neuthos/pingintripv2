"use client";

import {useState, useMemo, useCallback, useEffect} from "react";
import {useTranslations} from "next-intl";
import {useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import {
  regions,
  places,
  getPlacesByRegion,
  type Place,
} from "@/data/destinations";
import {companyInfo} from "@/data/company";
import OptimizedImage from "@/components/ui/optimized-image";
import {
  Search,
  X,
  Plus,
  Check,
  MapPin,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";

// ============================
// Cookie helpers
// ============================

function getSelectedPlacesFromCookies(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(/(?:^|; )selectedPlaces=([^;]*)/);
  if (!match) return [];
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return [];
  }
}

function saveSelectedPlacesToCookies(placeIds: string[]) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(placeIds));
  // Cookie expires in 30 days
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `selectedPlaces=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

// ============================
// Main Page
// ============================

export default function DestinationsPage() {
  const t = useTranslations("DestinationsPage");
  const locale = useLocale();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRegionIds, setExpandedRegionIds] = useState<Set<string>>(
    () => new Set(regions.map((r) => r.id)),
  );
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [detailPlace, setDetailPlace] = useState<Place | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const isSearching = searchQuery.trim().length > 0;

  // Hydrate selected places from cookies on mount
  useEffect(() => {
    const savedIds = getSelectedPlacesFromCookies();
    if (savedIds.length > 0) {
      const restored = savedIds
        .map((id) => places.find((p) => p.id === id))
        .filter(Boolean) as Place[];
      setSelectedPlaces(restored);
    }
    setHydrated(true);
  }, []);

  // Persist to cookies whenever selection changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    saveSelectedPlacesToCookies(selectedPlaces.map((p) => p.id));
  }, [selectedPlaces, hydrated]);

  // Search only places
  const searchedPlaces = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase().trim();
    return places.filter((place) => {
      const nameMatch =
        place.name.en.toLowerCase().includes(q) ||
        place.name.id.toLowerCase().includes(q) ||
        place.name.cn.toLowerCase().includes(q);
      const descMatch =
        place.description.en.toLowerCase().includes(q) ||
        place.description.id.toLowerCase().includes(q) ||
        place.description.cn.toLowerCase().includes(q);
      const catMatch = place.category.toLowerCase().includes(q);
      return nameMatch || descMatch || catMatch;
    });
  }, [searchQuery, isSearching]);

  // Regions that have matched places (for TOC filtering during search)
  const searchedRegionIds = useMemo(() => {
    if (!isSearching) return new Set<string>();
    return new Set(searchedPlaces.map((p) => p.regionId));
  }, [isSearching, searchedPlaces]);

  // TOC regions to show — all when not searching, only matched when searching
  const tocRegions = useMemo(() => {
    if (!isSearching) return regions;
    return regions.filter((r) => searchedRegionIds.has(r.id));
  }, [isSearching, searchedRegionIds]);

  // A region is expanded if it's in the set
  const isRegionExpanded = useCallback(
    (regionId: string) => expandedRegionIds.has(regionId),
    [expandedRegionIds],
  );

  // Get localized name
  const getName = useCallback(
    (obj: {en: string; id: string; cn: string}) =>
      obj[locale as keyof typeof obj] || obj.en,
    [locale],
  );

  // Toggle place selection
  const togglePlace = useCallback((place: Place) => {
    setSelectedPlaces((prev) => {
      const exists = prev.find((p) => p.id === place.id);
      if (exists) return prev.filter((p) => p.id !== place.id);
      return [...prev, place];
    });
  }, []);

  const isPlaceSelected = useCallback(
    (placeId: string) => selectedPlaces.some((p) => p.id === placeId),
    [selectedPlaces],
  );

  // Toggle accordion
  const toggleRegion = useCallback((regionId: string) => {
    setExpandedRegionIds((prev) => {
      const next = new Set(prev);
      if (next.has(regionId)) {
        next.delete(regionId);
      } else {
        next.add(regionId);
      }
      return next;
    });
  }, []);

  // Scroll to region accordion
  const scrollToRegion = useCallback((regionId: string) => {
    const el = document.getElementById(`region-${regionId}`);
    if (el) {
      el.scrollIntoView({behavior: "smooth", block: "start"});
      // Ensure it's expanded
      setExpandedRegionIds((prev) => {
        if (prev.has(regionId)) return prev;
        const next = new Set(prev);
        next.add(regionId);
        return next;
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero header */}
      <header className="bg-[#1a1a1a] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.15em] mb-3">
            {t("title")}
          </h1>
          <p
            className="text-sm md:text-base text-white/50 max-w-lg mx-auto mb-8"
            style={{fontFamily: "var(--font-lora), serif", fontStyle: "italic"}}
          >
            {t("subtitle")}
          </p>

          {/* How it works — 3 step guidance */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 max-w-2xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white/70 shrink-0">
                  {step}
                </div>
                <div className="text-left">
                  <p className="text-[11px] md:text-xs font-semibold text-white/80 leading-tight">
                    {t(`guidanceStep${step}` as "guidanceStep1")}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-white/35 leading-tight hidden md:block">
                    {t(`guidanceStep${step}Desc` as "guidanceStep1Desc")}
                  </p>
                </div>
                {step < 3 && (
                  <div className="w-6 md:w-10 h-px bg-white/15 ml-1" />
                )}
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-white/10 border border-white/20 text-white text-sm pl-11 pr-10 py-3 rounded-full placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Info banner */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-center">
          <span className="text-amber-600 text-lg">✨</span>
          <p className="text-xs md:text-sm text-amber-800/80">
            {t("infoBanner")}
          </p>
        </div>
      </div>

      {/* Regions List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex gap-8">
          {/* TOC Sidebar */}
          <nav className="hidden md:block w-48 shrink-0 sticky top-24 self-start">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
              Regions
            </h3>
            <ul className="space-y-1">
              {(isSearching ? tocRegions : regions).map((region) => (
                <li key={region.id}>
                  <button
                    onClick={() => {
                      if (isSearching) {
                        setSearchQuery("");
                        setTimeout(() => scrollToRegion(region.id), 100);
                      } else {
                        scrollToRegion(region.id);
                      }
                    }}
                    className="w-full text-left text-xs py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-neutral transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3 text-gray-300 shrink-0" />
                    {getName(region.name)}
                  </button>
                </li>
              ))}
              {isSearching && tocRegions.length === 0 && (
                <li className="text-[11px] text-gray-400 px-3 py-1">
                  {t("noResults")}
                </li>
              )}
            </ul>
          </nav>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            {/* Search results — flat cards (when searching) */}
            {isSearching ? (
              <>
                {searchedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchedPlaces.map((place) => (
                      <PlaceCardComponent
                        key={place.id}
                        place={place}
                        getName={getName}
                        isSelected={isPlaceSelected(place.id)}
                        onToggle={() => togglePlace(place)}
                        onDetail={() => setDetailPlace(place)}
                        t={t}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">{t("noResults")}</p>
                  </div>
                )}
              </>
            ) : (
              /* Region accordions (default view) */
              <div className="grid grid-cols-1 gap-4">
                {regions.map((region) => {
                  const expanded = isRegionExpanded(region.id);
                  const regionPlaces = getPlacesByRegion(region.id);

                  return (
                    <article
                      key={region.id}
                      id={`region-${region.id}`}
                      className="scroll-mt-24"
                    >
                      {/* Region Card */}
                      <button
                        onClick={() => toggleRegion(region.id)}
                        className={`w-full group relative rounded-xl overflow-hidden text-left cursor-pointer transition-all duration-300 ${
                          expanded ? "rounded-b-none" : ""
                        }`}
                        aria-expanded={expanded}
                      >
                        <div className="relative h-44 md:h-52">
                          <OptimizedImage
                            src={region.image}
                            alt={getName(region.name)}
                            fill
                            objectFit="cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent z-2 group-hover:from-black/90 transition-all duration-300" />

                          <div className="absolute inset-0 z-3 flex items-center px-6 md:px-10">
                            <div>
                              <h2 className="text-white font-bold text-xl md:text-3xl leading-tight mb-1">
                                {getName(region.name)}
                              </h2>
                              <p className="text-white/50 text-xs md:text-sm">
                                {getName(region.tagline)}
                              </p>
                              {regionPlaces.length > 0 && (
                                <p className="text-white/30 text-[11px] mt-2">
                                  {t("placesCount", {
                                    count: regionPlaces.length,
                                  })}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-3">
                            <div
                              className={`w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ${
                                expanded ? "rotate-180" : ""
                              }`}
                            >
                              <ChevronDown className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          expanded
                            ? "max-h-[1200px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-100 p-5 md:p-8">
                          {/* Description */}
                          <div
                            className={`transition-all duration-500 delay-100 ${
                              expanded
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-4 opacity-0"
                            }`}
                          >
                            <p
                              className="text-sm md:text-base text-gray-500 leading-relaxed mb-4 max-w-3xl"
                              style={{
                                fontFamily: "var(--font-lora), serif",
                                fontStyle: "italic",
                              }}
                            >
                              {getName(region.description)}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {region.popularFor.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] uppercase tracking-wider bg-white text-gray-500 px-3 py-1 rounded-full border border-gray-200"
                                >
                                  {tag.replace(/-/g, " ")}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Places — horizontal scroll */}
                          {regionPlaces.length > 0 ? (
                            <div
                              className={`transition-all duration-500 delay-200 ${
                                expanded
                                  ? "translate-y-0 opacity-100"
                                  : "-translate-y-6 opacity-0"
                              }`}
                            >
                              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
                                {t("placesCount", {count: regionPlaces.length})}
                              </h3>

                              <HorizontalPlacesScroll
                                places={regionPlaces}
                                expanded={expanded}
                                getName={getName}
                                isPlaceSelected={isPlaceSelected}
                                togglePlace={togglePlace}
                                setDetailPlace={setDetailPlace}
                                t={t}
                              />
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <MapPin className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-400 text-xs">
                                Places coming soon
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Need help section */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
          <p className="text-lg md:text-xl font-bold text-neutral mb-2">
            {t("needHelpTitle")}
          </p>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            {t("needHelpDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-black transition-colors"
            >
              <Phone className="w-4 h-4" />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Place Detail Modal */}
      <div
        className={`fixed inset-0 z-[60] flex items-end md:items-center justify-center transition-opacity duration-300 ${
          detailPlace
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!detailPlace}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setDetailPlace(null)}
        />
        {detailPlace && (
          <PlaceDetailModalContent
            place={detailPlace}
            getName={getName}
            isSelected={isPlaceSelected(detailPlace.id)}
            onToggle={() => togglePlace(detailPlace)}
            onClose={() => setDetailPlace(null)}
            t={t}
          />
        )}
      </div>
    </main>
  );
}

// ============================
// Horizontal Places Scroll with arrows
// ============================

interface HorizontalPlacesScrollProps {
  places: Place[];
  expanded: boolean;
  getName: (obj: {en: string; id: string; cn: string}) => string;
  isPlaceSelected: (id: string) => boolean;
  togglePlace: (place: Place) => void;
  setDetailPlace: (place: Place) => void;
  t: ReturnType<typeof useTranslations>;
}

function HorizontalPlacesScroll({
  places: regionPlaces,
  expanded,
  getName,
  isPlaceSelected,
  togglePlace,
  setDetailPlace,
  t,
}: HorizontalPlacesScrollProps) {
  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    if (node) scrollContainerRef.current = node;
  }, []);
  const scrollContainerRef = {current: null as HTMLDivElement | null};

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(
      `places-scroll-${regionPlaces[0]?.regionId}`,
    );
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/scroll">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-gray-50"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-gray-50"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>

      {/* Scrollable row */}
      <div
        id={`places-scroll-${regionPlaces[0]?.regionId}`}
        className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 scroll-smooth"
        style={{scrollbarWidth: "thin"}}
      >
        {regionPlaces.map((place, i) => (
          <div
            key={place.id}
            className={`shrink-0 w-[260px] md:w-[280px] transition-all duration-500 ${
              expanded
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: expanded ? `${250 + i * 80}ms` : "0ms",
            }}
          >
            <PlaceCardComponent
              place={place}
              getName={getName}
              isSelected={isPlaceSelected(place.id)}
              onToggle={() => togglePlace(place)}
              onDetail={() => setDetailPlace(place)}
              t={t}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================
// PlaceCard
// ============================

interface PlaceCardProps {
  place: Place;
  getName: (obj: {en: string; id: string; cn: string}) => string;
  isSelected: boolean;
  onToggle: () => void;
  onDetail: () => void;
  t: ReturnType<typeof useTranslations>;
}

function PlaceCardComponent({
  place,
  getName,
  isSelected,
  onToggle,
  onDetail,
  t,
}: PlaceCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <Link href={`/destinations/${place.slug}`} className="relative aspect-3/2 block cursor-pointer">
        <OptimizedImage
          src={place.image}
          alt={getName(place.name)}
          fill
          objectFit="cover"
        />
        <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-sm">
          {place.category}
        </span>
      </Link>

      <div className="p-3.5 flex flex-col flex-1">
        <h4 className="font-bold text-neutral text-sm mb-1 leading-tight">
          <Link
            href={`/destinations/${place.slug}`}
            className="hover:text-gray-700 transition-colors"
          >
            {getName(place.name)}
          </Link>
        </h4>
        <p className="text-[11px] text-gray-400 mb-2.5 line-clamp-2 flex-1">
          {getName(place.description)}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-3">
          <Clock className="w-3 h-3" />
          {place.estimatedDuration}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onToggle}
            className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              isSelected
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-[#1a1a1a] text-white hover:bg-black"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3 h-3" />
                {t("added")}
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                {t("addToTrip")}
              </>
            )}
          </button>
          <Link
            href={`/destinations/${place.slug}`}
            className="text-[11px] font-bold py-1.5 px-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-neutral transition-colors text-center"
          >
            {t("viewDetails")}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================
// PlaceDetailModal — dynamic gallery
// ============================

interface PlaceDetailModalContentProps {
  place: Place;
  getName: (obj: {en: string; id: string; cn: string}) => string;
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}

function PlaceDetailModalContent({
  place,
  getName,
  isSelected,
  onToggle,
  onClose,
  t,
}: PlaceDetailModalContentProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const allImages = [place.image, ...place.gallery];
  const hasMultipleImages = allImages.length > 1;

  const goToPrev = () =>
    setActiveGalleryIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  const goToNext = () =>
    setActiveGalleryIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1,
    );

  return (
    <div className="relative bg-white w-full md:max-w-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl animate-in slide-in-from-bottom-8 duration-300">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Main Gallery Image */}
      <div className="relative aspect-video">
        <OptimizedImage
          src={allImages[activeGalleryIndex]}
          alt={getName(place.name)}
          fill
          objectFit="cover"
        />

        {/* Nav arrows — only when multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Gallery Thumbnails — only when multiple images */}
      {hasMultipleImages && (
        <div className="flex gap-2 px-5 py-3 overflow-x-auto">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveGalleryIndex(i)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden relative transition-all ${
                i === activeGalleryIndex
                  ? "ring-2 ring-black ring-offset-1 opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <OptimizedImage
                src={img}
                alt={`${getName(place.name)} ${i + 1}`}
                fill
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-neutral">
            {getName(place.name)}
          </h3>
          <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full ml-3 shrink-0">
            {place.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {place.estimatedDuration}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {place.category}
          </span>
        </div>

        <p
          className="text-sm text-gray-600 leading-relaxed mb-6"
          style={{fontFamily: "var(--font-lora), serif"}}
        >
          {getName(place.longDescription)}
        </p>

        <button
          onClick={onToggle}
          className={`w-full text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isSelected
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-[#1a1a1a] text-white hover:bg-black"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              {t("added")}
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              {t("addToTrip")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
