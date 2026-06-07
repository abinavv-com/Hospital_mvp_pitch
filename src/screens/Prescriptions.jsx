import React, { useState } from "react";
import { Card } from "../components/display/Card";
import { Button } from "../components/buttons/Button";
import { IconButton } from "../components/buttons/IconButton";
import { StatCard } from "../components/display/StatCard";
import { Avatar } from "../components/display/Avatar";
import { StatusPill } from "../components/display/StatusPill";
import { Tabs } from "../components/navigation/Tabs";
import { Input } from "../components/forms/Input";
import { Select } from "../components/forms/Select";
import { Checkbox } from "../components/forms/Checkbox";
import { PageHead } from "./Shell";
import { MK_DATA } from "../data.js";

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

function NewRxDrawer({ open, onClose, onAddPrescription }) {
  const [drug, setDrug] = useState("");
  const [form, setForm] = useState("20mg Oral Tablet");
  const [sig, setSig] = useState("");
  const [qty, setQty] = useState("30");
  const [refills, setRefills] = useState("3");

  const handleSubmit = () => {
    if (!drug || !sig) {
      alert("Please fill in the Drug Name and Instructions (SIG)!");
      return;
    }
    
    const newRx = {
      name: "Montgomery, Sarah L.",
      id: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
      age: 68,
      drug: drug,
      form: form,
      sig: sig,
      qty: `Qty ${qty} · ${refills} Refills`,
      status: "Active",
      variant: "info",
      date: `Prescribed ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    };

    onAddPrescription(newRx);
    
    // reset form
    setDrug("");
    setSig("");
    setQty("30");
    setRefills("3");
    onClose();
  };

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
            <p style={{ color: "var(--text-muted)" }}>Initialize a new digital medication order for Sarah Montgomery.</p>
          </div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </div>
        <div className="mk-scroll" style={{ flex: 1, overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 28 }}>
          <Input label="Patient search" icon="person_search" placeholder="Sarah Montgomery" disabled value="Sarah Montgomery" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="Drug name" placeholder="e.g. Lisinopril" value={drug} onChange={(e) => setDrug(e.target.value)} />
            <Select label="Strength / Form" placeholder="Select Form..." value={form} onChange={setForm} options={["5mg Tablet", "10mg Tablet", "20mg Tablet", "500mg Capsule", "250mg Oral Liquid"]} />
          </div>
          <div className="mk-field" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="mk-field__label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-strong)" }}>Instructions (SIG)</label>
            <textarea rows="3" placeholder="e.g. Take one tablet by mouth once daily in the morning."
              value={sig} onChange={(e) => setSig(e.target.value)}
              style={{ width: "100%", padding: 16, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-body)",
                background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", outline: "none", resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "end" }}>
            <Input label="Quantity" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
            <Input label="Refills" type="number" value={refills} onChange={(e) => setRefills(e.target.value)} />
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
          <Button icon="send" style={{ flex: 2 }} onClick={handleSubmit}>Transmit to Pharmacy</Button>
        </div>
      </div>
    </div>
  );
}

export function Prescriptions({ 
  prescriptions = [], 
  onAddPrescription,
  carePlan,
  onUpdateCarePlan
}) {
  const d = MK_DATA;
  const [activeTab, setActiveTab] = useState("AI Care Plan"); // "AI Care Plan" or "E-Prescriptions"
  const [tabFilter, setTabFilter] = useState("All");
  const [openDrawer, setOpenDrawer] = useState(false);

  // Care Plan Form State
  const [diagnosis, setDiagnosis] = useState(carePlan?.diagnosis || "");
  const [suggestions, setSuggestions] = useState(carePlan?.suggestions || "");
  const [aiPrompt, setAiPrompt] = useState(carePlan?.aiPrompt || "");
  const [deployedMsg, setDeployedMsg] = useState("");

  const activePrescriptions = prescriptions.length > 0 ? prescriptions : d.prescriptions;
  const list = activePrescriptions.filter((p) =>
    tabFilter === "All" ? true : tabFilter === "Active" ? !p.done : p.done);
  
  const handleDeployCarePlan = (e) => {
    e.preventDefault();
    onUpdateCarePlan({
      diagnosis,
      suggestions,
      aiPrompt
    });
    setDeployedMsg("✅ AI prompt and care plan suggestions deployed successfully!");
    setTimeout(() => setDeployedMsg(""), 3000);
  };

  return (
    <>
      <PageHead
        title="AI Care Plan & Pharmacy Vault"
        subtitle="Deploy diagnosis boundaries, lifestyle suggestions, and custom prompts to the patient-facing AI."
        actions={
          <>
            <Button variant={activeTab === "AI Care Plan" ? "primary" : "outline"} onClick={() => setActiveTab("AI Care Plan")} icon="auto_awesome">AI Prompt & Care Plan</Button>
            <Button variant={activeTab === "E-Prescriptions" ? "primary" : "outline"} onClick={() => setActiveTab("E-Prescriptions")} icon="medication">E-Prescriptions List</Button>
          </>
        }
      />

      {activeTab === "AI Care Plan" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }} className="mk-dashgrid mk-page-in">
          {/* Main Plan Form */}
          <Card variant="tactile">
            <h2 className="mk-headline-md" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>edit_note</span>
              Active AI Prompt & Parameters Editor
            </h2>
            <form onSubmit={handleDeployCarePlan} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-blue-700)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Patient Diagnosis</label>
                <input 
                  type="text" 
                  value={diagnosis} 
                  onChange={(e) => setDiagnosis(e.target.value)}
                  style={{ padding: 12, border: "1px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, outline: "none", background: "var(--surface-sunken)", color: "var(--text-body)" }}
                  placeholder="e.g. Outpatient recovery for Hypertension"
                />
                <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>AI references this context when discussing medical queries.</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-blue-700)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Lifestyle & Diet Suggestions</label>
                <textarea 
                  rows="3"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  style={{ padding: 12, border: "1px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, outline: "none", background: "var(--surface-sunken)", color: "var(--text-body)", resize: "vertical" }}
                  placeholder="e.g. Avoid sodium, walk 15 mins daily..."
                />
                <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>Provides boundaries for the AI's lifestyle and diet planning suggestions.</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-blue-700)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Custom AI Prompt (Doubt-Boundary prompt)</label>
                <textarea 
                  rows="4"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  style={{ padding: 12, border: "1px solid var(--border-subtle)", borderRadius: 8, fontSize: 14, outline: "none", background: "var(--surface-sunken)", color: "var(--text-body)", resize: "vertical" }}
                  placeholder="e.g. Sarah has anxiety regarding heart rate. Reassure her that 65-80 is normal..."
                />
                <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>Write instructions directly. The patient AI operates strictly within these boundaries to reduce anxiety.</span>
              </div>

              {deployedMsg && <div style={{ color: "var(--mk-green)", fontWeight: 700, fontSize: 14 }}>{deployedMsg}</div>}

              <Button type="submit" icon="cloud_sync" block size="lg" className="mk-float">Deploy Prompt to Patient AI</Button>
            </form>
          </Card>

          {/* Current Summary Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Card variant="ink" style={{ background: "linear-gradient(135deg, var(--mk-blue-800), var(--mk-blue-900))" }}>
              <div style={{ fontSize: 12, color: "var(--mk-teal-300)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Deployed Care Summary</div>
              <h3 className="mk-headline-md" style={{ color: "#fff", marginBottom: 12 }}>Sarah Montgomery</h3>
              <div style={{ fontSize: 13, color: "var(--mk-blue-100)", lineHeight: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div><strong>Diagnosis Limit:</strong> {carePlan?.diagnosis || "Not set"}</div>
                <div><strong>Diet Limits:</strong> {carePlan?.suggestions || "Not set"}</div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 10 }}>
                  <strong>Prompt Override:</strong> <span style={{ fontStyle: "italic", fontSize: 12 }}>"{carePlan?.aiPrompt || "None"}"</span>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--mk-blue-700)", marginBottom: 12 }}>AI Bounds Checklist</h3>
              <ul style={{ fontSize: 12, color: "var(--text-muted)", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8, lineHeight: "18px" }}>
                <li>✅ Bound to diagnosis context</li>
                <li>✅ Limits diet planning to suggestions</li>
                <li>✅ Safety-flag triggers active</li>
                <li>✅ Outbound telephone reminder sync</li>
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        <div className="mk-page-in">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 24, marginBottom: 40 }} className="mk-stat3">
            <StatCard label="Refills Pending Approval" value="14" trend="4% from last week" trendDir="down" icon="assignment_turned_in" interactive />
            <StatCard label="Active Scripts" value={activePrescriptions.filter(p => !p.done).length.toString()} tone="teal" interactive />
            <StatCard label="Pharmacy Delays" value="00" tone="red" interactive />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 className="mk-headline-md">Recent Medication Orders</h2>
            <div style={{ display: "flex", gap: 16 }}>
              <Tabs tabs={["All", "Active", "Completed"]} value={tabFilter} onChange={setTabFilter} />
              <Button icon="add" className="mk-float" onClick={() => setOpenDrawer(true)}>New Prescription</Button>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {list.map((p) => <RxCard key={p.id} p={p} />)}
          </div>
          
          <NewRxDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} onAddPrescription={onAddPrescription} />
        </div>
      )}
    </>
  );
}
export default Prescriptions;
