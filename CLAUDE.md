# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to dist/
npm run preview   # Preview the build locally
```

## Architecture

**Framework:** Astro v6 (static output) + Tailwind CSS v4 + TypeScript strict

### i18n

All pages exist in two language variants:
- `src/pages/ro/` — Romanian (default locale)
- `src/pages/en/` — English
- `src/pages/index.astro` — redirects to `/ro/`

URL routing is handled by Astro's built-in i18n with `prefixDefaultLocale: true`, producing `/ro/*` and `/en/*` URLs.

All UI strings live in `src/i18n/translations.ts` as a single typed `translations` object with `ro` and `en` keys. Pages import `t(lang)` to get the translation object and `routes[lang]` for typed navigation links. Never hardcode UI text in page files.

### Content collections (Astro v6 loader API)

Projects are Markdown files in `src/content/proiecte/`. The schema is defined in `src/content.config.ts` using the `glob` loader. Each file has bilingual frontmatter fields (`titlu`/`title`, `descriere`/`description`). Romanian pages use `proiect.data.titlu`; English pages use `proiect.data.title`.

**To add a project:** create a `.md` file in `src/content/proiecte/` with all required frontmatter fields. No code changes needed.

### Editable data files

| File | What it controls |
|------|-----------------|
| `src/data/organizatie.json` | ONG name, CIF, IBAN, email, phone, address, social links, stats counters |
| `src/data/parteneri.json` | Partners list (name, logo path, website, description) |

Partner logos go in `public/images/parteneri/`. Project images go in `public/images/proiecte/`.

### Layout & components

Every page uses `src/layouts/Layout.astro` which accepts `lang`, `title`, `description`, and `currentPage` props. It renders `Nav.astro` and `Footer.astro`. The `currentPage` prop drives the active nav highlight.

### Formular 230 (Form 230)

Both `/ro/formular-230` and `/en/form-230` contain self-contained Astro pages with inline `<script>` blocks (bundled by Vite) that:
1. Initialize `signature_pad` on a `<canvas>` element
2. On form submit, generate a PDF with `pdf-lib` and trigger a browser download

The PDF contains hardcoded placeholder CIF/IBAN — update these in `src/data/organizatie.json` and in the `<script>` sections of both form pages once real values are available.

### Design tokens

Custom colors are defined via `@theme` in `src/styles/global.css` (Tailwind v4 syntax):
- `navy-50` through `navy-950` — primary brand palette
- `amber-brand` / `amber-brand-dark` — CTA color

Use `bg-navy-900`, `text-amber-brand`, etc. directly as Tailwind classes.
