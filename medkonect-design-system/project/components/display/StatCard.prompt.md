**StatCard** — dashboard bento metric tile.

```jsx
<StatCard label="Refills Pending Approval" value="14" trend="4% from last week"
          trendDir="down" icon="assignment_turned_in" interactive />
<StatCard label="Active Scripts" value="142" tone="teal" />
<StatCard label="Pharmacy Delays" value="02" tone="red" />
```

`tone` colors the numeral (`blue` default, `teal`, `red`). Reserve `red` for problem metrics.
