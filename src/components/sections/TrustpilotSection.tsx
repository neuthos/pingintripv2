"use client";

import {useEffect, useRef} from "react";

import Script from "next/script";
import {useTranslations} from "next-intl";

const BUSINESS_UNIT_ID = "fOGWEFBQqTP3yy6w";

export default function TrustpilotSection() {
  const t = useTranslations("Testimonials");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="69e5ca87d60e2d4008b2d3e6"
        data-style-height="52px"
        data-style-width="100%"
        data-token="5c297fb5-3e10-4e87-a0fa-d119aea80bb6"
      >
        <a
          href="https://www.trustpilot.com/review/pingintrip.com"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </section>
  );
}
