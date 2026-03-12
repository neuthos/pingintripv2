import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendOrderTelegramNotification } from "@/lib/telegram";
import { formatPrice } from "@/data/packages";
import type { Currency } from "@/data/packages";

// POST: Cancel order (user action — only before admin confirmation)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderId, userEmail } = body;

  if (!orderId || !userEmail) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.userEmail !== userEmail) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // User can only cancel before admin confirms
  if (!["pending_payment", "paid"].includes(order.status)) {
    return NextResponse.json(
      { error: "Cannot cancel order in current status" },
      { status: 400 },
    );
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "cancelled",
      cancelledBy: "user",
      cancelledAt: new Date(),
    },
  });

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  try {
    await sendOrderTelegramNotification({
      type: "cancelled",
      orderNumber: order.orderNumber,
      userName: order.userName,
      userEmail: order.userEmail,
      tripTitle: order.tripTitle,
      tripCode: order.tripCode,
      startDate: fmtDate(order.startDate),
      endDate: fmtDate(order.endDate),
      totalPrice: formatPrice(order.totalPrice, order.currency as Currency),
      travelerCount: order.travelerCount,
    });
  } catch (e) {
    console.error("Failed to send Telegram:", e);
  }

  return NextResponse.json({ success: true });
}
