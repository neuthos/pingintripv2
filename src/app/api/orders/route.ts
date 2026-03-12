import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createXenditInvoice } from "@/lib/xendit";
import { sendPaymentEmail } from "@/lib/email";
import { sendOrderTelegramNotification } from "@/lib/telegram";
import { formatPrice, getOpenTripBySlug, getOpenTripTitle } from "@/data/packages";
import type { Currency } from "@/data/packages";

function generateOrderNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "PT-ORD-";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tripSlug,
      startDate,
      endDate,
      userName,
      userEmail,
      userPhone,
      googleId,
      travelerCount,
      specialRequests,
      currency,
      locale,
    } = body;

    // Validate
    if (!tripSlug || !startDate || !endDate || !userName || !userEmail || !userPhone || !currency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trip = getOpenTripBySlug(tripSlug);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const curr = currency as Currency;
    const displayPrice = trip.price[curr];
    const unitPrice = displayPrice.discountedAmount || displayPrice.amount;

    // IDR price for Xendit (always charge in IDR)
    const idrPrice = trip.price.IDR;
    const idrUnitPrice = idrPrice.discountedAmount || idrPrice.amount;

    // Check for Google discount (additional 10%)
    const hasGoogleDiscount = !!googleId;
    const discountPercent = hasGoogleDiscount ? 10 : 0;
    const totalBeforeDiscount = unitPrice * (travelerCount || 1);
    const totalPrice = hasGoogleDiscount
      ? totalBeforeDiscount * 0.9
      : totalBeforeDiscount;

    // IDR totals for Xendit
    const idrTotal = hasGoogleDiscount
      ? idrUnitPrice * (travelerCount || 1) * 0.9
      : idrUnitPrice * (travelerCount || 1);

    const orderNumber = generateOrderNumber();
    const tripTitle = getOpenTripTitle(trip, locale || "en");

    // Create order in DB (store display currency amounts)
    const order = await prisma.order.create({
      data: {
        orderNumber,
        tripCode: trip.code,
        tripSlug: trip.slug,
        tripTitle,
        durationDays: trip.durationDays,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userName,
        userEmail,
        userPhone: userPhone || null,
        googleId: googleId || null,
        travelerCount: travelerCount || 1,
        specialRequests: specialRequests || null,
        currency: curr,
        unitPrice,
        totalPrice,
        discountPercent,
        status: "pending_payment",
      },
    });

    // Create Xendit invoice — always in IDR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3005";
    const invoice = await createXenditInvoice({
      externalId: order.id,
      amount: Math.round(idrTotal), // Xendit needs integer IDR
      currency: "IDR",
      payerEmail: userEmail,
      description: `${tripTitle} (${orderNumber})`,
      successRedirectUrl: `${baseUrl}/${locale || "en"}/orders/${order.id}?status=success`,
      failureRedirectUrl: `${baseUrl}/${locale || "en"}/orders/${order.id}?status=failed`,
      customerName: userName,
    });

    // Update order with Xendit details
    await prisma.order.update({
      where: { id: order.id },
      data: {
        xenditInvoiceId: invoice.id,
        xenditInvoiceUrl: invoice.invoice_url,
      },
    });

    // Format dates for email
    const fmtDate = (d: string) =>
      new Date(d).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    // Send payment email
    try {
      await sendPaymentEmail({
        to: userEmail,
        userName,
        orderNumber,
        tripTitle,
        tripCode: trip.code,
        startDate: fmtDate(startDate),
        endDate: fmtDate(endDate),
        durationDays: trip.durationDays,
        travelerCount: travelerCount || 1,
        totalPrice: formatPrice(totalPrice, curr),
        currency: curr,
        paymentUrl: invoice.invoice_url,
      });
    } catch (e) {
      console.error("Failed to send payment email:", e);
    }

    // Send Telegram notification
    try {
      await sendOrderTelegramNotification({
        type: "new_booking",
        orderNumber,
        userName,
        userEmail,
        tripTitle,
        tripCode: trip.code,
        startDate: fmtDate(startDate),
        endDate: fmtDate(endDate),
        totalPrice: formatPrice(totalPrice, curr),
        travelerCount: travelerCount || 1,
      });
    } catch (e) {
      console.error("Failed to send Telegram notification:", e);
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      paymentUrl: invoice.invoice_url,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}

// GET: Fetch order by ID or list orders by email
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("id");
  const userEmail = searchParams.get("email");

  // Single order by ID
  if (orderId) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  }

  // List orders by user email
  if (userEmail) {
    const orders = await prisma.order.findMany({
      where: { userEmail },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  }

  return NextResponse.json({ error: "Missing id or email parameter" }, { status: 400 });
}
