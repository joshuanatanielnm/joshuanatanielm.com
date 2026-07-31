# AGENTS.md

Instructions for AI coding agents working on **joshuanatanielm.com-v3**.

## Project overview

Personal portfolio site built with Next.js 14 (App Router), Tailwind CSS, shadcn/ui, and Keystatic CMS. Content lives in `content/`; the admin UI is at `/keystatic`.

## Setup commands

```bash
# Use Node 24 (see .nvmrc)
nvm use

# Install dependencies
pnpm install   # or npm install

# Development
pnpm dev       # http://localhost:3000

# Production build
pnpm build
pnpm start

# Lint
pnpm lint
```

## Architecture

| Area | Location | Notes |
|------|----------|-------|
| App routes | `app/` | App Router; `(default)` group for main site |
| Components | `components/` | UI primitives in `components/ui/`, sections in `components/sections/` |
| Content | `content/` | Keystatic YAML/MD/MDoc files |
| Schemas | `schema/` | Keystatic collection/singleton schemas |
| Keystatic config | `keystatic.config.ts` | GitHub storage in production, local in dev |
| Data access | `server/keystatic.ts` | Cached readers for content |
| Site metadata | `site.config.ts` | Title, URLs, social links |
| Styling | `app/globals.css`, `tailwind.config.ts` | Tailwind + CSS variables (slate base) |

### Key conventions

- Use `@/` path alias for imports.
- Prefer Server Components; add `"use client"` only when needed (e.g. React Query provider in `app/(default)/layout.tsx`).
- Content changes go through Keystatic schemas in `schema/` — keep schema and YAML content in sync.
- shadcn/ui is configured in `components.json` (RSC enabled, slate theme).
- Keep changes minimal and scoped; match existing patterns in surrounding files.

## Agent skills

Skills from [skills.sh](https://skills.sh/) are installed under `.agents/skills/`:

| Skill | Use when |
|-------|----------|
| `vercel-react-best-practices` | Writing or refactoring React/Next.js code, data fetching, performance |
| `vercel-composition-patterns` | Component architecture, compound components, prop proliferation |
| `web-design-guidelines` | UI/UX review, accessibility audits |
| `shadcn` | Adding or fixing shadcn/ui components |
| `deploy-to-vercel` | Deploying or creating preview deployments |
| `find-skills` | Discovering and installing additional skills from skills.sh |

Install more skills:

```bash
npx skills find <query>
npx skills add <owner/repo> --skill <name> -a cursor -y --copy
```

## Subagents

Project subagents live in `.cursor/agents/`:

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React/Next.js UI, Tailwind, shadcn components |
| `cms-editor` | Keystatic content, schemas, and YAML/MDoc files |
| `code-reviewer` | Review changes for quality, security, and conventions |

## Workflow

1. Read relevant files before editing; follow existing naming and structure.
2. For UI work, use the `frontend-developer` subagent or `shadcn` / `vercel-react-best-practices` skills.
3. For content/schema work, use the `cms-editor` subagent.
4. Run `pnpm lint` after substantive changes.
5. Run `pnpm build` before deploying.

## Deployment

Hosted on Vercel. Production Keystatic uses GitHub storage (`joshuanatanielnm/joshuanatanielm.com`). Use the `deploy-to-vercel` skill for deployment tasks.
