/* App shell: top bar, left rail, mobile bottom bar + page frame.
   Reads design-system primitives off window.<Namespace>. */
const { Button, IconButton, NavItem, Avatar, StatusPill, Badge } = window.MedKonectDesignSystem_4460c8;

const NAV = [
  { key: "dashboard",    label: "Overview",        icon: "dashboard" },
  { key: "schedule",     label: "Appointments",    icon: "calendar_today" },
  { key: "records",      label: "Medical Records", icon: "folder_shared" },
  { key: "prescriptions",label: "E-Prescriptions", icon: "medication" },
  { key: "teleconsult",  label: "Teleconsult",     icon: "videocam" },
  { key: "analytics",    label: "Analytics",       icon: "monitoring" },
];
const TOP = [
  { key: "dashboard", label: "Dashboard" },
  { key: "records", label: "Patients" },
  { key: "schedule", label: "Schedule" },
  { key: "prescriptions", label: "Pharmacy" },
];

function TopBar({ active, onNavigate }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, height: 64, display: "flex",
      alignItems: "center", justifyContent: "space-between", padding: "0 32px",
      background: "var(--glass-nav-bg)", backdropFilter: "var(--glass-blur-strong)",
      WebkitBackdropFilter: "var(--glass-blur-strong)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <img src="../../assets/medkonect-logo.svg" alt="MedKonect" style={{ height: 30 }} />
        <nav style={{ display: "flex", gap: 24 }} className="mk-topnav">
          {TOP.map((t) => {
            const on = t.key === active;
            return (
              <a key={t.key} href="#" onClick={(e) => { e.preventDefault(); onNavigate(t.key); }}
                style={{ fontSize: 14, fontWeight: on ? 700 : 500, letterSpacing: "0.02em",
                  color: on ? "var(--mk-teal-500)" : "var(--text-muted)",
                  paddingBottom: 4, borderBottom: on ? "2px solid var(--mk-teal-500)" : "2px solid transparent",
                  textDecoration: "none", transition: "color .2s" }}>{t.label}</a>
            );
          })}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="mk-topsearch" style={{ display: "flex", alignItems: "center", gap: 8,
          background: "var(--surface-variant)", borderRadius: 999, padding: "8px 16px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "var(--text-subtle)" }}>search</span>
          <input placeholder="Search records…" style={{ border: "none", background: "transparent",
            outline: "none", fontFamily: "var(--font-sans)", fontSize: 13, width: 150, color: "var(--text-body)" }} />
        </div>
        <Button variant="danger" size="sm" icon="emergency" className="mk-float">Emergency</Button>
        <IconButton icon="notifications" label="Notifications" />
        <IconButton icon="settings" label="Settings" />
        <Avatar name="Eleanor Smith" size="sm" ring status="online" />
      </div>
    </header>
  );
}

function SideNav({ active, onNavigate }) {
  const d = window.MK_DATA;
  return (
    <aside className="mk-side" style={{ width: 256, flex: "none", background: "var(--surface-sunken)",
      borderRight: "1px solid var(--border-subtle)", padding: 8, position: "sticky", top: 64,
      height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 16px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--mk-blue-700)" }}>{d.clinician.name.replace("Dr. ","Dr. ")}'s Portal</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{d.clinician.role}</div>
      </div>
      <div style={{ padding: "0 8px 16px" }}>
        <Button block icon="add_circle" variant="tonal" onClick={() => onNavigate("teleconsult")}>New Consultation</Button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV.map((n) => (
          <NavItem key={n.key} icon={n.icon} active={n.key === active} as="button"
            onClick={() => onNavigate(n.key)}>{n.label}</NavItem>
        ))}
      </nav>
      <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
        <NavItem icon="help" as="button">Help Center</NavItem>
        <NavItem icon="logout" as="button">Logout</NavItem>
      </div>
    </aside>
  );
}

function BottomBar({ active, onNavigate }) {
  const items = [
    { key: "dashboard", label: "Home", icon: "home" },
    { key: "records", label: "Records", icon: "medical_services" },
    { key: "teleconsult", label: "Consult", icon: "chat" },
    { key: "prescriptions", label: "E-Rx", icon: "medication" },
  ];
  return (
    <nav className="mk-bottom" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 50,
      display: "none", justifyContent: "space-around", alignItems: "center", padding: "8px 16px",
      background: "var(--surface-card)", borderTop: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)" }}>
      {items.map((i) => {
        const on = i.key === active;
        return (
          <button key={i.key} onClick={() => onNavigate(i.key)} style={{ border: "none", background: "none",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: on ? "var(--mk-teal-500)" : "var(--text-muted)", fontWeight: on ? 700 : 500 }}>
            <span className={"material-symbols-outlined" + (on ? " is-filled" : "")}>{i.icon}</span>
            <span style={{ fontSize: 10, fontFamily: "var(--font-sans)" }}>{i.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Shell({ active, onNavigate, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-app)" }} className="mk-page-in">
      <TopBar active={active} onNavigate={onNavigate} />
      <div style={{ display: "flex" }}>
        <SideNav active={active} onNavigate={onNavigate} />
        <main className="mk-main" style={{ flex: 1, padding: 32, paddingBottom: 96, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {children}
        </main>
      </div>
      <BottomBar active={active} onNavigate={onNavigate} />
    </div>
  );
}

/* Page header used across screens */
function PageHead({ eyebrow, title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
      <div>
        {eyebrow && <div className="mk-eyebrow" style={{ color: "var(--text-link)", marginBottom: 8 }}>{eyebrow}</div>}
        <h1 className="mk-headline-lg">{title}</h1>
        {subtitle && <p className="mk-body-md" style={{ color: "var(--text-muted)", marginTop: 4 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{actions}</div>}
    </div>
  );
}

Object.assign(window, { MK_Shell: Shell, MK_PageHead: PageHead });
