import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";
import { sendOrderTelegramNotification } from "@/lib/telegram";
import { formatPrice } from "@/data/packages";
import type { Currency } from "@/data/packages";

function isAdmin(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

// GET: List all orders (admin only)
export async function GET(req: NextRequest) {
  const email = req.headers.get("x-user-email") || "";

  if (!isAdmin(email)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// PATCH: Update order status (admin only)
export async function PATCH(req: NextRequest) {
  const email = req.headers.get("x-user-email") || "";

  if (!isAdmin(email)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await req.json();
  const { orderId, action, adminNotes } = body;

  if (!orderId || !action) {
    return NextResponse.json({ error: "Missing orderId or action" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  switch (action) {
    case "confirm": {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "confirmed", adminNotes: adminNotes || null },
      });

      // Send confirmation email
      try {
        await sendConfirmationEmail({
          to: order.userEmail,
          userName: order.userName,
          orderNumber: order.orderNumber,
          tripTitle: order.tripTitle,
          tripCode: order.tripCode,
          startDate: fmtDate(order.startDate),
          endDate: fmtDate(order.endDate),
          durationDays: order.durationDays,
          travelerCount: order.travelerCount,
          totalPrice: formatPrice(order.totalPrice, order.currency as Currency),
          currency: order.currency,
        });
      } catch (e) {
        console.error("Failed to send confirmation email:", e);
      }

      // Send Telegram
      try {
        await sendOrderTelegramNotification({
          type: "confirmed",
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
      break;
    }
    case "in_progress":
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "in_progress", adminNotes: adminNotes || null },
      });
      break;
    case "complete":
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "completed", adminNotes: adminNotes || null },
      });
      break;
    case "cancel":
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "cancelled",
          cancelledBy: "admin",
          cancelledAt: new Date(),
          adminNotes: adminNotes || null,
        },
      });

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
      break;
    case "refund":
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "refunded", adminNotes: adminNotes || null },
      });
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const updated = await prisma.order.findUnique({ where: { id: orderId } });
  return NextResponse.json(updated);
}
