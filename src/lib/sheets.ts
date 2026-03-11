import {google} from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Enquiries";

const HEADERS = [
  "Timestamp",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Destinations",
  "Month",
  "Year",
  "Duration (days)",
  "Travelers",
  "Family",
  "Budget",
  "Currency",
  "Comments",
  "How Heard",
  "Newsletter",
  "Google Sign-In",
  "Locale",
];

export interface EnquiryData {
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
  hearAbout: string;
  newsletter: boolean;
  googleSignIn: boolean;
  locale: string;
}

export async function appendEnquiryToSheet(data: EnquiryData) {
  const auth = getAuth();
  const sheets = google.sheets({version: "v4", auth});

  // Check if headers exist, if not add them
  try {
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:R1`,
    });

    if (!existing.data.values || existing.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:R1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [HEADERS],
        },
      });
    }
  } catch {
    // Sheet might not exist yet or no data — headers will be set
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:R1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [HEADERS],
      },
    });
  }

  const now = new Date();
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const budgetStr = `${data.currency} ${data.budgetMin.toLocaleString()} - ${data.budgetMax.toLocaleString()}`;

  const row = [
    timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.destinations,
    data.month,
    data.year,
    String(data.duration),
    data.travelers,
    data.isFamily ? "Yes" : "No",
    budgetStr,
    data.currency,
    data.comments,
    data.hearAbout,
    data.newsletter ? "Yes" : "No",
    data.googleSignIn ? "Yes" : "No",
    data.locale,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:R`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });

  return {success: true};
}
