# Home Page Polish Plan — Codevider

Design face-lift plan for the landing page, scoped from the cool-color fatigue critique and follow-up preferences.

**Skill reference:** [make-interfaces-feel-better](../.agents/skills/make-interfaces-feel-better/SKILL.md)  
**Page:** `app/[locale]/page.tsx`  
**Date:** June 23, 2026

---

## Executive Summary

The foundational layout is structurally sound and professional. The page feels bland because of **cool-color fatigue**—deep blues, dark grays, and muted accents blend into one long dark column, especially on mobile.

**Primary pain point:** Hero (dashboard widget + background blobs feel flat).  
**Scope:** Full pass (CSS, widgets, mobile asymmetry, motion).  
**Palette:** Stay cool-toned—no warm violet/amber accents.  
**Section rhythm:** Subtle bluish alternating bands—no bright white shock sections.  
**Typography:** Solid high-contrast headings—no text gradients.  
**Viewport priority:** Mobile and desktop equally.

---

## Diagnosis — Why the Hero Feels Flat

| Layer | Current state | Effect |
| --- | --- | --- |
| **Canvas** | `.home-hero__veil` washes blobs to ~52–60% opacity of `--bg` | Lighting exists in CSS but reads as flat gray |
| **Dashboard** | Dark mode tokens (`--dash-canvas: #0f1117`) with low-contrast surfaces | Widget looks like a wireframe, not a live product |
| **Depth** | `hero-dash-surface` uses `box-shadow` but borders stay at 12% opacity | Cards don't catch ambient light from blobs |

The scroll sections have repetition too, but the Hero is where users form their first impression—and where fixes have the highest ROI.

### Current section stack

```
Hero → WhoWeAre → CoreServices → WhoWeEmpower → WhyOutsource → GlobalPartnerships → WhyChooseUs → Faq → Contact
```

Only **Contact**, **Why Outsource**, and parts of **Core Services** currently use `home-feature-alt`. Most sections share the same dark canvas.

---

## Constraints (from scoping)

| Decision | Choice |
| --- | --- |
| Warm accents | **No** — fix rhythm & depth within blue/teal/cyan family |
| Gradient headings | **No** — brighter solid `--text-h` and emphasized leads instead |
| Section alternation | **Subtle** — bluish bands (`#13151c` ↔ `#252833`), not a white CTA band |
| i18n | Any new copy strings go in `dictionaries/en.json` first |

---

## Implementation — 4 Phases

### Phase 1: Hero lighting & depth

**Goal:** Make blobs readable without warm accents—pure cool-tone depth.

| Before | After |
| --- | --- |
| Veil at 52–60% `--bg` mix over blobs | Reduce veil opacity on desktop; let primary/secondary blobs breathe |
| Blob opacity ~0.22–0.42 in dark mode | Bump blue/cyan stops slightly; keep teal/violet blobs cool-only |
| Hero has no edge bleed on mobile | Allow one blob to bleed past viewport edge for asymmetry |
| Flat hero text hierarchy | Brighter `--text-h` on h1; lead paragraph one step brighter + `font-medium` on first sentence |

**Files**

- `app/globals.css` — blob/veil tokens (`.home-hero__blob*`, `.home-hero__veil`)
- `components/index/hero.tsx` — lead emphasis via span or class

**Skill principles**

- Shadows over borders
- Optical alignment
- `text-wrap: balance` on h1 (verify)

---

### Phase 2: Hero dashboard realism

**Goal:** Turn the dashboard from dark wireframe → living product UI.

| Before | After |
| --- | --- |
| Revenue bars flat gradient fill | Bars with glow on peak bar + subtle pulse on latest data point |
| Metric cards uniform dark surfaces | Inner highlight (`inset` shadow) + hover border brightens to `--dash-brand` |
| Transaction list static rows | Staggered enter on mount; one row gets a soft “live” ping dot |
| Window chrome low contrast | Title bar slightly lighter than canvas; stronger `--dash-text` on values |
| No ambient reflection | Pseudo-element gradient on `.hero-dash-window` that picks up blob color |

**Files**

- `components/index/hero-dashboard.tsx`
- `app/globals.css` — `--dash-*` dark tokens, `.hero-dash-*` classes

**Skill principles**

- Tabular nums (already on metric values)
- Concentric radius — window `rounded-2xl` → cards `rounded-xl`
- `active:scale-[0.96]` if any interactive chips are added

