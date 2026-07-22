# Design System: Joshua Manuputty Portfolio

## 1. Visual Theme & Atmosphere
A gallery-airy Soft Structuralism interface with confident Editorial Split layouts
and fluid spring-physics motion. Cool zinc surfaces, massive grotesk display type,
and a single muted teal accent. Density 4 / Variance 8 / Motion 6. Feels like a
well-lit architecture studio — clinical, personal, never templated.

## 2. Color Palette & Roles
- **Gallery Mist** (#F4F4F5) — Primary canvas (Zinc-100)
- **Pure Surface** (#FAFAFA) — Elevated panels / double-bezel cores
- **Charcoal Ink** (#18181B) — Primary text (Zinc-950)
- **Muted Steel** (#71717A) — Secondary text, metadata
- **Whisper Line** (rgba(24,24,27,0.08)) — Hairline structure, never harsh gray borders
- **Teal Signal** (#0F766E) — Single accent for CTAs, active states, focus (saturation < 80%)
- **Teal Wash** (#F0FDFA) — Soft accent fills / available badge
- **Teal Signal Dark** (#2DD4BF) — Brighter brand on dark canvases for contrast only
- **Banned:** Warm cream canvases, amber/terracotta accents, purple/neon glows, pure `#000000`

## 3. Typography Rules
- **Display:** Geist Sans — Track-tight, weight-driven hierarchy, oversized brand name
- **Body:** Geist Sans — Relaxed leading, ~65ch max
- **Mono:** Geist Mono — Indexes, timestamps, tech stacks, eyebrow labels
- **Banned:** Inter, Roboto, Arial, generic system stacks as primary. No decorative serifs.

## 4. Component Stylings
* **Buttons:** Fully rounded pills. Primary = Teal Signal fill. Trailing arrow lives inside its own circular nest (button-in-button). Active scale `0.98`. No neon glows.
* **Double-Bezel:** Major panels sit in an outer shell (`p-1.5`, hairline ring, large radius) with an inner core (inset highlight, concentric smaller radius).
* **Cards:** Used only when elevation aids hierarchy. Prefer dividers + whitespace for lists. No equal 3-column feature grids.
* **Section Index:** Mono `01` / `02` preceding titles — editorial, not badge clutter.
* **Loaders:** Skeletal blocks matching layout. No circular spinners.
* **Nav Rail (desktop):** Fixed left index, vertical brand mark, page links, theme control.
* **Nav Island (mobile):** Floating glass pill; menu expands to full-screen blur overlay with staggered link reveal.

## 5. Layout Principles
- Desktop: fixed left rail (~14rem) + main column; content max-width ~72rem
- Hero: Editorial Split — massive left brand/type, interactive Now panel right
- Projects: Asymmetric bento (large feature + stacked companions), collapses to single column below 768px
- Shelf: Zig-zag / staggered media — never three equal cards
- Contact: Left-aligned editorial close — never centered gradient glow card
- Full-height uses `min-h-[100dvh]` only — never `h-screen`
- Macro whitespace: section padding `py-24`–`py-32`

## 6. Motion & Interaction
- Custom easing: `cubic-bezier(0.32, 0.72, 0, 1)` (~700ms) for UI transitions
- Scroll entry: fade-up + slight blur resolve via IntersectionObserver / GSAP ScrollTrigger
- Staggered list/nav reveals — never mount all at once
- Animate only `transform` and `opacity`
- `backdrop-blur` only on fixed/sticky chrome (rail, island, menu overlay)
- Respect `prefers-reduced-motion`

## 7. Anti-Patterns (Banned)
- No warm cream + amber/terracotta portfolio look
- No sticky edge-to-edge top navbar as the primary desktop chrome
- No "Hi, I'm…" + gradient word highlight + dual CTA + social icon row template
- No three equal project/feature cards
- No centered contact cards with brand glow orbs
- No Inter, emojis, neon outer glows, pure black, AI copy clichés
- No "Scroll to explore" / bouncing chevrons
- No overlapping absolute content stacks on mobile
