# MedKonect — Clinician Portal (UI kit)

An interactive, click-through recreation of the MedKonect clinician web portal. It composes
the design-system primitives (`Button`, `Card`, `NavItem`, `Avatar`, `StatusPill`, `Input`,
`Select`, `Tabs`, `StatCard`, `IconButton`) into five full screens behind one shell.

## Run
Open `index.html`. The left rail and top bar switch screens; on narrow widths the rail
collapses to a bottom bar.

## Screens
| Key | File | What it shows |
|-----|------|----------------|
| `dashboard` | `Dashboard.jsx` | Welcome header + health-index ring, appointments, teleconsult promo, recent records, current medications (bento). |
| `teleconsult` | `Teleconsult.jsx` | Video hero with glass overlay panels, **Join/End** toggle, self-preview, tech-health tiles, waiting queue, AI patient-context card. |
| `records` | `Records.jsx` | Records Vault — search, category bento, featured-scan media card, quick summary, recent-documents list. |
| `prescriptions` | `Prescriptions.jsx` | Stat bento, filter tabs (All/Active/Completed), prescription cards, and the **New E-Prescription** slide-over drawer. |
| `schedule` | `Schedule.jsx` | Month calendar grid with event chips, upcoming list, capacity card; Day/Week/Month segmented control. |
| `analytics` | (inline) | Intentional placeholder — not in the source reference. |

## Files
- `Shell.jsx` — `TopBar`, `SideNav`, `BottomBar`, page frame + `MK_PageHead` helper.
- `data.js` — shared mock data (`window.MK_DATA`).
- Screen files attach their component to `window.MK_<Name>` (Babel scripts don't share scope).

## Notes / fidelity
- **Avatars use brand-tinted initials**, not photos — the kit is fully self-contained with no
  external image dependencies. The reference screens hot-linked Google-CDN portraits; swap in
  real `src` images via the `Avatar` `src` prop if needed.
- The "video" hero and featured-scan use brand gradients as deliberate placeholders for live
  media. Drop in real footage/imagery in production.
- Branding is **MedKonect**; the source reference was labelled "Apollo Care".
