const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export interface TelegramEnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destinations: string;
  month: string;
  year: string;
  duration: number;
  travelers: string;
  isFamily: boolean;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  comments: string;
  googleSignIn: boolean;
}

function formatBudget(min: number, max: number, currency: string): string {
  const fmt = (n: number) => n.toLocaleString();
  return `${currency} ${fmt(min)} - ${fmt(max)}`;
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function sendTelegramNotification(data: TelegramEnquiryData) {
  const googleStatus = data.googleSignIn
    ? "✅ Yes \\(10% discount eligible\\)"
    : "❌ No";

  const message = `
📩 *New Enquiry\\!*

👤 *${escapeMarkdown(data.firstName)} ${escapeMarkdown(data.lastName)}*
📧 ${escapeMarkdown(data.email)}
📱 ${escapeMarkdown(data.phone)}
🔑 Google Sign\\-In: ${googleStatus}

📍 *Destinations:* ${escapeMarkdown(data.destinations || "Not specified")}
📅 ${escapeMarkdown(data.month || "Flexible")} ${escapeMarkdown(data.year || "")} · ${data.duration} days
👥 ${escapeMarkdown(data.travelers)} traveller\\(s\\)${data.isFamily ? " 👨‍👩‍👧‍👦 Family" : ""}
💰 Budget: ${escapeMarkdown(formatBudget(data.budgetMin, data.budgetMax, data.currency))}

${data.comments ? `💬 _"${escapeMarkdown(data.comments)}"_` : ""}
  `.trim();

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Telegram API error:", res.status, errBody);
    throw new Error(`Telegram API error ${res.status}: ${errBody}`);
  }

  return {success: true};
}
