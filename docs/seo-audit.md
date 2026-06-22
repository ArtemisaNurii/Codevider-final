# SEO Audit — Codevider (New Site)

Audit of the **current codebase and static build output** only. No comparison to a previous site.

**Site type:** B2B software development agency (marketing site)  
**Scope:** Full site — 4 pages × 6 locales = 24 indexable URLs  
**Locales:** `en`, `de`, `fr`, `es`, `it`, `sq` (subdirectory structure, `localePrefix: "always"`)  
**Date:** June 22, 2026

---

## Executive Summary

**Overall health: Needs work before launch.** Content and i18n foundations are solid, but several **crawlability and international SEO gaps** will limit indexing if shipped as-is.

### Top 5 Priority Issues

1. **No `sitemap.xml` or `robots.txt`** — crawlers have no discovery map
2. **No hreflang or canonical tags** — risky for a 6-locale site; Google may pick the wrong language or treat pages as duplicates
3. **Root `/` is a client-side redirect** — Googlebot may see an empty page instead of content
4. **No Open Graph / Twitter metadata** — weak social sharing and missed SERP signals
5. **No structured data** — missing Organization, LocalBusiness, and FAQ schema opportunities

### Quick Wins

- Add `metadataBase` + canonical + `alternates.languages` in `generateMetadata`
- Generate `sitemap.ts` and `robots.ts` (works with static export)
- Replace client-side root redirect with a static redirect to `/en/`
- Strengthen the homepage title (currently just `"Codevider"`)
- Add JSON-LD for Organization + FAQ

---

## Technical SEO Findings

### 1. Missing sitemap and robots.txt

| | |
|---|---|
| **Impact** | High |
| **Evidence** | Build output in `out/` has no `sitemap.xml` or `robots.txt` |
| **Fix** | Add Next.js `app/sitemap.ts` and `app/robots.ts` listing all 24 locale URLs with absolute URLs (requires `metadataBase`) |
| **Priority** | 1 |

### 2. No hreflang annotations

| | |
|---|---|
| **Impact** | High (6 locales) |
| **Evidence** | Built HTML (`out/en.html`, `out/en/about.html`) contains only `<title>`, `<meta description>`, and favicon — no `<link rel="alternate" hreflang="...">` |
| **Fix** | In each page's `generateMetadata`, add `alternates.languages` with all 6 locales, self-referencing entry for current locale, and `x-default` pointing to English |
| **Priority** | 1 |

Example:

```typescript
alternates: {
  canonical: `${baseUrl}/${locale}${path}`,
  languages: {
    en: `${baseUrl}/en${path}`,
    de: `${baseUrl}/de${path}`,
    fr: `${baseUrl}/fr${path}`,
    es: `${baseUrl}/es${path}`,
    it: `${baseUrl}/it${path}`,
    sq: `${baseUrl}/sq${path}`,
    "x-default": `${baseUrl}/en${path}`,
  },
},
```

### 3. No canonical URLs

| | |
|---|---|
| **Impact** | High |
| **Evidence** | No `rel="canonical"` in built HTML |
| **Fix** | Set per-locale self-canonical via `alternates.canonical` (never cross-locale canonical to English) |
| **Priority** | 1 |

### 4. Root `/` uses client-side redirect

| | |
|---|---|
| **Impact** | High |
| **Evidence** | `app/page.tsx` is `"use client"` and redirects via `useEffect` + `router.replace()`. Static `out/index.html` renders almost no content |
| **Fix** | Use a server-side or hosting-level **301 redirect** to `/en/` (or locale-detected redirect at the CDN/host). For static export, a meta refresh or host config (Netlify `_redirects`, Cloudflare, etc.) is the practical approach |
| **Priority** | 1 |

### 5. `<html lang>` set client-side only

| | |
|---|---|
| **Impact** | Medium |
| **Evidence** | Root layout hardcodes `lang="en"`. `SetHtmlLang` updates it in `useEffect` after hydration — crawlers may see `lang="en"` on `/de/`, `/fr/`, etc. |
| **Fix** | Set `lang={locale}` on `<html>` in the locale layout (or pass locale into root layout). Avoid relying on client JS for language declaration |
| **Priority** | 2 |

### 6. No `metadataBase` configured

| | |
|---|---|
| **Impact** | Medium |
| **Evidence** | No `metadataBase` in root or locale metadata. Canonical, OG, and sitemap URLs need an absolute base (e.g. `https://codevider.com`) |
| **Fix** | Add to root layout: `metadataBase: new URL("https://codevider.com")` |
| **Priority** | 2 |

### 7. Static export — images unoptimized

| | |
|---|---|
| **Impact** | Low–Medium |
| **Evidence** | `next.config.ts` has `output: "export"` and `images: { unoptimized: true }` |
| **Fix** | Pre-compress images (WebP/AVIF), use responsive `sizes`, lazy-load below fold. Monitor LCP on hero and team headshots (several are preloaded on About) |
| **Priority** | 3 |

### 8. No analytics or Search Console verification

| | |
|---|---|
| **Impact** | Medium (measurement, not ranking) |
| **Evidence** | No gtag, GTM, Plausible, or verification meta tags found |
| **Fix** | Add analytics + GSC verification before launch |
| **Priority** | 3 |

---

## International SEO Findings

### 9. Locale URL structure — good foundation

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | Subdirectory pattern (`/en/services`, `/de/about`) with `localePrefix: "always"`. All 6 locales have fully translated metadata and page content in dictionaries |
| **Note** | Keep it — this is the recommended pattern |

### 10. Metadata translated across all locales — good

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | `metadata.*` keys exist in `en.json`, `de.json`, `fr.json`, `es.json`, `it.json`, `sq.json` |
| **Note** | Avoid shipping thin or machine-only translations for locales without real search demand |

