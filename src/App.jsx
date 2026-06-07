import React, { useState, useEffect } from "react";
import "./index.css";
import "./styles/styles.css"; // Design system variables & base

// Import Refactored Screens
import { Shell } from "./screens/Shell";
import { Dashboard } from "./screens/Dashboard";
import { Teleconsult } from "./screens/Teleconsult";
import { Records } from "./screens/Records";
import { Prescriptions } from "./screens/Prescriptions";
import { Schedule } from "./screens/Schedule";

// Import Patient Simulator
import { PatientSimulator } from "./components/PatientSimulator";

// Import Mock Initial Data
import { MK_DATA, MK_PATHWAYS } from "./data.js";

// Import Primitives
import { Card } from "./components/display/Card";
import { Button } from "./components/buttons/Button";
import { StatusPill } from "./components/display/StatusPill";
import { Select } from "./components/forms/Select";

// Assets
import logoImg from "./assets/medkonect-logo.svg";
import whiteLogoImg from "./assets/medkonect-logo-white.svg";

function App() {
  // Navigation at the landing page level: "pitch", "demo", "portal-only"
  const [activePage, setActivePage] = useState("pitch");
  
  // Shared database mock states & Active Pathway State
  const [activePathwayId, setActivePathwayId] = useState("chronic");
  const [medications, setMedications] = useState(MK_PATHWAYS.chronic.meds);
  const [prescriptions, setPrescriptions] = useState(MK_DATA.prescriptions);
  const [appointments, setAppointments] = useState([
    { name: "Sarah Montgomery", reason: "Routine Checkup", time: "10:30 AM", status: "Confirmed", variant: "success" },
    ...MK_DATA.appointments
  ]);
  const [records, setRecords] = useState(MK_PATHWAYS.chronic.records);

  // Core Goal: AI Context Bounded by Doctor Care Plan
  const [activeCarePlan, setActiveCarePlan] = useState({
    diagnosis: MK_PATHWAYS.chronic.diagnosis,
    suggestions: MK_PATHWAYS.chronic.suggestions,
    aiPrompt: MK_PATHWAYS.chronic.aiPrompt,
    medications: MK_PATHWAYS.chronic.meds
  });

  // Core Goal: Patient Symptom Log tracking
  const [symptomLogs, setSymptomLogs] = useState([
    { id: 1, name: "Sarah Montgomery", symptom: "Joint Stiffness", time: "Yesterday, 04:15 PM", status: "Resolved", notes: "Patient reported stiffness. Reassured and advised stretches." }
  ]);

  // Pathway switcher handler that updates all states in closed-loop sync
  const handlePathwayChange = (pathwayId) => {
    setActivePathwayId(pathwayId);
    const pData = MK_PATHWAYS[pathwayId];
    
    setMedications(pData.meds);
    setActiveCarePlan({
      diagnosis: pData.diagnosis,
      suggestions: pData.suggestions,
      aiPrompt: pData.aiPrompt,
      medications: pData.meds
    });
    
    // Auto-update appointments to show this patient at the top of the schedule
    const updatedAppts = [
      { name: pData.patientName, reason: "Care Plan Setup", time: "10:30 AM", status: "Confirmed", variant: "success" },
      ...MK_DATA.appointments.filter(a => a.name !== pData.patientName)
    ];
    setAppointments(updatedAppts);
    
    // Update EHR records dynamically
    setRecords(pData.records);
    
    // Update logs
    setSymptomLogs([
      { id: 1, name: pData.patientName, symptom: pData.symptomList[0], time: "Yesterday, 04:15 PM", status: "Resolved", notes: `Initial care plan check-in for ${pData.patientName}.` }
    ]);
  };

  // Clinician Portal current view selection
  const [portalView, setPortalView] = useState("dashboard");

  // Interactive FAQ state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // ROI Calculator state
  const [discharges, setDischarges] = useState(120);
  const [wardType, setWardType] = useState("chronic");

  // Interactive Anxiety Comparison state
  const [activeComparisonId, setActiveComparisonId] = useState("headache");

  const comparisonData = {
    cramping: {
      prompt: "I am 24 weeks pregnant and have mild cramping.",
      googleTitle: "Preterm Labor & Placental Abruption Warning",
      googleText: "Uterine cramping or lower abdominal pain at 24 weeks gestation is a high-risk symptom linked to preterm labor, placental abruption, or cervix incompetence. Seek immediate emergency care at the nearest hospital.",
      googleAnxiety: 95,
      medTitle: "Dr. Smith's Maternity Plan",
      medText: "Dr. Smith's care plan notes: 'Mild cramping or pulling sensations (round ligament pain) are common at 24 weeks. Rest on your left side and drink water. If pain is severe or accompanied by bleeding/fluid, seek immediate care.'",
      medAnxiety: 10
    },
    headache: {
      prompt: "I have a mild headache after taking Lisinopril.",
      googleTitle: "Lisinopril Side Effects: Stroke Warning",
      googleText: "Headaches after taking ACE inhibitors can be a precursor to a hemorrhagic stroke or a severe allergic reaction. Check for facial swelling and seek critical care.",
      googleAnxiety: 90,
      medTitle: "Dr. Smith's Recovery Context",
      medText: "Dr. Smith notes: 'Slight fatigue or mild headache is a normal temporary adaptation during the first 14 days on Lisinopril. Drink a glass of water, rest, and check again.' Logs reported to doctor.",
      medAnxiety: 10
    },
    skip: {
      prompt: "Can I skip my morning pill and take it tonight?",
      googleTitle: "Hypertensive Crisis: Missing Blood Doses",
      googleText: "Skipping Lisinopril doses can trigger rebound hypertension, hypertensive crisis, or sudden cardiac event. Never alter your schedule without a hospital visit.",
      googleAnxiety: 85,
      medTitle: "Dr. Smith's Recovery Context",
      medText: "AI Guardrail: I cannot advise altering medication schedules. Please take your pill exactly as written: '1 tablet daily in morning'. I have flagged a follow-up call with your doctor.",
      medAnxiety: 15
    }
  };

  // Sync medications list when a prescription is added by the Doctor
  const handleAddPrescription = (newRx) => {
    setPrescriptions(prev => [newRx, ...prev]);
    
    // Add to patient's active meds list
    const newMed = {
      name: `${newRx.drug} ${newRx.form.split(" ")[0]}`,
      schedule: newRx.sig,
      refill: newRx.qty.split("·")[1]?.trim() || "Active",
      refillTone: "muted"
    };
    
    setMedications(prev => [newMed, ...prev]);
    
    // Update Care Plan Medications
    setActiveCarePlan(prev => ({
      ...prev,
      medications: [newMed, ...prev.medications]
    }));

    // Append to logs
    handleAddLog({
      title: `💊 New Script Transmitted: ${newRx.drug}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      src: "Dr. Eleanor Smith",
      icon: "medication",
      status: "Sent to CVS #4921",
      variant: "success",
      ref: `#${newRx.id}`
    });
  };

  // Sync care plan edits made by Doctor
  const handleUpdateCarePlan = (newPlan) => {
    setActiveCarePlan(prev => ({
      ...prev,
      diagnosis: newPlan.diagnosis,
      suggestions: newPlan.suggestions,
      aiPrompt: newPlan.aiPrompt
    }));
  };

  // Sync symptom reported by patient simulator
  const handleReportSymptom = (newSymptom) => {
    const newId = symptomLogs.length + 1;
    const finalLog = {
      id: newId,
      name: newSymptom.name,
      symptom: newSymptom.symptom,
      time: newSymptom.time,
      status: newSymptom.status,
      notes: newSymptom.notes,
      ref: `#SYM-${Math.floor(10000 + Math.random() * 90000)}`
    };
    setSymptomLogs(prev => [finalLog, ...prev]);
  };

  const handleAddAppointment = (newAppt) => {
    setAppointments(prev => [newAppt, ...prev]);
  };

  const handleAddLog = (newLog) => {
    setRecords(prev => [newLog, ...prev]);
  };

  // Safe navigation scroll
  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Specs Sub-navigation Tab
  const [activeSpecTab, setActiveSpecTab] = useState("compliance");

  // Computed ROI Values
  const getRoiMultipliers = (type) => {
    switch(type) {
      case "maternity": return { hours: 5.0, savings: 180 };
      case "pediatric": return { hours: 6.0, savings: 210 };
      case "surgery":   return { hours: 3.5, savings: 240 };
      case "chronic":
      default:          return { hours: 4.5, savings: 150 };
    }
  };
  const multipliers = getRoiMultipliers(wardType);
  const nurseHoursSaved = Math.round(discharges * multipliers.hours);
  const readmissionCostReduced = Math.round(discharges * multipliers.savings * 12);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div style={{ background: "var(--surface-app)", minHeight: "100vh", fontFamily: "var(--font-sans)", display: "flex", flexDirection: "column" }}>
      
      {/* GLOBAL TOP NAVIGATION */}
      <header className="mk-global-header" style={{ position: "sticky", top: 0, zIndex: 100,
        height: 70, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)", boxShadow: "0 2px 8px rgba(0,48,87,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logoImg} alt="MedKonect" style={{ height: 32 }} />
          <span style={{ fontSize: 11, fontWeight: 700, background: "var(--mk-blue-100)", color: "var(--mk-blue-700)",
            padding: "2px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>PITCH MVP</span>
        </div>
        
        <nav style={{ display: "flex", gap: 32 }}>
          <button onClick={() => handleNavigate("pitch")} style={{ border: "none", background: "none", cursor: "pointer",
            fontSize: 14, fontWeight: activePage === "pitch" ? 700 : 500,
            color: activePage === "pitch" ? "var(--mk-teal-500)" : "var(--text-muted)" }}>
            Product Pitch & Specs
          </button>
          <button onClick={() => handleNavigate("demo")} style={{ border: "none", background: "none", cursor: "pointer",
            fontSize: 14, fontWeight: activePage === "demo" ? 700 : 500,
            color: activePage === "demo" ? "var(--mk-teal-500)" : "var(--text-muted)" }}>
            Interactive Demo (Closed Loop)
          </button>
          <button onClick={() => handleNavigate("portal-only")} style={{ border: "none", background: "none", cursor: "pointer",
            fontSize: 14, fontWeight: activePage === "portal-only" ? 700 : 500,
            color: activePage === "portal-only" ? "var(--mk-teal-500)" : "var(--text-muted)" }}>
            Clinician Portal Standalone
          </button>
        </nav>

        <div>
          <button onClick={() => handleNavigate("demo")} style={{ background: "var(--mk-blue-700)", color: "#fff",
            border: "none", padding: "10px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer",
            transition: "transform .2s", display: "flex", alignItems: "center", gap: 8 }} className="mk-btn--ink">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_circle</span>
            Launch Live Demo
          </button>
        </div>
      </header>

      {/* PITCH & SPEC LANDING PAGE */}
      {activePage === "pitch" && (
        <div className="mk-page-in" style={{ flex: 1 }}>
          
          {/* HERO SECTION */}
          <section style={{ background: "linear-gradient(180deg, var(--mk-blue-900) 0%, #001021 100%)",
            color: "#fff", padding: "100px 40px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            {/* Ambient gradients */}
            <div style={{ position: "absolute", top: "-50%", left: "-20%", width: "70%", height: "100%",
              background: "radial-gradient(circle, rgba(0,139,139,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-30%", right: "-10%", width: "60%", height: "90%",
              background: "radial-gradient(circle, rgba(166,201,248,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
            
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <div className="mk-eyebrow" style={{ color: "var(--mk-teal-300)", marginBottom: 16 }}>MEDKONECT COMPETITION SUBMISSION</div>
              <h1 style={{ fontSize: 50, fontWeight: 800, color: "#fff", lineHeight: "60px", letterSpacing: "-1.8px", marginBottom: 24 }}>
                The Reassuring Alternative to <br />
                <span style={{ color: "var(--mk-teal-300)" }}>Panic-Googling Care Concerns & Symptoms</span>
              </h1>
              <p style={{ fontSize: 18, color: "var(--mk-blue-100)", lineHeight: "28px", maxWidth: 760, margin: "0 auto 40px" }}>
                Empower chronic, pregnancy, pediatric, and post-surgery patients with secure, doctor-bounded care guidance. We bridge the information gap, reduce clinical anxiety, and ensure strict compliance without diagnosing or prescribing.
              </p>
              
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button onClick={() => handleNavigate("demo")} style={{ background: "var(--mk-teal-500)", color: "#fff",
                  border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer",
                  boxShadow: "var(--shadow-md)" }} className="mk-float">
                  Try Interactive Demo Sandbox
                </button>
                <a href="#comparison" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)",
                  padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                  View Anxiety Comparison
                </a>
              </div>
            </div>
          </section>

          {/* INTERACTIVE COMPARISON (PANIC-GOOGLING VS MEDKONECT) */}
          <section id="comparison" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Interactive Showcase</span>
              <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Google Search vs. MedKonect AI</h2>
              <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
                Select a common patient doubt below to see the contrast between raw open-web panic and doctor-bounded guidance.
              </p>
            </div>

            {/* Prompt Selector Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }} className="mk-flex-wrap">
              <button onClick={() => setActiveComparisonId("headache")}
                style={{ padding: "10px 20px", borderRadius: 8, fontWeight: 700, border: "1px solid var(--border-subtle)",
                  background: activeComparisonId === "headache" ? "var(--mk-blue-700)" : "var(--surface-card)",
                  color: activeComparisonId === "headache" ? "#fff" : "var(--text-body)", cursor: "pointer" }}>
                "Felt a mild headache after Lisinopril"
              </button>
              <button onClick={() => setActiveComparisonId("cramping")}
                style={{ padding: "10px 20px", borderRadius: 8, fontWeight: 700, border: "1px solid var(--border-subtle)",
                  background: activeComparisonId === "cramping" ? "var(--mk-blue-700)" : "var(--surface-card)",
                  color: activeComparisonId === "cramping" ? "#fff" : "var(--text-body)", cursor: "pointer" }}>
                "I am pregnant and have mild cramping"
              </button>
              <button onClick={() => setActiveComparisonId("skip")}
                style={{ padding: "10px 20px", borderRadius: 8, fontWeight: 700, border: "1px solid var(--border-subtle)",
                  background: activeComparisonId === "skip" ? "var(--mk-blue-700)" : "var(--surface-card)",
                  color: activeComparisonId === "skip" ? "#fff" : "var(--text-body)", cursor: "pointer" }}>
                "Can I skip my morning pill today?"
              </button>
            </div>

            {/* Side-by-Side Panel */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="mk-tech3">
              {/* Column 1: Google Panic */}
              <Card variant="sunken" className="mk-comparison-card--google mk-google-alert-pulse" style={{ border: "1.5px solid var(--mk-red)", padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ color: "var(--mk-red)" }}>search</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--mk-red)" }}>Open Web (Google Search)</span>
                  </div>
                  <StatusPill variant="danger">ANXIETY: {comparisonData[activeComparisonId].googleAnxiety}%</StatusPill>
                </div>
                
                {/* Gauge bar */}
                <div style={{ height: 6, background: "rgba(217,48,37,0.15)", borderRadius: 999, overflow: "hidden" }}>
                  <div className="mk-anxiety-bar-fill" style={{ height: "100%", width: `${comparisonData[activeComparisonId].googleAnxiety}%`, background: "var(--mk-red)", borderRadius: 999 }} />
                </div>

                <div style={{ background: "rgba(217,48,37,0.02)", padding: 20, borderRadius: 12, border: "1px solid rgba(217,48,37,0.15)" }}>
                  <h4 style={{ fontWeight: 700, color: "#93000a", fontSize: 15, marginBottom: 8, textDecoration: "underline" }}>
                    {comparisonData[activeComparisonId].googleTitle}
                  </h4>
                  <p style={{ fontSize: 13, lineHeight: "22px", color: "var(--text-muted)" }}>
                    {comparisonData[activeComparisonId].googleText}
                  </p>
                </div>
                
                <div style={{ fontSize: 12, color: "var(--mk-red)", fontStyle: "italic", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                  Unstructured information leads to alarmist self-diagnosis.
                </div>
              </Card>

              {/* Column 2: MedKonect Calm */}
              <Card variant="tactile" className="mk-comparison-card--medkonect mk-med-calm-pulse" style={{ border: "1.5px solid var(--mk-teal-500)", padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-500)" }}>auto_awesome</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--mk-teal-600)" }}>MedKonect Care Loop</span>
                  </div>
                  <StatusPill variant="success">ANXIETY: {comparisonData[activeComparisonId].medAnxiety}%</StatusPill>
                </div>
                
                {/* Gauge bar */}
                <div style={{ height: 6, background: "var(--status-success-bg)", borderRadius: 999, overflow: "hidden" }}>
                  <div className="mk-anxiety-bar-fill" style={{ height: "100%", width: `${comparisonData[activeComparisonId].medAnxiety}%`, background: "var(--mk-green)", borderRadius: 999 }} />
                </div>

                <div style={{ background: "rgba(0,139,139,0.02)", padding: 20, borderRadius: 12, border: "1px solid var(--mk-teal-200)" }}>
                  <h4 style={{ fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 15, marginBottom: 8 }}>
                    {comparisonData[activeComparisonId].medTitle}
                  </h4>
                  <p style={{ fontSize: 13, lineHeight: "22px", color: "var(--text-muted)" }}>
                    {comparisonData[activeComparisonId].medText}
                  </p>
                </div>

                <div style={{ fontSize: 12, color: "var(--mk-teal-600)", fontStyle: "italic", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                  Bounded clinical context provides calm, doctor-directed support.
                </div>
              </Card>
            </div>

          </section>

          {/* PROBLEM VS SOLUTION SECTION */}
          <section id="problem-solution" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>The Clinical Challenge</span>
              <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Anxiety Reduction & Safety</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="mk-tech3">
              <Card variant="sunken" style={{ padding: 32, borderLeft: "4px solid var(--mk-red)" }}>
                <h3 className="mk-headline-md" style={{ color: "var(--mk-red)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-outlined">heart_broken</span>The Continuous Care Friction
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 20, fontSize: 14, color: "var(--text-muted)", lineHeight: "22px" }}>
                  <li><strong>Clinical Anxiety:</strong> Chronic, maternity, pediatric, and post-surgery patients face high anxiety regarding symptoms, driving excessive calls, missed warning signs, or unnecessary emergency visits.</li>
                  <li><strong>Boundary Drift:</strong> Standard conversational AI models drift beyond safety boundaries when asked for guidance (e.g., dosing or diagnosis), introducing significant liability.</li>
                  <li><strong>Outpatient Adherence Gaps:</strong> Clinicians lack real-time visibility into medication adherence, physical therapy exercises, or infant feeding schedules once the patient leaves the clinic.</li>
                </ul>
              </Card>

              <Card variant="tactile" style={{ padding: 32, borderLeft: "4px solid var(--mk-teal-500)" }}>
                <h3 className="mk-headline-md" style={{ color: "var(--mk-teal-500)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="material-symbols-outlined">health_and_safety</span>The MedKonect Resolution
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 20, fontSize: 14, color: "var(--text-muted)", lineHeight: "22px" }}>
                  <li><strong>Doctor-Bounded Context:</strong> The AI chatbot resolves doubts strictly using pre-approved clinical parameters, diagnoses, and custom prompts deployed by the physician.</li>
                  <li><strong>Multidisciplinary Care Loops:</strong> Adapts safety engines and trackers dynamically to distinct pathways (Chronic, Pregnancy, Pediatric Newborns, Post-Op).</li>
                  <li><strong>Adherence Telemetry Vault:</strong> Synchronizes patient logs, automated compliance check-in calls, and schedules directly with provider EHR dashboards.</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* THREE PILLAR FEATURES */}
          <section id="features" style={{ padding: "80px 40px", background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Key Pillars</span>
                <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Core Patient-Facing Capabilities</h2>
                <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Three foundational pillars engineered for compliance, clinical alignment, and smooth patient interactions.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="mk-tech3">
                {/* Feature 1 */}
                <Card variant="tactile" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--mk-blue-100)", color: "var(--mk-blue-700)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>auto_awesome</span>
                  </div>
                  <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)" }}>Multidisciplinary AI Chat</h3>
                  <p className="mk-body-md" style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "22px" }}>
                    Resolves patient doubts dynamically based on their specific pathway (Chronic, Maternity, Pediatrics, Post-Op). Anchored to secure, doctor-approved care parameters to rule out medical liability.
                  </p>
                </Card>

                {/* Feature 2 */}
                <Card variant="tactile" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--mk-teal-200)", color: "var(--mk-teal-600)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>phone_in_talk</span>
                  </div>
                  <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)" }}>Automated Check-In Calls</h3>
                  <p className="mk-body-md" style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "22px" }}>
                    Triggers proactive, outbound care calls (via Vapi.ai API) to verify blood pressure logs, prenatal compliance, newborn wet diapers, or post-surgical pain levels.
                  </p>
                </Card>

                {/* Feature 3 */}
                <Card variant="tactile" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--mk-tertiary-fixed)", color: "var(--mk-tertiary)",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>calendar_today</span>
                  </div>
                  <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)" }}>Integrated Care Scheduler</h3>
                  <p className="mk-body-md" style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "22px" }}>
                    Automates booking for chronic reviews, maternity checkups, pediatric follow-ups, and post-surgery checks. Syncs with EHR doctor calendars with triage emergency overrides.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* FEATURE DEEP DIVE ILLUSTRATIVE ROW */}
          <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 48, alignItems: "center" }} className="mk-tech3">
              <div style={{ flex: 1.2 }}>
                <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Sync In Action</span>
                <h2 className="mk-headline-lg" style={{ marginTop: 8, marginBottom: 20 }}>Closed-Loop Recovery Care</h2>
                <p className="mk-body-md" style={{ color: "var(--text-muted)", lineHeight: "24px", marginBottom: 24 }}>
                  MedKonect is a unified database system. A change made inside the Clinician Portal (like adding a prescription, or rescheduling an appointment) instantly updates the patient simulator's active care plan and chatbot prompt parameters. 
                </p>
                <p className="mk-body-md" style={{ color: "var(--text-muted)", lineHeight: "24px", marginBottom: 24 }}>
                  Conversely, patient confirmations (confirming medication taken, reporting symptoms, booking calendar spots) immediately pipe back as live updates on the doctor's dashboard.
                </p>
                <button onClick={() => handleNavigate("demo")} style={{ background: "var(--mk-blue-700)", color: "#fff",
                  border: "none", padding: "12px 24px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>
                  Try Sandbox Simulation
                </button>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Card variant="glass" style={{ background: "linear-gradient(135deg, var(--mk-blue-900), #000)",
                  color: "#fff", padding: 32, borderRadius: 24, boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: 420 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--mk-teal-300)", textTransform: "uppercase" }}>Telemetry Sync</div>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mk-green)" }} className="mk-pulse-dot" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>check_circle</span>
                      <span style={{ fontSize: 13, color: "#fff" }}>Jessica Davis logged kick count (10 kicks in 2h)</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>check_circle</span>
                      <span style={{ fontSize: 13, color: "#fff" }}>Emily Watson synced 6+ wet diapers for Baby Leo</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "var(--mk-teal-200)" }}>check_circle</span>
                      <span style={{ fontSize: 13, color: "#fff" }}>Michael Chen incision checklist cleared (clean/dry)</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "var(--mk-red)" }}>emergency</span>
                      <span style={{ fontSize: 13, color: "#fff" }}>Neonatal fever alarm: Pediatric triage nurse dialed</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* PITCH SPECS & COMPLIANCE DATA-FLOWS */}
          <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)", padding: "80px 40px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Specifications</span>
                <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Regulatory & System Architecture</h2>
                <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Deep technical and regulatory blueprints as defined in the product registry.</p>
              </div>

              {/* Specifications Sub-Nav */}
              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
                {[
                  { id: "compliance", label: "FDA & Regulatory Strategy" },
                  { id: "phi", label: "PHI HIPAA Data-Flow Map" },
                  { id: "safety", label: "Medication Refusal Matrix" },
                  { id: "security", label: "Security Isolation & Controls" }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveSpecTab(tab.id)}
                    style={{ border: "none", padding: "12px 24px", borderRadius: 999, fontWeight: 700,
                      cursor: "pointer", background: activeSpecTab === tab.id ? "var(--mk-blue-700)" : "var(--surface-card)",
                      color: activeSpecTab === tab.id ? "#fff" : "var(--text-muted)",
                      boxShadow: activeSpecTab === tab.id ? "var(--shadow-sm)" : "none",
                      transition: "all .2s" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Specs Content */}
              <Card variant="tactile" style={{ padding: 40 }}>
                {activeSpecTab === "compliance" && (
                  <div>
                    <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)", marginBottom: 16 }}>FDA Device Classification Strategy</h3>
                    <p className="mk-body-md" style={{ color: "var(--text-body)", marginBottom: 20, lineHeight: "24px" }}>
                      To prevent classifying the product as a regulated <strong>Software as a Medical Device (SaMD)</strong>, the assistant is strictly locked down as an <strong>exempt operational utility</strong>.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                      <div style={{ borderLeft: "3px solid var(--mk-teal-500)", paddingLeft: 16 }}>
                        <h4 style={{ fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 15, marginBottom: 8 }}>SaMD Exempt Activities</h4>
                        <ul style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: "20px", paddingLeft: 18 }}>
                          <li>Retrieves and repeats exact physician care-plan database records.</li>
                          <li>Translates schedule times (e.g. "take in morning" translates to "AM").</li>
                          <li>Confirms patient medication adherence logs.</li>
                        </ul>
                      </div>
                      <div style={{ borderLeft: "3px solid var(--mk-red)", paddingLeft: 16 }}>
                        <h4 style={{ fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 15, marginBottom: 8 }}>SaMD Regulated Violations (Refused)</h4>
                        <ul style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: "20px", paddingLeft: 18 }}>
                          <li>Recommending dosage changes or alterations.</li>
                          <li>Evaluating active symptoms to form diagnostic opinions.</li>
                          <li>Calculating dosing guidelines dynamically.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSpecTab === "phi" && (
                  <div>
                    <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)", marginBottom: 16 }}>End-to-End HIPAA Architecture</h3>
                    <p className="mk-body-md" style={{ color: "var(--text-body)", marginBottom: 24 }}>
                      All Protected Health Information (PHI) is encrypted at rest (AES-256) and transit (TLS 1.3), secured by strict Row-Level Security (RLS) policies.
                    </p>
                    
                    {/* Visual Flow diagram */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        { step: "1", title: "Clinician Portal to Database", text: "Dr. Eleanor Smith inputs Sarah's care plan. Transmitted via TLS 1.3, saved into Supabase RLS-secured DB." },
                        { step: "2", title: "Next.js Backend Verification", text: "App server retrieves medication data via query containing minimal-necessary parameters." },
                        { step: "3", title: "Voice Call Initiation (Vapi.ai)", text: "Dynamic API variables trigger proactive call. Operating under signed BAA with zero-day data retention." },
                        { step: "4", title: "Transcript Log Pipeline", text: "Patient's verbal adherence confirmation is logged in DB. Generates instant dashboard update." }
                      ].map((f, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", background: "var(--surface-sunken)",
                          padding: 16, borderRadius: 12, border: "1px solid var(--border-subtle)" }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--mk-blue-700)", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{f.step}</div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--mk-blue-700)" }}>{f.title}</div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{f.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSpecTab === "safety" && (
                  <div>
                    <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)", marginBottom: 16 }}>Escalation & Safety Refusal Matrix</h3>
                    <p className="mk-body-md" style={{ color: "var(--text-body)", marginBottom: 20 }}>
                      The AI Assistant incorporates absolute deterministic filters alongside LLM system prompts to handle high-risk inquiries instantly.
                    </p>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-subtle)", textAlign: "left" }}>
                          <th style={{ padding: "10px 8px", fontWeight: 700 }}>Category</th>
                          <th style={{ padding: "10px 8px", fontWeight: 700 }}>Trigger Keywords</th>
                          <th style={{ padding: "10px 8px", fontWeight: 700 }}>Immediate AI Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "12px 8px", fontWeight: 700, color: "var(--mk-blue-700)" }}>Dose Alteration</td>
                          <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}><code>stop, double, increase, halve, skip</code></td>
                          <td style={{ padding: "12px 8px", color: "var(--text-body)" }}>Soft refusal script + log dashboard flag.</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "12px 8px", fontWeight: 700, color: "var(--mk-red)" }}>Symptom / Crisis</td>
                          <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}><code>pain, chest, dizzy, bleed, vomiting</code></td>
                          <td style={{ padding: "12px 8px", color: "var(--text-body)" }}>Emergency transfer warning + dial Clinic Nurse Line immediately.</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "12px 8px", fontWeight: 700, color: "var(--mk-blue-700)" }}>Drug Interaction</td>
                          <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}><code>mix, combine, aspirin, interaction</code></td>
                          <td style={{ padding: "12px 8px", color: "var(--text-body)" }}>Evaluative interaction refusal script + pharmacist notification flag.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeSpecTab === "security" && (
                  <div>
                    <h3 className="mk-headline-md" style={{ color: "var(--mk-blue-700)", marginBottom: 16 }}>Environment Isolation & Enterprise Guardrails</h3>
                    <p className="mk-body-md" style={{ color: "var(--text-body)", marginBottom: 20, lineHeight: "24px" }}>
                      Strict separation ensures compliance across development and deployment networks.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                      <Card variant="sunken" style={{ padding: 20 }}>
                        <h4 style={{ fontWeight: 700, color: "var(--mk-blue-700)", marginBottom: 8, fontSize: 14 }}>Enterprise LLM Subprocessors</h4>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: "18px" }}>
                          AI models operate under enterprise agreements ensuring **zero-day data retention** and explicitly restricting inputs from being used for public model training.
                        </p>
                      </Card>
                      <Card variant="sunken" style={{ padding: 20 }}>
                        <h4 style={{ fontWeight: 700, color: "var(--mk-blue-700)", marginBottom: 8, fontSize: 14 }}>Secure Auditing Protocols</h4>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: "18px" }}>
                          All access, writes, and record read calls generate automated audit logs containing Operator ID, Action, IP, and Context IDs for compliance reports.
                        </p>
                      </Card>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </section>

          {/* INTERACTIVE ROI ESTIMATOR */}
          <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>ROI Calculator</span>
              <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Estimate Practice Savings</h2>
              <p style={{ color: "var(--text-muted)", marginTop: 8 }}>See the estimated operational impact of automating continuous patient check-in call cycles.</p>
            </div>

            <Card variant="tactile" style={{ padding: 36 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="mk-tech3">
                  <div>
                    <label style={{ fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 12, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Care Pathway / Specialty</label>
                    <select
                      value={wardType}
                      onChange={(e) => setWardType(e.target.value)}
                      style={{
                        width: "100%",
                        height: 48,
                        padding: "0 16px",
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "var(--text-body)",
                        background: "var(--surface-sunken)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-md)",
                        outline: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="chronic">💼 Chronic Care Management</option>
                      <option value="maternity">🤰 Pregnancy & Maternity Care</option>
                      <option value="pediatric">👶 Post-Birth Infant Care (Pediatrics)</option>
                      <option value="surgery">🩹 Post-Surgery Recovery</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <label style={{ fontWeight: 700, color: "var(--mk-blue-700)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Active Patients on Care Plans</label>
                      <span style={{ fontWeight: 800, color: "var(--mk-teal-500)", fontSize: 16 }}>{discharges} Patients</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      value={discharges} 
                      onChange={(e) => setDischarges(parseInt(e.target.value, 10))} 
                      style={{ width: "100%", accentColor: "var(--mk-teal-500)", cursor: "pointer", height: 48 }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, borderTop: "1px solid var(--border-subtle)", paddingTop: 24 }} className="mk-tech3">
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>Nurse Hours Reclaimed / mo</div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "var(--mk-blue-700)", marginTop: 8 }}>{nurseHoursSaved} hrs</div>
                    <div className="mk-caption" style={{ color: "var(--text-muted)", marginTop: 4 }}>Based on {multipliers.hours} calling hours saved per patient per month.</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>Est. Reassurance Savings / yr</div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "var(--mk-teal-500)", marginTop: 8 }}>${readmissionCostReduced.toLocaleString()}</div>
                    <div className="mk-caption" style={{ color: "var(--text-muted)", marginTop: 4 }}>Based on reduced unnecessary clinic visits & ER transfers.</div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* PRICING PLANS SECTION */}
          <section style={{ padding: "80px 40px", background: "var(--surface-sunken)", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 50 }}>
                <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Flexible Plans</span>
                <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Pricing Tiers</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="mk-rx3">
                {/* Tier 1 */}
                <Card variant="flat" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--mk-blue-700)" }}>Clinic Starter</h3>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-strong)", margin: "16px 0" }}>$299<span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></div>
                    <ul style={{ fontSize: 13, color: "var(--text-muted)", paddingLeft: 16, lineHeight: "20px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <li>Up to 50 active patient plans</li>
                      <li>Standard SMS reminders</li>
                      <li>HIPAA-compliant data store</li>
                      <li>Basic appointment booking</li>
                    </ul>
                  </div>
                  <Button variant="outline" block onClick={() => handleNavigate("demo")}>Get Started</Button>
                </Card>

                {/* Tier 2 */}
                <Card variant="tactile" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380, border: "2px solid var(--mk-teal-500)", position: "relative" }}>
                  <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--mk-teal-500)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>POPULAR</span>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--mk-blue-700)" }}>Health System Pro</h3>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-strong)", margin: "16px 0" }}>$999<span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>/mo</span></div>
                    <ul style={{ fontSize: 13, color: "var(--text-muted)", paddingLeft: 16, lineHeight: "20px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <li>Up to 300 active patient plans</li>
                      <li>AI Medication Call Reminders (Vapi)</li>
                      <li>Secure chatbot with body-context</li>
                      <li>Clinician Dashboards & calendar sync</li>
                    </ul>
                  </div>
                  <Button block onClick={() => handleNavigate("demo")}>Start Free Trial</Button>
                </Card>

                {/* Tier 3 */}
                <Card variant="flat" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--mk-blue-700)" }}>Enterprise</h3>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-strong)", margin: "16px 0" }}>Custom</div>
                    <ul style={{ fontSize: 13, color: "var(--text-muted)", paddingLeft: 16, lineHeight: "20px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <li>Unlimited patients & EHR integration</li>
                      <li>Dedicated telephony gateway (SIP)</li>
                      <li>Custom safety scripts</li>
                      <li>24/7 technical support BAA</li>
                    </ul>
                  </div>
                  <Button variant="outline" block onClick={() => handleNavigate("demo")}>Contact Sales</Button>
                </Card>
              </div>
            </div>
          </section>

          {/* INTERACTIVE FAQ SECTION */}
          <section style={{ padding: "80px 40px", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span className="mk-eyebrow" style={{ color: "var(--mk-teal-500)" }}>Questions</span>
              <h2 className="mk-headline-lg" style={{ marginTop: 8 }}>Frequently Asked Queries</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  q: "Does this system require building or training a custom LLM?",
                  a: "No. The system utilizes secure, enterprise-grade, HIPAA-compliant model subprocessors under a strict Business Associate Agreement (BAA). Transcripts and patient data are never retained by LLM subprocessors (zero-day data retention) and are never used to train public models."
                },
                {
                  q: "How does the Medication Refusal safety system function?",
                  a: "MedKonect runs a dual-layer check. Speech/text tokens are passed through a deterministic local parser first. If high-risk tokens (e.g. pain, stop taking, skip, mix medications) are caught, the system initiates a hard transfer to the clinic's nurse triage line or alerts the HCP, bypasses the LLM, and issues refusal responses."
                },
                {
                  q: "How are clinician portals updated?",
                  a: "All patient adherence inputs are instantly logged to the clinic's Supabase database. Clinicians receive instant updates on their recent records logs, patient schedules, and appointment calendars."
                },
                {
                  q: "What EHR systems does MedKonect integrate with?",
                  a: "MedKonect is designed with FHIR compliant APIs to support quick integration into major Electronic Health Record (EHR) databases, including Epic Systems, Cerner, and Athenahealth."
                }
              ].map((faq, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <div key={i} style={{ border: "1px solid var(--border-subtle)", borderRadius: 12, background: "var(--surface-card)", overflow: "hidden" }}>
                    <button onClick={() => toggleFaq(i)} style={{ width: "100%", border: "none", background: "none", textAlign: "left",
                      padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
                      fontSize: 15, fontWeight: 700, color: "var(--mk-blue-700)" }}>
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 24px 20px", fontSize: 13, lineHeight: "20px", color: "var(--text-muted)",
                        borderTop: "1px solid var(--border-subtle)", paddingTop: 16, background: "var(--surface-sunken)" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* FOOTER SECTION */}
          <footer style={{ background: "var(--mk-blue-900)", color: "#fff", padding: "64px 40px 40px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="mk-tech3">
              <div>
                <img src={whiteLogoImg} alt="MedKonect" style={{ height: 32, marginBottom: 16 }} />
                <p style={{ fontSize: 13, color: "var(--mk-blue-100)", lineHeight: "20px", maxWidth: 280 }}>
                  Secure, medication-aware assistant for continuous, personalized clinical care. Keeping patients healthy and practices automated.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-teal-300)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Product</h4>
                <ul style={{ listStyle: "none", padding: 0, fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><a href="#features" style={{ color: "var(--mk-blue-100)" }}>Pillars</a></li>
                  <li><a href="#problem-solution" style={{ color: "var(--mk-blue-100)" }}>Recovery Loops</a></li>
                  <li><a href="#demo" onClick={(e) => { e.preventDefault(); handleNavigate("demo"); }} style={{ color: "var(--mk-blue-100)" }}>Interactive Sandbox</a></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-teal-300)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Trust & Security</h4>
                <ul style={{ listStyle: "none", padding: 0, fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>HIPAA BAA</a></li>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>FDA Classification</a></li>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>EHR Integration</a></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "var(--mk-teal-300)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Company</h4>
                <ul style={{ listStyle: "none", padding: 0, fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>About Us</a></li>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>Contact Sales</a></li>
                  <li><a href="#" style={{ color: "var(--mk-blue-100)" }}>Press Kit</a></li>
                </ul>
              </div>
            </div>
            
            <div style={{ maxWidth: 1100, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 12, color: "var(--mk-blue-100)" }}>
              <span>© {new Date().getFullYear()} MedKonect Inc. All Rights Reserved. Secure encryption active.</span>
              <div style={{ display: "flex", gap: 24 }}>
                <a href="#" style={{ color: "var(--mk-blue-100)" }}>Privacy Policy</a>
                <a href="#" style={{ color: "var(--mk-blue-100)" }}>Terms of Service</a>
              </div>
            </div>
          </footer>

        </div>
      )}

      {/* INTERACTIVE DEMO VIEW (SPLIT-SCREEN) */}
      {activePage === "demo" && (
        <div style={{ background: "var(--surface-sunken)", minHeight: "calc(100vh - 70px)", padding: "24px 40px" }} className="mk-page-in">
          
          {/* Pathway Selector Bar */}
          <Card variant="tactile" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--mk-blue-700)" }}>Interactive Clinical Pathway Walkthrough</h4>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Select a clinic specialty to watch the patient simulator and clinician dashboard sync instantly.</p>
            </div>
            <div style={{ display: "flex", gap: 12 }} className="mk-flex-wrap">
              {Object.keys(MK_PATHWAYS).map((key) => (
                <button
                  key={key}
                  onClick={() => handlePathwayChange(key)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "1.5px solid var(--border-subtle)",
                    background: activePathwayId === key ? "var(--mk-teal-500)" : "#fff",
                    color: activePathwayId === key ? "#fff" : "var(--text-strong)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {key === "chronic" && "💼 Chronic Care"}
                  {key === "pregnancy" && "🤰 Pregnancy Care"}
                  {key === "pediatric" && "👶 Pediatrics (Post-Birth)"}
                  {key === "postop" && "🩹 Post-Surgery"}
                </button>
              ))}
            </div>
          </Card>
          
          <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
            
            {/* LEFT: PHONE SIMULATOR PANEL */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "4px 8px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--mk-blue-700)" }}>Patient Simulator</h3>
                <p style={{ fontSize: 12, color: "var(--text-subtle)", marginTop: 4 }}>
                  Experience the patient view. Test AI safety triggers (e.g. ask to "double dose" or trigger reminder calls!).
                </p>
              </div>
              
              <PatientSimulator 
                medications={medications}
                appointments={appointments}
                carePlan={activeCarePlan}
                symptomLogs={symptomLogs}
                pathwayId={activePathwayId}
                pathwayConfig={MK_PATHWAYS[activePathwayId]}
                onAddAppointment={handleAddAppointment}
                onAddLog={handleAddLog}
                onAddSymptomLog={handleReportSymptom}
              />
          </div>

          {/* RIGHT: CLINICIAN PORTAL VIEW */}
          <div style={{ background: "#fff", borderRadius: 24, border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-lg)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            
            <div style={{ background: "var(--mk-blue-900)", padding: "12px 24px", display: "flex",
              alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--mk-teal-300)" }}>admin_panel_settings</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Clinician Portal View (Simulated EHR)</span>
              </div>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mk-green)" }} className="mk-pulse-dot" />
            </div>

            <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
              <Shell active={portalView} onNavigate={setPortalView}>
                {portalView === "dashboard" && (
                  <Dashboard 
                    onNavigate={setPortalView} 
                    appointments={appointments} 
                    records={records}
                    meds={medications}
                    symptomLogs={symptomLogs}
                  />
                )}
                {portalView === "schedule" && (
                  <Schedule 
                    onNavigate={setPortalView} 
                    appointments={appointments} 
                    onAddAppointment={() => setPortalView("prescriptions")} 
                  />
                )}
                {portalView === "records" && (
                  <Records 
                    records={records} 
                  />
                )}
                {portalView === "prescriptions" && (
                  <Prescriptions 
                    prescriptions={prescriptions} 
                    onAddPrescription={handleAddPrescription} 
                    carePlan={activeCarePlan}
                    onUpdateCarePlan={handleUpdateCarePlan}
                  />
                )}
                {portalView === "teleconsult" && (
                  <Teleconsult 
                    onNavigate={setPortalView} 
                    appointments={appointments}
                  />
                )}
              </Shell>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* FULL PORTAL ONLY VIEW */}
      {activePage === "portal-only" && (
        <div className="mk-page-in" style={{ flex: 1 }}>
          <Shell active={portalView} onNavigate={setPortalView}>
            {portalView === "dashboard" && (
              <Dashboard 
                onNavigate={setPortalView} 
                appointments={appointments} 
                records={records}
                meds={medications}
                symptomLogs={symptomLogs}
              />
            )}
            {portalView === "schedule" && (
              <Schedule 
                onNavigate={setPortalView} 
                appointments={appointments} 
                onAddAppointment={() => setPortalView("prescriptions")} 
              />
            )}
            {portalView === "records" && (
              <Records 
                records={records} 
              />
            )}
            {portalView === "prescriptions" && (
              <Prescriptions 
                prescriptions={prescriptions} 
                onAddPrescription={handleAddPrescription} 
                carePlan={activeCarePlan}
                onUpdateCarePlan={handleUpdateCarePlan}
              />
            )}
            {portalView === "teleconsult" && (
              <Teleconsult 
                onNavigate={setPortalView} 
                appointments={appointments}
              />
            )}
          </Shell>
        </div>
      )}

    </div>
  );
}

export default App;
