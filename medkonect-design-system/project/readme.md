# MedKonect Design System

A design system for **MedKonect** — a connected-care platform for clinicians: teleconsultation,
patient scheduling, the medical-records vault, and e-prescribing, in one clinician portal.

The system codifies a calm, trustworthy **clinical** aesthetic: deep "MedKonect Blue" ink, a
"Clinical Teal" interactive accent, a cool-grey surface ramp, Inter type, soft blue-tinted depth,
and selective glassmorphism over media. It is built on a Material-3-derived token foundation.

> **Provenance / naming.** This system was derived from a set of reference HTML screens
> (teleconsult, dashboard, medical records, e-prescriptions, schedule) that were labelled
> **"Apollo Care."** The brand here has been set to **MedKonect** per the project brief. The
> visual language (palette, type scale, spacing rails, components) is faithful to those screens.
> No external codebase or Figma file was provided — everything was reconstructed from the
> inline reference markup.

---

## CONTENT FUNDAMENTALS

How MedKonect writes.

- **Voice:** clinical, confident, reassuring. It speaks *to* the clinician ("Welcome back,
  Eleanor", "Manage your remote patient care") and *about* the patient in clinical shorthand.
- **Person:** second person for the user's own actions ("your clinical overview", "View Full
  Schedule"); third person for patients ("Sarah reported increased morning headaches").
- **Casing:** **Title Case** for navigation, buttons and card titles ("New Consultation",
  "Waiting Queue", "Approve Refill"). UPPERCASE + wide tracking for eyebrows and field labels
  ("UPCOMING CONSULTATION", "MEDICATION"). Sentence case for body copy and helper text.
- **Eyebrows** label sections above titles ("Clinical Calendar" → "Schedule Management").
- **Tone of metadata:** terse, scannable, ID-forward — "ID: #AM-9022 • Hypertension",
  "Qty: 90 • 3 Refills", "Ref ID: #44012". Bullets (•) separate inline facts.
- **Status language** is short and human: *Active, Refill Ready, Confirmed, Pending, Normal,
  Reviewed, Archived, Completed, Up Next, Arrived*.
- **Numbers as signal:** big numerals carry dashboard meaning (counts, % capacity, health
  index). Trends are plain ("4% from last week"). Don't invent stats for decoration.
- **No emoji.** Iconography is carried entirely by Material Symbols. Unicode • is used as an
  inline separator and ● occasionally as a status dot.
- **Reassurance microcopy** appears near sensitive actions: "Secure encrypted connection active",
  "2 emergency slots available in the afternoon."

Examples:
- CTA: **"Join Video Call"**, **"Transmit to Pharmacy"**, **"Start Consultation"**.
- Empty/aside: **"Pre-filling intake…"**, **"Technical Check"**.
- Eyebrow → title: **"PATIENT CONTEXT (AI)"** over an AI summary.

---

## VISUAL FOUNDATIONS

**Color.** Two brand hues do the work. *MedKonect Blue* `#003057` (with a `#001b35` deep ink)
is the brand/heading color and the high-emphasis fill. *Clinical Teal* `#008B8B` is the
interactive accent — links, active nav, primary CTAs, focus rings. Surfaces are a cool-grey ramp
from white `#ffffff` through `#f8f9fa` (app background) to `#e1e3e4`. Text inks: `#003057`
(strong/headings), `#191c1d` (body), `#43474e` (muted), `#73777f` (subtle/outline). Status:
emergency red `#D93025`, success green `#28A745`, info = teal, neutral = grey. Tonal containers
(`#8cf3f3` teal, `#d2e4ff` blue) back chips and active nav. See `tokens/colors.css`.

**Type.** Inter throughout, four roles: Display (48/56, −2% tracking, 700) for hero numerals and
big stats; Headline (32/40 and 24/32, 600) for page/section titles; Body (18/28, 16/24, 400);
Label (14/20, +5% tracking, 500) for buttons/nav; Caption (12/16) for metadata. Eyebrows are
Label, bold, uppercased, +12% tracking. `tokens/typography.css`.

**Spacing.** 8px base grid. Named rails: `gutter` 24px (the default card gap), `margin-mobile`
16px, `margin-desktop` 64px, `container-max` 1280px, sidebar 256px, top bar 64px.
`tokens/spacing.css`.

**Corner radii.** Generous and soft: inputs 8px, buttons/chips 12px, standard cards 16px, hero
& queue cards 24px, featured media 32px; avatars and status pills fully round. `tokens/effects.css`.

**Backgrounds.** Flat cool-grey surfaces — *no* busy patterns or photographic backgrounds in
chrome. Depth comes from layered containers and shadow, not imagery. Media surfaces (video hero,
featured scan) use **brand-blue→teal radial/linear gradients** as placeholders for live footage.
Dark promo/AI panels use a `#003057 → #001b35` gradient.

**Elevation & cards.** Shadows are **blue-tinted** (`rgba(0,48,87,…)`), never neutral black —
the signature "soft clinical depth." The everyday card is *tactile*: white surface, soft shadow,
plus an inset top highlight (`inset 0 1px 1px rgba(255,255,255,.8)`) that makes it feel raised.
Cards have a hairline `#c3c6cf` border. Hover lifts cards `translateY(-4px)` and deepens the
shadow. Accent cards add a 4px teal left border.

**Glass & blur.** Two glass treatments: *light* frosted `rgba(255,255,255,.7)` + `blur(12px)`
for cards floating over dashboards/imagery; *dark* `rgba(0,48,87,.85)` + blur for overlay panels
on video. Sticky chrome (top bar) uses a `blur(20px)` nav glass. Use blur only over content/media,
never on flat backgrounds.

**Motion.** Standard easing `cubic-bezier(.4,0,.2,1)` for color/opacity; a gentle bounce
`cubic-bezier(.34,1.56,.64,1)` for tactile cards, toggles and check-ins. Signature **float**
(3s, ±5px) draws the eye to the single most important CTA per view (Join Call, New Consultation).
Pages fade-in + rise on mount (`mk-page-in`). Live status dots pulse. Respect
`prefers-reduced-motion` (handled in `tokens/base.css`).

**Interaction states.** Hover: links/nav → teal; tonal/solid buttons → `brightness(1.08–1.12)`
+ deeper shadow; cards → lift. Press: everything **shrinks** — buttons `scale(.96)`, icon
buttons `scale(.9)`, cards `scale(.98–.99)`. Focus: 2px teal outline (offset 2px) or a teal
focus ring on inputs (`0 0 0 3px` teal @18%).

**Layout rules.** Fixed sticky top bar (64px) + fixed left rail (256px); content max 1280px,
centered, 32–64px padding. Bento grids (2fr/1fr, 3-up stat rows) are the dominant content
pattern. On ≤880px the rail collapses to a fixed bottom bar and the top nav/search hide.

---

## ICONOGRAPHY

- **Single icon system: Google Material Symbols (Outlined).** Loaded from Google Fonts; default
  axes `FILL 0, wght 400, GRAD 0, opsz 24`. Active/selected items use the **filled** axis
  (`.is-filled` → `FILL 1`) — e.g. the current nav item, a live "chat" tab.
- Render with `<span class="material-symbols-outlined">videocam</span>`. Components expose an
  `icon="…"` prop that takes the symbol name.
- Common glyphs: `dashboard, calendar_today, folder_shared, medication, videocam, monitoring,
  notifications, settings, search, add, add_circle, emergency, person_search, local_pharmacy,
  bloodtype, radiology, vaccines, auto_awesome, schedule, chevron_right`.
- **No emoji.** No custom SVG icon set — the only bespoke SVG is the MedKonect logo/mark in
  `assets/`. `•` (bullet) and `●` (dot) are the only icon-like Unicode characters used.
- **Substitution flag:** the reference used Material Symbols, which is CDN-available, so no
  substitution was needed. Fonts (Inter + Material Symbols) are CDN-loaded, not self-hosted —
  see Caveats.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry point (imports only). **Consumers link this one file.**
- `readme.md` — this document.
- `SKILL.md` — portable Agent-Skill wrapper.

**`tokens/`** (all `@import`ed by `styles.css`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `base.css`

**`assets/`**
- `medkonect-logo.svg` (primary lockup) · `medkonect-mark.svg` (mark) ·
  `medkonect-logo-white.svg` (on dark)

**`guidelines/`** — foundation specimen cards (Design System tab)
- Colors: `colors-brand`, `colors-surfaces`, `colors-status`
- Type: `type-display`, `type-body`
- Spacing: `spacing-scale`, `radii-elevation`, `glass-surfaces`
- Brand: `brand-logo`

**`components/`** — reusable primitives (`window.MedKonectDesignSystem_4460c8`)
- `buttons/` — **Button**, **IconButton**
- `forms/` — **Input**, **Select**, **Switch**, **Checkbox**
- `display/` — **Avatar**, **Card**, **StatCard**, **StatusPill**, **Badge**
- `navigation/` — **Tabs**, **NavItem**

**`ui_kits/`**
- `portal/` — interactive clinician portal (Dashboard, Teleconsult, Records, Prescriptions,
  Schedule). See `ui_kits/portal/README.md`.

## CAVEATS
- **Brand name:** source screens said "Apollo Care"; set to **MedKonect** here. Confirm the name
  and supply real logo files if you have them (the current mark is an original placeholder).
- **Fonts are CDN-loaded** (Google Fonts: Inter + Material Symbols), not self-hosted. For an
  offline/production bundle, download the binaries and replace the `@import`s in
  `tokens/fonts.css` with local `@font-face` rules.
- **Imagery is placeholder:** avatars use initials; media surfaces use brand gradients. No real
  photography was provided.
