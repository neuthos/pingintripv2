# {{APP_NAME}} — Project Context

> **⚠️ FIRST TIME?** If `PROJECT_VARS.md` has empty fields, run the onboarding workflow IMMEDIATELY.
> Read `PROJECT_VARS.md` before doing anything — it contains all project-specific values.

---

## 🤖 Auto-Routing — ALWAYS FOLLOW THIS

**Every time the user sends a message, classify it and follow the matching workflow AUTOMATICALLY. The user should NEVER need to manually reference a workflow.**

### Classification Rules

| If the user's message is about... | Follow this workflow | File |
|---|---|---|
| PROJECT_VARS.md has empty fields | **Onboarding** | `.agents/workflows/onboarding.md` |
| Building something new (new page, new feature, new component) | **New Feature** | `.agents/workflows/new-feature.md` |
| Changing/updating/modifying something existing | **Edit Feature** | `.agents/workflows/edit-feature.md` |
| Something is broken, not working, error, bug | **Fix Bug** | `.agents/workflows/fix-bug.md` |
| User sends HTML/CSS reference code or a design screenshot | **Analyze** | `.agents/workflows/analyze.md` |
| "Scan the codebase", "update patterns", "learn the code" | **Learn Codebase** | `.agents/workflows/learn-codebase.md` |
| Simple question, clarification, or advice | **No workflow** — just answer directly |

### How to auto-route:
1. **Read the user's message**
2. **Classify** it using the table above
3. **Read the matching workflow file** before responding
4. **Follow ALL steps** in that workflow — don't skip any
5. If ambiguous, ask the user: "Is this a new feature or an edit to something existing?"

### Compound requests:
If the user's message contains MULTIPLE types (e.g., "fix this bug AND add a new feature"), handle them sequentially:
1. Fix the bug first (fix-bug workflow)
2. Then implement the feature (new-feature workflow)

---

## Overview
<!-- Auto-filled from PROJECT_VARS.md after onboarding -->
{{ELEVATOR_PITCH}}

## Brand Philosophy
- **Personality**: {{BRAND_PERSONALITY}}
- **Voice**: {{BRAND_VOICE_KEYWORDS}}
- **Forbidden words**: {{FORBIDDEN_WORDS}}
- All copy/content must reflect this philosophy

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | {{FRAMEWORK}} |
| Styling | {{STYLING}} |
| Language | {{LANGUAGE}} |
| Database | {{DATABASE}} |
| Auth | {{AUTH}} |
| Payment | {{PAYMENT}} |
| Deployment | {{DEPLOYMENT}} |
| Design | Mobile-first, responsive |

## Architecture Decisions

### Data Strategy
{{DATA_STRATEGY}}

All static data files live in `src/data/`:
```
src/data/
├── *.ts           # Domain-specific data constants
└── index.ts       # Barrel export
```

### Folder Structure
```
{{FOLDER_STRUCTURE}}
```

### Image Optimization System

If using custom image optimization:
1. Convert images before use: `npm run convert-image -- ./path/to/image.jpg --name slug-name`
2. Use `OptimizedImage` component instead of raw `<img>` or `<Image>`
3. Assets stored in `public/assets/<name>/`

If using Next.js Image: use `<Image>` from `next/image` with proper width/height.

## Code Style & Conventions
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files/folders
- **Components**: Functional components with TypeScript interfaces for props
- **State Management**: {{STATE_MANAGEMENT}}
- **Imports**: Use `@/` path alias for all imports from `src/`
- **DRY**: Don't repeat yourself — extract shared logic into hooks and utilities
- **Responsiveness**: Always design mobile-first, then add desktop breakpoints
- **Accessibility**: Use semantic HTML, proper ARIA attributes

## i18n (Internationalization)
- **Locales**: {{LOCALES}}
- **Default**: {{DEFAULT_LOCALE}}
- **Library**: {{I18N_LIBRARY}}

### Rules
- Every component's text uses `useTranslations("ComponentKey")` — NEVER hardcode text
- ALWAYS update ALL locale files when adding/editing translations
- Multilingual data (names, descriptions) → `{ en, id, cn }` objects in `src/data/`
- Multilingual copy (headings, UI text) → `messages/*.json` i18n files

## Completed Features
{{FEATURE_CHECKLIST}}

## Self-Learning

After completing ANY feature, bug fix, or significant change:
1. Check if `SKILL.md` needs updating with new patterns
2. If a new convention was established, add it
3. If a gotcha was discovered, document it
4. This ensures the NEXT chat session benefits from THIS session's work

## Important Rules
- All data constants MUST be in `src/data/` — never scatter data across components
- Mobile-first: always start with mobile layout, enhance for larger screens
- Keep API routes minimal for MVP
- Every component must be typed with TypeScript — no `any` types
- Brand voice must be consistent — reference brand keywords and forbidden words
- **⚠️ Auto-route EVERY user message to the correct workflow**
- **⚠️ Read `PROJECT_VARS.md` for all project-specific values**
- **⚠️ Read `.agents/skills/SKILL.md` for established code patterns**
