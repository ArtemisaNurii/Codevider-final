---
name: dark-mode-helper
description: >
  Apply this skill whenever designing, reviewing, or adjusting UI colors for dark mode —
  regardless of whether the user is working in Tailwind, plain CSS, CSS-in-JS, design tokens,
  or Figma. Triggers include: "dark mode", "dark theme", "night mode", "color scheme",
  "theming", reviewing contrast issues, or any request to adapt a light UI to dark.
  Use proactively even if the user hasn't explicitly said "dark mode" but is clearly
  building a dark-background interface.
---

# Dark Mode Design Rules

These rules are framework-agnostic. Principles come first; Tailwind class names appear only as
concrete examples — not as the rule itself.

---

## 1. Shade Rule

**Principle:** Dark backgrounds make saturated, dark colors look harsh or invisible.
When adapting a color from light mode to dark mode, shift it toward a lighter, less saturated
value — typically increasing lightness by 15–25% in HSL terms.

The exact shift depends on how vivid the original color is:
- Vivid/saturated colors (e.g. a strong blue) may need a larger shift
- Muted or neutral colors may need only a small adjustment
- The goal is that the color reads at a similar *visual weight* as it did in light mode

This applies to: text colors, background colors, border colors, icon fills, and ring/outline colors.

> **Tailwind example:** `bg-blue-500` in light mode → `dark:bg-blue-300` in dark mode

> **CSS example:** `hsl(220, 80%, 45%)` in light mode → `hsl(220, 60%, 65%)` in dark mode

---

## 2. Contrast Rule

**Principle:** Avoid pure black (`#000`) and pure white (`#fff`) in dark mode.
Pure white on a dark background causes eye strain due to excessive contrast.
Pure black feels flat and unnatural — real dark surfaces have slight tint.

- **For light text/elements:** Use an off-white — around 90–95% lightness with a faint neutral tint
  (slightly cool or slightly warm depending on your palette). Alternatively, reduce the opacity
  of white to around 80%.
- **For dark backgrounds:** Use a very dark neutral with a subtle tint rather than pure black.
  Good target: around 5–8% lightness in HSL, with a slight cool or warm bias.

> **Tailwind example (light text):** `text-white/80` or `text-slate-100`
>
> **Tailwind example (dark background):** `bg-zinc-950` or `bg-slate-900`
>
> **CSS example (light text):** `color: hsl(220, 15%, 93%)` or `color: rgba(255, 255, 255, 0.82)`
>
> **CSS example (dark bg):** `background: hsl(220, 12%, 7%)`

---

## 3. Hover Rule

**Principle:** The light mode hover convention — darken an element on hover — is inverted in dark mode.
Darkening on a dark background makes the element feel like it's disappearing.
Instead, **illuminate**: make the element slightly lighter or brighter on hover.

Methods, in order of preference:
1. Shift to a lighter shade of the same color
2. Increase brightness via a CSS filter (`brightness(1.15)` or similar)
3. Overlay a low-opacity white layer (`background: rgba(255,255,255,0.07)`)

> **Tailwind example:** Instead of `hover:bg-blue-600`, use `dark:hover:bg-blue-300`
>
> **CSS example:** `filter: brightness(1.15)` or `background: hsl(220, 60%, 72%)` on hover

---

## 4. Surface Layering Rule

**Principle:** In dark UIs, depth is communicated by making upper layers *lighter*, not darker.
This is the opposite of light mode, where cards and modals go darker than the page background.

A typical layering stack (from bottom to top):
- **Page background:** darkest value, ~5–8% lightness
- **Cards / panels:** slightly lighter, ~10–13% lightness
- **Modals / popovers / dropdowns:** lighter still, ~15–18% lightness
- **Tooltips / top-level overlays:** lightest surface, ~20–22% lightness

Each step up in elevation should be roughly 3–5% lighter in lightness. Without this, the UI feels flat and surfaces are indistinguishable.

> **Tailwind example:** `bg-zinc-950` (page) → `bg-zinc-900` (card) → `bg-zinc-800` (modal)
>
> **CSS example:** `hsl(220, 12%, 7%)` → `hsl(220, 10%, 11%)` → `hsl(220, 9%, 16%)`

---

## 5. Border Rule

**Principle:** Hard, fully opaque borders feel harsh in dark mode. Prefer very subtle borders using
low-opacity white rather than a solid gray. If background contrast between surfaces is sufficient
(see Surface Layering Rule), you can often skip borders entirely.

- Use white at 8–12% opacity for a barely-there separator
- Use white at 15–20% opacity for a more defined border (e.g. active states, inputs)
- Avoid mid-gray solid borders — they tend to look muddy against dark backgrounds

> **Tailwind example:** `border-white/10` or `border-white/15`
>
> **CSS example:** `border: 1px solid rgba(255, 255, 255, 0.1)`

---

## 6. Shadow Rule

**Principle:** Drop shadows are nearly invisible in dark mode because they rely on a darker
semi-transparent color, which disappears against an already-dark background.

Replace or supplement shadows with:
- **Background elevation** (the Surface Layering Rule above) — the most reliable approach
- **Subtle inner borders** using low-opacity white (see Border Rule)
- If a shadow is truly needed, use a dark color with high opacity and slight spread,
  or invert to a very subtle glow using the element's own color at low opacity

> **CSS example (dark shadow):** `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6)`
>
> **CSS example (color glow):** `box-shadow: 0 0 16px rgba(99, 130, 255, 0.15)`

---

## 7. Icon and SVG Rule

**Principle:** Icons are frequently overlooked when adapting to dark mode. An icon using a dark
fill will disappear on a dark background. Apply the same shade-shifting logic as text:
shift icon fills to a lighter, slightly desaturated value.

- Avoid pure white icons — use a slightly tinted off-white for better visual harmony
- Decorative/secondary icons can be even more muted than primary text
- Interactive icons (buttons, toggles) should follow the Hover Rule when in an active state

> **Tailwind example:** `fill-slate-200` or `fill-zinc-300` instead of `fill-gray-700`
>
> **CSS example:** `fill: hsl(220, 10%, 82%)` or `color: hsl(220, 10%, 82%)` (for `currentColor` SVGs)

---

## 8. Focus Ring Rule

**Principle:** Focus rings that work well in light mode (typically a vivid accent color) can look
neon and jarring in dark mode due to the lack of surrounding brightness to absorb the contrast.

Adjustments:
- Reduce the saturation of the focus color slightly
- Reduce opacity slightly (around 70–80%)
- Use a ring offset with the dark background color so the ring has a gap around the element,
  making it readable without being aggressive

> **Tailwind example:** `dark:ring-blue-400/70 dark:ring-offset-zinc-900`
>
> **CSS example:** `outline: 2px solid rgba(96, 165, 250, 0.7); outline-offset: 3px`