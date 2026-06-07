**Input** — single-line text field with sunken fill and a teal focus ring.

```jsx
<Input label="Patient search" icon="person_search" placeholder="Name or ID…" />
<Input icon="search" pill placeholder="Search records…" />
<Input label="Quantity" type="number" defaultValue={30} />
<Input label="Email" error="Enter a valid email" />
```

Pass `label` for the uppercase eyebrow label, `icon` for a leading Material Symbol, `pill` for the rounded top-bar search style, and `hint`/`error` for helper text.
