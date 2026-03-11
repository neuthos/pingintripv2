---
name: pingintrip-codebase-patterns
description: Comprehensive coding patterns, conventions, and architecture guide for the Pingintrip travel web app
---

# Pingintrip Codebase Patterns & Conventions

This skill documents all coding patterns, folder structures, and conventions established in this project. Follow these precisely when making any changes.

---

## 1. Folder Structure — Current State

```
src/
├── app/
│   └── [locale]/
│       ├── (main)/
│       │   ├── layout.tsx          # Main layout (Navbar + Footer)
│       │   └── page.tsx            # Landing page (assembles sections)
│       ├── layout.tsx              # Root locale layout (fonts, providers, NextIntl)
│       └── api/
│           └── auth/[...nextauth]/ # NextAuth route
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Global navbar (sticky, multilingual, auth)
│   │   └── Footer.tsx              # Global footer (contact, links, social)
│   ├── sections/                   # Landing page sections (each is standalone)
│   │   ├── MissionSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── DestinationsSection.tsx
│   │   ├── TripsSection.tsx
│   │   ├── BrandStorySection.tsx
│   │   ├── USPSection.tsx
│   │   └── FinalCTASection.tsx
│   ├── ui/
│   │   └── optimized-image.tsx     # ⚠️ MUST use for all images
│   └── providers/
│       └── AuthProvider.tsx        # NextAuth SessionProvider
├── data/                           # ALL static data lives here — NEVER in components
│   ├── company.ts                  # Company info, social links, footer nav
│   ├── destinations.ts            # 8 destinations with multilingual support
│   ├── packages.ts                # Tour packages with multi-currency pricing
│   └── reviews.ts                 # Testimonials
├── i18n/
│   ├── routing.ts                 # Locales: en, id, cn | Default: en
│   ├── navigation.ts              # createNavigation() — use {Link} from here
│   └── request.ts                 # Server-side locale resolution
├── lib/
│   └── auth.ts                    # NextAuth config (Google OAuth)
└── types/                          # TypeScript type definitions

messages/                           # i18n translation files
├── en.json
├── id.json
└── cn.json

public/
└── assets/                         # Converted images (via npm run convert-image)
    ├── bali/                       # Each has placeholder, sm, md, lg, xl, original, metadata.json
    ├── lombok/
    ├── komodo/
    ├── ...
    └── trips-bg/
```

---

## 2. Section Component Pattern

Every landing page section follows this pattern:

```tsx
"use client";

import {useTranslations} from "next-intl";
import {useLocale} from "next-intl";                    // if needs locale-specific data
import OptimizedImage from "@/components/ui/optimized-image"; // if has images
import {Link} from "@/i18n/navigation";                  // if has links

export default function SectionNameSection() {
  const t = useTranslations("SectionName");   // key from messages/*.json
  const locale = useLocale();                  // only if needed

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading — consistent style across all sections */}
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-neutral mb-4">
          {t("heading")}
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          {t("subtitle")}
        </p>
        {/* Section content */}
      </div>
    </section>
  );
}
```

### Key rules:
- Always `"use client"` for sections (they use hooks)
- Use `useTranslations("SectionKey")` — NEVER hardcode text
- Use `useLocale()` to pick locale-specific data from constants
- Background patterns use inline SVG — NOT raster images
- Section files go in `src/components/sections/`
- Component name = `{Name}Section` (PascalCase)
- File name = `{Name}Section.tsx` (PascalCase)

---

## 3. Data / Constants Pattern

ALL data constants live in `src/data/`. Structure:

```typescript
// Always export interface first
export interface Destination {
  id: string;        // string ID for relations: "dest-bali"
  slug: string;      // URL slug: "bali"
  name: {            // Multilingual fields
    en: string;
    id: string;
    cn: string;
  };
  // ... other fields
  image: string;     // Path to OptimizedImage folder: "/assets/bali"
}

// Then export the data array
export const destinations: Destination[] = [
  { id: "dest-bali", slug: "bali", ... },
];

// Then export helper functions
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
```

### Multi-currency pricing pattern (from `packages.ts`):

```typescript
export type Currency = "USD" | "IDR" | "CNY";

export interface MultiCurrencyPrice {
  USD: { amount: number; discountedAmount?: number };
  IDR: { amount: number; discountedAmount?: number };
  CNY: { amount: number; discountedAmount?: number };
}

// Helper to format price
export function formatPrice(amount: number, currency: Currency): string { ... }

// Helper to get default currency from locale
export function getDefaultCurrency(locale: string): Currency { ... }
```

### Multilingual data access pattern:

```typescript
// In component:
const locale = useLocale();
const name = dest.name[locale as keyof typeof dest.name] || dest.name.en;
```

---

## 4. i18n / Translations Pattern

### File structure (`messages/en.json`):

```json
{
  "Navbar": { ... },
  "Hero": { "title": "...", "subtitle": "...", "cta": "...", "secondaryCta": "..." },
  "Mission": { "heading": "...", "body": "..." },
  "Testimonials": { "heading": "...", "subtitle": "..." },
  "Destinations": { "heading": "...", "subtitle": "...", "cta": "...", "ctaHint": "..." },
  "Trips": { "heading": "...", "subtitle": "...", "viewAll": "...", "days": "...", "from": "...", "exploreTrip": "..." },
  "BrandStory": {
    "block1": { "heading": "...", "body1": "...", "body2": "...", "cta": "...", "ctaHref": "/about" },
    "block2": { ... },
    "block3": { ... }
  },
  "USP": {
    "heading": "...",
    "items": [
      { "title": "...", "description": "..." }
    ]
  },
  "FinalCTA": { "heading": "...", "cta": "..." },
  "Footer": { "tagline": "...", "companyTitle": "...", "infoTitle": "...", "destinationsTitle": "..." }
}
```

