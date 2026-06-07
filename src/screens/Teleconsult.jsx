import React, { useState } from "react";
import { Card } from "../components/display/Card";
import { Button } from "../components/buttons/Button";
import { IconButton } from "../components/buttons/IconButton";
import { Avatar } from "../components/display/Avatar";
import { StatusPill } from "../components/display/StatusPill";
import { PageHead } from "./Shell";
import { MK_DATA } from "../data.js";

function VideoHero({ joined, onJoin, patientName = "Sarah Montgomery", timeText = "10:30 AM (In 4 mins)" }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "var(--radius-2xl)",
      overflow: "hidden", boxShadow: "var(--shadow-xl)",
      background: "radial-gradient(circle at 25% 20%, rgba(0,139,139,0.45), transparent 45%), linear-gradient(160deg, var(--mk-blue-700), var(--mk-blue-900))" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32,
        background: "var(--scrim-video)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="mk-glass-dark" style={{ padding: "8px 16px", borderRadius: 999, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--mk-green)" }} className="mk-pulse-dot" />
            <span className="mk-eyebrow" style={{ color: "#fff", fontSize: 12 }}>{joined ? "Connected · 00:14" : "Live: Connection Ready"}</span>
          </div>
          <IconButton icon="more_vert" variant="glass" label="More" />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div className="mk-glass-dark" style={{ padding: 24, borderRadius: "var(--radius-xl)", borderLeft: "4px solid var(--mk-teal-500)", maxWidth: 460, flex: 1 }}>
            <div className="mk-eyebrow" style={{ color: "var(--mk-teal-200)", marginBottom: 6 }}>Upcoming Consultation</div>
            <h2 className="mk-headline-md" style={{ color: "#fff", marginBottom: 12 }}>Patient: {patientName}</h2>
            <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-300)", fontSize: 18 }}>schedule</span>{timeText}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-300)", fontSize: 18 }}>clinical_notes</span>Routine Follow-up</span>
            </div>
            <Button block size="lg" icon="videocam" className={joined ? "" : "mk-float"} variant={joined ? "danger" : "primary"} onClick={onJoin}>
              {joined ? "End Call" : "Join Video Call"}</Button>
          </div>
          {/* self preview */}
          <div className="mk-glass-dark mk-selfprev" style={{ width: 150, aspectRatio: "4/5", borderRadius: "var(--radius-lg)", border: "2px solid rgba(255,255,255,0.2)",
            position: "relative", display: "flex", alignItems: "flex-end", padding: 8,
            background: "linear-gradient(160deg, var(--mk-teal-700), var(--mk-blue-800))" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.5)", padding: "2px 8px", borderRadius: 6 }}>You</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechTile({ icon, label, value, tone }) {
  const bg = { green: "var(--status-success-bg)", blue: "var(--mk-blue-100)", teal: "var(--mk-teal-200)" }[tone];
  const fg = { green: "var(--mk-green)", blue: "var(--mk-blue-700)", teal: "var(--mk-teal-600)" }[tone];
  return (
    <Card variant="flat" interactive style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, borderRadius: "var(--radius-xl)" }}>
      <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <div className="mk-caption" style={{ color: "var(--text-muted)" }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{value}</div>
      </div>
    </Card>
  );
}

function QueueItem({ p }) {
  return (
    <Card variant="flat" interactive accent={p.up} style={{ padding: 16, borderRadius: "var(--radius-lg)",
      opacity: p.dim ? 0.6 : 1, position: "relative", overflow: "hidden",
      border: p.up ? "2px solid var(--mk-teal-500)" : "1px solid var(--border-subtle)" }}>
      {p.up && <div style={{ position: "absolute", top: 0, right: 0, background: "var(--mk-teal-500)", color: "#fff",
        fontSize: 10, fontWeight: 700, padding: "2px 12px", borderBottomLeftRadius: 8 }}>UP NEXT</div>}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar name={p.name} shape="rounded" size="md" />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
          <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>ID: #{p.id} • {p.reason}</div>
        </div>
      </div>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, background: "var(--surface-raised)", padding: "4px 8px", borderRadius: "var(--radius-sm)" }}>{p.dur ? `Est. ${p.dur}` : p.time}</span>
        {p.note
          ? <span style={{ color: "var(--mk-teal-500)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>bolt</span>{p.note}</span>
          : <span style={{ color: "var(--text-subtle)", fontSize: 12, fontStyle: p.dim ? "italic" : "normal" }}>{p.wait}</span>}
      </div>
    </Card>
  );
}

export function Teleconsult({ onNavigate, appointments = [] }) {
  const d = MK_DATA;
  const [joined, setJoined] = useState(false);
  
  const activeAppts = appointments.length > 0 ? appointments : d.appointments;
  const nextAppt = activeAppts.find(a => a.status === "Confirmed") || activeAppts[0] || { name: "Sarah Montgomery", time: "10:30 AM" };

  return (
    <>
      <PageHead
        title="Virtual Consultation Center"
        subtitle="Manage your remote patient care and video appointments."
        actions={
          <>
            <Button variant="tonal" icon="settings_suggest">Technical Check</Button>
            <Button icon="add" className="mk-float">New Consultation</Button>
          </>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }} className="mk-dashgrid">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <VideoHero 
            joined={joined} 
            onJoin={() => setJoined((v) => !v)} 
            patientName={nextAppt.name}
            timeText={`${nextAppt.time} (${nextAppt.status})`}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="mk-tech3">
            <TechTile icon="wifi" label="Network Status" value="Stable (45ms)" tone="green" />
            <TechTile icon="mic" label="Audio Source" value="Logitech Headset" tone="blue" />
            <TechTile icon="screen_share" label="Sharing Mode" value="Records View" tone="teal" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card variant="glass" style={{ background: "color-mix(in srgb, var(--mk-container-highest) 30%, transparent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 className="mk-headline-md">Waiting Queue</h3>
              <StatusPill variant="solid">3 Patients</StatusPill>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {d.queue.map((p) => <QueueItem key={p.id} p={p} />)}
            </div>
            <Button variant="ghost" block style={{ marginTop: 20, border: "2px dashed var(--border-subtle)" }} onClick={() => onNavigate("schedule")}>View Full Schedule</Button>
          </Card>
          <Card variant="ink" style={{ position: "relative", overflow: "hidden" }}>
            <h4 className="mk-eyebrow" style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>auto_awesome</span>Patient Context (AI)</h4>
            <p style={{ fontSize: 13, lineHeight: "20px", color: "var(--mk-blue-100)" }}>
              {nextAppt.name.includes("Sarah") 
                ? "Sarah reported increased morning headaches and blurred vision in yesterday's health-kit sync. BP logged at 155/95. Prioritize blood pressure medication review."
                : `Preparing intake files for ${nextAppt.name}. Primary reason for visit is listed as: ${nextAppt.reason}. Prior history matches outpatient plan.`
              }
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Teleconsult;
