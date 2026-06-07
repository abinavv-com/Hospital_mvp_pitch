**IconButton** — circular icon-only control for header chrome (notifications, settings, more) and glass overlays on video/imagery.

```jsx
<IconButton icon="notifications" label="Notifications" />
<IconButton icon="settings" label="Settings" />
<IconButton icon="more_vert" variant="glass" label="More" />   {/* over media */}
<IconButton icon="add" variant="solid" filled label="Add" />
```

Variants: `plain` (transparent, hover fills with surface-variant), `solid` (brand blue), `glass` (dark frosted, for placing over photos/video). Always pass `label`.