### Rules:
- Every section has its own top-level key matching the component's `useTranslations("Key")`
- Translation keys for links include `ctaHref` (the route path)
- Multilingual content in DATA (names, descriptions) uses `{ en, id, cn }` objects in `src/data/`
- Multilingual content for COPY (headings, UI text) uses `messages/*.json` i18n files
- ALWAYS update ALL 3 files: `en.json`, `id.json`, `cn.json` when adding/editing translations
- Locales: `en` (English), `id` (Indonesian), `cn` (Chinese)

---

## 5. Image Handling

### MANDATORY workflow:
1. Place original image in a folder
2. Run: `npm run convert-image -- ./path/to/image.jpg --name <slug>`
3. Use `<OptimizedImage src="/assets/<slug>" alt="..." />` in code
4. Set `image: "/assets/<slug>"` in data constants

### Image props:
```tsx
// Default (lazy loaded)
<OptimizedImage src="/assets/bali" alt="Bali" />

// Above the fold
<OptimizedImage src="/assets/hero" alt="Hero" priority />

// Fill parent container
<OptimizedImage src="/assets/bg" alt="" fill objectFit="cover" />
```

### NEVER:
- Use `<img>` tags
- Use Next.js `<Image>` for asset images (only OK for external URLs like Google avatars)
- Reference images without converting them first

---

## 6. Page Assembly Pattern

Landing page (`src/app/[locale]/(main)/page.tsx`) imports and stacks sections:

```tsx
import MissionSection from "@/components/sections/MissionSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
// ... etc

export default function HomePage() {
  const t = useTranslations("Hero");
  return (
    <main className="min-h-screen">
      {/* Hero — inline, not a separate section component */}
      <section className="hero min-h-[70vh] relative overflow-hidden">
        ...
      </section>

      <MissionSection />
      <TestimonialsSection />
      <DestinationsSection />
      <TripsSection />
      <BrandStorySection />
      <USPSection />
      <FinalCTASection />
    </main>
  );
}
```

### Layout (`src/app/[locale]/(main)/layout.tsx`):
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
```

---

## 7. Styling Conventions

- **Primary framework**: Tailwind CSS + DaisyUI
- **Tailwind v4 syntax**: Use `aspect-4/5` not `aspect-[4/5]`, `bg-linear-to-t` not `bg-gradient-to-t`, `z-2` not `z-[2]`
- **Section headings**: `text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-neutral`
- **Body italic text** (brand feel): `style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic" }}`
- **Fonts**: Outfit (primary, sans) + Lora (accent, serif italic)
- **Colors**: Use DaisyUI theme colors (`text-neutral`, `btn-primary`, etc.)
- **Dark sections**: `bg-[#1a1a1a]` with SVG pattern backgrounds
- **Mobile-first**: Always design mobile layout first, add `md:` and `lg:` breakpoints

### SVG Background Patterns:
- **Topographic contours** (Trips section): Concentric ellipses with rotation + flowing paths
- **Ocean waves** (Final CTA): Horizontal cubic bezier curves
- Always use `opacity-[0.1]` to `opacity-[0.15]` for subtle effect
- Use `preserveAspectRatio="xMidYMid slice"` for full coverage

---

## 8. Navigation / Routing

- Use `import {Link} from "@/i18n/navigation"` — NOT `next/link`
- Links auto-prefix with locale: `<Link href="/packages">` → `/en/packages`
- Available locales: `en` (default), `id`, `cn`

---

## 9. Adding a New Section — Checklist

1. ☐ Create `src/components/sections/{Name}Section.tsx`
2. ☐ Add translation key `"{Name}"` to `messages/en.json`
3. ☐ Add same key to `messages/id.json` (Indonesian)
4. ☐ Add same key to `messages/cn.json` (Chinese)
5. ☐ If needs data, create/update file in `src/data/`
6. ☐ If needs images, convert with `npm run convert-image` first
7. ☐ Import and add to `src/app/[locale]/(main)/page.tsx`
8. ☐ Test in browser — check all 3 locales

---

## 10. Company Data Constants (`src/data/company.ts`)

Central place for all company/contact info:
- `companyInfo` — name, address, email, phone, logo paths
- `socialLinks` — array of { name, url, icon }
- `footerNavColumns` — 3 columns of navigation links

Edit this file to update contact info, social URLs, or footer links.

---

## 11. Common Gotchas

- **Hydration errors**: Don't use `new Date()`, `Math.random()`, or `typeof window` in render. Hardcode year in footer.
- **Image paths**: After `npm run convert-image`, output goes to `/assets/<name>/` (not `/assets/destinations/<name>/`)
- **Tailwind v4**: Class syntax changed — check lint warnings for outdated formats
- **Browser extensions**: Grammarly causes `data-gr-ext-installed` hydration warnings — not our bug
- **next/image for external URLs**: Add hostnames to `next.config.ts` images config (e.g., `lh3.googleusercontent.com` for Google avatars)
