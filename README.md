# Company Style Guide

Code-built design system. **This site is the single source of visual truth** — not screenshots, Penpot, or Figma exports.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Structure

```
tokens/          CSS custom properties (colors, spacing, type, shape, elevation)
styles/          Base styles, components, documentation shell
foundations/     Live foundation pages
components/      Live component pages
guidelines/      Cross-cutting usage rules
```

## Policy

1. **Source of truth:** `tokens/` + `styles/components.css`
2. **External docs:** usage guidelines and a link to the hosted style guide
3. **Change workflow:** edit tokens or components → preview locally → deploy

## Build

```bash
npm run build    # output to dist/
npm run preview  # preview production build
```

## Deploy

Static output in `dist/` can be hosted on Vercel, Netlify, or any static file host. Build command: `npm run build`. Output directory: `dist`.
