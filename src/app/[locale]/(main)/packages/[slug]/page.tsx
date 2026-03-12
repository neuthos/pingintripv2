"use client";

import {useState, useMemo} from "react";
import {useTranslations, useLocale} from "next-intl";
import {Link} from "@/i18n/navigation";
import {useParams, useRouter} from "next/navigation";
import {useSession, signIn} from "next-auth/react";
import {
  getOpenTripBySlug,
  getOpenTripsByRegion,
  getOpenTripTitle,
  getOpenTripDescription,
  getOpenTripRoute,
  getPhysicalRatingLabel,
  getFutureAvailableDates,
  formatPrice,
  getDefaultCurrency,
  type OpenTrip,
  type Currency,
} from "@/data/packages";
import {regions} from "@/data/destinations";
import OptimizedImage from "@/components/ui/optimized-image";
import BookingModal from "@/components/ui/booking-modal";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Gauge,
  Home,
  UtensilsCrossed,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ============================
// Tab type
// ============================
type TabId = "overview" | "itinerary" | "details";

// ============================
// Main Page
// ============================

export default function OpenTripDetailPage() {
  const t = useTranslations("OpenTripsPage");
  const locale = useLocale();
  const currency = getDefaultCurrency(locale);
  const params = useParams();
  const slug = params.slug as string;

  const trip = getOpenTripBySlug(slug);

  if (!trip) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Trip not found</p>
          <Link href="/packages" className="text-primary hover:underline text-sm">
            {t("backToTrips")}
          </Link>
        </div>
      </main>
    );
  }

  return <TripDetailContent trip={trip} locale={locale} currency={currency} t={t} />;
}

// ============================
// Trip Detail Content
// ============================

interface TripDetailContentProps {
  trip: OpenTrip;
  locale: string;
  currency: Currency;
  t: ReturnType<typeof useTranslations>;
}

