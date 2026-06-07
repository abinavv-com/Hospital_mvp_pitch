import React from "react";
import { Card } from "../components/display/Card";
import { Button } from "../components/buttons/Button";
import { Avatar } from "../components/display/Avatar";
import { StatusPill } from "../components/display/StatusPill";
import { Input } from "../components/forms/Input";
import { PageHead } from "./Shell";
import { MK_DATA } from "../data.js";

function Category({ icon, label, bg, fg }) {
  return (
    <Card variant="glass" interactive style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 24, textAlign: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span style={{ fontWeight: 700, fontSize: 14, color: "var(--mk-blue-700)" }}>{label}</span>
    </Card>
  );
}

function DocRow({ r }) {
  return (
    <Card variant="glass" interactive accent={false} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, borderRadius: "var(--radius-lg)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", background: "var(--surface-raised)", color: "var(--mk-blue-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined">{r.icon || "description"}</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "var(--mk-blue-700)" }}>{r.title}</div>
          <div className="mk-caption" style={{ color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>event</span>{r.date} • {r.src}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ textAlign: "right" }} className="mk-hide-sm">
          <StatusPill variant={r.variant || "success"}>{r.status}</StatusPill>
          <div className="mk-caption" style={{ color: "var(--text-subtle)", marginTop: 4 }}>Ref {r.ref || "#N/A"}</div>
        </div>
        <span className="material-symbols-outlined" style={{ color: "var(--text-subtle)" }}>chevron_right</span>
      </div>
    </Card>
  );
}

export function Records({ records = [] }) {
  const d = MK_DATA;
  const activeRecords = records.length > 0 ? records : d.records;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
        <div>
          <h1 className="mk-headline-lg">Medical Records Vault</h1>
          <p className="mk-body-lg" style={{ color: "var(--text-muted)", marginTop: 8, maxWidth: 460 }}>A secure, encrypted environment for patient diagnostic history and longitudinal wellness data.</p>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ width: 280 }}><Input icon="search" placeholder="Search records, dates, results…" /></div>
          <Button icon="cloud_upload" className="mk-float">Upload Record</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }} className="mk-cat4">
        <Category icon="bloodtype" label="Blood Work" bg="var(--mk-blue-100)" fg="var(--mk-blue-700)" />
        <Category icon="radiology" label="Radiology" bg="var(--mk-teal-200)" fg="var(--mk-teal-600)" />
        <Category icon="vaccines" label="Immunizations" bg="var(--mk-tertiary-fixed)" fg="var(--mk-tertiary)" />
        <Category icon="more_horiz" label="View All" bg="var(--surface-variant)" fg="var(--text-muted)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 40 }} className="mk-dashgrid">
        {/* Featured scan */}
        <div style={{ position: "relative", borderRadius: "var(--radius-2xl)", overflow: "hidden", minHeight: 360, display: "flex", alignItems: "flex-end",
          background: "radial-gradient(circle at 70% 20%, rgba(0,139,139,0.5), transparent 50%), linear-gradient(160deg, var(--mk-blue-800), #000)" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--mk-blue-900), transparent 70%)" }} />
          <div style={{ position: "relative", padding: 32 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <span style={{ background: "var(--mk-teal-500)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.06em" }}>Latest Scan</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Oct 12, 2023</span>
            </div>
            <h2 className="mk-headline-md" style={{ color: "#fff", marginBottom: 8 }}>High-Resolution Lumbar MRI</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 460, marginBottom: 24 }}>Full diagnostic sequence including T1/T2 weighted images. Radiologist summary indicates optimal structural alignment.</p>
            <div style={{ display: "flex", gap: 16 }}>
              <Button icon="visibility" style={{ background: "#fff", color: "var(--mk-blue-700)" }}>View Full Scan</Button>
              <IconBtnWhite />
            </div>
          </div>
        </div>
        {/* Quick summary */}
        <Card variant="glass" accent>
          <h3 className="mk-headline-md" style={{ marginBottom: 16 }}>Quick Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[["Blood Type", "A− Positive"], ["Chronic Conditions", "None Identified"], ["Last Full Panel", "Sept 2023"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>{k}</span>
                <span style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>{v}</span>
              </div>
            ))}
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
              <div className="mk-eyebrow" style={{ color: "var(--text-subtle)", marginBottom: 8 }}>Primary Practitioner</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name="Helena Vane" size="sm" />
                <span style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>Dr. Helena Vane</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <h3 className="mk-headline-md" style={{ marginBottom: 16 }}>Recent Documents & Check-in Logs</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {activeRecords.map((r, i) => <DocRow key={i} r={r} />)}
      </div>
    </>
  );
}

function IconBtnWhite() {
  return (
    <button style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "var(--radius-md)", padding: "0 16px", height: 44, cursor: "pointer", backdropFilter: "blur(8px)" }}>
      <span className="material-symbols-outlined">download</span>
    </button>
  );
}

export default Records;
