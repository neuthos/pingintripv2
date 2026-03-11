# Travel & Tour Web App — Lombok & Bali

B2C travel & tour web application for travelers visiting **Lombok** and **Bali** with custom tour building.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Auth**: Google OAuth (NextAuth.js)
- **Payment**: Xendit
- **Deployment**: Vercel

---

## 📸 Image Optimization System

Project ini menggunakan sistem optimasi image custom yang mengkonversi image menjadi folder berisi multiple WebP variants untuk performa optimal di web.

### Setup

```bash
npm install -D sharp
```

### Mengkonversi Image

Gunakan script `convert-image` untuk mengkonversi image menjadi folder optimized WebP:

```bash
# Basic — output ke public/assets/<nama-file>/
npm run convert-image -- ./path/to/image.jpg

# Custom output directory
npm run convert-image -- ./path/to/image.jpg --output public/assets/hero

# Custom folder name
npm run convert-image -- ./path/to/image.jpg --name hero-banner
```

### Output Yang Dihasilkan

```
public/assets/<nama-image>/
├── placeholder.webp    → 20px wide, quality 20 (blur placeholder)
├── sm.webp             → 640px wide, quality 80
├── md.webp             → 1024px wide, quality 80
├── lg.webp             → 1536px wide, quality 80
├── xl.webp             → 1920px wide, quality 80
├── original.webp       → Original size, quality 90
└── metadata.json       → Info: sizes, aspect ratio, dominant color
```

### Menggunakan di Component

Semua image di project ini **WAJIB** menggunakan `OptimizedImage` component:

```tsx
import OptimizedImage from "@/components/ui/optimized-image";

// Basic — lazy loaded by default
<OptimizedImage src="/assets/hero-banner" alt="Hero banner" />

// Hero / above-the-fold image — tanpa lazy loading
<OptimizedImage src="/assets/hero-banner" alt="Hero" priority />

// Dengan ukuran tetap
<OptimizedImage src="/assets/destination" alt="Destination" width={400} height={300} />

// Fill parent container
<div style={{ position: "relative", width: "100%", height: "400px" }}>
  <OptimizedImage src="/assets/hero" alt="Hero" fill objectFit="cover" />
</div>
```

### OptimizedImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Path ke folder image (relative to public/) |
| `alt` | `string` | **required** | Alt text untuk accessibility |
| `className` | `string` | `""` | Class untuk wrapper div |
| `imgClassName` | `string` | `""` | Class untuk elemen img |
| `style` | `CSSProperties` | — | Inline style untuk wrapper |
| `loading` | `"lazy" \| "eager"` | `"lazy"` | Loading strategy |
| `sizes` | `string` | responsive default | Sizes attribute untuk responsive |
| `priority` | `boolean` | `false` | Disable lazy loading, preload image |
| `objectFit` | `CSSProperties["objectFit"]` | `"cover"` | CSS object-fit |
| `objectPosition` | `string` | `"center"` | CSS object-position |
| `fill` | `boolean` | `false` | Fill parent container |
| `width` | `number` | — | Fixed width (px) |
| `height` | `number` | — | Fixed height (px) |
| `onLoad` | `() => void` | — | Callback setelah image loaded |
| `onError` | `() => void` | — | Callback jika error |

### Fitur

- ✅ **Blur placeholder** — Tiny blurred image ditampilkan saat loading
- ✅ **Dominant color background** — Background color dari warna dominan image
- ✅ **Lazy loading** — Image hanya di-load saat masuk viewport (IntersectionObserver)
- ✅ **Responsive srcSet** — Browser otomatis pilih ukuran optimal
- ✅ **Smooth fade-in** — Transisi halus dari placeholder ke full image
- ✅ **Metadata caching** — metadata.json di-cache, tidak fetch ulang

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
