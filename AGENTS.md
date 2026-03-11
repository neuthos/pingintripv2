# Travel & Tour Web App — Project Context

## Overview
B2C travel & tour web application targeting travelers and families visiting **Lombok** and **Bali**. The unique selling point is **custom tour building** — travelers pick destinations and we generate a personalized itinerary.

## Business Context
- **Model**: Direct selling (no marketplace, no commission)
- **Target**: Individual travelers & families planning Lombok/Bali trips
- **Core Feature**: Custom tour builder — user selects destinations → system generates itinerary with scheduling
- **Payment**: Xendit integration
- **Authentication**: Google OAuth

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS + DaisyUI |
| Language | TypeScript |
| Database | PostgreSQL (orders only) |
| Auth | Google OAuth (NextAuth.js) |
| Payment | Xendit |
| Deployment | Vercel |
| Design | Mobile-first, responsive |

## Architecture Decisions

### Frontend-Heavy MVP
- All tour data (packages, destinations, itineraries, reviews) stored as **JSON constants** in `src/data/` folder
- No backend CRUD for content — all content is static data for MVP
- Only 1 API: **Order API** (Next.js API Routes → PostgreSQL)

### Data Strategy
All static data files live in `src/data/`:
```
src/data/
├── destinations.ts    # All destination data (Lombok & Bali)
├── packages.ts        # Pre-built tour packages
├── itineraries.ts     # Sample itineraries & activities
├── reviews.ts         # Customer reviews/testimonials
├── categories.ts      # Tour categories (adventure, culture, beach, etc.)
└── index.ts           # Barrel export
```

### Folder Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/             # Public pages (with main layout)
│   │   ├── page.tsx        # Landing/Home page
│   │   ├── destinations/   # Browse destinations
│   │   ├── packages/       # Tour packages listing & detail
│   │   ├── custom-tour/    # Custom tour builder
│   │   ├── booking/        # Booking & checkout flow
│   │   └── layout.tsx      # Main layout (navbar, footer)
│   ├── api/                # API routes
│   │   ├── orders/         # Order CRUD
│   │   ├── payment/        # Xendit webhook & callbacks
│   │   └── auth/           # NextAuth routes
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   ├── ui/                 # Atomic/base components (cards, buttons, modals)
│   │   └── optimized-image.tsx  # ⚠️ WAJIB dipakai untuk semua image
│   ├── sections/           # Page sections (hero, features, testimonials)
│   └── layout/             # Layout components (navbar, footer, sidebar)
├── data/                   # Static JSON/TS data constants
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & configurations
│   ├── db.ts               # Database connection (Prisma/Drizzle)
│   ├── xendit.ts           # Xendit client config
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript type definitions
└── styles/                 # Additional style files if needed
```

### Image Optimization System

Project ini menggunakan sistem optimasi image custom. **SEMUA image yang digunakan di project ini WAJIB melalui proses ini.**

#### Workflow Menambahkan Image Baru
1. Siapkan image original (jpg/png/webp)
2. Jalankan converter script:
   ```bash
   npm run convert-image -- ./path/to/image.jpg
   # atau dengan custom nama:
   npm run convert-image -- ./path/to/image.jpg --name hero-banner
   ```
3. Script akan generate folder di `public/assets/<nama>/` berisi:
   - `placeholder.webp` — 20px blur placeholder
   - `sm.webp` — 640px
   - `md.webp` — 1024px
   - `lg.webp` — 1536px
   - `xl.webp` — 1920px
   - `original.webp` — ukuran asli
   - `metadata.json` — info sizes, aspect ratio, dominant color
4. Gunakan `OptimizedImage` component di code:
   ```tsx
   import OptimizedImage from "@/components/ui/optimized-image";

   <OptimizedImage src="/assets/hero-banner" alt="Hero" />
   ```

#### Aturan Image
- **JANGAN** gunakan `<img>` tag biasa atau Next.js `<Image>` untuk asset image project
- **SELALU** gunakan `<OptimizedImage>` component dari `@/components/ui/optimized-image`
- **SELALU** convert image terlebih dahulu dengan `npm run convert-image` sebelum dipakai
- Untuk hero/above-the-fold image, gunakan prop `priority` agar tidak lazy loaded
- Image assets yang sudah di-convert disimpan di `public/assets/`

#### OptimizedImage Quick Reference
```tsx
// Lazy loaded (default)
<OptimizedImage src="/assets/foto" alt="Deskripsi" />

// Priority (hero, above-the-fold)
<OptimizedImage src="/assets/hero" alt="Hero" priority />

// Fixed size
<OptimizedImage src="/assets/thumb" alt="Thumb" width={400} height={300} />

// Fill parent
<OptimizedImage src="/assets/bg" alt="Background" fill objectFit="cover" />
```

## Code Style & Conventions
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files/folders
- **Components**: Functional components with TypeScript interfaces for props
- **State Management**: React Context + `useState`/`useReducer` (keep it simple for MVP)
- **Imports**: Use `@/` path alias for all imports from `src/`
- **DRY**: Don't repeat yourself — extract shared logic into hooks and utilities
- **Responsiveness**: Always design mobile-first, then add desktop breakpoints
- **Accessibility**: Use semantic HTML, proper ARIA attributes

## MVP Features
1. **Landing Page** — Hero, featured destinations, popular packages, testimonials
2. **Destination Browser** — Browse & filter destinations (Lombok, Bali) with search
3. **Tour Packages** — List and detail view of pre-built tour packages
4. **Custom Tour Builder** — Select destinations → generate custom itinerary → book
5. **Booking & Checkout** — Booking form with Xendit payment integration
6. **Authentication** — Google login/signup via NextAuth.js
7. **Reviews & Ratings** — Display reviews on packages (static data for MVP)

## Important Rules
- All data constants MUST be in `src/data/` — never scatter data across components
- Mobile-first: always start with mobile layout, enhance for larger screens
- Use DaisyUI component classes first, custom Tailwind only when needed
- Keep API routes minimal — only order-related endpoints for MVP
- Every component must be typed with TypeScript — no `any` types
- No testing in MVP phase — focus on shipping features
- **⚠️ SEMUA image WAJIB menggunakan `OptimizedImage` component** — JANGAN pakai `<img>` biasa atau `next/image`
- **⚠️ Image baru WAJIB dikonversi dulu** dengan `npm run convert-image` sebelum dipakai di component
- Image assets yang sudah di-convert disimpan di `public/assets/<nama>/`
