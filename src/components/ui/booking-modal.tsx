"use client";

import { Calendar, ArrowLeft, Loader2, User } from "lucide-react";
import type { OpenTrip, Currency } from "@/data/packages";
import { formatPrice } from "@/data/packages";
import type { Session } from "next-auth";

interface BookingModalProps {
  trip: OpenTrip;
  title: string;
  route: string;
  locale: string;
  currency: Currency;
  availableDates: Date[];
  session: Session | null;
  bookingStep: "dates" | "form";
  selectedDate: Date | null;
  bookingPhone: string;
  bookingTravelers: number;
  bookingRequests: string;
  submitting: boolean;
  onClose: () => void;
  onSelectDate: (d: Date) => void;
  onBack: () => void;
  onPhoneChange: (v: string) => void;
  onTravelersChange: (v: number) => void;
  onRequestsChange: (v: string) => void;
  onSubmit: () => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  tb: (key: string, values?: Record<string, string | number>) => string;
}

const localeFmt = (locale: string) =>
  locale === "id" ? "id-ID" : locale === "cn" ? "zh-CN" : "en-US";

export default function BookingModal({
  trip,
  title,
  route,
  locale,
  currency,
  availableDates,
  session,
  bookingStep,
  selectedDate,
  bookingPhone,
  bookingTravelers,
  bookingRequests,
  submitting,
  onClose,
  onSelectDate,
  onBack,
  onPhoneChange,
  onTravelersChange,
  onRequestsChange,
  onSubmit,
  t,
  tb,
}: BookingModalProps) {
  // Display price in user's locale currency
  const displayPrice = trip.price[currency];
  const unitPrice = displayPrice.discountedAmount || displayPrice.amount;

  // IDR price for Xendit charge
  const idrPrice = trip.price.IDR;
  const idrUnitPrice = idrPrice.discountedAmount || idrPrice.amount;

  const hasGoogleDiscount = !!session?.user;
  const discountPercent = hasGoogleDiscount ? 10 : 0;

  // Display totals
  const totalBeforeDiscount = unitPrice * bookingTravelers;
  const totalPrice = hasGoogleDiscount ? totalBeforeDiscount * 0.9 : totalBeforeDiscount;

  // IDR totals (what Xendit charges)
  const idrTotalBeforeDiscount = idrUnitPrice * bookingTravelers;
  const idrTotalPrice = hasGoogleDiscount ? idrTotalBeforeDiscount * 0.9 : idrTotalBeforeDiscount;

  const endDate = selectedDate ? new Date(selectedDate) : null;
  if (endDate) endDate.setDate(endDate.getDate() + trip.durationDays - 1);

  // Group dates by month
  const datesByMonth: Record<string, Date[]> = {};
  availableDates.forEach((d) => {
    const key = d.toLocaleDateString(localeFmt(locale), { month: "long", year: "numeric" });
    if (!datesByMonth[key]) datesByMonth[key] = [];
    datesByMonth[key].push(d);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            {bookingStep === "form" && (
              <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="font-bold text-neutral">
              {bookingStep === "dates" ? t("selectDate") : tb("yourDetails")}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Trip Info */}
        <div className="px-5 py-3 border-b border-gray-50">
          <p className="font-bold text-sm text-neutral">{title}</p>
          <p className="text-xs text-gray-400">
            {trip.durationDays} {t("days")} · {route}
          </p>
        </div>

        {/* STEP 1: Date Selection */}
        {bookingStep === "dates" && (
          <div className="px-5 py-4">
            {Object.entries(datesByMonth).map(([month, dates]) => (
              <div key={month} className="mb-4">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                  {month}
                </p>
                <div className="space-y-1.5">
                  {dates.map((date, i) => {
                    const ed = new Date(date);
                    ed.setDate(ed.getDate() + trip.durationDays - 1);
                    return (
                      <button
                        key={i}
                        onClick={() => onSelectDate(date)}
                        className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-neutral">
                              {date.toLocaleDateString(localeFmt(locale), { weekday: "short", month: "short", day: "numeric" })}
                              {" — "}
                              {ed.toLocaleDateString(localeFmt(locale), { weekday: "short", month: "short", day: "numeric" })}
                            </p>
                            <p className="text-[10px] text-gray-400">{trip.durationDays} {t("days")}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {formatPrice(unitPrice, currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: Booking Form */}
        {bookingStep === "form" && (
          <div className="px-5 py-4">
            {/* Selected Date Summary */}
            {selectedDate && endDate && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold text-neutral">
                    {selectedDate.toLocaleDateString(localeFmt(locale), { weekday: "short", month: "short", day: "numeric" })}
                    {" — "}
                    {endDate.toLocaleDateString(localeFmt(locale), { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                  <p className="text-[10px] text-gray-500">{trip.durationDays} {t("days")}</p>
                </div>
              </div>
            )}

            {/* Google Sign-In Required */}
            {!session?.user ? (
              <div className="text-center py-6">
                <User className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1 font-medium">{tb("signInToContinue")}</p>
                <p className="text-xs text-gray-400 mb-4">{tb("signInDiscount")}</p>
                <button
                  onClick={onSubmit}
                  className="btn btn-primary btn-md text-sm font-bold"
                >
                  {tb("signInBtn")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pre-filled from Google */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2 text-xs text-green-700">
                  <span>✅</span>
                  <span>{tb("signedInAs")} <strong>{session.user.name}</strong> ({session.user.email}) {tb("discountApplied")}</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">{tb("phoneLabel")} <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    placeholder="+62 812 3456 7890"
                    required
                    className={`w-full bg-white border text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-primary ${
                      bookingPhone.trim().length > 0 ? "border-gray-200" : "border-red-200"
                    }`}
                  />
                  {bookingPhone.trim().length === 0 && (
                    <p className="text-[10px] text-red-400 mt-1">{tb("phoneRequired")}</p>
                  )}
                </div>

                {/* Travelers */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">{tb("travelersLabel")}</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onTravelersChange(Math.max(1, bookingTravelers - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="text-lg font-bold text-neutral w-6 text-center">{bookingTravelers}</span>
                    <button
                      onClick={() => onTravelersChange(Math.min(trip.maxPax, bookingTravelers + 1))}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                    <span className="text-xs text-gray-400">{tb("max")} {trip.maxPax}</span>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">{tb("specialRequests")}</label>
                  <textarea
                    value={bookingRequests}
                    onChange={(e) => onRequestsChange(e.target.value)}
                    rows={2}
                    placeholder={tb("specialRequestsPlaceholder")}
                    className="w-full bg-white border border-gray-200 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {formatPrice(unitPrice, currency)} × {bookingTravelers}
                    </span>
                    <span className="text-gray-700">{formatPrice(totalBeforeDiscount, currency)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">{tb("googleDiscount")} (-{discountPercent}%)</span>
                      <span className="text-green-600">
                        -{formatPrice(totalBeforeDiscount - totalPrice, currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2 mt-1">
                    <span>{tb("total")}</span>
                    <span className="text-primary">{formatPrice(totalPrice, currency)}</span>
                  </div>

                  {/* IDR charge note for non-IDR users */}
                  {currency !== "IDR" && (
                    <p className="text-[10px] text-gray-400 pt-1">
                      💳 {tb("idrChargeNote", { amount: formatPrice(idrTotalPrice, "IDR") })}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={onSubmit}
                  disabled={submitting || bookingPhone.trim().length === 0}
                  className="w-full btn btn-primary btn-md text-sm font-bold disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> {tb("processing")}
                    </span>
                  ) : (
                    tb("proceedToPayment")
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
