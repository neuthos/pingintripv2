---
description: Workflow for diagnosing and fixing bugs in the travel & tour web app
---

# Fix Bug Workflow

// turbo-all

## Context
Read `AGENTS.md` at the project root before doing anything. This gives you the full project context including tech stack (Next.js, Tailwind, DaisyUI, TypeScript), folder structure, and conventions.

## Steps

### 1. Understand the Bug
- Ask clarifying questions if the bug description is vague
- Identify: What is the expected behavior? What is the actual behavior?
- Determine which screen/component/page is affected

### 2. Reproduce & Locate
- Find the relevant files based on the folder structure in `AGENTS.md`
- Pages are in `src/app/(main)/`, components in `src/components/`, data in `src/data/`
- Read the affected file(s) carefully to understand the current logic
- Check for related files that might be contributing to the bug (imports, shared hooks, data files)

### 3. Root Cause Analysis
- Identify the exact root cause before making changes
- Explain the root cause clearly in a brief summary
- If there are multiple potential causes, list them and explain which is most likely and why

### 4. Create Implementation Plan
- Write a concise plan of what files need to change and why
- Present the plan to the user for approval before making changes
- Keep changes minimal — fix the bug, don't refactor unrelated code

### 5. Implement Fix
- Make the minimal change needed to fix the bug
- Follow project conventions from `AGENTS.md`:
  - TypeScript strict typing (no `any`)
  - Mobile-first responsive design
  - DaisyUI components first, custom Tailwind when needed
  - `@/` path aliases for imports
- If the fix touches data files, only modify files in `src/data/`

### 6. Verify
- Run `npm run build` to verify no build/type errors
- Run `npm run dev` and check in browser that the bug is resolved
- Verify no visual regressions on mobile viewport
- If the fix touches multiple pages, check all affected pages

## Rules
- NEVER introduce new dependencies without asking the user first
- NEVER refactor code outside the scope of the bug
- ALWAYS explain what was wrong and how you fixed it
- If the bug is in static data (`src/data/`), fix the data — don't add workarounds in components
