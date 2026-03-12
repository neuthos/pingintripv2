import {companyInfo} from "./company";

export interface TermsSection {
  id: string;
  title: string;
  content: string[];
  items?: string[];
}

export const termsMeta = {
  lastUpdated: "2025-03-12",
  contactEmail: companyInfo.email,
  companyName: companyInfo.legalName,
};

export const termsSections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      `These Terms & Conditions ("Terms") govern your use of the ${companyInfo.name} website (pingintrip.com) and all related services provided by ${companyInfo.legalName} ("Pingintrip", "we", "our", or "us").`,
      "By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please discontinue use of our website and services.",
    ],
  },
  {
    id: "definitions",
    title: "Definitions",
    content: [],
    items: [
      '"Client", "you", "your" — the person making a booking or using our website',
      '"Services" — all tour services, activities, accommodations, and transportation arranged by Pingintrip',
      '"Website" — pingintrip.com and all its pages',
      '"Booking" — a confirmed reservation for any of our services',
      '"Trip" — the complete travel experience as described in the confirmed itinerary',
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: [
      "You must be at least 18 years old to make a booking with Pingintrip. By making a booking, you confirm that:",
    ],
    items: [
      "You are at least 18 years of age",
      "You have the legal authority to enter into a binding agreement",
      "You are responsible for all travelers included in your booking",
      "All information provided is accurate and complete",
      "Travelers under 18 must be accompanied by a parent or legal guardian",
    ],
  },
  {
    id: "website-use",
    title: "Use of Website",
    content: [
      "You may use our website for lawful purposes only. When using our website, you agree not to:",
    ],
    items: [
      "Use the website in any way that could damage, disable, or impair its functionality",
      "Attempt to gain unauthorized access to any part of the website or its systems",
      "Use automated tools (bots, scrapers) to collect data from the website without our permission",
      "Post or transmit any harmful, offensive, or illegal content",
      "Impersonate another person or misrepresent your affiliation with any entity",
      "Use the website to send unsolicited commercial communications (spam)",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "All content on the Pingintrip website — including text, photographs, graphics, logos, icons, videos, and design elements — is owned by or licensed to Pingintrip and is protected by Indonesian and international copyright laws.",
    ],
    items: [
      "You may not reproduce, distribute, or modify any content from our website without written permission",
      "The Pingintrip name, logo, and brand elements are trademarks of PT. Pingintrip Indonesia",
      "You may share links to our website pages for non-commercial purposes",
      "User-submitted content (reviews, photos) may be used by Pingintrip for marketing purposes with attribution",
    ],
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    content: [
      "Some features of our website may require you to sign in with a Google account. By creating or linking an account:",
    ],
    items: [
      "You are responsible for maintaining the security of your account",
      "You agree not to share your login credentials with others",
      "You accept responsibility for all activities that occur under your account",
      "We reserve the right to suspend or terminate accounts that violate these Terms",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services & Links",
    content: [
      "Our website may contain links to third-party websites and services. These include social media platforms, payment processors, and partner websites.",
    ],
    items: [
      "We are not responsible for the content, accuracy, or practices of third-party websites",
      "Your use of third-party services is subject to their own terms and conditions",
      "Links to third-party websites do not imply endorsement by Pingintrip",
      "Payment processing is handled by Xendit, a licensed payment service provider in Indonesia",
    ],
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by Indonesian law:",
    ],
    items: [
      "Pingintrip shall not be liable for any indirect, incidental, special, or consequential damages",
      "Our total liability for any claim shall not exceed the amount paid by you for the relevant service",
      "We are not liable for losses caused by events beyond our reasonable control (force majeure)",
      "We do not guarantee uninterrupted or error-free access to our website",
      "Information on our website is provided for general guidance and may be subject to change",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: [
      "You agree to indemnify and hold Pingintrip, its directors, employees, and partners harmless from any claims, losses, damages, or expenses (including legal fees) arising from:",
    ],
    items: [
      "Your breach of these Terms",
      "Your violation of any applicable law or regulation",
      "Your negligent or wrongful conduct during a trip",
      "Any misrepresentation made by you",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Disputes",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia.",
    ],
    items: [
      "Any disputes shall first be resolved through good-faith negotiation between the parties",
      "If negotiation fails, disputes shall be submitted to mediation in Lombok, West Nusa Tenggara",
      "If mediation is unsuccessful, disputes shall be resolved by the District Court of Mataram",
      "Nothing in these Terms limits your statutory rights as a consumer",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: [
      'We reserve the right to update these Terms at any time. Changes take effect immediately upon posting to our website. The "Last Updated" date at the top of this page indicates when these Terms were most recently revised.',
      "Your continued use of our website or services after any changes constitutes your acceptance of the updated Terms. We recommend reviewing these Terms periodically.",
    ],
  },
  {
    id: "severability",
    title: "Severability",
    content: [
      "If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have any questions about these Terms & Conditions, please contact us:",
      `Company: ${companyInfo.legalName}`,
      `Address: ${companyInfo.address}`,
      `Email: ${companyInfo.email}`,
      `Phone: ${companyInfo.phoneFormatted}`,
    ],
  },
];
