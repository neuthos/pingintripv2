import {useTranslations} from "next-intl";
import OptimizedImage from "@/components/ui/optimized-image";
import MissionSection from "@/components/sections/MissionSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TripsSection from "@/components/sections/TripsSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import USPSection from "@/components/sections/USPSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function HomePage() {
  const t = useTranslations("Hero");

  return (
    <main className="min-h-screen">
      {/* Hero Section with optimized background image */}
      <section className="hero min-h-[70vh] relative overflow-hidden">
        {/* Background Image */}
        <OptimizedImage
          src="/assets/hero2"
          alt="Lombok & Bali landscape"
          fill
          priority
          objectFit="cover"
          objectPosition="center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[3]" />

        {/* Content */}
        <div className="hero-content text-center relative z-[4]">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {t("title")}
            </h1>
            <p className="py-6 text-lg text-white/80">{t("subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">{t("cta")}</button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
                {t("secondaryCta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Philosophy */}
      <MissionSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Destinations */}
      <DestinationsSection />

      {/* Trips */}
      <TripsSection />

      {/* Brand Story — 3x 50/50 blocks */}
      <BrandStorySection />

      {/* Why Pingintrip — USP row */}
      <USPSection />

      {/* Final CTA */}
      <FinalCTASection />
    </main>
  );
}

