# Design System: Joshua Manuputty Portfolio — "As-Built Drawing"

## 1. Visual Theme & Atmosphere
The site as a technical drawing of its author. Cool vellum drafting paper with a
faint printed grid, graphite ink, and a single ink-blue accent. Condensed type does
the annotating — figure labels, sheet numbers, title blocks, dimension lines.
Feels like a drafting table in a well-run studio: precise, calm, quietly warm.
Density 4 / Variance 7 / Motion 5.

## 2. Color Palette & Roles
All colors live as HSL triples in `app/globals.css` and are consumed through
Tailwind tokens (`bg-background`, `text-brand`, …). Never hard-code hex in
components (exception: the Three.js hero scene).

- **Vellum** `hsl(195 14% 95%)` (≈ #F0F3F4) — page canvas (light)
- **Graphite** `hsl(202 28% 16%)` (≈ #1D2B33) — primary text / ink lines
- **Fade** `hsl(202 17% 44%)` (≈ #5C7482) — secondary text, metadata
- **Ink Blue** `hsl(221 83% 53%)` (≈ #2563EB) — single accent: annotations, CTAs, active states
- **Night sheet (dark mode)** `hsl(205 30% 8%)` canvas, brighter ink `hsl(213 92% 68%)`
- **Grid lines** `--grid-minor` / `--grid-major` — full-color vars for the drafting grid
- **Banned:** warm cream canvases, amber/terracotta, teal, purple/neon glows, pure `#000000`

## 3. Typography Rules
- **Display:** Roboto (self-hosted variable, `app/fonts/`) — tight tracking,
  weight-driven hierarchy, oversized name
- **Body:** Roboto — relaxed leading, ~65ch max
- **Labels:** Roboto Condensed (self-hosted variable, `app/fonts/`, `font-condensed`) —
  annotations, title blocks, tech-stack badges, timestamps, metadata
- Annotations are uppercase condensed, `text-xs font-medium`, `tracking-[0.08em]`,
  in Ink Blue. No monospace anywhere.
- **Banned:** Inter, Arial, Geist Sans, Geist Mono, Source Sans, any monospace,
  decorative serifs

## 4. Component Stylings
* **Corners are squared.** `--radius: 0.5rem`. Chips/badges `rounded-[3px]`,
  icon nests `rounded-[4px]`, buttons `rounded-md`, panels `rounded-lg`.
  No pills, no `rounded-full` except literal dots/status pulses.
* **Borderless surfaces.** Only buttons and badges carry a border. Cards,
  panels, image frames, popovers and sheets are separated by fill
  (`bg-card`, `bg-foreground/[0.03]`) and shadow — never an outline.
  Hairline `border-t` / `border-b` / `border-r` rules used as *dividers*
  (section rules, ruled rows, the desktop rail edge) are still allowed.
* **No numerals in chrome.** No sheet numbers, figure numbers, drawing
  numbers, revision stamps, nav indices or list ordinals anywhere in the UI.
  Ordered lists render with disc markers, not numbers. Numbers appear only
  where they are the content itself (dates, ratings, metrics).
* **Annotations:** section eyebrows are short condensed Ink Blue labels (no
  `SHT`/`FIG` numbering), followed by a `.dim-line` (hairline with
  perpendicular end ticks).
* **Title block:** the hero Now panel reads as a drawing title block —
  squared, borderless, lifted on shadow, with ruled rows inside.
* **Buttons:** squared stamps. Primary = Ink Blue fill, trailing arrow in its own
  squared nest. Active scale `0.98`. No glows.
* **Badges:** condensed, squared, hairline border — read as drawing callouts.
* **Loaders:** skeletal blocks matching layout. No circular spinners.
* **Nav Rail (desktop):** fixed left index, unnumbered links; rail footer
  carries the theme control.
* **Nav Island (mobile):** floating squared bar (`rounded-lg`, borderless);
  menu expands to
  full-screen blur overlay with staggered link reveal.

## 5. Layout Principles
- The page canvas carries a fixed drafting grid (`.drafting-grid`): 24px minor
  cells, 120px major lines — subtle, behind all content.
- Desktop: fixed left rail (~13rem) + main column; content max-width ~72rem
- Hero: Editorial Split — massive name + `FIG. 1` annotation left, title-block
  Now panel right
- Sections read in a fixed order; they are not numbered
- Projects: asymmetric bento (large feature + stacked companions)
- Contact: left-aligned editorial close
- Full-height uses `min-h-[100dvh]` only — never `h-screen`
- Macro whitespace: section padding `py-24`–`py-32`

## 6. Motion & Interaction
- Custom easing: `cubic-bezier(0.32, 0.72, 0, 1)` (~700ms) for UI transitions
- Precise, never bouncy — things settle like a pen lifting off paper
- Scroll entry: fade-up + slight blur resolve (GSAP ScrollTrigger / IO)
- Prefer line-draw reveals (SVG stroke, scaleX on `.dim-line`) for annotations
- Animate only `transform` and `opacity`
- `backdrop-blur` only on fixed/sticky chrome
- Respect `prefers-reduced-motion`

## 7. Anti-Patterns (Banned)
- No warm cream + amber/terracotta portfolio look
- No pills or fully-rounded buttons — this system is squared
- No sticky edge-to-edge top navbar as primary desktop chrome
- No "Hi, I'm…" + gradient word highlight + dual CTA + social icon row template
- No three equal project/feature cards
- No centered contact cards with brand glow orbs
- No Inter, emojis, neon outer glows, pure black, AI copy clichés
- No "Scroll to explore" / bouncing chevrons
- No outlined cards or panels — borders are for buttons and badges only
- No decorative numbering (sheet/figure/drawing numbers, nav indices,
  ordered-list numerals)
- No overlapping absolute content stacks on mobile
