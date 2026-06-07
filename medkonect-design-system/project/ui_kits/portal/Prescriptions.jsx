/* E-Prescription Management + New Rx drawer */
const { Card, Button, IconButton, StatCard, Avatar, StatusPill, Tabs, Input, Select, Checkbox } = window.MedKonectDesignSystem_4460c8;

function RxCard({ p }) {
  return (
    <Card variant={p.done ? "sunken" : "flat"} style={{ display: "flex", gap: 24, alignItems: "center", padding: 24,
      borderRadius: "var(--radius-lg)", opacity: p.done ? 0.75 : 1, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 240 }}>
        <Avatar name={p.name.split(",")[0]} size="md" />
        <div>
          <div className="mk-headline-md" style={{ fontSize: 18, color: p.done ? "var(--text-muted)" : "var(--mk-blue-700)" }}>{p.name}</div>
          <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>ID: #{p.id} • {p.age} yrs</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, minWidth: 280 }} className="mk-rx3">
        <div>
          <div className="mk-eyebrow" style={{ color: "var(--text-subtle)", fontSize: 11, marginBottom: 4 }}>Medication</div>
          <div style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>{p.drug}</div>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{p.form}</div>
        </div>
        <div>
          <div className="mk-eyebrow" style={{ color: "var(--text-subtle)", fontSize: 11, marginBottom: 4 }}>Dosage</div>
          <div style={{ fontSize: 15 }}>{p.sig}</div>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{p.qty}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
          <StatusPill variant={p.variant} dot={p.variant !== "neutral"}>{p.status}</StatusPill>
          <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>{p.date}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <IconButton icon="history" label="History" />
        {p.variant === "danger"
          ? <Button>Approve Refill</Button>
          : p.done
            ? <Button variant="ghost" disabled>Re-issue</Button>
            : <Button variant="ink">Edit Rx</Button>}
      </div>
    </Card>
  );
}

function NewRxDrawer({ open, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "var(--scrim-blue)",
      backdropFilter: "blur(4px)", display: open ? "flex" : "none", justifyContent: "flex-end",
      opacity: open ? 1 : 0, transition: "opacity .3s" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 600, maxWidth: "100%", height: "100%", background: "var(--surface-app)",
        boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform .4s var(--ease-standard)",
        borderTopLeftRadius: "var(--radius-2xl)", borderBottomLeftRadius: "var(--radius-2xl)" }}>
        <div style={{ padding: 32, borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 className="mk-headline-lg">New E-Prescription</h2>
            <p style={{ color: "var(--text-muted)" }}>Initialize a new digital medication order.</p>
          </div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </div>
        <div className="mk-scroll" style={{ flex: 1, overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 28 }}>
          <Input label="Patient search" icon="person_search" placeholder="Start typing patient name or ID…" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Drug name" placeholder="e.g. Atorvastatin" />
            <Select label="Strength / Form" placeholder="Select…" options={["5mg Tablet", "10mg Tablet", "20mg Capsule", "50mg/ml Solution"]} />
          </div>
          <div className="mk-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="mk-field__label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-strong)" }}>Instructions (SIG)</label>
            <textarea rows="3" placeholder="e.g. Take one tablet by mouth once daily in the evening with food."
              style={{ width: "100%", padding: 16, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-body)",
                background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", outline: "none", resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "end" }}>
            <Input label="Quantity" type="number" defaultValue="30" />
            <Input label="Refills" type="number" defaultValue="0" />
            <div style={{ paddingBottom: 12 }}><Checkbox label="Dispense as written" /></div>
          </div>
          <Card variant="sunken" style={{ border: "2px dashed color-mix(in srgb, var(--mk-teal-500) 30%, transparent)", background: "color-mix(in srgb, var(--mk-teal-200) 20%, transparent)",
            display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)", fontSize: 32 }}>local_pharmacy</span>
              <div>
                <div style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>CVS Pharmacy #4921</div>
                <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>1200 Healthcare Ave, City Center</div>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ color: "var(--text-subtle)" }}>chevron_right</span>
          </Card>
        </div>
        <div style={{ padding: 32, borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)", display: "flex", gap: 16 }}>
          <Button variant="outline" style={{ flex: 1 }} onClick={onClose}>Discard Draft</Button>
          <Button icon="send" style={{ flex: 2 }} onClick={onClose}>Transmit to Pharmacy</Button>
        </div>
      </div>
    </div>
  );
}

function Prescriptions() {
  const d = window.MK_DATA;
  const [tab, setTab] = React.useState("All");
  const [open, setOpen] = React.useState(false);
  const list = d.prescriptions.filter((p) =>
    tab === "All" ? true : tab === "Active" ? !p.done : p.done);
  return (
    <>
      {window.MK_PageHead({
        title: "E-Prescription Management",
        subtitle: "Streamlined digital pharmacy. Manage medications, authorize refills, track compliance.",
        actions: <>
          <Button variant="outline" icon="filter_list">Filters</Button>
          <Button icon="add" className="mk-float" onClick={() => setOpen(true)}>New Prescription</Button>
        </>,
      })}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24, marginBottom: 40 }} className="mk-stat3">
        <StatCard label="Refills Pending Approval" value="14" trend="4% from last week" trendDir="down" icon="assignment_turned_in" interactive />
        <StatCard label="Active Scripts" value="142" tone="teal" interactive />
        <StatCard label="Pharmacy Delays" value="02" tone="red" interactive />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 className="mk-headline-md">Recent Prescriptions</h2>
        <Tabs tabs={["All", "Active", "Completed"]} value={tab} onChange={setTab} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map((p) => <RxCard key={p.id} p={p} />)}
      </div>
      <NewRxDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

window.MK_Prescriptions = Prescriptions;