**Open decision — dashboard visual direction**

| Option | Description |
| --- | --- |
| **1. Product-realistic** *(recommended default)* | Brighter inner surfaces, high-contrast chart data, feels like a live SaaS dashboard (still dark-themed) |
| **2. Glass / frosted** | Translucent cards with `backdrop-blur`, blobs visible through the widget (more dramatic, more “premium fintech”) |

---

### Phase 3: Subtle bluish section rhythm

**Goal:** Break the “one dark column” scroll without a white shock section.

| Before | After |
| --- | --- |
| Only Contact, Why Outsource, parts of Core Services use `home-feature-alt` | Systematic alternation across scroll sections |
| `--home-section-alt: #252833` barely distinct from `#13151c` | Slightly widen the gap OR reinforce with `--home-section-alt-border` top edge |
| No horizontal separation between sections | Optional thin gradient hairline (`blue → teal` at ~15% opacity) between bands |

**Suggested alternation pattern**

| Section | Background |
| --- | --- |
| Hero | Base (blobs + veil) |
| Who We Are | `home-feature-alt` |
| Core Services | Base |
| Who We Empower | `home-feature-alt` |
| Why Outsource | `home-feature-alt` *(already)* |
| Global Partnerships | Base |
| Why Choose Us | `home-feature-alt` |
| FAQ | Base |
| Contact | `home-feature-alt` *(already)* |

**Files**

- `components/index/who-we-are.tsx`
- `components/index/core-services.tsx`
- `components/index/who-we-empower.tsx`
- `components/index/global-partnerships.tsx`
- `components/index/why-choose-us.tsx`
- `components/index/faq.tsx`
- `app/globals.css` — `--home-section-alt`, `.home-feature-alt`

**Not doing:** Bright white CTA band.

---

### Phase 4: Surfaces, borders & motion

**Goal:** Premium polish on cards/widgets site-wide, with mobile layout variety.

| Before | After |
| --- | --- |
| `.home-demo` flat `1px` border | Hover: border brightens + top gradient bar intensifies; layered shadow instead of hard border where possible |
| World map / pipeline static lines | Thicker strokes, opacity layers, 2–3 glowing nodes with CSS animation |
| Mobile: every section centered text + card below | Hero: dashboard bleeds right edge; one mid-page section left-aligns copy on mobile |
| Section reveals uniform | Extend split/stagger pattern to Hero stats + dashboard cards (~100ms delay) |

**Files**

- `components/index/core-services.tsx`
- `components/index/global-partnerships.tsx`
- `components/ui/world-map.tsx`
- `components/index/hero.tsx` / `hero-dashboard.tsx` — motion

**Skill principles**

- Split/stagger enter animations
- `initial={false}` on `AnimatePresence`
- No `transition: all` — specify exact properties
- `active:scale-[0.96]` on CTAs (already on hero links)

---

## Execution order

```
Phase 1 (Hero lighting)
    ↓
Phase 2 (Dashboard widget)
    ↓
Phase 3 (Section bands)
    ↓
Phase 4 (Borders + motion + mobile)
```

Phases 1 + 2 alone should make the Hero feel dramatically better. Phases 3–4 address scroll fatigue on mobile without overpowering the cool palette.

---

## Explicitly out of scope

- Warm accents (violet, amber, gold)
- Gradient headings (`bg-clip-text` text gradients)
- Aggressive white or near-white full-width CTA sections
- New marketing copy (unless required for UI labels—in which case add to `en.json`)

---

## Review checklist (post-implementation)

Use the [make-interfaces-feel-better](../.agents/skills/make-interfaces-feel-better/SKILL.md) checklist when verifying:

- [ ] Nested rounded elements use concentric border radius
- [ ] Shadows used instead of borders where appropriate
- [ ] Enter animations are split and staggered
- [ ] Dynamic numbers use `tabular-nums`
- [ ] Headings use `text-wrap: balance`
- [ ] Buttons use `active:scale-[0.96]` where appropriate
- [ ] No `transition: all`
- [ ] Interactive elements have at least 40×40px hit area

Present final changes as **Before / After** tables grouped by principle.

---

## Next step

Choose dashboard direction for Phase 2:

1. **Product-realistic**
2. **Glass / frosted**

Then implement starting with Phase 1 + 2.
