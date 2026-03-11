"use client";

import {useState, useEffect, useMemo, useRef} from "react";
import {useTranslations, useLocale} from "next-intl";
import {useSession, signIn} from "next-auth/react";
import {Link} from "@/i18n/navigation";
import {
  places,
  regions,
  type Place,
} from "@/data/destinations";
import {companyInfo} from "@/data/company";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import {
  MapPin,
  Clock,
  X,
  ChevronDown,
  Phone,
  Send,
  Sparkles,
  CalendarDays,
  Users,
  Wallet,
  MessageSquareText,
  MessageCircle,
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

// ============================
// Office Hours helpers
// ============================

const OFFICE_OPEN_HOUR_GMT8 = 9; // 9am GMT+8
const OFFICE_CLOSE_HOUR_GMT8 = 23; // 11pm GMT+8

function getOfficeHoursInUserTimezone() {
  const now = new Date();
  const userTzOffset = now.getTimezoneOffset(); // minutes from UTC (negative for east)
  const gmt8Offset = -480; // GMT+8 = -480 minutes from UTC
  const diffMinutes = gmt8Offset - userTzOffset;
  const diffHours = diffMinutes / 60;

  const openLocal = OFFICE_OPEN_HOUR_GMT8 + diffHours;
  const closeLocal = OFFICE_CLOSE_HOUR_GMT8 + diffHours;

  return {openLocal, closeLocal, diffHours};
}

function formatHour(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const mins = (hour % 1) * 60;
  return `${h12}:${mins === 0 ? "00" : String(Math.round(mins)).padStart(2, "0")}${ampm}`;
}

function isOpenToday(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  return day >= 1 && day <= 5;
}

function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "GMT+8";
  }
}

// ============================
// Currency config
// ============================

const currencies = [
  {code: "IDR", symbol: "Rp", min: 3_000_000, max: 50_000_000, step: 500_000},
  {code: "USD", symbol: "$", min: 200, max: 5_000, step: 50},
  {code: "CNY", symbol: "¥", min: 1_500, max: 35_000, step: 500},
] as const;

function formatCurrency(value: number, code: string, symbol: string): string {
  if (code === "IDR") {
    return `${symbol} ${(value / 1_000_000).toFixed(1)} Jt`;
  }
  return `${symbol}${value.toLocaleString()}`;
}

// ============================
// Main Page
// ============================

