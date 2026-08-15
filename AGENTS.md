# AGENTS.md for TPQ Al-Hasanah Website

This Next.js project is a fullstack web application for TPQ Al-Hasanah.

> ⚠️ **CRITICAL RULE FOR ALL AGENTS**:
> **ALWAYS check and read `AGENTS.md`, `agent-docs/project-context.md`, and `agent-docs/memory.md` BEFORE starting any task or writing any code.**

---

## Agent Documentation & Context Files

Before executing tasks, inspect the files in `agent-docs/`:
- 📄 [project-context.md](file:///d:/Project%20Pribadi/TPQ-AlHasanah/agent-docs/project-context.md): Architecture overview, tech stack, and full project structure.
- 📄 [memory.md](file:///d:/Project%20Pribadi/TPQ-AlHasanah/agent-docs/memory.md): Command history, architectural decisions, and change logs.
- 📄 [roadmap.md](file:///d:/Project%20Pribadi/TPQ-AlHasanah/agent-docs/roadmap.md): Project phase roadmap and status tracking.

---

## Commands

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`
- **Linting**: `npm run lint`

---

## Architecture

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Data & Persistence**: JSON File Database Engine (`src/lib/db.ts` -> `data/db.json`)
- **Components**: Located in `src/components/`
- **Pages/Routes**: Located in `src/app/`
- **API Endpoints**: Located in `src/app/api/` (profile, visimisi, subjects, asatidz, activities, doas, contact, registrations)
- **Admin Panel**: Located in `src/app/admin/`

---

## Conventions

- All core data is managed via `src/lib/db.ts` and persisted in `data/db.json`.
- Image handling is configured for `images.unsplash.com` as a remote pattern in `next.config.js`.
- Paths are aliased with `@/*` pointing to `src/` as per `tsconfig.json`.

---

## Testing

- No dedicated test setup found. Manual verification and `npm run build` are required.

---

## OpenCode Integration

OpenCode uses a skill-driven execution model powered by the skill tool and this repository's `/skills` directory.

### Core Rules

- Always check `AGENTS.md` and `agent-docs/` before initiating work.
- If a task matches a skill, you MUST invoke it.
- Skills are located in `skills/<skill-name>/SKILL.md`.
- Never implement directly if a skill applies.
- Always follow the skill instructions exactly (do not partially apply them).

### Intent → Skill Mapping

- Feature / new functionality → `spec-driven-development`, then `incremental-implementation`, `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring / simplification → `code-simplification`
- API or interface design → `api-and-interface-design`
- UI work → `frontend-ui-engineering`

### Lifecycle Mapping (Implicit Commands)

- DEFINE → `spec-driven-development`
- PLAN → `planning-and-task-breakdown`
- BUILD → `incremental-implementation` + `test-driven-development`
- VERIFY → `debugging-and-error-recovery`
- REVIEW → `code-review-and-quality`
- SHIP → `shipping-and-launch`

### Execution Model

For every request:

1. Always read `AGENTS.md`, `agent-docs/project-context.md`, and `agent-docs/memory.md` first.
2. Determine if any skill applies (even 1% chance).
3. Invoke the appropriate skill using the skill tool.
4. Follow the skill workflow strictly.
5. Only proceed to implementation after required steps (spec, plan, etc.) are complete.

### Anti-Rationalization

The following thoughts are incorrect and must be ignored:

- "This is too small for a skill"
- "I can just quickly implement this"
- "I’ll gather context first without checking AGENTS.md"

Correct behavior:

- Always check `AGENTS.md` and use skills first.

---

## Memory File Rules

When updating `agent-docs/memory.md`:
- **NEVER rewrite the entire file** — only append new entries or edit specific sections.
- Append new commands to the History Commands table.
- Append new decisions to the Decisions section.
- Append new changes to the Changes Log section.
- Update phase status in `agent-docs/roadmap.md`, not in `memory.md`.