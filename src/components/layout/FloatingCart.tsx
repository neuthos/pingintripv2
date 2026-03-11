"use client";

import {useState, useEffect, useCallback} from "react";
import {useTranslations, useLocale} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {
  regions,
  places,
  type Place,
} from "@/data/destinations";
import {
  ShoppingBag,
  Trash2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
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
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `selectedPlaces=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

// ============================
// FloatingCart Component
// ============================

export default function FloatingCart() {
  const t = useTranslations("DestinationsPage");
  const locale = useLocale();
  const pathname = usePathname();
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const getName = useCallback(
    (obj: {en: string; id: string; cn: string}) =>
      obj[locale as keyof typeof obj] || obj.en,
    [locale],
  );

  // Hydrate from cookies + listen for changes
  useEffect(() => {
    const load = () => {
      const savedIds = getSelectedPlacesFromCookies();
      const restored = savedIds
        .map((id) => places.find((p) => p.id === id))
        .filter(Boolean) as Place[];
      setSelectedPlaces(restored);
    };

    load();
    setHydrated(true);

    // Poll for cookie changes (from other components like AddToTripButton)
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const removePlace = useCallback((placeId: string) => {
    setSelectedPlaces((prev) => {
      const updated = prev.filter((p) => p.id !== placeId);
      saveSelectedPlacesToCookies(updated.map((p) => p.id));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedPlaces([]);
    saveSelectedPlacesToCookies([]);
  }, []);

  if (!hydrated || selectedPlaces.length === 0 || pathname === "/enquiry") return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        selectedPlaces.length > 0 ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={selectedPlaces.length === 0}
    >
      {/* Expandable cart panel */}
      <div
        className={`bg-white border-t border-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ${
          cartOpen ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-y-auto max-h-[45vh]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-neutral">
              {t("selectedPlaces")} ({selectedPlaces.length})
            </h4>
            <button
              onClick={clearAll}
              className="text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              {t("clearAll")}
            </button>
          </div>
          <div className="space-y-2">
            {selectedPlaces.map((place) => {
              const region = regions.find((r) => r.id === place.regionId);
              return (
                <div
                  key={place.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-neutral">
                      {getName(place.name)}
                    </p>
                    {region && (
                      <p className="text-[11px] text-gray-400">
                        {getName(region.name)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removePlace(place.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {selectedPlaces.length}
              </span>
            </div>
            <span className="text-sm font-medium">{t("yourTrip")}</span>
            {cartOpen ? (
              <ChevronDown className="w-4 h-4 text-white/50" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white/50" />
            )}
          </button>
          <Link href="/enquiry" className="bg-white text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            {t("makeEnquiry")}
          </Link>
        </div>
      </div>
    </div>
  );
}
