**Tabs** — in-page filter/view switcher.

```jsx
<Tabs tabs={["All","Active","Completed"]} value={tab} onChange={setTab} />
<Tabs variant="segmented" tabs={["Day","Week","Month"]} value={view} onChange={setView} />
```

`underline` (default) = teal underline, for list filters. `segmented` = blue pill group, for calendar/view toggles.
