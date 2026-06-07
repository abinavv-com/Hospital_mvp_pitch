**Button** — the primary tappable action; teal `primary` is the default call-to-action across MedKonect.

```jsx
<Button icon="add" onClick={newConsult}>New Consultation</Button>
<Button variant="ink" size="lg" block>Join Video Call</Button>
<Button variant="tonal" icon="filter_list">Filters</Button>
<Button variant="danger" icon="emergency">Emergency</Button>
<Button variant="outline">Export Daily PDF</Button>
<Button variant="ghost" iconTrailing="chevron_right">View all</Button>
```

Variants: `primary` (teal CTA), `ink` (solid brand blue, high-emphasis), `tonal` (soft teal chip-button), `outline`, `ghost`, `danger` (Emergency only). Sizes `sm | md | lg`. Pass `block` to fill width, `icon` / `iconTrailing` for Material Symbols. Active state shrinks to 0.96; never use more than one `primary` per view region.
