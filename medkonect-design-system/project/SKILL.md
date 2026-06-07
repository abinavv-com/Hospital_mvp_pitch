---
name: medkonect-design
description: Use this skill to generate well-branded interfaces and assets for MedKonect, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a connected-care clinician portal (teleconsult, scheduling, records, e-prescribing).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key files:
- `styles.css` — link this one file to get all tokens (colors, type, spacing, effects) and fonts.
- `readme.md` — brand voice, visual foundations, iconography, and a full manifest.
- `tokens/` — the CSS custom properties; reference `var(--…)` rather than hard-coding values.
- `components/` — React primitives (Button, IconButton, Input, Select, Switch, Checkbox, Avatar, Card, StatCard, StatusPill, Badge, Tabs, NavItem). Each has a `.prompt.md` with usage.
- `ui_kits/portal/` — a working multi-screen clinician portal to copy patterns from.
- `assets/` — MedKonect logo + mark.

House rules in brief: MedKonect Blue `#003057` for brand/headings, Clinical Teal `#008B8B` for interactive accents/CTAs, cool-grey surfaces, Inter type, Material Symbols icons (no emoji), blue-tinted soft shadows, generous radii, tactile/glass cards, gentle float on the single primary CTA per view, press-to-shrink interactions.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
