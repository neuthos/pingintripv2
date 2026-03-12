import {companyInfo} from "./company";

export interface PrivacySection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    content: string[];
    items?: string[];
  }[];
}

export const privacyPolicyMeta = {
  lastUpdated: "2025-03-12",
  effectiveDate: "2025-03-12",
  version: "1.0",
  contactEmail: companyInfo.email,
  companyName: companyInfo.legalName,
};

export const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      `Welcome to ${companyInfo.name}. This Privacy Policy explains how ${companyInfo.legalName} ("we", "our", or "us") collects, uses, discloses, and safeguards your information when you visit our website and use our services.`,
      "By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "We collect information that you provide directly to us, as well as information that is collected automatically when you use our services.",
    ],
    subsections: [
      {
        title: "Personal Information You Provide",
        content: [
          "When you make an enquiry, create a booking, or interact with our services, we may collect the following information:",
        ],
        items: [
          "Full name (first and last name)",
          "Email address",
          "Phone number",
          "Travel preferences and destination choices",
          "Travel dates, group size, and budget preferences",
          "Special requests (dietary needs, accessibility requirements, etc.)",
          "How you heard about us (referral source)",
          "Any additional comments or messages you provide",
        ],
      },
      {
        title: "Google Account Information",
        content: [
          "If you choose to sign in with Google, we receive the following information from your Google account:",
        ],
        items: [
          "Your name",
          "Your email address",
          "Your profile picture",
          "Your Google account ID",
        ],
      },
      {
        title: "Automatically Collected Information",
        content: [
          "When you visit our website, certain information is collected automatically:",
        ],
        items: [
          "Browser type and version",
          "Device type and operating system",
          "IP address and approximate location",
          "Pages visited and time spent on each page",
          "Referring website or source",
          "Cookie data and local storage preferences (e.g., saved trip selections)",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: ["We use the information we collect for the following purposes:"],
    subsections: [
      {
        title: "Service Delivery",
        content: [],
        items: [
          "To process and respond to your trip enquiries",
          "To create personalized tour itineraries based on your preferences",
          "To communicate with you about your bookings and travel plans",
          "To provide customer support and respond to your questions",
        ],
      },
      {
        title: "Improvement & Communication",
        content: [],
        items: [
          "To improve our website, services, and user experience",
          "To send promotional offers and travel inspiration (only if you opt in to our newsletter)",
          "To analyze website usage and optimize our content",
          "To detect and prevent fraud or security issues",
        ],
      },
    ],
  },
  {
    id: "how-we-share",
    title: "How We Share Your Information",
    content: [
      "We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:",
    ],
    subsections: [
      {
        title: "Service Providers",
        content: [
          "We use trusted third-party services to operate our business:",
        ],
        items: [
          "Payment processing partners (for secure transaction handling)",
          "Communication tools (for internal team notifications about new enquiries)",
          "Cloud storage services (for securely storing enquiry and booking data)",
          "Authentication providers (Google, for secure sign-in)",
        ],
      },
      {
        title: "Legal Requirements",
        content: [
          "We may disclose your information if required to do so by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
        ],
      },
      {
        title: "Business Transfers",
        content: [
          "In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of that transaction. We will notify you of any such change in ownership.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Local Storage",
    content: [
      "Our website uses cookies and local storage to enhance your browsing experience.",
    ],
    subsections: [
      {
        title: "Essential Cookies",
        content: [
          "These are necessary for the website to function properly and cannot be disabled:",
        ],
        items: [
          "Authentication cookies — to keep you signed in during your session",
          "Language preference — to remember your selected language (English, Indonesian, or Chinese)",
          "Trip selection storage — to save your selected destinations as you build your custom tour",
        ],
      },
      {
        title: "Analytics Cookies",
        content: [
          "We may use analytics tools to understand how visitors interact with our website. These cookies collect information anonymously and help us improve our services.",
        ],
      },
      {
        title: "Managing Cookies",
        content: [
          "You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website, particularly the trip-building feature that stores your selected destinations locally.",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      "We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.",
    ],
    subsections: [
      {
        title: "Retention Periods",
        content: [],
        items: [
          "Enquiry data — retained for up to 2 years to allow follow-up and service improvement",
          "Booking and transaction data — retained for up to 5 years for legal and accounting purposes",
          "Account data (Google sign-in) — retained until you request deletion or deactivate your account",
          "Cookie and browsing data — automatically expires based on cookie duration settings",
        ],
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "Depending on your location, you may have certain rights regarding your personal information:",
    ],
    subsections: [
      {
        title: "Available Rights",
        content: [],
        items: [
          "Access — request a copy of the personal data we hold about you",
          "Correction — request that we correct any inaccurate or incomplete information",
          "Deletion — request that we delete your personal data, subject to legal obligations",
          "Objection — object to the processing of your personal data for certain purposes",
          "Portability — request a copy of your data in a structured, machine-readable format",
          "Withdraw consent — withdraw your consent at any time where we rely on consent as the legal basis for processing",
        ],
      },
      {
        title: "How to Exercise Your Rights",
        content: [
          `To exercise any of these rights, please contact us at ${companyInfo.email}. We will respond to your request within 30 days.`,
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: [
      "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal data from a child under 16 without parental consent, we will take steps to remove that information from our servers.",
      "If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: [
      `${companyInfo.legalName} is based in Indonesia. If you are accessing our website from outside Indonesia, please be aware that your information may be transferred to, stored, and processed in Indonesia where our servers are located and our central database is operated.`,
      "By using our services, you consent to any such transfer of information outside of your country. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party websites, such as social media platforms, travel review sites, and partner websites. We are not responsible for the privacy practices or content of these external sites.",
      "We encourage you to read the privacy policy of every website you visit. This Privacy Policy applies only to our website and services.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this page.',
      "We encourage you to review this Privacy Policy periodically. Your continued use of our website after any changes indicates your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy, your personal data, or would like to exercise your rights, please contact us:",
    ],
    subsections: [
      {
        title: "Contact Details",
        content: [
          `Company: ${companyInfo.legalName}`,
          `Address: ${companyInfo.address}`,
          `Email: ${companyInfo.email}`,
          `Phone: ${companyInfo.phoneFormatted}`,
        ],
      },
    ],
  },
];
