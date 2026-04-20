import "../globals.css";

import {Caveat, Lora, Outfit} from "next/font/google";
import {NextIntlClientProvider, hasLocale} from "next-intl";

import AuthProvider from "@/components/providers/AuthProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import type {Metadata} from "next";
import Script from "next/script";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pingintrip — Discover Lombok & Bali",
  description:
    "Craft your perfect island getaway. Custom tour packages for Lombok and Bali — personalized itineraries designed just for you.",
  icons: {
    icon: "/logo/favicon/favicon.ico",
    apple: "/logo/favicon/apple-touch-icon.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-theme="traveltour">
      <body
        className={`${outfit.variable} ${lora.variable} ${caveat.variable} antialiased`}
      >
        <AuthProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AuthProvider>
        <GoogleAnalytics />
        <Script
          id="trustpilot-invite"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');tp('register','fOGWEFBQqTP3yy6w');`,
          }}
        />
      </body>
    </html>
  );
}
