---
name: add-section
description: Add a new section to the single-page portfolio (experience, blog, testimonials, services…) wired into the nav and scroll spy. Use when the user wants a new block on the landing page.
---

# Add a landing-page section

The page is a stack of sections rendered by `src/app/page.tsx`. Each one is a
server component in `src/components/sections/` unless it needs browser state.

## Steps

1. **Create `src/components/sections/<Name>.tsx`.** Start from an existing one —
   `About.tsx` is the simplest, `Skills.tsx` shows the data-driven pattern.

   ```tsx
   import { Badge, Section, SectionHeading } from "@/components/ui";

   export function Experience() {
     return (
       <Section
         id="experience"
         label="Work experience"
         className="flex flex-col items-center gap-8 py-28 text-white"
       >
         <Badge>💼 Experience</Badge>
         <SectionHeading>Where I&apos;ve worked</SectionHeading>
         {/* … */}
       </Section>
     );
   }
   ```

   `<Section>` owns the horizontal padding and the `scroll-mt` offset that keeps
   the sticky header from covering the heading — do not re-declare either.

2. **Export it** from `src/components/sections/index.ts` (alphabetical).

3. **Render it** in `src/app/page.tsx`, wrapped in `<Reveal>` like its
   neighbours (the hero is the deliberate exception — it is above the fold).

4. **Register the nav entry** in `navItems` in `src/config/site.ts`. The `id`
   must match the `<Section id>` exactly; the scroll spy and both the desktop
   and mobile nav read from this one array.

5. **Put the content in `src/data/`** if it is a list. Sections render data;
   they do not hold it.

6. **Verify** with `npm run typecheck && npm run lint`, then scroll the page and
   confirm the nav item highlights as the section enters the viewport.

## Client components

If the section needs state, effects or a browser API, do **not** put
`"use client"` on the section itself. Extract the interactive part into its own
component (as `Skills.tsx` does with `SkillMarquee.tsx`) so the rest of the
section stays server-rendered.
