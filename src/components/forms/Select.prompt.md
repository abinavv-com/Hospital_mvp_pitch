**Select** — native dropdown matching the Input style.

```jsx
<Select label="Strength / Form" placeholder="Select…"
        options={["5mg Tablet", "10mg Tablet", "20mg Capsule"]} />
<Select label="Pharmacy" options={[{value:"cvs", label:"CVS #4921"}]} />
```

Accepts `options` as plain strings or `{value,label}` objects; `placeholder` adds a disabled prompt row.
