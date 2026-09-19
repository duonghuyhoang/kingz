# KINGZ — portfolio

Personal portfolio site for Duong Huy Hoang ("KingZ"), live at
[kingz.io.vn](https://kingz.io.vn).

Built with **Next.js 16** (App Router) and **React 19**, in **TypeScript**
(strict), styled with **Tailwind CSS** and **Sass**, animated with **Framer
Motion**, over a **three.js / React Three Fiber** scene.

## Getting started

Requires **Node 20.9+**.

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (`lint:fix` to autofix) |
| `npm run format` | Prettier (`format:check` to verify only) |
| `npm run check` | typecheck + lint + format check |

Run `npm run check` before committing, and `npm run build` for anything that
touches a server/client boundary — that is the only step which catches it.

ESLint uses flat config in `eslint.config.mjs` and runs as plain `eslint`;
Next 16 removed the `next lint` command.

## Project structure

```
src/
├── app/            page (en) · vi/page (vi) · opengraph-image per locale
│                   layout, not-found, sitemap, robots, globals.scss
├── assets/images/  Images imported through next/image
├── components/
│   ├── layout/     Landing, LocaleFrame, LocaleSwitch, Header, Footer
│   ├── sections/   Hero, About, Skills, Experience, Contact
│   ├── three/      Lazy-loaded React Three Fiber scene
│   ├── ui/         Section, Badge, Reveal, Parallax, MagneticLink, …
│   └── icons/      Inline SVG components — social/, ui/, tech/
├── config/         site.ts — site identity and nav ids
├── i18n/           dictionaries.ts — every string, in English and Vietnamese
├── data/           skills.ts, social.ts
├── lib/            cn(), useActiveSection(), metadata, structuredData, ogImage
└── types/          Shared interfaces
```

Content is data, not markup: every user-facing string lives in
`src/i18n/dictionaries.ts` and every list in `src/data/`, not in JSX. See
`CLAUDE.md` for the full conventions.

## How it works

**Two locales, two routes.** English at `/`, Vietnamese at `/vi` — both
prerendered rather than a client-side toggle, so both are indexed, and
`hreflang` marks them as translations of each other. Adding a language means
adding a dictionary, a `src/app/<locale>/page.tsx` and an `opengraph-image.tsx`
beside it.

**One 3D canvas for the whole page.** A ringed gas giant with a moon and an
orbiting swarm, a filamentary nebula, star shells and distant galaxies — all
custom shaders, no textures downloaded. three.js loads through
`next/dynamic({ ssr: false })` behind a WebGL check, so it never lands in the
initial bundle. Drag anywhere in the hero to rotate it. Everything honours
`prefers-reduced-motion`.

**SEO is generated, not hand-written.** Sitemap, robots, canonical, hreflang,
JSON-LD `Person` and a 1200×630 Open Graph card per locale all derive from
`src/config/site.ts` and the dictionaries.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash. Drives `metadataBase`, canonical links, hreflang, the sitemap and Open Graph URLs. Defaults to `https://kingz.io.vn`. |

See `.env.example`.

Drop the CV PDF at `public/cv-duong-huy-hoang.pdf` — the path is set by
`resumeUrl` in `src/config/site.ts`, and the hero's "Download CV" button 404s
until the file is there.

## Deploy

Every route prerenders at build time, so the site deploys as static output on
[Vercel](https://vercel.com/new) with no server rendering at request time.
`next/image` still optimises images on demand, so a plain static file host would
need `images.unoptimized` set.
