import {
  regions,
  places,
} from "@/data/destinations";

const BASE_URL = "https://pingintrip.com";
const LOCALES = ["en", "id", "cn"];

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    "",
    "/destinations",
  ].flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
  );

  // Place detail pages (78 places × 3 locales = 234 URLs)
  const placePages = places.flatMap((place) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/destinations/${place.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  // Region pages (if you ever add them)
  const regionPages = regions.flatMap((region) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/destinations#region-${region.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticPages, ...placePages, ...regionPages];
}
