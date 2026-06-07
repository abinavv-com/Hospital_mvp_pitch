/* Overview / dashboard screen */
const { Card, Button, Avatar, StatusPill } = window.MedKonectDesignSystem_4460c8;

function HealthIndex() {
  const pct = 82, r = 28, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
  return (
    <Card variant="tactile" style={{ display: "flex", alignItems: "center", gap: 20, minWidth: 260, padding: 18 }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--mk-container-high)" strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--mk-teal-500)" strokeWidth="6"
            strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 14 }}>{pct}%</span>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Health Index</div>
        <div className="mk-headline-md" style={{ color: "var(--mk-teal-500)", fontWeight: 700 }}>Optimal Range</div>
      </div>
    </Card>
  );
}

function ApptRow({ a }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16,
      background: "var(--surface-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar name={a.name} size="md" />
        <div>
          <div style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>{a.name}</div>
          <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>{a.reason} • {a.time}</div>
        </div>
      </div>
      <StatusPill variant={a.variant}>{a.status}</StatusPill>
    </div>
  );
}

function Dashboard({ onNavigate }) {
  const d = window.MK_DATA;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <div>
          <h1 className="mk-headline-lg">Welcome back, Eleanor</h1>
          <p className="mk-body-md" style={{ color: "var(--text-muted)", marginTop: 4 }}>Your clinical overview for today, October 24th.</p>
        </div>
        <HealthIndex />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }} className="mk-dashgrid">
        {/* Appointments */}
        <Card variant="tactile">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>event_available</span>Quick Appointments</h2>
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate("schedule");}} style={{ color: "var(--text-link)", fontWeight: 600, fontSize: 14 }}>View all</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {d.appointments.map((a, i) => <ApptRow key={i} a={a} />)}
          </div>
        </Card>

        {/* Teleconsult promo */}
        <Card variant="ink" style={{ display: "flex", flexDirection: "column", background: "linear-gradient(145deg, var(--mk-blue-700), var(--mk-blue-900))" }}>
          <h2 className="mk-headline-md" style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>videocam</span>Teleconsult</h2>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "16px 0" }}>
            <p style={{ color: "var(--mk-blue-100)", marginBottom: 8, fontSize: 14 }}>Next virtual call in 14 mins</p>
            <p className="mk-headline-md" style={{ color: "#fff", fontWeight: 700, marginBottom: 24 }}>Sarah Montgomery</p>
            <Button block size="lg" icon="play_circle" className="mk-float" onClick={() => onNavigate("teleconsult")}>Start Consultation</Button>
          </div>
          <p style={{ color: "rgba(210,228,255,0.6)", fontSize: 12, textAlign: "center", marginTop: 8 }}>Secure encrypted connection active</p>
        </Card>

        {/* Records preview */}
        <Card variant="tactile">
          <h2 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>folder_open</span>Recent Records</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {d.records.map((r, i) => (
              <a key={i} href="#" onClick={(e)=>{e.preventDefault();onNavigate("records");}} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: "var(--radius-sm)", textDecoration: "none" }} className="mk-hover-row">
                <span className="material-symbols-outlined" style={{ color: "var(--text-subtle)" }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-body)" }}>{r.title}</div>
                  <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>{r.date} • {r.src}</div>
                </div>
              </a>
            ))}
          </div>
          <Button variant="outline" block style={{ marginTop: 16 }} onClick={() => onNavigate("records")}>Access Vault</Button>
        </Card>

        {/* Medications */}
        <Card variant="tactile">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>medication</span>Current Medications</h2>
            <StatusPill variant="info">3 Active</StatusPill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {d.meds.map((m, i) => (
              <div key={i} style={{ padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>
                <div style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>{m.name}</div>
                <div className="mk-caption" style={{ color: "var(--text-subtle)", marginBottom: 16 }}>{m.schedule}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.refillTone === "success" ? "var(--mk-green)" : "var(--text-subtle)" }}>{m.refill}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

window.MK_Dashboard = Dashboard;
