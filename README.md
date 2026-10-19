# Hindavi Wedding Family — Web Application

Official web platform for **Hindavi Wedding Family** (Social profile: **Hindavi Weddings & Events**), providing wedding planning, event production, and bespoke decor design in Karad, Maharashtra.

Built with Next.js App Router, React, TypeScript, and Tailwind CSS.

---

## 1. Project Overview & Architecture

- **Single Full-Stack Application**: Frontend and backend within Next.js (App Router). No separate Express server.
- **Strict Brand Design System**: Ivory (`#F8F0E8`), Burgundy (`#6F1829`), Antique Gold (`#C6A15B`), Warm Charcoal (`#454038`), and White (`#FFFFFF`).
- **Typography**: Cormorant Garamond (editorial serif headings) and Montserrat (clean sans-serif body).
- **Centralized Business Profile**: Configured under `src/config/business.ts` with owner-verified details.

---

## 2. Getting Started

### Prerequisites
- Node.js: `v18.17.0` or later (Tested with Node.js `v24.14.0`)
- npm: `v9.0.0` or later (Tested with npm `v11.9.0`)

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Available npm Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local Next.js development server |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server locally |
| `npm run lint` | Runs ESLint checks |
| `npm run typecheck` | Runs TypeScript typecheck (`tsc --noEmit`) |

---

## 4. Current Implementation Status (Phase 0 & Phase 1)

- [x] **Phase 0 — Workspace Audit**: Environment inspected, clean root configuration established.
- [x] **Phase 1 — Project Foundation**:
  - Next.js 14 App Router, TypeScript (strict mode), and Tailwind CSS initialized.
  - Custom design tokens for Ivory, Burgundy, Antique Gold, Warm Charcoal.
  - Accessible, responsive Navigation Header with mobile dropdown and active link indicators.
  - Reusable UI component library (`Button`, `Section`, `SectionHeading`).
  - Responsive brand Footer with verified business info, address, and social links.
  - Centralized business configuration (`src/config/business.ts`).
  - Initial Homepage skeleton with hero, brand philosophy, confirmed service specializations, and enquiry CTA.
  - `.env.example` created with placeholders for future phases.
- [x] **Phase 4 — Luxury Wedding Frontend Development**:
  - Strictly frontend execution: zero database, Prisma, authentication, or backend endpoints created.
  - Revamped Homepage into a luxury editorial wedding landing page with full-bleed hero, multi-layered gradients, and Cormorant Garamond / Montserrat typography.
  - Implemented 6 local, royalty-free illustrative visual assets in `public/images/` and documented licensing rules in `docs/IMAGE_CREDITS.md`.
  - Upgraded `ServiceCard` and `GalleryCard` components with `next/image` responsive optimization, subtle hover zooms, and explicit *"Illustrative Concept"* tags.
  - Enhanced all public pages (`/about`, `/services`, `/services/[slug]`, `/gallery`, `/packages`, `/contact`) with consistent brand aesthetics and honest copywriting.
  - Retained the contact form with client-side validation and direct `mailto:` fallback; clearly communicated that backend database persistence is scheduled for future backend phases.
  - Executed and passed all quality checks: ESLint, TypeScript typecheck, production build, and in-browser visual testing on desktop and mobile.
- [ ] **Phase 5 — Database & Enquiry System (Future)**: PostgreSQL + Prisma ORM, Zod validation, and real enquiry API.
- [ ] **Phase 6 — Admin Authentication & Dashboard (Future)**: Protected admin management for enquiries, gallery, and business settings.

