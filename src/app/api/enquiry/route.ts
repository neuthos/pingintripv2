import {NextRequest, NextResponse} from "next/server";
import {appendEnquiryToSheet, type EnquiryData} from "@/lib/sheets";
import {sendTelegramNotification} from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return NextResponse.json(
        {error: "Missing required fields"},
        {status: 400},
      );
    }

    const enquiryData: EnquiryData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      destinations: body.destinations || "",
      month: body.month || "",
      year: body.year || "",
      duration: body.duration || 1,
      travelers: body.travelers || "2",
      isFamily: body.isFamily || false,
      budgetMin: body.budgetMin || 0,
      budgetMax: body.budgetMax || 0,
      currency: body.currency || "USD",
      comments: body.comments || "",
      hearAbout: body.hearAbout || "",
      newsletter: body.newsletter ?? true,
      googleSignIn: body.googleSignIn || false,
      locale: body.locale || "en",
    };

    // Run Sheets + Telegram in parallel
    const results = await Promise.allSettled([
      appendEnquiryToSheet(enquiryData),
      sendTelegramNotification({
        firstName: enquiryData.firstName,
        lastName: enquiryData.lastName,
        email: enquiryData.email,
        phone: enquiryData.phone,
        destinations: enquiryData.destinations,
        month: enquiryData.month,
        year: enquiryData.year,
        duration: enquiryData.duration,
        travelers: enquiryData.travelers,
        isFamily: enquiryData.isFamily,
        budgetMin: enquiryData.budgetMin,
        budgetMax: enquiryData.budgetMax,
        currency: enquiryData.currency,
        comments: enquiryData.comments,
        googleSignIn: enquiryData.googleSignIn,
      }),
    ]);

    // Log any failures but still return success
    const sheetsResult = results[0];
    const telegramResult = results[1];

    if (sheetsResult.status === "rejected") {
      console.error("Google Sheets error:", sheetsResult.reason);
    }
    if (telegramResult.status === "rejected") {
      console.error("Telegram error:", telegramResult.reason);
    }

    // Return success even if one channel fails
    return NextResponse.json({
      success: true,
      sheets: sheetsResult.status === "fulfilled",
      telegram: telegramResult.status === "fulfilled",
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      {error: "Failed to process enquiry"},
      {status: 500},
    );
  }
}
