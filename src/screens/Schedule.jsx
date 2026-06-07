import React, { useState } from "react";
import { Card } from "../components/display/Card";
import { Button } from "../components/buttons/Button";
import { Avatar } from "../components/display/Avatar";
import { StatusPill } from "../components/display/StatusPill";
import { Tabs } from "../components/navigation/Tabs";
import { PageHead } from "./Shell";
import { MK_DATA } from "../data.js";

const CAL = (() => {
  const cells = [];
  // Muted October days
  for (let i = 29; i <= 31; i++) cells.push({ n: i, muted: true });
  // November days
  for (let i = 1; i <= 18; i++) cells.push({ n: i });
  return cells;
})();

const BASE_EVENTS = {
  1: [{ t: "9:00 Sarah J.", tone: "info" }, { t: "2:30 Mark T.", tone: "tertiary" }],
  3: [{ t: "Surgery", tone: "danger" }],
  6: [{ t: "3 Ongoing Appts", tone: "solid" }],
};

function DayCell({ c, today, dayEvents = [] }) {
  return (
    <div style={{ minHeight: 110, padding: 8, borderRadius: "var(--radius-sm)",
      border: today ? "2px solid var(--mk-teal-500)" : "1px solid var(--border-subtle)",
      background: today ? "color-mix(in srgb, var(--mk-teal-500) 6%, transparent)" : c.muted ? "var(--surface-sunken)" : "transparent",
      opacity: c.muted ? 0.4 : 1, cursor: "pointer", transition: "border-color .2s, box-shadow .2s" }}
      className="mk-daycell">
      <span style={{ fontSize: 14, fontWeight: 700, color: today ? "var(--mk-teal-500)" : "var(--text-body)" }}>{c.n}{today ? " ·" : ""}</span>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
        {dayEvents.map((e, i) => {
          const map = {
            info: ["var(--mk-teal-200)", "var(--mk-teal-600)"],
            tertiary: ["var(--mk-tertiary-fixed)", "var(--mk-tertiary)"],
            danger: ["var(--mk-error-container)", "var(--mk-error-on)"],
            solid: ["var(--mk-teal-500)", "#fff"],
          }[e.tone || "info"];
          return <div key={i} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
            background: map[0], color: map[1], overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} title={e.t}>{e.t}</div>;
        })}
      </div>
    </div>
  );
}

function UpcomingItem({ a, onNavigate }) {
  return (
    <Card variant="flat" interactive style={{ padding: 16, borderRadius: "var(--radius-md)" }} onClick={() => onNavigate("teleconsult")}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={a.name} size="md" />
          <div>
            <div style={{ fontWeight: 700 }}>{a.name}</div>
            <div className="mk-caption" style={{ color: "var(--text-subtle)" }}>{a.reason}</div>
          </div>
        </div>
        <StatusPill variant={a.variant === "success" ? "info" : "neutral"}>{a.time}</StatusPill>
      </div>
      <div style={{ display: "flex", gap: 16, color: "var(--text-muted)", fontSize: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>history</span>15 min</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 18 }}>videocam</span>Remote</span>
      </div>
    </Card>
  );
}

export function Schedule({ onNavigate, appointments = [], onAddAppointment }) {
  const d = MK_DATA;
  const [view, setView] = useState("Month");
  
  const activeAppts = appointments.length > 0 ? appointments : d.appointments;

  // Build dynamic events map based on active appointments
  const events = { ...BASE_EVENTS };
  
  activeAppts.forEach(appt => {
    // Attempt to parse day if formatted as "Nov X" or "2026-11-X"
    let dayNum = 6; // default to today
    if (appt.date) {
      const parts = appt.date.split("-");
      const last = parts[parts.length - 1];
      const parsed = parseInt(last, 10);
      if (!isNaN(parsed)) dayNum = parsed;
    }
    
    // Add event
    const shortName = appt.name.split(" ")[0] + " " + (appt.name.split(" ")[1] ? appt.name.split(" ")[1][0] + "." : "");
    const eventText = `${appt.time} ${shortName}`;
    if (!events[dayNum]) {
      events[dayNum] = [];
    }
    // Avoid duplicates
    if (!events[dayNum].some(ev => ev.t === eventText)) {
      events[dayNum].push({ t: eventText, tone: appt.variant === "success" ? "info" : "tertiary" });
    }
  });

  return (
    <>
      <PageHead
        eyebrow="Clinical Calendar"
        title="Schedule Management"
        subtitle="Manage consultations and patient availability for November 2023."
        actions={
          <>
            <Button variant="outline" icon="print">Export Daily PDF</Button>
            <Button icon="add_circle" className="mk-float" onClick={() => onAddAppointment && onAddAppointment()}>Schedule New</Button>
          </>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }} className="mk-dashgrid">
        <Card variant="glass">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 className="mk-headline-md">November 2023</h2>
            <Tabs variant="segmented" tabs={["Day", "Week", "Month"]} value={view} onChange={setView} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginBottom: 8 }}>
            {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((d2) => (
              <div key={d2} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", paddingBottom: 8 }}>{d2}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
            {CAL.map((c, i) => {
              const isToday = c.n === 6 && !c.muted;
              return (
                <DayCell 
                  key={i} 
                  c={c} 
                  today={isToday} 
                  dayEvents={c.muted ? [] : events[c.n]} 
                />
              );
            })}
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card variant="glass">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 className="mk-headline-md">Upcoming</h2>
              <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: "var(--text-link)", fontWeight: 600, fontSize: 14 }}>View all</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {activeAppts.map((a, i) => <UpcomingItem key={i} a={a} onNavigate={onNavigate} />)}
            </div>
          </Card>
          <Card variant="ink" style={{ position: "relative", overflow: "hidden" }}>
            <div className="mk-eyebrow" style={{ color: "var(--mk-blue-100)", opacity: 0.8, marginBottom: 4 }}>Today's Capacity</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>84% Full</div>
            <div style={{ marginTop: 16, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "84%", background: "var(--mk-teal-200)" }} />
            </div>
            <p style={{ fontSize: 12, marginTop: 12, color: "var(--mk-blue-100)", opacity: 0.7 }}>2 emergency slots available in the afternoon.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Schedule;
