# Spanish Literary Association - VIT Vellore

Production-ready official website with immersive design, dynamic content modules, and protected admin CMS.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + custom shadcn-style UI components
- Framer Motion + GSAP ScrollTrigger + Lenis smooth scrolling
- NextAuth (credentials) for admin authentication
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

3. Fill required environment values in `.env.local`

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

4. Generate Prisma client and push schema

```bash
npm run prisma:generate
npm run prisma:push
```

5. Start dev server

```bash
npm run dev
```

## Admin Access

- Route: `/admin/login`
- Uses credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

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

- If `DATABASE_URL` is not set, public pages use mock fallback content for graceful local preview.
- To enable contact emails, add SMTP env variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`).
