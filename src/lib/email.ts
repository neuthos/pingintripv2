import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `${process.env.SMTP_FROM_NAME || "Pingintrip"} <${process.env.SMTP_FROM_EMAIL}>`;

// ============================
// Email 1: Payment Link
// ============================

export async function sendPaymentEmail(data: {
  to: string;
  userName: string;
  orderNumber: string;
  tripTitle: string;
  tripCode: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelerCount: number;
  totalPrice: string;
  currency: string;
  paymentUrl: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5; color: #1a1a1a; }
    .container { max-width: 580px; margin: 0 auto; background: #fff; }
    .header { background: #1a1a1a; padding: 32px 24px; text-align: center; }
    .header h1 { color: #fff; font-size: 20px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.5); font-size: 12px; margin: 8px 0 0; }
    .body { padding: 32px 24px; }
    .greeting { font-size: 16px; margin-bottom: 16px; }
    .trip-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .trip-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .trip-code { font-size: 11px; color: #9ca3af; font-family: monospace; text-transform: uppercase; }
    .details { margin: 16px 0 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
    .detail-label { color: #6b7280; }
    .detail-value { font-weight: 600; }
    .price-row { padding: 12px 0 0; border: none; font-size: 18px; }
    .price-row .detail-value { color: #1a1a1a; font-size: 22px; }
    .cta-btn { display: block; background: #2563eb; color: #fff !important; text-decoration: none; text-align: center; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 24px 0; }
    .note { font-size: 12px; color: #9ca3af; line-height: 1.6; margin: 16px 0; }
    .footer { background: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #f3f4f6; }
    .footer p { font-size: 11px; color: #9ca3af; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PINGINTRIP</h1>
      <p>Authentic journeys, real friendships, local soul</p>
    </div>
    <div class="body">
      <p class="greeting">Hi ${data.userName},</p>
      <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
        Thank you for your booking! Here are your trip details. Please complete the payment to confirm your spot.
      </p>

      <div class="trip-card">
        <p class="trip-title">${data.tripTitle}</p>
        <p class="trip-code">${data.tripCode} · Order #${data.orderNumber}</p>
        <div class="details">
          <div class="detail-row">
            <span class="detail-label">📅 Dates</span>
            <span class="detail-value">${data.startDate} — ${data.endDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">⏱ Duration</span>
            <span class="detail-value">${data.durationDays} days</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">👥 Travelers</span>
            <span class="detail-value">${data.travelerCount}</span>
          </div>
          <div class="detail-row price-row">
            <span class="detail-label">Total</span>
            <span class="detail-value">${data.totalPrice}</span>
          </div>
        </div>
      </div>

      <a href="${data.paymentUrl}" class="cta-btn">Complete Payment →</a>

      <p class="note">
        ⚠️ This payment link will expire. Please complete the payment as soon as possible to secure your booking.
        If you have any questions, reply to this email or contact our team.
      </p>
    </div>
    <div class="footer">
      <p>Pingintrip · Lombok & Bali, Indonesia</p>
      <p>Since 2013 · Authentic Adventures</p>
    </div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: FROM,
    to: data.to,
    subject: `🎫 Complete Your Booking — ${data.tripTitle} | Pingintrip`,
    html,
  });
}

// ============================
// Email 2: Booking Confirmation
// ============================

export async function sendConfirmationEmail(data: {
  to: string;
  userName: string;
  orderNumber: string;
  tripTitle: string;
  tripCode: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelerCount: number;
  totalPrice: string;
  currency: string;
  pdfBuffer?: Buffer;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5; color: #1a1a1a; }
    .container { max-width: 580px; margin: 0 auto; background: #fff; }
    .header { background: #1a1a1a; padding: 32px 24px; text-align: center; }
    .header h1 { color: #fff; font-size: 20px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.5); font-size: 12px; margin: 8px 0 0; }
    .body { padding: 32px 24px; }
    .success-badge { display: inline-block; background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 20px; margin-bottom: 16px; }
    .greeting { font-size: 16px; margin-bottom: 16px; }
    .trip-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .trip-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .trip-code { font-size: 11px; color: #9ca3af; font-family: monospace; text-transform: uppercase; }
    .details { margin: 16px 0 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #d1fae5; font-size: 13px; }
    .detail-label { color: #6b7280; }
    .detail-value { font-weight: 600; }
    .next-steps { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin: 20px 0; }
    .next-steps h3 { font-size: 13px; margin: 0 0 8px; color: #1e40af; }
    .next-steps ul { margin: 0; padding-left: 16px; font-size: 12px; color: #4b5563; line-height: 1.8; }
    .footer { background: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #f3f4f6; }
    .footer p { font-size: 11px; color: #9ca3af; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PINGINTRIP</h1>
      <p>Authentic journeys, real friendships, local soul</p>
    </div>
    <div class="body">
      <span class="success-badge">✅ BOOKING CONFIRMED</span>
      <p class="greeting">Congratulations, ${data.userName}!</p>
      <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
        Your booking has been confirmed by our team. We're excited to take you on an unforgettable adventure!
      </p>

      <div class="trip-card">
        <p class="trip-title">${data.tripTitle}</p>
        <p class="trip-code">${data.tripCode} · Order #${data.orderNumber}</p>
        <div class="details">
          <div class="detail-row">
            <span class="detail-label">📅 Dates</span>
            <span class="detail-value">${data.startDate} — ${data.endDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">⏱ Duration</span>
            <span class="detail-value">${data.durationDays} days</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">👥 Travelers</span>
            <span class="detail-value">${data.travelerCount}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">💰 Total Paid</span>
            <span class="detail-value">${data.totalPrice}</span>
          </div>
        </div>
      </div>

      <div class="next-steps">
        <h3>📋 What's Next?</h3>
        <ul>
          <li>Your booking ticket is attached as a PDF</li>
          <li>Our guide will contact you before the trip with details</li>
          <li>Make sure to pack light and bring sunscreen ☀️</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p>Pingintrip · Lombok & Bali, Indonesia</p>
      <p>Since 2013 · Authentic Adventures</p>
    </div>
  </div>
</body>
</html>`;

  const attachments = data.pdfBuffer
    ? [{ filename: `Pingintrip-Ticket-${data.orderNumber}.pdf`, content: data.pdfBuffer }]
    : [];

  await transporter.sendMail({
    from: FROM,
    to: data.to,
    bcc: "pingintrip.com+69011a4c00@invite.trustpilot.com",
    subject: `✅ Booking Confirmed — ${data.tripTitle} | Pingintrip`,
    html,
    attachments,
  });
}
