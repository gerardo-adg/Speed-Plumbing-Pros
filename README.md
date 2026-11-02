# Speed Plumbing Pros website

Marketing site for Speed Plumbing Pros (Sacramento, CA), built with [Astro](https://astro.build). It's a static site with no client-side framework, so pages load fast and score well on Core Web Vitals.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check Astro and TypeScript files |

## Structure

```
src/
  data/site.ts            Business details: name, phone, license, address, links (one place for NAP)
  data/categories.ts      The six service categories and their icons
  content.config.ts       Content collections and their schemas
  content/
    services.json         20 services → /services/[slug]
    areas.json            25 cities → /service-areas/[slug]
    jobs/*.md             Job posts ("Projects") → /projects/[slug]
    reviews.json          Google reviews shown on the site
    offers.json           Coupons
    faqs.json             FAQ (also output as FAQPage schema)
  components/             Header, Footer, Hero, RequestForm, ServicesGrid, Reviews, Offers, RecentJobs, …
  layouts/Base.astro      <head>, SEO meta, Open Graph, JSON-LD, header/footer
  lib/schema.ts           JSON-LD builders: Plumber, Service, BreadcrumbList, FAQPage
  styles/global.css       Brand tokens and all styles
public/                   favicons, app icons, og.png, robots.txt, site.webmanifest
src/assets/logo.png       Official logo
docs/concept-homepage.html  The original single-file concept shown to the client
```

## Brand

From the client's brand manual (*Manual de identidad*, 2024):

- Colors: navy `#19255a`, cyan `#2ea8d3`, gold `#c3983c`
- Type: the manual specifies **Coolvetica** (headings) and **Gotham** (body). Neither is licensed for web use for free, so the site uses **Montserrat** throughout: Black (900) for headings, which matches the logo lettering, and Regular–Bold for body text. Montserrat is the standard free alternative to Gotham.
- Voice: friendly, dependable, energetic. The "trusted neighbor who knows plumbing."
- Logo: `src/assets/logo.png` (official badge, transparent PNG), rendered by `components/Logo.astro` and optimized at build time. Favicons and app icons in `public/` are generated from it. An SVG version would be sharper; swap it in when available.

## Job posts (the upload app)

Each job is a Markdown file in `src/content/jobs/`. The upload app only needs to commit a new file (plus photos in the same folder) and the site rebuilds:

```md
---
title: Tankless water heater service in Folsom
date: 2026-11-02
area: folsom                     # id from areas.json
services: [water-heater-repair]  # ids from services.json
summary: One or two sentences for cards and meta description.
photos:
  - src: ./tankless-folsom-1.jpg
    alt: Descaled tankless water heater after service
---

Full write-up of the job.
```

New jobs automatically show up on the homepage, on `/projects`, on each tagged service page, and on the city page. Never put a customer's street address in a post.

## Request form

The form posts JSON to `PUBLIC_FORM_ENDPOINT` (see `.env.example`). If it's empty, the form shows a demo message and sends nothing. Point it at the CRM, a form service, or a small serverless function before launch.

## Launch checklist

- [ ] Fill every `TODO` in `src/data/site.ts`: CSLB license #, address, hours, email, Google/Yelp/BBB/social links (the credential badges link to them)
- [ ] Confirm which phone number to use: (916) 333-8369 (current site) or (707) 761-2626 (brand manual)
- [ ] Replace the 3 sample job posts with real posts and photos
- [ ] Write a unique `intro` for each city in `areas.json`, so the city pages aren't near-duplicates
- [ ] Confirm offer terms and expiration dates in `offers.json`
- [ ] Migrate Privacy Policy and Terms text; add the owner's story and team photos to `/about`
- [ ] Map old URLs to new ones and add redirects (old service URLs were `/services/<slug>`; verify each slug against the old sitemap)
- [ ] Set `PUBLIC_FORM_ENDPOINT`
- [ ] Deploy (Cloudflare Pages, Netlify or Vercel). Keep bot challenges **off** so Google, social previews and AI crawlers can read the site
- [ ] Submit `sitemap-index.xml` in Google Search Console
