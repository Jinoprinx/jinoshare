# JinoShare

A minimal, smooth Next.js content engine inspired by “AI content tools”: batch-generate, edit, schedule, and manage posts with a clean UX.

## Features
- Batch generator with tone and channel presets
- Editor with autosave and character count
- Channel selector (X, TikTok, Instagram, YouTube, LinkedIn)
- Scheduling and simple weekly calendar
- JSON file persistence (local dev)
- Zero external services by default

## Getting started
1. Requirements: Node 18+
2. Install: `npm install`
3. Dev: `npm run dev` → http://localhost:3000
4. Build: `npm run build` then `npm start`

Data is stored at `./data/db.json`.

## How it works
- App Router with server route handlers under `app/api/*`
- `lib/db.ts` reads/writes a JSON file; swap it for a real DB later
- `lib/generator.ts` creates variations—replace with your AI API
- Optimistic UI updates for snappy interactions

## Smooth UX decisions
- Autosave with debounce in the editor
- Optimistic updates for update/delete actions
- Lightweight toasts for feedback
- No blocking spinners; short, clear CTAs

## Extend it
- Auth: Add NextAuth or your provider; gate `/dashboard`
- DB: Replace JSON with SQLite/Prisma or Postgres
- AI: Call your model in `lib/generator.ts`
- Video: Convert posts to “storyboards” and render with Remotion/Canvas
- Calendar: Add drag-and-drop and bulk re-scheduling
- Exports: Add CSV/ICS export endpoints

## Notes
- This is a starter for learning/prototyping. Audit and harden before production.
- Respect trademarks/branding of other apps; use your own styles and copy.

MIT License
