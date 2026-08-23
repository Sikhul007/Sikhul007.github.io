# Portfolio — Folder Structure

Your single 700-line `page.tsx` has been split into a standard Next.js (App Router)
layout, using the `@/*` path alias (already default in Next.js projects created with
`create-next-app`, points at the project root).

```
app/
  layout.tsx          → root layout, fonts, metadata
  page.tsx             → route entry, just renders <PortfolioPage />
  globals.css          → Tailwind import + CSS variables (unchanged)

components/
  GlobalStyles.tsx      → the <style> block with the site's theme/tokens
  PortfolioPage.tsx      → composes Navbar + all sections + Footer

  layout/
    Navbar.tsx           → "use client" (scroll state, mobile menu)
    Footer.tsx            → "use client" (current year on mount)

  ui/
    EndpointHeader.tsx     → reusable "GET /api/..." section header

  sections/
    Hero.tsx               → "use client" (typewriter effect)
    AboutSection.tsx         → server component, pulls from data/skills.ts
    ExperienceSection.tsx     → server component, pulls from data/site.ts
    ProjectsSection.tsx        → server component, pulls from data/projects.ts
    AwardsSection.tsx           → server component, pulls from data/awards.ts
    ContactSection.tsx           → "use client" (form state + submit)

data/
  skills.ts              → tech-stack namespace groups
  projects.ts             → project cards
  awards.ts                → Dean's Awards / certificates
  site.ts                   → nav links, experience log lines, socials,
                              contact info, resume path, rotating hero roles
```

## Why split this way

- **Client vs. server components are separated.** Only components that actually
  need `useState`/`useEffect` (`Navbar`, `Footer`, `Hero`, `ContactSection`) are
  marked `"use client"`. Everything else (`AboutSection`, `ExperienceSection`,
  `ProjectsSection`, `AwardsSection`, `EndpointHeader`) is a plain server
  component — smaller client bundle, faster hydration.
- **Content lives in `data/`, not JSX.** Editing your projects, awards, skills,
  or socials is now a one-line change in a `.ts` file instead of hunting
  through markup.
- **`PortfolioPage.tsx` is the single place that wires sections together**,
  so reordering sections or adding a new one is a one-line change.

## Usage

Drop this into an existing Next.js 13+/14+/15+ App Router project (App Router,
TypeScript, Tailwind already configured — same as your original setup). Merge
`app/layout.tsx` and `app/globals.css` with your existing ones if you already
have content there, then copy `components/` and `data/` in as-is.

Dependencies used (already implied by your original file):
```
npm install react-icons
```

Next/Image expects these to exist under `/public`:
`/images/shihab.png`, `/images/shihab2.jpg`, `/images/pro_1.png` … `/images/pro_5.png`,
`/images/diagram.png`, `/images/fall-22-23.jpg` … award images, and
`/resume/Md. Sikhul Islam Shihab_CV.pdf`.
