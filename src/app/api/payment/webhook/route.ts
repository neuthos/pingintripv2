import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyWebhookToken } from "@/lib/xendit";
import { sendConfirmationEmail } from "@/lib/email";
import { sendOrderTelegramNotification } from "@/lib/telegram";
import { generateTicketPDF } from "@/lib/pdf";
import { formatPrice } from "@/data/packages";
import type { Currency } from "@/data/packages";

export async function POST(req: NextRequest) {
  try {
    // Verify webhook token
    const webhookToken = req.headers.get("x-callback-token") || "";
    if (!verifyWebhookToken(webhookToken)) {
      return NextResponse.json({ error: "Invalid webhook token" }, { status: 401 });
    }

    const body = await req.json();
    const { external_id, status, payment_method, paid_at } = body;

    if (!external_id || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find order by Xendit external_id (which is our order.id)
    const order = await prisma.order.findUnique({
      where: { id: external_id },
    });

    if (!order) {
      console.error("Webhook: order not found for external_id:", external_id);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status === "PAID" || status === "SETTLED") {
      // Update order status to paid
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "paid",
          paymentMethod: payment_method || null,
          paidAt: paid_at ? new Date(paid_at) : new Date(),
        },
      });

      // Format dates
      const fmtDate = (d: Date) =>
        d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

      // Generate PDF ticket
      let pdfBuffer: Buffer | undefined;
      try {
        console.log("Generating PDF ticket for order:", order.orderNumber);
        pdfBuffer = generateTicketPDF({
          orderNumber: order.orderNumber,
          userName: order.userName,
          userEmail: order.userEmail,
          userPhone: order.userPhone || "-",
          tripTitle: order.tripTitle,
          tripCode: order.tripCode,
          startDate: fmtDate(order.startDate),
          endDate: fmtDate(order.endDate),
          durationDays: order.durationDays,
          travelerCount: order.travelerCount,
          totalPrice: formatPrice(order.totalPrice, order.currency as Currency),
          currency: order.currency,
          status: "paid",
        });
        console.log("PDF generated successfully, size:", pdfBuffer.length, "bytes");
      } catch (e) {
        console.error("Failed to generate PDF ticket:", e);
      }

      // Send confirmation email with PDF
      try {
        console.log("Sending confirmation email to:", order.userEmail, "with PDF:", !!pdfBuffer);
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
          pdfBuffer,
        });
        console.log("Confirmation email sent successfully");
      } catch (e) {
        console.error("Failed to send confirmation email:", e);
      }

      // Send Telegram notification
      try {
        await sendOrderTelegramNotification({
          type: "payment_received",
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
        console.error("Failed to send Telegram notification:", e);
      }
    } else if (status === "EXPIRED" || status === "FAILED") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "cancelled",
          cancelledBy: "system",
          cancelledAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
