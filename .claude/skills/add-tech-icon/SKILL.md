---
name: add-tech-icon
description: Turn a raw SVG logo into an icon component for the Skills marquee, or add any inline SVG icon to the project. Use when the user wants a new technology shown in the skills strip, or asks to add/replace an icon — "add Python to my skills", "add a Twitter icon", "swap the GitHub logo".
---

# Add an icon

All icons in this repo are React components under `src/components/icons/`,
grouped into `social/`, `ui/` and `tech/`. Raw `.svg` files are not used —
inline components let icons inherit colour and stay accessible.

## Steps

1. **Get the source SVG.** svgrepo.com and simpleicons.org are the usual
   sources. Ask the user for a file or URL if you do not have one.

2. **Create `src/components/icons/tech/<kebab-name>.tsx`** following this exact
   shape:

   ```tsx
   import type { SVGProps } from "react";

   export function PythonIcon(props: SVGProps<SVGSVGElement>) {
     return (
       <svg
         viewBox="0 0 64 64"
         fill="none"
         aria-hidden="true"
         focusable="false"
         {...props}
       >
         <path d="…" fill="currentColor" />
       </svg>
     );
   }
   ```

3. **Normalise the pasted SVG.** This is where hand-copied icons go wrong:
   - Convert every kebab-case attribute to camelCase: `fill-rule` → `fillRule`,
     `clip-rule` → `clipRule`, `stroke-width` → `strokeWidth`,
     `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`.
     React silently drops the kebab form and logs a warning.
   - Replace every brand colour with `currentColor`. Two-tone logos that knock
     the glyph out of a filled shape use `var(--color-background)` for the
     knockout (see `tech/bootstrap.tsx`).
   - **Check where the paint lives.** Many svgrepo exports colour from the root
     `<svg fill="…" stroke="…">` and leave every `<path>` unpainted. If you
     replace the root with the boilerplate `fill="none"`, the icon renders as
     an empty box — nothing errors, nothing warns, it is just invisible. Carry
     the root's `fill`/`stroke` over as `currentColor`
     (see `tech/express.tsx`, `tech/nestjs.tsx`, `tech/php.tsx`).
   - **Delete `<defs>` / `<clipPath>` blocks and their `clipPath="url(#…)"`
     references** when the clip is just a full-size `<rect>` — it is a no-op,
     and `react-fast-marquee` clones its children, so a duplicated `id` breaks
     the second copy.
   - Strip `SVGRepo_bgCarrier` / `SVGRepo_tracerCarrier` wrapper groups, the
     root `xmlns`, and any hard-coded `width`/`height` on the root element.
     Keep `viewBox`.
   - If the export nests a real `<svg>` inside an outer wrapper `<svg>`, keep
     only the inner one.

4. **Export it** from `src/components/icons/index.ts`, alphabetically within its
   section.

5. **Show it** by adding `{ name: "Python", Icon: PythonIcon }` to
   `frontendSkills` or `backendSkills` in `src/data/skills.ts`. The `name` is
   what screen-reader users hear — the marquee itself is `aria-hidden`.

6. **Verify that it actually draws.** Type check and lint pass happily on a
   blank icon, so look at it: `npm run dev` and open
   `http://localhost:3000/#skills`. The marquee scrolls, so let it cycle — an
   icon that never appears is a blank one, not one that is off-screen.

## Sizing

Callers pass size, the component never hard-codes it:
`<PythonIcon width={64} height={64} className="text-color-main" />`.
