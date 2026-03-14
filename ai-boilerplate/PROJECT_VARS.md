# Project Variables
# Fill this once — all AI workflows and rules reference these values.
# If these are empty, the agent will ask you to fill them in first (/onboarding).

## App Identity
- **App Name**: 
- **Tagline**: 
- **Domain**: 
- **App Type**: <!-- e.g. B2C web app, SaaS dashboard, portfolio, e-commerce -->
- **Target Audience**: 
- **Elevator Pitch**: <!-- 1-2 sentences: what does this app do and for whom? -->

## Brand & Design
- **Brand Personality**: <!-- e.g. playful, professional, minimalist, bold, authentic -->
- **Brand Voice Keywords**: <!-- e.g. "friendly, local, authentic" — words to USE in copy -->
- **Forbidden Words**: <!-- e.g. "luxury, premium, exclusive" — words to NEVER use -->
- **Primary Color**: <!-- hex, e.g. #2563eb -->
- **Secondary Color**: <!-- hex -->
- **Accent Color**: <!-- hex -->
- **Dark Background**: <!-- hex, e.g. #1a1a1a -->
- **Font Primary**: <!-- e.g. Outfit, Inter, Roboto -->
- **Font Accent**: <!-- e.g. Lora (serif italic for brand feel), or "none" -->
- **Design Style**: <!-- e.g. glassmorphism, flat, minimalist, dark mode -->
- **Design Reference URLs**: <!-- optional inspiration links -->

## Tech Stack
- **Framework**: <!-- e.g. Next.js (App Router), Vite + React, Nuxt, SvelteKit -->
- **Language**: <!-- e.g. TypeScript, JavaScript -->
- **Styling**: <!-- e.g. Tailwind CSS + DaisyUI, Vanilla CSS, Chakra UI -->
- **Database**: <!-- e.g. PostgreSQL + Prisma, Supabase, MongoDB, "none for MVP" -->
- **Auth**: <!-- e.g. NextAuth (Google OAuth), Firebase Auth, Clerk, "none" -->
- **Payment**: <!-- e.g. Xendit, Stripe, Midtrans, "none" -->
- **Deployment**: <!-- e.g. Vercel, Netlify, Cloudflare Pages -->
- **Package Manager**: <!-- e.g. npm, pnpm, yarn -->

## i18n (Internationalization)
- **Locales**: <!-- e.g. ["en", "id", "cn"] or ["en"] for English-only -->
- **Default Locale**: <!-- e.g. "en" -->
- **i18n Library**: <!-- e.g. next-intl, react-i18next, "none" -->

## Architecture
- **Data Strategy**: <!-- e.g. "JSON constants in src/data/ for MVP, API later" or "Full backend API" -->
- **State Management**: <!-- e.g. "React Context + useState", "Zustand", "Redux" -->
- **API Style**: <!-- e.g. "Next.js API Routes", "REST API", "GraphQL", "none" -->
- **Image Strategy**: <!-- e.g. "optimized-image component with srcset", "next/image", "standard img" -->

## Folder Structure
<!-- Fill in or let the agent auto-detect after scaffolding -->
```
src/
├── app/                # Pages/routes
├── components/         # Reusable UI components
│   ├── ui/             # Atomic components
│   ├── sections/       # Page sections
│   └── layout/         # Navbar, Footer, etc.
├── data/               # Static data constants
├── lib/                # Utilities, configs
├── hooks/              # Custom React hooks
└── types/              # TypeScript types
```

## Team & Contacts
- **Founder/Owner**: 
- **Developer(s)**: 
- **Contact Email**: 
- **Contact Phone**: 

## Feature Checklist
<!-- Track what's done and what's pending -->
- [ ] Landing Page
- [ ] Navigation (Navbar + Footer)
- [ ] Authentication
- [ ] Core Feature 1: 
- [ ] Core Feature 2: 
- [ ] Core Feature 3: 
- [ ] i18n/Localization
- [ ] Payment Integration
- [ ] Email Notifications
- [ ] SEO & Performance
- [ ] Deployment Setup
