# Spanish Literary Association - VIT Vellore

Production-ready official website with immersive design, dynamic content modules, and protected admin CMS.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + custom shadcn-style UI components
- Framer Motion + GSAP ScrollTrigger + Lenis smooth scrolling
- Supabase Auth for admin login (session verified against `public.admins`)
- Prisma ORM + PostgreSQL
- Optional Nodemailer contact notifications

## Features

- Cinematic home page with typewriter language transition
- Culture immersion experience section with scroll-based animation
- Dynamic Blogs, Events, Materials, Team pages
- Search/filter material hub
- Contact form API with optional email send
- Protected admin dashboard
- CRUD management for blogs, events, materials, and team
- Responsive design for mobile/tablet/desktop

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Create env file

```bash
cp .env.example .env.local
```

3. Fill required environment values in `.env.local` (see `.env.example`)

- `DATABASE_URL` — Prisma / site CMS data
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon (public) key

4. Generate Prisma client and push schema

```bash
npm run prisma:generate
npm run prisma:push
```

5. (Optional) Seed the Team page roster into PostgreSQL

```bash
npm run prisma:seed
```

Requires a working `DATABASE_URL`. This **replaces every row** in `TeamMember` with the committee list from `src/lib/mock-data.ts`. Add portrait files under `public/` using the same paths (for example `/President.jpg`, `/Vice President.jpg`).

6. Start dev server

```bash
npm run dev
```

## Admin Access

- Route: `/admin/login`
- Use a **Supabase Auth** user (email + password) whose **`auth.users.id` matches** the `id` column in `public.admins`. Create the user under **Authentication → Users**, then insert or update the `admins` row to use that same UUID.

## Build and Verification

```bash
npm run lint
npm run build
```

## Deployment

- Frontend/API: Vercel
- Database: PostgreSQL (Neon/Supabase/Railway/Postgres Atlas)
- Set all environment variables in Vercel project settings

## Notes

- If `DATABASE_URL` is not set (or is still the `.env.example` placeholder), public pages use mock fallback content for graceful local preview.
- With a real database, an **empty** `TeamMember` table shows the mock roster on `/team` **in development only**; run `npm run prisma:seed` (or add members in Admin) for production-like data.
- If Supabase env vars are missing, admin login and protected admin routes will not work until they are set.
- To enable contact emails, add SMTP env variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`).
