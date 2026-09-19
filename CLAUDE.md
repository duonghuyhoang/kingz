# KINGZ — portfolio site

Single-page personal portfolio for Duong Huy Hoang ("KingZ").
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Sass ·
Framer Motion · three.js / React Three Fiber.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (http://localhost:3000) |
| Production build | `npm run build` |
| Type check | `npm run typecheck` |
| Lint | `npm run lint` (`lint:fix` to autofix) — plain `eslint`, since Next 16 removed `next lint` |
| Format | `npm run format` (`format:check` in CI) |
| Everything | `npm run check` |

Run `npm run check` before committing.

## Layout

```
src/
  app/            page (en) · vi/page (vi) · opengraph-image per locale ·
                  layout, not-found, sitemap, robots, globals.scss
  assets/images/  Images consumed through `next/image` static imports
  components/
    layout/       Landing (the page, once), LocaleFrame, LocaleSwitch,
                  Header (client: mobile nav + scroll spy), Footer
    sections/     One file per landing-page section — Hero, About, Skills,
                  Experience, Contact. Each takes `dict`.
    three/        SceneBackground (lazy client wrapper) + Scene (the R3F canvas)
    ui/           Section, Badge, SectionHeading, Reveal/Stagger, Parallax,
                  SpotlightCard, MagneticLink, Aurora, ScrollProgress,
                  SocialLinks, ExternalLink, CopyButton, ScrollToTopButton
    icons/        Inline SVG components — social/, ui/, tech/ — re-exported from index.ts
  config/site.ts  Site identity and nav ids. Single source of truth.
  i18n/           dictionaries.ts (every user-facing string, en + vi), routing.ts
  data/           Content arrays: skills.ts, social.ts
  lib/            cn(), useActiveSection(), metadata, structuredData, ogImage
  types/          Shared interfaces
public/           Only files that need a stable public URL (og image, CV pdf)
```

## Conventions

- **No comments in the code.** Write it plain; naming carries the intent.
  Constraints that genuinely need recording go in this file, not inline.

- **Server components by default.** Add `"use client"` only to the leaf that
  needs state, effects, a browser API or a Framer Motion hook. Anything animated
  is necessarily a client component; the *section* around it should not be.
- **A component function cannot cross the server→client boundary as a prop.**
  The build has broken on this twice: `{ name, Icon }` entries look
  serialisable but are not, and only `npm run build` catches it — typecheck and
  lint pass. A client component that needs icon data imports it directly
  (`SkillMarquee` takes a group name for exactly this reason), or receives
  already-rendered elements as `children`.
- **No user-facing string belongs in JSX.** Every one lives in
  `src/i18n/dictionaries.ts`, in both `en` and `vi`. Sections receive `dict` and
  read from it; a hard-coded string is a missing translation. Content that reads
  the same in both languages (skill names, social labels) stays in `src/data`.
- **Two locale routes, not a client toggle.** `/` is English, `/vi` Vietnamese.
  Both prerender, both are indexed, and `alternates.languages` in
  `lib/metadata.ts` tells search engines they are translations. Adding a locale
  means adding a dictionary, a `src/app/<locale>/page.tsx` and an
  `opengraph-image.tsx` beside it.
- **The Open Graph card is generated, not a file.** `lib/ogImage.tsx` renders it
  at 1200×630 per locale via `next/og`. Do not add an `images` entry to
  `openGraph` in metadata — it overrides the generated route, which is how the
  square logo ended up being served as a 1200×630 card.
- **Motion respects `prefers-reduced-motion`.** `useReducedMotion()` in every
  animated component; the 3D scene switches to `frameloop="demand"` and freezes
  every `useFrame` body rather than merely slowing down.
- **Colours come from CSS variables** in `globals.scss` (`--color-main`,
  `--color-sub-bg`, `--color-background`) and are exposed as the Tailwind tokens
  `color-main`, `sub-bg`, `background`. Do not hard-code hex values in classes.
- **Tailwind first.** Reach for `globals.scss` only for base/reset rules or
  third-party widget overrides.
- **Icons** are React components under `src/components/icons`. They accept
  `SVGProps<SVGSVGElement>`, draw with `currentColor`, carry
  `aria-hidden="true"`, and never hard-code `width`/`height` on the root.
  See the `add-tech-icon` skill.
- **Outbound links** go through `<ExternalLink>` so `rel="noopener noreferrer"`
  is never missed.
- **Sections** are wrapped in `<Section id=… label=…>` — the `id` is both the
  anchor target and the scroll-spy key, and must be registered in
  `navItems` (`src/config/site.ts`) to appear in the nav.
- **Accessibility is part of done**: decorative images get `alt=""`, decorative
  motion gets `aria-hidden` plus an `sr-only` text equivalent, interactive
  elements are `<a>`/`<button>` — never a `<div onClick>`.

## Dependency constraints

- **React is pinned to `~19.2.x`, not `^19`.** `@react-three/fiber@9` declares
  `react ">=19 <19.3"`, so a bare `^19` range resolves to 19.3 and the install
  fails on a peer conflict. Raise the pin only when fiber widens that range.
- **`@react-three/drei` is deliberately absent.** Every particle system here is
  a custom shader, so nothing imported it any more — and dropping it removed the
  two `troika-three-text` build warnings it dragged in. Do not add it back for a
  single helper.
- ESLint runs from `eslint.config.mjs` (flat config). `src/components/three/**`
  turns off `react-hooks/immutability`, `set-state-in-effect` and `use-memo`:
  those React Compiler rules forbid mutating objects outside render, which is
  precisely how react-three-fiber works — `useFrame` mutates uniforms and
  transforms every frame by design. They stay on everywhere else.

## Performance

The canvas animates continuously behind the whole page, which makes
`backdrop-filter` the most expensive thing on the site: the compositor re-blurs
every frosted element on every frame. Measured at 1440×900 on an M4, 52 blurred
elements dropped the Skills section to **40 fps with 67 ms worst frames** while
the hero and contact sat at 60.

So `.glass` is border plus a translucent fill only. `.glass-blur` adds the blur
and is reserved for the sticky nav, the one surface that content scrolls under.
That is a single blurred element, and 60 fps throughout. **Do not add
`backdrop-blur` to anything that repeats** (cards, tiles, badges), and not to
anything large in the page body either: the contact panel had it, and because
`backdrop-filter` samples a backdrop that is still settling while the canvas
mounts, the panel visibly changed colour for the first fraction of a second
after a reload.

A panel reads as frosted because of its **opacity**, not its blur. Both classes
therefore share the same white tint, so a badge without blur still matches the
nav with it; the first attempt at this split left `.glass` at `bg-white/[0.045]`,
which over the lit planet looked like clear glass next to a frosted nav.

Measure before and after any change here: `next dev` is not representative, and
headless Chrome uses the real GPU only if you leave the SwiftShader flags off.

## The 3D background

`src/components/three/` is the only place three.js is imported. `Scene.tsx` is
loaded through `next/dynamic({ ssr: false })` from `SceneBackground.tsx`, which
also runs a WebGL capability check, so the ~600 kB never lands in the initial
bundle and never runs on the server.

There is **one fixed canvas behind the whole page**, not one per section — a
second WebGL context would double the GPU cost for the same effect. It reacts to
scroll through a ref (never React state, so scrolling triggers no renders) and
the wrapper fades it back once the hero is past.

That fade is written to `style.opacity` by hand from the `scrollYProgress`
subscription, **not** by binding a `useTransform` value to `motion.div`. Under
framer-motion 13 that binding left the inline opacity pinned at 1 while an
animation drifted the computed value back toward 1, so the scene stayed far
brighter than the 0.52 it was meant to settle at. Check the *inline* style, not
just the computed one, if this ever looks wrong again.

### What is in the scene

| File | Holds |
| --- | --- |
| `cosmosGeometry.ts` | Starfield, nebula and orbit-swarm buffers |
| `particleMaterial.ts` | One shader for stars and gas, configured by uniforms |
| `orbitMaterial.ts` | Swarm shader — solves the orbit in the vertex stage |
| `planetMaterial.ts` | Gas-giant and ring shaders |
| `Scene.tsx` | Composition, camera rig, drag rig |

A ringed gas giant with a moon and a swarm of orbiting motes, a filamentary
nebula, two counter-rotating star shells, a field of distant galaxies and a
distant sun.

### Rules this scene is built on

- **Nothing is lit by a scene light.** There is no environment map, because an
  HDRI would be a runtime network fetch. Particles are unlit and the planet does
  its own shading from one hard-coded direction. A `MeshStandardMaterial` added
  here will render black.
- **Particles use a custom shader, not `PointsMaterial`,** which has no
  per-vertex size — every point would come out identical and the cloud would
  read as flat. Uniforms switch the same shader between sharp twinkling stars
  and soft drifting gas.
- **`gl_PointSize` is divided by view depth.** A shell at radius 30 needs a
  `uSize` in the hundreds; the intuitive small number renders sub-pixel stars.
- **Keep ring banding at a low frequency.** A fine ripple aliases against the
  pixel grid and turns the rings into a moiré spiral.
- **A nebula is thousands of small puffs, not a few big ones.** Large soft
  sprites resolve as individually visible circles no matter how low their
  opacity; the smooth cloud comes from the overlap of many faint ones.
- **`position` does not always mean a position.** In `orbitMaterial` it packs
  the orbit's radius and two tilt angles, and the vertex shader derives the
  point from them and `uTime`, so the CPU never rewrites the buffer.
- **Every animated part takes `still`** and returns early from `useFrame`. That
  flag is `prefers-reduced-motion`, and the canvas is on `frameloop="demand"` in
  that state.
- **Dispose geometries, materials and textures.** three does not garbage collect
  them; `useDisposable` in `Scene.tsx` is the hook for it.

### Drag to rotate

Wired to `window`, not to the canvas: the canvas sits behind the page content
and never receives pointer events. `SceneBackground` therefore has to filter
the events itself, and skips a drag when it:

- starts outside the hero (`#home`) — everywhere else a drag must stay an
  ordinary text selection, or the copy in the lower sections cannot be selected;
- starts on anything interactive (`a`, `button`, an input…);
- comes from a non-mouse pointer — on touch that gesture is the page scroll.

Inside the hero it suppresses text selection, since otherwise the drag paints a
selection across the copy. Momentum carries after release and the X rotation is
clamped short of the poles.

### Legibility

The scene is far brighter than the flat page it replaced, so **every section
that puts copy over the canvas passes `scrim` to `<Section>`** — the hero is the
exception, carrying its own asymmetric one, and the portrait has a bottom fade.

The muted greys were tuned against a flat dark page; over a lit scene anything
below about `text-white/55` stops being readable. Prefer lifting the text a step
over darkening the scrim: three small corrections at once (scrim, scene opacity,
text) blacked the scene out entirely on the first attempt.

## Known gaps

- **The Download CV button 404s.** `resumeUrl` in `src/config/site.ts` points at
  `/cv-duong-huy-hoang.pdf` and `public/` does not contain it.
- The site has no projects or case studies — the largest content gap.
- `experience.entries` in the dictionaries is written from what the About copy
  states. Replace it with real roles and dates when there are some.
- `siteConfig.url` defaults to a placeholder. Set `NEXT_PUBLIC_SITE_URL` in the
  deploy environment so Open Graph URLs and the sitemap are correct.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
