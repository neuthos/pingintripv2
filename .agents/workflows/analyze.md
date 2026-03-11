---
description: Workflow for analyzing reference HTML/CSS code and creating implementation plans for the travel & tour web app
---

# Analyze Reference Code Workflow

## Context

Read `AGENTS.md` at the project root before doing anything. This gives you the full project context including tech stack (Next.js, Tailwind, DaisyUI, TypeScript), folder structure, and conventions.

## When to Use

User sends raw HTML and/or CSS as reference code from a design, template, or another website. The goal is to analyze that code and produce an implementation plan to recreate/adapt it in our Next.js + Tailwind + DaisyUI project.

## Steps

### 1. Analyze the Reference Code

Thoroughly read the provided HTML/CSS and extract:

- **Layout structure**: Grid system, flexbox patterns, container widths, spacing
- **Components identified**: Cards, navbars, hero sections, forms, modals, etc.
- **Color palette**: Karena kita mau amati tiru dan modifikasi, warna ikut primary kita aja.
- **Typography**: Font families, sizes, weights, line heights
- **Responsive behavior**: Media queries, breakpoints, mobile vs desktop differences
- **Animations/Transitions**: Any CSS animations, hover effects, transitions
- **Images/Assets**: What images/icons are used and where
- **Interactive elements**: Buttons, dropdowns, forms, toggles

### 2. Map to Our Tech Stack

For each identified element, determine the translation:

| Reference                    | Our Implementation                                          |
| ---------------------------- | ----------------------------------------------------------- |
| Raw HTML `<div class="...">` | Next.js/React component in `src/components/`                |
| CSS classes                  | Tailwind utility classes + DaisyUI component classes        |
| Custom CSS colors            | DaisyUI theme colors or Tailwind custom config              |
| CSS Grid/Flexbox             | Tailwind grid/flex utilities                                |
| Media queries                | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)          |
| CSS animations               | Tailwind animation utilities or custom CSS in `globals.css` |
| Font families                | Google Fonts loaded in `layout.tsx`                         |

### 3. Identify DaisyUI Matches

Check which parts of the reference can be implemented with DaisyUI components:

- Buttons → `btn`, `btn-primary`, `btn-outline`
- Cards → `card`, `card-body`, `card-title`
- Navbar → `navbar`
- Hero → `hero`
- Forms → `input`, `select`, `textarea`, `form-control`
- Modals → `modal`
- Carousel → `carousel`
- Rating → `rating`
- And more from https://daisyui.com/components/

### 4. Produce Implementation Plan

Create a structured plan using this format:

````markdown
# Analysis: [Description of what was analyzed]

## Visual Summary

Brief description of what the reference looks like and its key visual characteristics.

## Component Breakdown

### [Component 1 Name]

- **Location**: `src/components/[category]/[ComponentName].tsx`
- **DaisyUI base**: `card` / `hero` / custom / etc.
- **Key Tailwind classes**: List the main utility classes needed
- **Props interface**:
  ```typescript
  interface ComponentProps {
    // key props
  }
  ```
````

- **Mobile behavior**: How it looks on mobile
- **Desktop behavior**: How it differs on desktop

### [Component 2 Name]

...

## Data Requirements

- Any new data constants needed in `src/data/`
- Any new types needed in `src/types/`

## Page Integration

- Which page(s) in `src/app/(main)/` will use these components
- Layout and ordering of components on the page

## Custom Styles Needed

- Any CSS that can't be achieved with Tailwind/DaisyUI alone
- Should be added to `src/app/globals.css`

## Implementation Order

1. First: ...
2. Then: ...
3. Finally: ...

## Assets Needed

- List any images that need to be created or sourced
- Icons that need to be added (recommend lucide-react or heroicons)

## Notes

- Any deviations from the reference and why
- Anything that doesn't fit our mobile-first approach and how to adapt

```

### 5. Present for Review
- Present the implementation plan to the user
- Wait for approval or adjustments before proceeding to implementation
- If user approves, switch to the `new-feature` or `edit-feature` workflow to implement

## Rules
- NEVER just copy-paste raw HTML — always convert to React/Next.js components
- NEVER use inline styles — always use Tailwind utility classes
- ALWAYS analyze mobile-first — if the reference is desktop-only, propose a mobile adaptation
- ALWAYS check DaisyUI components first before building custom solutions
- ALWAYS extract reusable components — don't create monolithic page components
- ALWAYS propose TypeScript interfaces for any data shapes found in the reference
- If the reference uses a different CSS framework (Bootstrap, Material, etc.), map classes to Tailwind equivalents
- If the reference uses JavaScript/jQuery, propose React state/hooks equivalents
- Flag any accessibility issues in the reference and propose fixes
```
