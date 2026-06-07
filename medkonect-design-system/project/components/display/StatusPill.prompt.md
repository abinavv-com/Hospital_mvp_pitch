**StatusPill / Badge** — record, appointment and prescription state chips.

```jsx
<StatusPill variant="info" dot>Active</StatusPill>
<StatusPill variant="success">Normal</StatusPill>
<StatusPill variant="danger" dot>Refill Ready</StatusPill>
<StatusPill variant="neutral">Pending</StatusPill>
<StatusPill variant="solid">3 Patients</StatusPill>

<Badge>5</Badge>   {/* notification count */}
```

`StatusPill` variants map to the semantic palette: `info`=teal/live, `success`, `danger`=emergency, `neutral`, `solid`=brand blue. `Badge` is the tiny numeric counter.
