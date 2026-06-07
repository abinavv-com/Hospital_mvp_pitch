import React from "react";
import { Card } from "../components/display/Card";
import { Button } from "../components/buttons/Button";
import { Avatar } from "../components/display/Avatar";
import { StatusPill } from "../components/display/StatusPill";
import { PageHead } from "./Shell";
import { MK_DATA } from "../data.js";

function HealthIndex({ score = 82 }) {
  const r = 28, c = 2 * Math.PI * r, off = c * (1 - score / 100);
  return (
    <Card variant="tactile" style={{ display: "flex", alignItems: "center", gap: 20, minWidth: 260, padding: 18 }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--mk-container-high)" strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--mk-teal-500)" strokeWidth="6"
            strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 14 }}>{score}%</span>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-subtle)" }}>Patient Adherence</div>
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
      <StatusPill variant={a.variant || "success"}>{a.status}</StatusPill>
    </div>
  );
}

export function Dashboard({ 
  onNavigate, 
  appointments = [], 
  records = [], 
  meds = [],
  symptomLogs = [] 
}) {
  const d = MK_DATA;
  const activeAppts = appointments.length > 0 ? appointments : d.appointments;
  const activeRecords = records.length > 0 ? records : d.records;
  const activeMeds = meds.length > 0 ? meds : d.meds;
  
  // Find critical alerts in symptom logs
  const alarmLogs = symptomLogs.filter(log => log.status === "Critical" || log.status === "Nurse Triage Dialed");
  const warnLogs = symptomLogs.filter(log => log.status === "HCP Review Needed" || log.status === "Active Flag");

  const nextAppt = activeAppts.find(a => a.status === "Confirmed") || activeAppts[0] || { name: "Sarah Montgomery", time: "10:30 AM" };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <div>
          <h1 className="mk-headline-lg">Welcome back, Dr. Smith</h1>
          <p className="mk-body-md" style={{ color: "var(--text-muted)", marginTop: 4 }}>MedKonect Clinician Care Dashboard. Live AI-sync active.</p>
        </div>
        <HealthIndex score={alarmLogs.length > 0 ? 74 : warnLogs.length > 0 ? 80 : 88} />
      </div>

      {/* SYMPTOM TRACKER & ALERTS CENTER */}
      <div style={{ marginBottom: 32 }}>
        <Card variant="glass" style={{ border: symptomLogs.length > 0 ? "1px solid var(--mk-teal-300)" : "1px solid var(--border-subtle)", background: "rgba(0,139,139,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>track_changes</span>
              Symptom Alarm & Triage Center
            </h3>
            <StatusPill variant={symptomLogs.length > 0 ? "danger" : "success"}>
              {symptomLogs.length} Active Logs
            </StatusPill>
          </div>

          {symptomLogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)" }}>
              No symptom flags raised. All recovery loops operating within normal parameters.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {symptomLogs.map((log) => {
                const isCritical = log.status === "Nurse Triage Dialed" || log.status === "Critical" || log.symptom.includes("Emergency") || log.symptom.toLowerCase().includes("chest");
                const isWarning = log.status === "HCP Review Needed" || log.symptom.includes("Dose") || log.symptom.toLowerCase().includes("double");
                
                return (
                  <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16,
                    background: "var(--surface-card)", borderRadius: "var(--radius-md)", 
                    borderLeft: isCritical ? "4px solid var(--mk-red)" : isWarning ? "4px solid var(--mk-amber)" : "4px solid var(--mk-teal-500)",
                    borderTop: "1.5px solid var(--border-subtle)", borderRight: "1.5px solid var(--border-subtle)", borderBottom: "1.5px solid var(--border-subtle)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", 
                        background: isCritical ? "var(--mk-error-container)" : isWarning ? "rgba(184,130,23,0.1)" : "var(--mk-teal-200)",
                        color: isCritical ? "var(--mk-error-on)" : isWarning ? "var(--mk-amber)" : "var(--mk-teal-600)",
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined">{isCritical ? "emergency" : isWarning ? "warning" : "medical_services"}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--mk-blue-700)", display: "flex", alignItems: "center", gap: 8 }}>
                          {log.name} 
                          <span style={{ fontSize: 11, fontWeight: 500, background: "var(--surface-sunken)", padding: "2px 8px", borderRadius: 4, color: "var(--text-subtle)" }}>{log.time}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                          Symptom Raised: <strong style={{ color: "var(--text-strong)" }}>{log.symptom}</strong> • Ref: {log.ref || `#LOG-${log.id}`}
                        </div>
                        {log.notes && <div style={{ fontSize: 12, color: "var(--text-subtle)", fontStyle: "italic", marginTop: 2 }}>Notes: {log.notes}</div>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button variant="tonal" size="sm" icon="auto_awesome" onClick={() => onNavigate("prescriptions")}>Give AI Prompt</Button>
                      <Button variant="primary" size="sm" icon="videocam" onClick={() => onNavigate("teleconsult")}>Contact Patient</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
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
            {activeAppts.slice(0, 3).map((a, i) => <ApptRow key={i} a={a} />)}
          </div>
        </Card>

        {/* Teleconsult promo */}
        <Card variant="ink" style={{ display: "flex", flexDirection: "column", background: "linear-gradient(145deg, var(--mk-blue-700), var(--mk-blue-900))" }}>
          <h2 className="mk-headline-md" style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>videocam</span>Teleconsult</h2>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "16px 0" }}>
            <p style={{ color: "var(--mk-blue-100)", marginBottom: 8, fontSize: 14 }}>Next virtual call in 14 mins</p>
            <p className="mk-headline-md" style={{ color: "#fff", fontWeight: 700, marginBottom: 24 }}>{nextAppt.name}</p>
            <Button block size="lg" icon="play_circle" className="mk-float" onClick={() => onNavigate("teleconsult")}>Start Consultation</Button>
          </div>
          <p style={{ color: "rgba(210,228,255,0.6)", fontSize: 12, textAlign: "center", marginTop: 8 }}>Secure encrypted connection active</p>
        </Card>

        {/* Records preview */}
        <Card variant="tactile">
          <h2 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>folder_open</span>Adherence Telemetry Logs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {activeRecords.map((r, i) => (
              <a key={i} href="#" onClick={(e)=>{e.preventDefault();onNavigate("records");}} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: "var(--radius-sm)", textDecoration: "none" }} className="mk-hover-row">
                <span className="material-symbols-outlined" style={{ color: "var(--text-subtle)" }}>{r.icon || "description"}</span>
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
            <StatusPill variant="info">{activeMeds.length} Active</StatusPill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {activeMeds.map((m, i) => (
              <div key={i} style={{ padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>
                <div style={{ fontWeight: 700, color: "var(--mk-blue-700)" }}>{m.name}</div>
                <div className="mk-caption" style={{ color: "var(--text-subtle)", marginBottom: 16 }}>{m.schedule}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.refillTone === "success" ? "var(--mk-green)" : "var(--text-subtle)" }}>{m.refill || "Active"}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
export default Dashboard;
