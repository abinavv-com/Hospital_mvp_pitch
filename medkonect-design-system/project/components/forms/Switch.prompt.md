**Switch** — binary on/off toggle, teal when active.

```jsx
<Switch label="Dispense as written" defaultChecked />
<Switch label="Email reminders" checked={on} onChange={e => setOn(e.target.checked)} />
```

Use for instant-apply settings. For form submission choices prefer Checkbox.