### 11. 404 page not internationalized

| | |
|---|---|
| **Impact** | Low |
| **Evidence** | `app/not-found.tsx` is English-only ("404 - Page Not Found") |
| **Fix** | Localize copy via i18n or use a locale-aware not-found under `[locale]` |
| **Priority** | 4 |

---

## On-Page SEO Findings

### 12. Homepage title is too generic

| | |
|---|---|
| **Impact** | High |
| **Evidence** | `metadata.home.title` = `"Codevider"` (same in all locales except translated tagline in description) |
| **Fix** | Target primary keywords, e.g. `"Codevider — Software Development Partner \| Web, Mobile & Cloud"`. Keep under ~60 characters; localize per locale |
| **Priority** | 2 |

### 13. Subpage titles and descriptions — good

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | About, Services, and Careers have unique, descriptive titles and meta descriptions (~150–160 chars) with relevant keywords |
| **Example** | Services description covers custom development, AI, cloud, team augmentation |

### 14. H1 structure — good

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | One H1 per page: Home hero, About/Services/Career hero components. Heading hierarchy uses H2s in sections (FAQ, Contact, etc.) |

### 15. No Open Graph or Twitter Card metadata

| | |
|---|---|
| **Impact** | Medium |
| **Evidence** | No `openGraph` or `twitter` in any `generateMetadata` |
| **Fix** | Add per page with title, description, canonical URL, locale, and a default OG image (1200×630) |
| **Priority** | 2 |

Example:

```typescript
openGraph: {
  title,
  description,
  url: canonical,
  siteName: "Codevider",
  locale,
  type: "website",
  images: [{ url: "/images/og/default.png", width: 1200, height: 630 }],
},
twitter: {
  card: "summary_large_image",
  title,
  description,
  images: ["/images/og/default.png"],
},
```

### 16. Some images missing descriptive alt text

| | |
|---|---|
| **Impact** | Low–Medium |
| **Evidence** | Team photos have alt (`about-meet-team.tsx`). Life grid uses localized alt keys. World map and tech stack icons use `alt=""` (acceptable if decorative) |
| **Priority** | 4 |

### 17. Internal linking — adequate for site size

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | Navbar links to all 4 pages; footer repeats company links + contact. Home links to `#contact` and `#services` |
| **Gap** | No dedicated blog/case studies — limits topical depth and long-tail keywords (long-term, not blocking) |

---

## Content & Trust Findings

### 18. No structured data (JSON-LD)

| | |
|---|---|
| **Impact** | Medium |
| **Evidence** | No `application/ld+json` in codebase or build output |
| **Fix** | Add high-value schema: **Organization**, **LocalBusiness** (Tirana address, phone, email from footer), **FAQPage** (8 FAQ items on homepage) |
| **Priority** | 2 |

Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) after adding.

### 19. No privacy policy or terms pages

| | |
|---|---|
| **Impact** | Medium (E-E-A-T / trust) |
| **Evidence** | Contact form mentions privacy in copy (`form_note_privacy`) but no linked policy page |
| **Fix** | Add `/privacy` and optionally `/terms`; link from footer and contact form |
| **Priority** | 3 |

### 20. Contact and NAP signals — good

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | Footer includes email, phone, and Tirana address — supports local trust and LocalBusiness schema |

### 21. FAQ content — strong for SEO

| | |
|---|---|
| **Impact** | Positive |
| **Evidence** | 8 detailed FAQ items covering projects, tech stack, estimates, IP ownership, communication, QA, support, legacy systems. Good for long-tail queries and FAQ rich results once schema is added |

---

## Prioritized Action Plan

### Critical (before launch)

| # | Action |
|---|--------|
| 1 | Add `sitemap.xml` + `robots.txt` with sitemap reference |
| 2 | Add `metadataBase`, canonical, and hreflang (`alternates.languages` + `x-default`) on every page |
| 3 | Fix root `/` redirect — server/host 301 to `/en/`, not client-only |
| 4 | Fix `<html lang>` to render server-side per locale |

### High impact (launch week)

| # | Action |
|---|--------|
| 5 | Strengthen homepage title with primary keywords (all locales) |
| 6 | Add Open Graph + Twitter Card metadata + default OG image |
| 7 | Add Organization + FAQ JSON-LD |
| 8 | Set up Google Search Console + analytics |

### Quick wins

| # | Action |
|---|--------|
| 9 | Add `manifest.json` / web app manifest |
| 10 | Localize 404 page |
| 11 | Add privacy policy page + footer link |

### Long-term (growth)

| # | Action |
|---|--------|
| 12 | Case studies / portfolio pages (target "software outsourcing Albania", "custom software development") |
| 13 | Service-specific landing pages (AI integration, team augmentation, etc.) |
| 14 | Blog or resources hub for topical authority |
| 15 | Core Web Vitals audit on production URL once deployed |

---

## What's Already Working Well

- Clean subdirectory i18n URL structure
- Per-page, per-locale metadata via `generateMetadata` + dictionaries
- Static pre-rendering of all 24 locale pages
- Single H1 per page with logical heading hierarchy
- Substantial homepage content (services, FAQ, contact, trust signals)
- Full content translation infrastructure across 6 languages
- Internal navigation covers all main pages

---

## Open Questions

1. **Production domain** — `codevider.com`? (needed for `metadataBase`, sitemap, canonicals)
2. **Search Console access** — available after deploy?
3. **Priority keywords** — e.g. "software development outsourcing", "Albania dev team", "custom software"?
4. **Target markets** — which locales matter most for organic search (EN + DE vs. all 6)?
