---
name: verify
description: Run the project's full quality gate — type check, lint, format check and production build — and fix what it reports. Use before committing, before opening a PR, or when the user asks whether the site still builds.
---

# Verify the build

Run these in order and stop at the first failure. Fix, then restart from the
failing step.

```bash
npm run typecheck   # tsc --noEmit — strict, with noUncheckedIndexedAccess
npm run lint        # next lint
npm run format:check
npm run build       # the real check: catches server/client boundary mistakes
```

`npm run check` chains the first three; `npm run build` is separate because it
is slow.

## Failures worth knowing about

- **`You're importing a component that needs useState/useEffect`** — a server
  component imported a client one incorrectly, or `"use client"` is missing.
  The fix is almost always to push the boundary *down* into a smaller leaf
  component, not to add `"use client"` to the section or the page.
- **`Invalid DOM property 'fill-rule'`** (or `clip-path`, `stroke-width`) — an
  SVG was pasted without camelCasing. See the `add-tech-icon` skill.
- **Format failures** — run `npm run format`, do not hand-edit whitespace.
- **Unused variable errors** — `noUnusedLocals` and `noUnusedParameters` are on
  in `tsconfig.json`. Delete the dead code rather than prefixing with `_`.

## After a green run

Report what passed. If `npm run build` was skipped because the change was
config- or content-only, say so explicitly rather than implying it ran.
