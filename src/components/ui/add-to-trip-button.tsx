"use client";

import {useState, useEffect} from "react";
import {Plus, Check} from "lucide-react";

// ============================
// Cookie helpers (shared with destinations page)
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
// AddToTripButton
// ============================

interface AddToTripButtonProps {
  placeId: string;
  addLabel: string;
  addedLabel: string;
}

export default function AddToTripButton({
  placeId,
  addLabel,
  addedLabel,
}: AddToTripButtonProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = getSelectedPlacesFromCookies();
    setIsSelected(saved.includes(placeId));
    setHydrated(true);
  }, [placeId]);

  const toggle = () => {
    const current = getSelectedPlacesFromCookies();
    let updated: string[];
    if (current.includes(placeId)) {
      updated = current.filter((id) => id !== placeId);
      setIsSelected(false);
    } else {
      updated = [...current, placeId];
      setIsSelected(true);
    }
    saveSelectedPlacesToCookies(updated);
  };

  if (!hydrated) {
    return (
      <button
        disabled
        className="w-full text-sm font-bold py-3 rounded-xl bg-[#1a1a1a] text-white opacity-50 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`w-full text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
        isSelected
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-[#1a1a1a] text-white hover:bg-black"
      }`}
    >
      {isSelected ? (
        <>
          <Check className="w-4 h-4" />
          {addedLabel}
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" />
          {addLabel}
        </>
      )}
    </button>
  );
}
