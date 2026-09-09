# Rajana Yaswanth — Developer Portfolio

A single-file React component (`portfolio.jsx`) built for a dark, technical,
"AI engineer × full-stack × data" visual identity. No fabricated projects,
repos, stats, or skill percentages — everything is sourced from the resume.

## Stack

- React (function components + hooks only, no external state library)
- Plain CSS-in-JS (one `<style>` block, no Tailwind/CSS framework required)
- [`lucide-react`](https://lucide.dev/) for icons
- Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data/status labels)

## 1. Create a project

```bash
npm create vite@latest yaswanth-portfolio -- --template react-ts
cd yaswanth-portfolio
npm install
npm install lucide-react
```

## 2. Drop in the component

Replace the generated `src/App.tsx` (or `App.jsx`) with `portfolio.jsx` from
this folder — rename it to match your project's extension (`.tsx` or `.jsx`).

```bash
cp portfolio.jsx src/App.tsx
```

Make sure `src/main.tsx` imports it as usual:

```tsx
import App from "./App";
```

## 3. Run it

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## 4. Build for production

```bash
npm run build
```

Deploy the `dist/` folder to any static host: Vercel, Netlify, GitHub Pages, etc.

## File structure inside `portfolio.jsx`

The whole site is one file, organized top to bottom as:

| Section | What it is |
|---|---|
| `DATA` block | Profile, tech groups, projects, timeline, achievements, certs — edit content here |
| `GlobalStyles` | All CSS (colors, type, layout, animations) |
| `NetworkBackground` | Deterministic SVG node/edge animation behind the hero |
| `StatusPanel` | The "SYSTEM STATUS" widget with a live session timer |
| `Nav` | Sticky nav with scroll-based active-section highlighting |
| `Hero`, `About`, `TechStack`, `Projects`, `WhatIBuild`, `Achievements`, `Contact`, `Footer` | One component per section |
| `ProjectModal` | The 01–07 case-study modal opened by clicking a project |
| `App` | Assembles everything + tracks which nav section is active |

## Things you'll likely want to change

- **Email** — currently `yaswanth.rajana255@gmail.com` (from the resume) is
  used everywhere via the `PROFILE` object near the top of the file. Change
  it once there if needed.
- **Resume download** — the "Download Resume" hero button currently opens a
  `mailto:` link because no hosted PDF was provided. Once you have the resume
  hosted somewhere (e.g. `/resume.pdf` in `public/`), change that button's
  `href` in the `Hero` component.
- **Project GitHub links** — pull straight from the resume's listed repos.
  Update the `github` field in the `PROJECTS` array if any repo moves.
- **Colors** — the two accent colors (`--teal` and `--amber`) and base
  background are defined as CSS variables at the top of `GlobalStyles`.
  Change the hex values there to retheme the whole site.

## Notes on content honesty

Per the original brief, this build deliberately avoids:
- Inventing extra projects, repos, clients, or testimonials
- Skill-proficiency percentage bars — the "What I Build" section shows
  *how many of the four listed projects touch each area*, not a claimed
  skill level
- Numbers beyond what was explicitly provided (all project impact stats
  are copied verbatim from the resume)
