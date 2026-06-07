**Avatar** — patient/clinician image with initials fallback.

```jsx
<Avatar src={photo} name="Sarah Montgomery" size="md" />
<Avatar name="Michael Chen" shape="rounded" size="sm" />     {/* compact queue lists */}
<Avatar src={me} name="Dr. Smith" ring status="online" />     {/* signed-in user */}
```

Sizes `xs | sm | md | lg`. Use `shape="rounded"` inside dense list rows, `ring` for the active user, and `status` for presence.
