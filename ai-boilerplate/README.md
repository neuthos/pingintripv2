# AI Boilerplate — Project Template

A reusable AI agent configuration template extracted from the Pingintrip project.

## How It Works

When an AI agent (Gemini, Claude, Cursor, etc.) starts a new conversation, it reads `AGENTS.md` which references `PROJECT_VARS.md`. If the variables are empty, the agent asks the user to fill them in before proceeding.

## Structure

```
ai-boilerplate/
├── AGENTS.md            # Main agent rules (references PROJECT_VARS.md)
├── PROJECT_VARS.md      # Template variables — fill once, use everywhere  
├── SKILL.md             # Self-learning codebase patterns document
├── workflows/
│   ├── new-feature.md   # Workflow: implement new features
│   ├── edit-feature.md  # Workflow: modify existing features
│   ├── fix-bug.md       # Workflow: diagnose and fix bugs
│   ├── analyze.md       # Workflow: analyze reference code
│   └── onboarding.md    # Workflow: first-time project setup
└── README.md            # This file
```

## Setup

1. Copy this entire folder to your project root as `.agents/` (or `.agent/`)
2. Copy `AGENTS.md` to your project root
3. First chat with AI → it runs `/onboarding` workflow → fills `PROJECT_VARS.md`
4. AI auto-generates `SKILL.md` as it learns your codebase

## Variable System

`PROJECT_VARS.md` contains all project-specific values. When empty, the agent will ask:
- What's the app about?
- What framework are you using?
- What's your brand personality?
- What are your colors?
- etc.

Once filled, every workflow and rule references these variables for consistency.
