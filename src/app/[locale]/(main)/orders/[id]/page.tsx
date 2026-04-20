"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  CheckCircle,
  Clock,
  CreditCard,
  XCircle,
  RotateCcw,
  Calendar,
  Users,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  tripCode: string;
  tripSlug: string;
  tripTitle: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  userName: string;
  userEmail: string;
  travelerCount: number;
  currency: string;
  unitPrice: number;
  totalPrice: number;
  discountPercent: number;
  status: string;
  xenditInvoiceUrl: string | null;
  paymentMethod: string | null;
  paidAt: string | null;
  adminNotes: string | null;
  cancelledAt: string | null;
  cancelledBy: string | null;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; step: number }> = {
  pending_payment: { label: "Pending Payment", icon: <CreditCard className="w-4 h-4" />, color: "text-amber-600 bg-amber-50 border-amber-200", step: 1 },
  paid: { label: "Paid", icon: <CheckCircle className="w-4 h-4" />, color: "text-blue-600 bg-blue-50 border-blue-200", step: 2 },
  confirmed: { label: "Confirmed", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-600 bg-green-50 border-green-200", step: 3 },
  in_progress: { label: "In Progress", icon: <Clock className="w-4 h-4" />, color: "text-purple-600 bg-purple-50 border-purple-200", step: 4 },
  completed: { label: "Completed", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-700 bg-green-50 border-green-300", step: 5 },
  cancelled: { label: "Cancelled", icon: <XCircle className="w-4 h-4" />, color: "text-red-600 bg-red-50 border-red-200", step: -1 },
  refunded: { label: "Refunded", icon: <RotateCcw className="w-4 h-4" />, color: "text-gray-600 bg-gray-50 border-gray-200", step: -1 },
};

const steps = [
  { key: "pending_payment", label: "Payment" },
  { key: "paid", label: "Paid" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

function OrderContent() {
  const { data: session } = useSession();
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const paymentStatus = searchParams.get("status");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders?id=${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setOrder(data);
      })
      .catch(() => setError("Failed to load order"))
      .finally(() => setLoading(false));
  }, [orderId]);

  // Trustpilot: send review invitation once order is paid/confirmed
  useEffect(() => {
    if (!order || !["paid", "confirmed", "completed"].includes(order.status)) return;
    const key = `tp_invited_${order.orderNumber}`;
    if (sessionStorage.getItem(key)) return;

    const sendInvitation = () => {
      const tp = (window as { tp?: (action: string, data: Record<string, string>) => void }).tp;
      if (typeof tp !== "function") return;
      tp("createInvitation", {
        recipientEmail: order.userEmail,
        recipientName: order.userName,
        referenceId: order.orderNumber,
        source: "InvitationScript",
      });
      sessionStorage.setItem(key, "1");
    };

    if ((window as { tp?: unknown }).tp) {
      sendInvitation();
    } else {
      const timer = setTimeout(sendInvitation, 2000);
      return () => clearTimeout(timer);
    }
  }, [order]);

  // Auto-refresh order status when coming from Xendit payment
  useEffect(() => {
    if (paymentStatus !== "success" || !orderId) return;
    // Poll for status update (webhook might take a moment)
    const interval = setInterval(() => {
      fetch(`/api/orders?id=${orderId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && !data.error) {
            setOrder(data);
            if (data.status !== "pending_payment") {
              clearInterval(interval);
            }
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [paymentStatus, orderId]);

  const handleCancel = async () => {
    if (!order || !session?.user?.email) return;
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, userEmail: session.user.email }),
      });
      if (res.ok) {
        setOrder((prev) => prev ? { ...prev, status: "cancelled", cancelledBy: "user", cancelledAt: new Date().toISOString() } : null);
      }
    } catch {
      alert("Failed to cancel. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  const fmtPrice = (amount: number, curr: string) => {
    if (curr === "IDR") return `Rp ${amount.toLocaleString()}`;
    if (curr === "CNY") return `¥${amount.toLocaleString()}`;
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-base-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">{error || "Order not found"}</p>
          <Link href="/packages" className="text-primary hover:underline text-sm">
            Browse Open Trips
          </Link>
        </div>
      </main>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pending_payment;
  const canCancel = ["pending_payment", "paid"].includes(order.status);
  const currentStep = status.step;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/packages" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs mb-4 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Open Trips
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Order #{order.orderNumber}</h1>
          <p className="text-white/50 text-sm">{fmtDate(order.createdAt)}</p>
        </div>
      </header>

      {/* Payment status message */}
      {paymentStatus === "success" && order.status === "pending_payment" && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 text-center text-sm text-green-700 font-medium flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Payment processing... This may take a moment.
          </div>
        </div>
      )}
      {paymentStatus === "success" && order.status !== "pending_payment" && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 text-center text-sm text-green-700 font-medium">
            ✅ Payment successful! Your booking is being processed.
          </div>
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 text-center text-sm text-red-700 font-medium">
            ❌ Payment failed. Please try again or contact support.
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Status Badge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${status.color}`}>
              {status.icon} {status.label}
            </span>
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="text-xs text-red-500 hover:text-red-700 underline disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}
          </div>

          {/* Status Tracker */}
          {currentStep > 0 && (
            <div className="flex items-center gap-1">
              {steps.map((step, i) => {
                const isActive = currentStep >= i + 1;
                const isCurrent = currentStep === i + 1;
                return (
                  <div key={step.key} className="flex-1 flex items-center">
                    <div className="flex-1">
                      <div className={`h-1.5 rounded-full ${isActive ? "bg-primary" : "bg-gray-200"}`} />
                      <p className={`text-[10px] mt-1.5 text-center ${isCurrent ? "text-primary font-bold" : isActive ? "text-gray-600" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Trip Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-neutral mb-4">Trip Details</h3>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-base text-neutral">{order.tripTitle}</p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{order.tripCode}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                {fmtDate(order.startDate)} — {fmtDate(order.endDate)}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                {order.travelerCount} traveler{order.travelerCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-neutral mb-4">Payment</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-lg">{fmtPrice(order.totalPrice, order.currency)}</span>
            </div>
            {order.discountPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Google Discount</span>
                <span className="text-green-600 font-medium">-{order.discountPercent}%</span>
              </div>
            )}
            {order.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-gray-700">{order.paymentMethod}</span>
              </div>
            )}
            {order.paidAt && (
              <div className="flex justify-between">
                <span className="text-gray-500">Paid At</span>
                <span className="text-gray-700">{fmtDate(order.paidAt)}</span>
              </div>
            )}
          </div>

          {order.status === "pending_payment" && order.xenditInvoiceUrl && (
            <a
              href={order.xenditInvoiceUrl}
              className="btn btn-primary btn-md w-full mt-4 text-sm font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete Payment →
            </a>
          )}
        </div>

        {/* Admin Notes */}
        {order.adminNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 mb-1">Admin Notes</p>
            <p className="text-sm text-blue-600">{order.adminNotes}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-base-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </main>
    }>
      <OrderContent />
    </Suspense>
  );
}