export default function EnquiryPage() {
  const t = useTranslations("EnquiryPage");
  const locale = useLocale();
  const {data: session} = useSession();

  // --- Trip State ---
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [placeDropdownOpen, setPlaceDropdownOpen] = useState(false);
  const [placeSearch, setPlaceSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState(1);
  const [travelers, setTravelers] = useState("2");
  const [isFamily, setIsFamily] = useState(false);
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 0]);
  const [comments, setComments] = useState("");

  // --- Details State ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  // Hydration
  const [hydrated, setHydrated] = useState(false);

  const currency = currencies[currencyIdx];

  // Initialize budget range when currency changes
  useEffect(() => {
    setBudgetRange([currency.min, Math.round(currency.max * 0.4)]);
  }, [currencyIdx, currency.min, currency.max]);

  // Hydrate from cookies + session
  useEffect(() => {
    const savedIds = getSelectedPlacesFromCookies();
    if (savedIds.length > 0) {
      setSelectedPlaceIds(savedIds);
    }
    setHydrated(true);
  }, []);

  // Pre-fill from Google session
  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(" ") || [];
      if (nameParts.length > 0 && !firstName) setFirstName(nameParts[0]);
      if (nameParts.length > 1 && !lastName) setLastName(nameParts.slice(1).join(" "));
      if (session.user.email && !email) setEmail(session.user.email);
      if (session.user.email) setConfirmEmail(session.user.email);
    }
  }, [session]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlaceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Date helpers (must be before month validation effect)
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentYear = now.getFullYear();
  const yearOptions = Array.from({length: 3}, (_, i) => currentYear + i);

  // Reset month if it's in the past when year is current year
  useEffect(() => {
    if (year === String(currentYear) && month !== "" && Number(month) < currentMonth) {
      setMonth("");
    }
  }, [year, currentYear, currentMonth, month]);

  // Reset family checkbox when travelers < 3
  useEffect(() => {
    if (Number(travelers) < 3) {
      setIsFamily(false);
    }
  }, [travelers]);

  const getName = (obj: {en: string; id: string; cn: string}) =>
    obj[locale as keyof typeof obj] || obj.en;

  const selectedPlaces = useMemo(
    () => selectedPlaceIds.map((id) => places.find((p) => p.id === id)).filter(Boolean) as Place[],
    [selectedPlaceIds],
  );

  const filteredPlaces = useMemo(() => {
    if (!placeSearch.trim()) return places;
    const q = placeSearch.toLowerCase();
    return places.filter(
      (p) =>
        getName(p.name).toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [placeSearch, locale]);

  // Office hours
  const officeHours = useMemo(() => getOfficeHoursInUserTimezone(), []);
  const userTz = useMemo(() => getUserTimezone(), []);
  const openToday = isOpenToday();

  const togglePlace = (placeId: string) => {
    setSelectedPlaceIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId],
    );
  };

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validation
    if (email !== confirmEmail) {
      setSubmitError("Email addresses do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const monthNames: string[] = t.raw("months");
      const destinationNames = selectedPlaces.map((p) => getName(p.name)).join(", ");

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          destinations: destinationNames,
          month: month !== "" ? monthNames[Number(month)] : "",
          year,
          duration,
          travelers,
          isFamily,
          budgetMin: budgetRange[0],
          budgetMax: budgetRange[1],
          currency: currency.code,
          comments,
          hearAbout,
          newsletter,
          googleSignIn: !!session,
          locale,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) return null;

  const monthNames: string[] = t.raw("months");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{t("pageTitle")}</h1>

          <div className="w-10 h-0.5 bg-white/30 mx-auto mb-4" />

          <p className="text-lg md:text-xl font-semibold text-white/90 mb-2">
            {openToday
              ? t("openToday", {time: formatHour(officeHours.closeLocal)})
              : t("closedToday")}
          </p>

          <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            {t("headerDesc", {phone: companyInfo.phone})}
          </p>
        </div>
      </header>

      {/* Form + Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* ============================
                  YOUR TRIP
                  ============================ */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-sm uppercase tracking-widest font-bold text-neutral mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t("yourTrip")}
                </h2>

                {/* Where to go — Multi select */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-neutral mb-2 block">
                    {t("whereToGo")} <span className="text-red-400">*</span>
                  </label>

                  <div className="relative" ref={dropdownRef}>
                    <div
                      className="min-h-[44px] bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex flex-wrap gap-1.5 items-center cursor-pointer"
                      onClick={() => setPlaceDropdownOpen(!placeDropdownOpen)}
                    >
                      {selectedPlaces.map((p) => (
                        <span
                          key={p.id}
                          className="inline-flex items-center gap-1 bg-primary text-primary-content text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {getName(p.name)}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlace(p.id);
                            }}
                            className="hover:text-red-300 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {selectedPlaces.length === 0 && (
                        <span className="text-gray-400 text-sm">{t("whereToGoPlaceholder")}</span>
                      )}
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto shrink-0" />
                    </div>

                    {/* Dropdown */}
                    {placeDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-hidden">
                        <div className="p-2 border-b border-gray-100">
                          <input
                            type="text"
                            value={placeSearch}
                            onChange={(e) => setPlaceSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full text-sm px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto max-h-52">
                          {filteredPlaces.map((p) => {
                            const region = regions.find((r) => r.id === p.regionId);
                            const isSelected = selectedPlaceIds.includes(p.id);
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => togglePlace(p.id)}
                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                  isSelected ? "bg-green-50" : ""
                                }`}
                              >
                                <div>
                                  <span className={`font-medium ${isSelected ? "text-green-700" : "text-neutral"}`}>
                                    {getName(p.name)}
                                  </span>
                                  {region && (
                                    <span className="text-gray-400 text-xs ml-2">{getName(region.name)}</span>
                                  )}
                                </div>
                                {isSelected && <span className="text-green-500 text-xs font-bold">✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* When to go + Duration */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-neutral mb-2 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                    {t("whenToGo")}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-gray-400 appearance-none"
                    >
                      <option value="">{t("selectMonth")}</option>
                      {monthNames.map((m: string, i: number) => {
                        const disabled =
                          year === String(currentYear) && i < currentMonth;
                        return (
                          <option key={i} value={String(i)} disabled={disabled}>
                            {m}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-gray-400 appearance-none"
                    >
                      <option value="">{t("selectYear")}</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>

                    <div>
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={duration}
                          onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-gray-400"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{t("days")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How many people */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-neutral mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    {t("howMany")} <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4 items-start">
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-gray-400 appearance-none"
                    >
                      {Array.from({length: 15}, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n}
                        </option>
                      ))}
                      <option value="15+">15+</option>
                    </select>

                    <div className="text-xs">
                      {travelers === "1" && (
                        <p className="text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100 italic leading-relaxed">
                          {t("soloNote")}
                        </p>
                      )}
                      {Number(travelers) >= 3 && (
                        <label className="flex items-center gap-2 text-sm text-neutral cursor-pointer bg-gray-50 p-3 rounded-xl border border-gray-200">
                          <input
                            type="checkbox"
                            checked={isFamily}
                            onChange={(e) => setIsFamily(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 accent-[#1a1a1a]"
                          />
                          {t("familyCheck")}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-neutral mb-2 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-gray-400" />
                    {t("budget")}
                  </label>

                  {/* Currency toggle */}
                  <div className="flex gap-1 mb-3">
                    {currencies.map((c, i) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setCurrencyIdx(i)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                          i === currencyIdx
                            ? "bg-[#1a1a1a] text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>

                  {/* Range slider */}
                  <div className="relative px-1">
                    <input
                      type="range"
                      min={currency.min}
                      max={currency.max}
                      step={currency.step}
                      value={budgetRange[1]}
                      onChange={(e) => setBudgetRange([currency.min, Number(e.target.value)])}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary"
                      style={{
                        background: `linear-gradient(to right, oklch(67% 0.15 230) ${((budgetRange[1] - currency.min) / (currency.max - currency.min)) * 100}%, #e5e7eb ${((budgetRange[1] - currency.min) / (currency.max - currency.min)) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                      <span>{formatCurrency(currency.min, currency.code, currency.symbol)}</span>
                      <span className="font-bold text-neutral">
                        {formatCurrency(budgetRange[1], currency.code, currency.symbol)}
                      </span>
                      <span>{formatCurrency(currency.max, currency.code, currency.symbol)}</span>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="text-sm font-semibold text-neutral mb-2 flex items-center gap-1.5">
                    <MessageSquareText className="w-3.5 h-3.5 text-gray-400" />
                    {t("comments")}
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder={t("commentsPlaceholder")}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-neutral placeholder:text-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                  />
                </div>
              </section>

              {/* ============================
                  YOUR DETAILS
                  ============================ */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-sm uppercase tracking-widest font-bold text-neutral mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t("yourDetails")}
                </h2>

                {/* Google promo */}
                {!session && (
                  <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-4 mb-6 flex items-center gap-4">
                    <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-amber-800">{t("promoTitle")}</p>
                      <p className="text-xs text-amber-700/70">{t("promoDesc")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => signIn("google")}
                      className="shrink-0 text-xs font-bold bg-white text-neutral px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {t("promoSignIn")}
                    </button>
                  </div>
                )}

                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("firstName")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t("firstName")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-neutral placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("lastName")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t("lastName")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-neutral placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("email")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      disabled={!!session?.user?.email}
                      className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-neutral placeholder:text-gray-400 focus:outline-none focus:border-gray-400 ${session?.user?.email ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("confirmEmail")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="example@email.com"
                      disabled={!!session?.user?.email}
                      className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-neutral placeholder:text-gray-400 focus:outline-none focus:border-gray-400 ${session?.user?.email ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                  </div>
                </div>

                {/* Telephone + Hear about */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("telephone")} <span className="text-red-400">*</span>
                    </label>
                    <PhoneInput
                      defaultCountry="id"
                      value={phone}
                      onChange={setPhone}
                      inputClassName="!bg-gray-50 !border-gray-200 !rounded-xl !text-sm !py-2.5"
                      countrySelectorStyleProps={{
                        buttonClassName: "!bg-gray-50 !border-gray-200 !rounded-l-xl !py-2.5",
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral mb-1.5 block">
                      {t("hearAbout")}
                    </label>
                    <select
                      value={hearAbout}
                      onChange={(e) => setHearAbout(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-neutral focus:outline-none focus:border-gray-400 appearance-none"
                    >
                      <option value="">{t("selectOption")}</option>
                      {(t.raw("hearOptions") as string[]).map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Newsletter */}
                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      newsletter ? "bg-[#1a1a1a]" : "bg-gray-300"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setNewsletter(!newsletter);
                    }}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        newsletter ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-600 leading-tight">
                    {t("newsletter")}
                  </span>
                </label>
              </section>

              {/* Submit */}
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Enquiry Submitted!</h3>
                  <p className="text-sm text-green-700/70">
                    Thank you! Our Travel Expert will get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-2">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full text-white text-sm font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#1a1a1a] hover:bg-black"
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("submit")}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* ============================
                SIDEBAR
                ============================ */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Office Hours */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-neutral mb-4">
                    {t("officeHours")}
                  </h3>

                  <div className="space-y-1.5 text-sm">
                    {[
                      {key: "monday", open: true},
                      {key: "tuesday", open: true},
                      {key: "wednesday", open: true},
                      {key: "thursday", open: true},
                      {key: "friday", open: true},
                      {key: "saturday", open: false},
                      {key: "sunday", open: false},
                    ].map(({key, open}) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-500 font-medium">
                          {t(key as "monday")}:
                        </span>
                        <span className={`font-semibold ${open ? "text-neutral" : "text-red-400"}`}>
                          {open
                            ? `${formatHour(officeHours.openLocal)} - ${formatHour(officeHours.closeLocal)}`
                            : t("closed")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-gray-400 mt-3 italic">
                    {t("holidayNote")}
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1">
                    {t("yourTimezone", {tz: userTz})}
                  </p>
                </div>

                {/* Phone CTA */}
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call us directly</p>
                    <p className="text-sm font-bold text-neutral">{companyInfo.phone}</p>
                  </div>
                </a>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${companyInfo.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Chat via WhatsApp</p>
                    <p className="text-sm font-bold text-neutral">{companyInfo.phone}</p>
                  </div>
                </a>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
