import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

interface TicketData {
  orderNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  tripTitle: string;
  tripCode: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelerCount: number;
  totalPrice: string;
  currency: string;
  status: string;
}

export function generateTicketPDF(data: TicketData): Buffer {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Load logo
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo", "pingintrip-logo.webp");
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/webp;base64,${logoBuffer.toString("base64")}`;
    }
  } catch {
    // Logo not found, skip
  }

  // ============================
  // Header Band
  // ============================
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, pageWidth, 50, "F");

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, "WEBP", margin, 12, 28, 28);
    } catch {
      // Fallback: text-only header
    }
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("PINGINTRIP", logoBase64 ? margin + 33 : margin, 28);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text("Authentic journeys, real friendships, local soul", logoBase64 ? margin + 33 : margin, 35);

  // ============================
  // Booking Confirmation Title
  // ============================
  let y = 62;
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Confirmation", margin, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text(`Order #${data.orderNumber}`, margin, y);

  // ============================
  // Status Badge
  // ============================
  y += 4;
  const statusText = data.status === "paid" ? "PAID" : data.status === "confirmed" ? "CONFIRMED" : data.status.toUpperCase().replace("_", " ");
  doc.setFontSize(8);
  const statusWidth = doc.getTextWidth(statusText) + 10;
  doc.setFillColor(220, 252, 231); // green bg
  doc.roundedRect(margin, y, statusWidth, 7, 2, 2, "F");
  doc.setTextColor(22, 101, 52); // green text
  doc.setFont("helvetica", "bold");
  doc.text(statusText, margin + 5, y + 5);

  // ============================
  // Trip Details Card
  // ============================
  y += 18;
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, y, contentWidth, 60, 3, 3, "FD");

  const cardX = margin + 8;
  let cardY = y + 10;

  doc.setTextColor(26, 26, 26);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.tripTitle, cardX, cardY);

  cardY += 6;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 163, 175);
  doc.text(data.tripCode, cardX, cardY);

  // Divider
  cardY += 6;
  doc.setDrawColor(229, 231, 235);
  doc.line(cardX, cardY, margin + contentWidth - 8, cardY);
  cardY += 8;

  // Detail rows
  const detailRows: [string, string][] = [
    ["Dates", `${data.startDate} — ${data.endDate}`],
    ["Duration", `${data.durationDays} days`],
    ["Travelers", `${data.travelerCount}`],
    ["Total Paid", data.totalPrice],
  ];

  doc.setFontSize(9);
  for (const [label, value] of detailRows) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(label, cardX, cardY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(value, margin + contentWidth - 8, cardY, { align: "right" });
    cardY += 7;
  }

  // ============================
  // Guest Information
  // ============================
  y += 72;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 26);
  doc.text("Guest Information", margin, y);

  y += 8;
  doc.setFontSize(9);
  const guestRows: [string, string][] = [
    ["Name", data.userName],
    ["Email", data.userEmail],
    ["Phone", data.userPhone],
  ];

  for (const [label, value] of guestRows) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(label, margin, y);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(value, margin + 35, y);
    y += 7;
  }

  // ============================
  // Important Notes
  // ============================
  y += 8;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, y, contentWidth, 35, 3, 3, "FD");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 64, 175);
  doc.text("Important Notes", margin + 8, y + 8);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  const notes = [
    "• Please present this ticket on the day of your trip",
    "• Our guide will contact you before departure with meeting details",
    "• Bring sunscreen, comfortable shoes, and a sense of adventure!",
  ];
  let noteY = y + 15;
  for (const note of notes) {
    doc.text(note, margin + 8, noteY);
    noteY += 5.5;
  }

  // ============================
  // Footer
  // ============================
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 163, 175);
  doc.text("Pingintrip · Lombok & Bali, Indonesia · Since 2013", pageWidth / 2, footerY, { align: "center" });
  doc.text("hello@pingintrip.com · www.pingintrip.com", pageWidth / 2, footerY + 4, { align: "center" });

  // Return as buffer
  return Buffer.from(doc.output("arraybuffer"));
}
