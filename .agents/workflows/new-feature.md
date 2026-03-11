---
description: Workflow for implementing new features in the travel & tour web app
---

# New Feature Workflow

// turbo-all

## Context

Read `AGENTS.md` at the project root before doing anything. This gives you the full project context including tech stack (Next.js, Tailwind, DaisyUI, TypeScript), folder structure, and conventions.

**IMPORTANT**: Also read `.agents/skills/SKILL.md` — this contains all established coding patterns, data structures, i18n patterns, section component conventions, and image handling workflows. You MUST follow these patterns to maintain consistency.

## Steps

### 1. Understand Requirements

- Ask clarifying questions until the feature scope is 100% clear
- Identify: What user problem does this solve? What screens/pages are involved?
- Determine if this feature needs new data in `src/data/`, new API routes, or new components
- Clarify edge cases and mobile behavior

### 2. Research & Plan

- Check existing code for similar patterns to follow
- Check `src/components/` for reusable components that can be leveraged
- Check `src/data/` to understand existing data shapes
- Check if DaisyUI has built-in components that fit (check https://daisyui.com/components/)

### 3. Create Implementation Plan

Write a detailed plan following this structure:

```markdown
## Feature: [Name]

### Overview

Brief description of what the feature does and why.

### New Files

- List of new files to create with their purpose

### Modified Files

- List of existing files to modify and what changes

### Data Changes

- Any new data constants needed in `src/data/`
- Any new TypeScript types in `src/types/`

### UI/UX

- Mobile-first layout description
- Key interactions and animations
- DaisyUI components to use

### Implementation Order

1. Types & data first
2. Components second
3. Page integration third
4. Polish last
```

Present the plan to the user for approval before implementing.

### 4. Implement — Types & Data

- Define TypeScript interfaces/types in `src/types/`
- Add any new static data in `src/data/` following existing patterns
- Export from barrel files (`index.ts`)

### 5. Implement — Components

- Build components in `src/components/` (atomic in `ui/`, sections in `sections/`)
- Follow mobile-first approach — mobile layout THEN desktop enhancements
- Use DaisyUI classes as the primary building blocks
- Every component must have TypeScript props interface
- Keep components focused — single responsibility principle

### 6. Implement — Page Integration

- Create or update page files in `src/app/(main)/`
- Wire up components, data, and any new hooks
- Ensure proper Next.js metadata (title, description) for SEO

### 7. Polish & Verify

- Run `npm run build` to verify no type/build errors
- Check mobile viewport in browser (375px width)
- Check desktop viewport
- Verify smooth transitions and micro-animations
- Ensure DaisyUI theme consistency

## Rules

- ALWAYS build mobile-first — never desktop-first
- NEVER put data constants outside `src/data/`
- ALWAYS use TypeScript interfaces for component props and data shapes
- NEVER skip the planning step — always present plan before implementing
- Use DaisyUI component classes whenever possible — avoid reinventing existing components
- Follow the linear approach: finish one feature completely before moving to the next
- If a feature requires a new npm package, ask the user first
- Ensure every new page has proper `metadata` export for SEO
