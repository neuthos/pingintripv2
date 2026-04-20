"use client";

import {useEffect, useRef} from "react";

import Script from "next/script";
import {useTranslations} from "next-intl";

const BUSINESS_UNIT_ID = "fOGWEFBQqTP3yy6w";

export default function TrustpilotSection() {
  const t = useTranslations("Testimonials");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize widget if script already loaded (e.g. on client navigation)
    if (
      widgetRef.current &&
      (
        window as {
          Trustpilot?: {
            loadFromElement: (el: HTMLElement, force: boolean) => void;
          };
        }
      ).Trustpilot
    ) {
      (
        window as {
          Trustpilot?: {
            loadFromElement: (el: HTMLElement, force: boolean) => void;
          };
        }
      ).Trustpilot!.loadFromElement(widgetRef.current, true);
    }
  }, []);

  return (
    <section className="py-3 md:py-5 bg-white">
      <Script
        id="trustpilot-widget-script"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (
            widgetRef.current &&
            (
              window as {
                Trustpilot?: {
                  loadFromElement: (el: HTMLElement, force: boolean) => void;
                };
              }
            ).Trustpilot
          ) {
            (
              window as {
                Trustpilot?: {
                  loadFromElement: (el: HTMLElement, force: boolean) => void;
                };
              }
            ).Trustpilot!.loadFromElement(widgetRef.current, true);
          }
        }}
      />
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height="240px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
      >
        <a
          href="https://www.trustpilot.com/review/pingintrip.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </section>
  );
}
