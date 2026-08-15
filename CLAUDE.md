# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent context files

Before starting work, read `AGENTS.md` and the files in `agent-docs/`:
- `agent-docs/project-context.md` — architecture, tech stack, project structure (written in Indonesian)
- `agent-docs/memory.md` — command history, architectural decisions, and change log
- `agent-docs/roadmap.md` — project phase roadmap and status tracking

`AGENTS.md` mandates a skill-driven workflow: if a task matches an available skill (spec-driven-development, planning-and-task-breakdown, debugging-and-error-recovery, code-review-and-quality, code-simplification, api-and-interface-design, frontend-ui-engineering, incremental-implementation, test-driven-development), invoke the skill rather than implementing directly. **NEVER rewrite `agent-docs/memory.md` — only append new entries or edit specific sections.** Update phase status in `agent-docs/roadmap.md` instead.

## Commands

```bash
npm run dev          # dev server on http://localhost:3000
npm run dev:nodemon  # same dev server, launched via nodemon (see nodemon.json)
npm run build        # production build — the only type-check gate in this repo
npm run start        # serve the production build
```

`npm run dev:nodemon` wraps `next dev` with nodemon, watching only `.env`, `.env.local`, and `prisma/schema.prisma` (see `nodemon.json`) — files Next's own dev server doesn't hot-reload. Everything under `src/` is left to Next's Fast Refresh instead of nodemon, since a full-process restart on every source save is slower and loses component state. The exec command is `npx kill-port 3000 && next dev`: on Windows, nodemon's restart doesn't reliably kill the whole `next dev` process tree, so without this the old process keeps holding port 3000 and the new one silently falls back to 3001.

`npm run lint` exists in package.json but there is no ESLint config or `eslint` dependency installed; running it triggers Next.js's interactive setup prompt. There is no test framework. **Verification = `npm run build` plus manual checks in the browser.**

## Architecture

Next.js 14 App Router, TypeScript strict, Tailwind CSS, Lucide React icons. Path alias `@/*` → `src/*`.

### Data layer — file-backed JSON, not a real database

`src/lib/db.ts` is the single source of truth for both the data *shape* and the *seed content*. It:
- Declares every domain interface (`ProfileData`, `VisiMisiData`, `SubjectItem`, `AsatidzItem`, `ActivityItem`, `SampleDoaItem`, `RegistrationItem`, and the `DBStructure` envelope).
- Embeds `INITIAL_DATA`, the full seed dataset in Indonesian.
- Reads/writes `data/db.json` synchronously via `fs`. `ensureDB()` auto-creates and seeds the file if missing, and **silently resets the file to `INITIAL_DATA` if the JSON fails to parse** — a malformed edit to `data/db.json` destroys stored registrations.

Consequences to keep in mind:
- Adding or changing a content field means editing the interface *and* `INITIAL_DATA` in `db.ts`, then deleting `data/db.json` so it re-seeds — otherwise the existing file keeps the old shape and reads are silently stale/untyped.
- `data/db.json` is **committed to git**. Submitting the contact form mutates a tracked file, so a working-tree diff there is usually incidental test data, not a real change.
- All db functions are synchronous Node `fs` calls — they only work in Server Components and route handlers, never in `'use client'` code.

### Rendering

`src/app/page.tsx` is an async Server Component that calls the `db.ts` getters directly (no HTTP round-trip) and passes plain data down as props. It sets `export const revalidate = 0` so the homepage is always dynamic and picks up `data/db.json` edits without a rebuild. Section components under `src/components/` are presentational and typed against the interfaces exported from `@/lib/db`; the interactive ones (`ContactSection`, `DoaSection`, `ActivitiesSection`, `Navbar`, `FloatingWhatsApp`) are `'use client'`.

### API routes

`src/app/api/*/route.ts` are thin wrappers over `db.ts` getters, existing for client-side consumers rather than for the homepage. Every route returns a uniform envelope — `{ success: boolean, data?, message? }` — with Indonesian error messages and status 500 on failure. Keep new routes to that contract; the client code checks `data.success` before reading `data.data`.

- `GET /api/{profile,visimisi,subjects,asatidz,activities,doas,registrations}` — read-only
- `POST /api/contact` — the only write. Requires `name` and `phone` (400 otherwise), defaults `program`/`message`, and appends via `addRegistration()`.

`src/app/admin/page.tsx` is a client-side dashboard that fetches `/api/registrations` and filters in-browser. **It has no authentication** — `/admin` and `GET /api/registrations` expose all submitted names and phone numbers publicly.

## Conventions

- All user-facing copy, form labels, and API error messages are in **Indonesian**. Match that when adding UI or messages.
- Tailwind with an emerald-based palette (extended in `tailwind.config.js`); public site is light (`slate-50`), the admin panel is dark (`slate-900`).
- Remote images are restricted to `images.unsplash.com` in `next.config.js` — a new image host must be added there or `next/image` will throw at runtime.
- `profile_website_tpq_al_hasanah.tsx` (the original single-file prototype) is deliberately excluded in `tsconfig.json`; don't re-include it.
