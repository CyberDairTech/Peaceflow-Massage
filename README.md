# PeaceFlow Massage

Custom-coded website for PeaceFlow Massage (Grand Junction, CO) — replacing the
GlossGenius-hosted booking site.

**Stack:** Next.js (App Router, TypeScript, Tailwind CSS) · Supabase · Stripe (pending) · Resend · Vercel

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in real values — never commit
`.env.local` or any file containing live secrets.

## Status

- [x] Brand system (fonts, color palette) from the approved mockups
- [x] Home, Services, About, Contact, Blog pages
- [x] Contact / "request to book" form → Supabase → Resend email
- [ ] Self-serve booking → Stripe checkout → e-signed contract flow
- [ ] No-show tracking, discount codes
- [ ] Admin portal (calendar, manual bookings, refunds, contracts)