function TripDetailContent({trip, locale, currency, t}: TripDetailContentProps) {
  const {data: session} = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => new Set([1]));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookingStep, setBookingStep] = useState<"dates" | "form">("dates");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingTravelers, setBookingTravelers] = useState(1);
  const [bookingRequests, setBookingRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const title = getOpenTripTitle(trip, locale);
  const description = getOpenTripDescription(trip, locale);
  const route = getOpenTripRoute(trip, locale);
  const price = trip.price[currency];
  const region = regions.find((r) => r.id === trip.regionId);
  const regionName = region
    ? region.name[locale as keyof typeof region.name] || region.name.en
    : "";
  const physicalLabel =
    getPhysicalRatingLabel(trip.physicalRating)[locale as "en" | "id" | "cn"] ||
    getPhysicalRatingLabel(trip.physicalRating).en;

  // Related trips (same region, exclude current)
  const relatedTrips = useMemo(
    () => getOpenTripsByRegion(trip.regionId).filter((t) => t.id !== trip.id).slice(0, 4),
    [trip],
  );

  // Available dates — show all remaining dates until end of current year
  const availableDates = useMemo(
    () => getFutureAvailableDates(trip.durationDays),
    [trip.durationDays],
  );

  // Discount percentage
  const discountPercent =
    price.discountedAmount && price.amount > 0
      ? Math.round(((price.amount - price.discountedAmount) / price.amount) * 100)
      : 0;


  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayNum)) next.delete(dayNum);
      else next.add(dayNum);
      return next;
    });
  };

  const expandAllDays = () => {
    setExpandedDays(new Set(trip.itinerary.map((d) => d.dayNumber)));
  };

  const collapseAllDays = () => {
    setExpandedDays(new Set());
  };

  const tabs: {id: TabId; label: string}[] = [
    {id: "overview", label: t("overview")},
    {id: "itinerary", label: t("fullItinerary")},
    {id: "details", label: t("tourDetails")},
  ];

  return (
    <main className="min-h-screen bg-base-100">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/packages" className="hover:text-gray-600 transition-colors">
              Open Trips
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 font-medium truncate max-w-[200px]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <header className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Title & Image */}
            <div className="flex-1">
              {/* Region tag */}
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                {regionName}
              </p>

              <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {trip.durationDays} {t("days")}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {route}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  {physicalLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {t("maxTravelers", {count: trip.maxPax})}
                </span>
              </div>

              {/* Hero Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <OptimizedImage
                  src={trip.image}
                  alt={title}
                  fill
                  priority
                  objectFit="cover"
                />
                {trip.featured && (
                  <span className="absolute top-4 left-4 z-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {t("popular")}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Sticky Pricing Sidebar (Desktop) */}
            <div className="hidden lg:block lg:w-[340px] shrink-0">
              <div className="sticky top-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                {/* Trip Code */}
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                  {t("tripCode")}
                </p>
                <p className="text-sm font-mono text-white/70 mb-4">{trip.code}</p>

                {/* Duration & Route */}
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  {trip.durationDays} {t("days")}
                </div>
                <p className="text-white/40 text-xs mb-5">{route}</p>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                    {t("from")}
                  </p>
                  {price.discountedAmount ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-white/30 line-through text-sm">
                        {formatPrice(price.amount, currency)}
                      </span>
                      {discountPercent > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>
                  ) : null}
                  <p className="text-white font-bold text-3xl mt-1">
                    {formatPrice(price.discountedAmount || price.amount, currency)}
                  </p>
                  <p className="text-white/30 text-xs mt-1">{t("perPerson")}</p>
                </div>

                {/* CTAs */}
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="w-full btn btn-primary btn-md mb-3 text-sm font-bold"
                >
                  {t("joinTrip")}
                </button>
                <Link
                  href={`/enquiry?ref=${trip.code}`}
                  className="w-full btn btn-outline btn-md text-white border-white/30 hover:bg-white hover:text-black text-sm font-bold flex items-center justify-center"
                >
                  {t("makePrivate")}
                </Link>

                {/* Physical Rating */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                    {t("physicalRating")}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className={`w-6 h-1.5 rounded-full ${
                            n <= trip.physicalRating ? "bg-primary" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-xs">{physicalLabel}</span>
                  </div>
                </div>

                {/* Group Size */}
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                    {t("groupSize")}
                  </p>
                  <p className="text-white/60 text-sm">
                    {t("maxTravelers", {count: trip.maxPax})}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:max-w-[calc(100%-380px)]">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Description */}
              <div>
                <p
                  className="text-base md:text-lg text-gray-600 leading-relaxed"
                  style={{fontFamily: "var(--font-lora), serif"}}
                >
                  {description}
                </p>
              </div>

              {/* Highlights */}
              {trip.highlights.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-neutral mb-4">{t("highlights")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {trip.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200"
                      >
                        <Star className="w-3 h-3 text-amber-400" />
                        {h.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick itinerary summary */}
              <div>
                <h3 className="text-lg font-bold text-neutral mb-4">
                  {trip.durationDays}-Day Route
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trip.itinerary.map((day, i) => (
                    <div
                      key={day.dayNumber}
                      className="flex items-center gap-1.5 text-xs text-gray-500"
                    >
                      <span className="font-bold text-gray-700">{t("day")} {day.dayNumber}</span>
                      <span className="text-gray-300">·</span>
                      <span>{day.location}</span>
                      {i < trip.itinerary.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-gray-300 ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Full Itinerary Tab */}
          {activeTab === "itinerary" && (
            <div>
              {/* Expand/Collapse All */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral">{t("fullItinerary")}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={expandAllDays}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Expand All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={collapseAllDays}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Day-by-day accordion */}
              <div className="space-y-3">
                {trip.itinerary.map((day) => {
                  const isExpanded = expandedDays.has(day.dayNumber);
                  return (
                    <div
                      key={day.dayNumber}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                            {day.dayNumber}
                          </span>
                          <div>
                            <p className="font-bold text-sm text-neutral">{day.title}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {day.location}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pl-[52px] pt-3">
                            <div className="text-sm text-gray-600 leading-relaxed mb-4 space-y-2">
                              {day.description.split(/(?<=\.)\s+/).filter(Boolean).map((sentence, idx) => (
                                <p key={idx}>{sentence.trim()}</p>
                              ))}
                            </div>

                            {day.accommodation && (
                              <div className="flex items-start gap-2 text-xs text-gray-500 mb-2">
                                <Home className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-600">{t("accommodation")}</p>
                                  <p>{day.accommodation}</p>
                                </div>
                              </div>
                            )}

                            {day.meals.length > 0 && (
                              <div className="flex items-start gap-2 text-xs text-gray-500">
                                <UtensilsCrossed className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-600">{t("meals")}</p>
                                  <p>{day.meals.join(", ")}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tour Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-8">
              {/* Physical Rating */}
              <div>
                <h3 className="text-lg font-bold text-neutral mb-3">{t("physicalRating")}</h3>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className={`w-8 h-2 rounded-full ${
                          n <= trip.physicalRating ? "bg-primary" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {trip.physicalRating}/5 — {physicalLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {trip.physicalRating <= 2
                    ? "This trip is suitable for most fitness levels. Light walks and easy terrain."
                    : trip.physicalRating <= 3
                      ? "Some moderate activity involved. Expect hiking, walking tours, and varied terrain."
                      : "This trip involves demanding physical activity. Expect long treks, steep climbs, and challenging terrain."}
                </p>
              </div>

              {/* Group Size */}
              <div>
                <h3 className="text-lg font-bold text-neutral mb-3">{t("groupSize")}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  {t("maxTravelers", {count: trip.maxPax})}
                </div>
              </div>

              {/* Trip Code */}
              <div>
                <h3 className="text-lg font-bold text-neutral mb-3">{t("tripCode")}</h3>
                <p className="text-sm font-mono text-gray-600 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-200">
                  {trip.code}
                </p>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-lg font-bold text-neutral mb-3">Difficulty</h3>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    trip.difficulty === "easy"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : trip.difficulty === "moderate"
                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {trip.difficulty}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Trips */}
      {relatedTrips.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <h3 className="text-lg font-bold text-neutral mb-6">{t("relatedTrips")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTrips.map((relTrip) => {
                const relTitle = getOpenTripTitle(relTrip, locale);
                const relRoute = getOpenTripRoute(relTrip, locale);
                const relPrice = relTrip.price[currency];
                return (
                  <Link
                    key={relTrip.id}
                    href={`/packages/${relTrip.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-3/4 rounded-xl overflow-hidden">
                      <OptimizedImage
                        src={relTrip.image}
                        alt={relTitle}
                        fill
                        objectFit="cover"
                      />
                      <div className="absolute top-3 right-3 z-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {relTrip.durationDays} {t("days")}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-2" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 z-3">
                        <h4 className="text-white font-bold text-xs leading-tight mb-1 line-clamp-2">
                          {relTitle}
                        </h4>
                        <p className="text-white/50 text-[10px] mb-2">{relRoute}</p>
                        <p className="text-white font-bold text-sm">
                          {formatPrice(relPrice.discountedAmount || relPrice.amount, currency)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Sticky Footer CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t("from")}</p>
            <div className="flex items-baseline gap-2">
              {price.discountedAmount && (
                <span className="text-gray-400 line-through text-xs">
                  {formatPrice(price.amount, currency)}
                </span>
              )}
              <span className="text-neutral font-bold text-lg">
                {formatPrice(price.discountedAmount || price.amount, currency)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowDatePicker(true)}
            className="btn btn-primary btn-sm text-xs font-bold px-4"
          >
            {t("joinTrip")}
          </button>
          <Link
            href={`/enquiry?ref=${trip.code}`}
            className="btn btn-outline btn-sm text-xs font-bold px-4 flex items-center justify-center"
          >
            {t("makePrivate")}
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      {showDatePicker && (
        <BookingModal
          trip={trip}
          title={title}
          route={route}
          locale={locale}
          currency={currency}
          availableDates={availableDates}
          session={session}
          bookingStep={bookingStep}
          selectedDate={selectedDate}
          bookingPhone={bookingPhone}
          bookingTravelers={bookingTravelers}
          bookingRequests={bookingRequests}
          submitting={submitting}
          onClose={() => { setShowDatePicker(false); setBookingStep("dates"); setSelectedDate(null); }}
          onSelectDate={(d: Date) => { setSelectedDate(d); setBookingStep("form"); }}
          onBack={() => setBookingStep("dates")}
          onPhoneChange={setBookingPhone}
          onTravelersChange={setBookingTravelers}
          onRequestsChange={setBookingRequests}
          onSubmit={async () => {
            if (!session?.user) { signIn("google"); return; }
            if (!selectedDate) return;
            setSubmitting(true);
            try {
              const endDate = new Date(selectedDate);
              endDate.setDate(endDate.getDate() + trip.durationDays - 1);
              const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tripSlug: trip.slug,
                  startDate: selectedDate.toISOString(),
                  endDate: endDate.toISOString(),
                  userName: session.user.name || "",
                  userEmail: session.user.email || "",
                  userPhone: bookingPhone,
                  googleId: (session.user as Record<string, string>).id || session.user.email,
                  travelerCount: bookingTravelers,
                  specialRequests: bookingRequests,
                  currency,
                  locale,
                }),
              });
              const data = await res.json();
              if (data.paymentUrl) { window.location.href = data.paymentUrl; }
              else if (data.orderId) { router.push(`/${locale}/orders/${data.orderId}`); }
            } catch { alert("Booking failed. Please try again."); }
            finally { setSubmitting(false); }
          }}
          t={t}
        />
      )}

      {/* Bottom spacer for mobile sticky footer */}
      <div className="lg:hidden h-20" />
    </main>
  );
}
