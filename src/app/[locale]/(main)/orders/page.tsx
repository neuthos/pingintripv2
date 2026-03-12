"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  CheckCircle,
  Clock,
  CreditCard,
  XCircle,
  RotateCcw,
  ArrowRight,
  Loader2,
  ShoppingBag,
  User,
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
  travelerCount: number;
  currency: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending_payment: { label: "Pending Payment", icon: <CreditCard className="w-3 h-3" />, color: "text-amber-600 bg-amber-50 border-amber-200" },
  paid: { label: "Paid", icon: <CheckCircle className="w-3 h-3" />, color: "text-blue-600 bg-blue-50 border-blue-200" },
  confirmed: { label: "Confirmed", icon: <CheckCircle className="w-3 h-3" />, color: "text-green-600 bg-green-50 border-green-200" },
  in_progress: { label: "In Progress", icon: <Clock className="w-3 h-3" />, color: "text-purple-600 bg-purple-50 border-purple-200" },
  completed: { label: "Completed", icon: <CheckCircle className="w-3 h-3" />, color: "text-green-700 bg-green-100 border-green-300" },
  cancelled: { label: "Cancelled", icon: <XCircle className="w-3 h-3" />, color: "text-red-600 bg-red-50 border-red-200" },
  refunded: { label: "Refunded", icon: <RotateCcw className="w-3 h-3" />, color: "text-gray-600 bg-gray-50 border-gray-200" },
};

export default function MyOrdersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const locale = useLocale();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const loading = sessionStatus === "loading" || fetchingOrders;

  const isLoaded = sessionStatus !== "loading";
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!isLoaded) return;
    if (!userEmail) return;
    setFetchingOrders(true);
    fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(() => {})
      .finally(() => setFetchingOrders(false));
  }, [isLoaded, userEmail]);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(locale === "id" ? "id-ID" : locale === "cn" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const fmtPrice = (amount: number, curr: string) => {
    if (curr === "IDR") return `Rp ${amount.toLocaleString()}`;
    if (curr === "CNY") return `¥${amount.toLocaleString()}`;
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </main>
    );
  }

  // Not signed in
  if (!session?.user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-neutral mb-2">Sign in to view your orders</h2>
          <p className="text-sm text-gray-500 mb-6">Access your booking history and manage your trips</p>
          <button onClick={() => signIn("google")} className="btn btn-primary btn-md text-sm font-bold">
            Sign In with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-xl md:text-2xl font-bold mb-1">My Orders</h1>
          <p className="text-white/50 text-sm">
            {orders.length} booking{orders.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-base font-bold text-neutral mb-2">No bookings yet</h3>
            <p className="text-sm text-gray-500 mb-6">
              Start planning your adventure! Browse our open trips.
            </p>
            <Link href="/packages" className="btn btn-primary btn-sm text-sm font-bold">
              Browse Open Trips
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending_payment;
              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}` as "/"}
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-sm text-neutral line-clamp-1">{order.tripTitle}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {order.orderNumber} · {order.tripCode}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border shrink-0 ${sc.color}`}>
                      {sc.icon} {sc.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{fmtDate(order.startDate)} — {fmtDate(order.endDate)}</span>
                      <span>{order.travelerCount} pax</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral">{fmtPrice(order.totalPrice, order.currency)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
