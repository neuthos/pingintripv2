"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  CheckCircle,
  Clock,
  CreditCard,
  XCircle,
  RotateCcw,
  Search,
  ChevronDown,
  Loader2,
  Shield,
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
  userPhone: string | null;
  travelerCount: number;
  currency: string;
  totalPrice: number;
  discountPercent: number;
  status: string;
  paidAt: string | null;
  adminNotes: string | null;
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

export default function AdminOrdersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Check admin access
  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());
    // Fallback — check via API
    setAuthorized(true); // Will be validated by API
    fetchOrders();
  }, [session, sessionStatus]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-user-email": session?.user?.email || "" },
      });
      if (res.status === 403) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setOrders(data);
      setAuthorized(true);
    } catch {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (orderId: string, action: string) => {
    if (!confirm(`Are you sure you want to ${action} this order?`)) return;
    setActionLoading(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": session?.user?.email || "",
        },
        body: JSON.stringify({ orderId, action }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch {
      alert("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (filterStatus) result = result.filter((o) => o.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.userName.toLowerCase().includes(q) ||
          o.userEmail.toLowerCase().includes(q) ||
          o.tripTitle.toLowerCase().includes(q),
      );
    }
    return result;
  }, [orders, filterStatus, search]);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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

  if (!authorized || !session) {
    return (
      <main className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Page not found</p>
        </div>
      </main>
    );
  }

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending_payment").length,
    paid: orders.filter((o) => o.status === "paid").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#1a1a1a] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Admin — Orders</h1>
          <p className="text-white/50 text-sm">{stats.total} total orders</p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Pending", value: stats.pending, color: "text-amber-600" },
            { label: "Paid", value: stats.paid, color: "text-blue-600" },
            { label: "Confirmed", value: stats.confirmed, color: "text-green-600" },
            { label: "Total", value: stats.total, color: "text-gray-700" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full bg-white border border-gray-200 text-sm pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-sm pl-3 pr-8 py-2 rounded-lg focus:outline-none"
            >
              <option value="">All Status</option>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Order</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Customer</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Trip</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Date</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Total</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Status</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const sc = statusConfig[order.status] || statusConfig.pending_payment;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-mono font-bold text-xs">{order.orderNumber}</p>
                        <p className="text-[10px] text-gray-400">{fmtDate(order.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{order.userName}</p>
                        <p className="text-xs text-gray-400">{order.userEmail}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium line-clamp-1">{order.tripTitle}</p>
                        <p className="text-[10px] text-gray-400">{order.tripCode} · {order.travelerCount} pax</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {fmtDate(order.startDate)}
                      </td>
                      <td className="px-4 py-3 font-bold text-xs">
                        {fmtPrice(order.totalPrice, order.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${sc.color}`}>
                          {sc.icon} {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {order.status === "paid" && (
                            <button
                              onClick={() => handleAction(order.id, "confirm")}
                              disabled={actionLoading === order.id}
                              className="text-[10px] font-bold bg-green-500 text-white px-2.5 py-1 rounded-md hover:bg-green-600 disabled:opacity-50"
                            >
                              Confirm
                            </button>
                          )}
                          {order.status === "confirmed" && (
                            <button
                              onClick={() => handleAction(order.id, "in_progress")}
                              disabled={actionLoading === order.id}
                              className="text-[10px] font-bold bg-purple-500 text-white px-2.5 py-1 rounded-md hover:bg-purple-600 disabled:opacity-50"
                            >
                              Start
                            </button>
                          )}
                          {order.status === "in_progress" && (
                            <button
                              onClick={() => handleAction(order.id, "complete")}
                              disabled={actionLoading === order.id}
                              className="text-[10px] font-bold bg-green-600 text-white px-2.5 py-1 rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                              Complete
                            </button>
                          )}
                          {["pending_payment", "paid", "confirmed"].includes(order.status) && (
                            <button
                              onClick={() => handleAction(order.id, "cancel")}
                              disabled={actionLoading === order.id}
                              className="text-[10px] font-bold bg-red-50 text-red-500 px-2.5 py-1 rounded-md hover:bg-red-100 border border-red-200 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          )}
                          {order.status === "paid" && (
                            <button
                              onClick={() => handleAction(order.id, "refund")}
                              disabled={actionLoading === order.id}
                              className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2.5 py-1 rounded-md hover:bg-gray-100 border border-gray-200 disabled:opacity-50"
                            >
                              Refund
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
