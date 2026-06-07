import React, { useState, useEffect, useRef } from "react";
import { Card } from "./display/Card";
import { Button } from "./buttons/Button";
import { Avatar } from "./display/Avatar";
import { StatusPill } from "./display/StatusPill";

export function PatientSimulator({ 
  medications = [], 
  appointments = [], 
  carePlan = {},
  symptomLogs = [],
  pathwayId = "chronic",
  pathwayConfig = {},
  onAddAppointment, 
  onAddLog, 
  onAddSymptomLog
}) {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Sync initial chat message on pathway switch
  useEffect(() => {
    setChatMessages([
      { sender: "ai", text: `Hello. I am your MedKonect care assistant. Dr. Eleanor Smith has deployed your continuous care plan: "${carePlan.diagnosis || 'Active Care Plan'}". How can I reassure you today?` }
    ]);
  }, [pathwayId, carePlan.diagnosis]);

  // Phone call state
  const [callState, setCallState] = useState("idle"); // idle, ringing, connected, finished
  const [callDuration, setCallDuration] = useState(0);
  const [callCaption, setCallCaption] = useState("");
  const [callSpeakerText, setCallSpeakerText] = useState("");

  // Booking Form State
  const [bookDoctor, setBookDoctor] = useState("Dr. Eleanor Smith");
  const [bookReason, setBookReason] = useState("Routine Follow-up");
  const [bookDate, setBookDate] = useState("2023-11-06");
  const [bookTime, setBookTime] = useState("11:30 AM");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Symptoms Flagging State
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [customSymptomText, setCustomSymptomText] = useState("");
  const [symptomSeverity, setSymptomSeverity] = useState("Mild");
  const [symptomSuccessMsg, setSymptomSuccessMsg] = useState("");

  // Sync active symptom list option when pathway switches
  useEffect(() => {
    if (pathwayConfig.symptomList && pathwayConfig.symptomList.length > 0) {
      setSelectedSymptom(pathwayConfig.symptomList[0]);
    }
  }, [pathwayConfig]);

  // Lifestyle Checkbox State
  const [completedTasks, setCompletedTasks] = useState({});
  useEffect(() => {
    if (pathwayConfig.tasks) {
      const initial = {};
      Object.keys(pathwayConfig.tasks).forEach(k => {
        initial[pathwayConfig.tasks[k].key] = false;
      });
      setCompletedTasks(initial);
    }
  }, [pathwayConfig]);

  // Suggested questions for Chatbot
  const suggestions = pathwayConfig.suggestionChips || [];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Call duration timer
  useEffect(() => {
    let timer;
    if (callState === "connected") {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Chatbot response rules engine (enforces doctor's diagnosis, custom prompt overrides, and safety matrices)
  const handleSendMessage = (textToSend) => {
    const msg = textToSend || inputText;
    if (!msg.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: "user", text: msg }];
    setChatMessages(newMessages);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let reply = "";
      const patientName = pathwayConfig.patientName || "Sarah Montgomery";
      
      // ==========================================
      // PATHWAY-SPECIFIC CLINICAL SAFETY MATRICES
      // ==========================================
      
      // 1. Pregnancy-Specific Checks
      if (pathwayId === "pregnancy" && (lower.includes("ibuprofen") || lower.includes("advil"))) {
        reply = `${patientName}, Ibuprofen or Advil is generally not recommended during pregnancy, especially in the second and third trimesters, as it can affect fetal circulation and amniotic fluid levels. Please consult Dr. Eleanor Smith before taking any NSAIDs. Acetaminophen (Tylenol) is typically preferred if approved.`;
        onAddSymptomLog({
          name: patientName,
          symptom: "Query: NSAID Use in Pregnancy",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "HCP Review Needed",
          notes: `Query text: "${msg}"`
        });
      }
      else if (pathwayId === "pregnancy" && (lower.includes("bleed") || lower.includes("cramp") || lower.includes("spotting") || lower.includes("leak") || lower.includes("fluid") || lower.includes("abdominal pain") || (lower.includes("kick") && (lower.includes("decrease") || lower.includes("less") || lower.includes("stop"))))) {
        reply = `🚨 CRITICAL ALERT: Jessica, symptoms of bleeding, fluid leakage, severe abdominal cramping, or decreased kick count are clinical warnings in gestation. Please lie down on your left side immediately. I am logging this symptom alert and initiating an emergency hard-transfer to the Maternity Triage Nurse...`;
        
        onAddSymptomLog({
          name: patientName,
          symptom: "🚨 Critical Obstetric Alert",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Nurse Triage Dialed",
          notes: `Pregnancy emergency trigger: "${msg}"`
        });
        
        setTimeout(() => {
          setCallSpeakerText("Maternity Triage Nurse");
          setCallState("connected");
          setCallCaption("Connecting to secure maternity ward operator... Nurse informed.");
          setActiveTab("call");
        }, 1500);
      }
      
      // 2. Pediatric-Specific Checks
      else if (pathwayId === "pediatric" && (lower.includes("fever") || lower.includes("temp") || lower.includes("hot") || lower.includes("100.4") || lower.includes("101") || lower.includes("102"))) {
        reply = `🚨 CRITICAL ALERT: Baby Leo is only 4 weeks old. Any rectal temperature of 100.4°F (38°C) or higher in a newborn under 3 months is a neonatal medical emergency. Do not administer fever reducers. I am logging this pediatric alarm and dialing the Infant Pediatric Emergency line...`;
        
        onAddSymptomLog({
          name: patientName,
          symptom: "🚨 Critical Neonatal Fever",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Nurse Triage Dialed",
          notes: `Newborn fever alarm: "${msg}"`
        });
        
        setTimeout(() => {
          setCallSpeakerText("Pediatric Triage Nurse");
          setCallState("connected");
          setCallCaption("Connecting to Pediatric Emergency Operator... Infant context transmitted.");
          setActiveTab("call");
        }, 1500);
      }
      else if (pathwayId === "pediatric" && (lower.includes("diaper") || lower.includes("wet") || lower.includes("urine"))) {
        reply = `Emily, Baby Leo should have at least 6 to 8 wet diapers in a 24-hour period. If you notice fewer than 4 wet diapers, it could indicate dehydration. I have logged this concern for Dr. Smith's care team.`;
        onAddSymptomLog({
          name: patientName,
          symptom: "Query: Diaper / Hydration Tracker",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Active Flag",
          notes: `Query text: "${msg}"`
        });
      }
      
      // 3. Post-Surgery Specific Checks
      else if (pathwayId === "postop" && (lower.includes("lift") || lower.includes("carry") || lower.includes("heavy") || lower.includes("groceries") || lower.includes("weight"))) {
        reply = `Michael, your surgical instructions explicitly state: NO lifting of objects heavier than 10 lbs for the first 6 weeks post-surgery to prevent hernia recurrence. I have logged this query for safety review. Please avoid heavy strain.`;
        onAddSymptomLog({
          name: patientName,
          symptom: "Warning: Lifting Restriction Query",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "HCP Review Needed",
          notes: `Query text: "${msg}"`
        });
      }
      else if (pathwayId === "postop" && (lower.includes("pus") || lower.includes("drainage") || lower.includes("discharge") || lower.includes("redness") || lower.includes("fever") || lower.includes("warmth") || lower.includes("incision") || lower.includes("wound"))) {
        reply = `Michael, signs of spreading redness, warmth, fever, or yellowish discharge/pus around the surgical incision indicate a potential wound infection. I have logged this wound alert for the surgical care team. Please keep the wound clean and dry.`;
        
        onAddSymptomLog({
          name: patientName,
          symptom: "⚠️ Surgical Wound Infection Warning",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Active Flag",
          notes: `Wound query: "${msg}"`
        });
      }
      else if (pathwayId === "postop" && (lower.includes("calf") || lower.includes("leg swelling") || (lower.includes("breath") && lower.includes("short")))) {
        reply = `🚨 CRITICAL ALERT: Sudden calf swelling, leg pain, or shortness of breath post-op are clinical warnings for DVT (blood clot) or pulmonary embolism. I am logging this surgical emergency and initiating a transfer to the Surgery Triage Line...`;
        
        onAddSymptomLog({
          name: patientName,
          symptom: "🚨 Critical DVT / Pulmonary Alert",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Nurse Triage Dialed",
          notes: `DVT emergency trigger: "${msg}"`
        });
        
        setTimeout(() => {
          setCallSpeakerText("Surgical Triage Nurse");
          setCallState("connected");
          setCallCaption("Connecting to post-surgical triage operator... DVT alert flagged.");
          setActiveTab("call");
        }, 1500);
      }
      
      // ==========================================
      // GENERAL SAFETY & ESCALATION MATRICES (FALLBACKS)
      // ==========================================
      else if (
        lower.includes("pain") || 
        lower.includes("chest") || 
        lower.includes("breath") || 
        lower.includes("rash") || 
        lower.includes("dizzy") || 
        lower.includes("bleed") || 
        lower.includes("vomit") || 
        lower.includes("choke") ||
        lower.includes("emergency")
      ) {
        reply = "If you are experiencing a medical emergency, please hang up and dial 911 immediately. I am logging this symptom and initiating a hard-transfer to Dr. Smith's clinic nurse line...";
        
        onAddSymptomLog({
          name: patientName,
          symptom: msg.length > 30 ? msg.substring(0, 30) + "..." : msg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Nurse Triage Dialed",
          notes: "Patient reported acute crisis symptom in chatbot."
        });

        setTimeout(() => {
          setCallSpeakerText("Dr. Smith's Triage Nurse");
          setCallState("connected");
          setCallCaption("Connecting to secure clinical operator... Nurse informed.");
          setActiveTab("call");
        }, 1500);
      }
      
      // Dose alteration fallback
      else if (
        lower.includes("stop") || 
        lower.includes("double") || 
        lower.includes("increase") || 
        lower.includes("halve") || 
        lower.includes("cut") || 
        lower.includes("skip") || 
        lower.includes("change dose")
      ) {
        reply = "I cannot advise you to alter your medication dose. Please consult your physician before making any changes. I have logged a flag for your care team to review.";
        
        onAddSymptomLog({
          name: patientName,
          symptom: "Query: Dose Alteration Attempted",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "HCP Review Needed",
          notes: `Query text: "${msg}"`
        });
      }
      
      // Drug interaction fallback
      else if (
        lower.includes("mix") || 
        lower.includes("combine") || 
        lower.includes("take with") || 
        lower.includes("interaction") || 
        lower.includes("aspirin")
      ) {
        reply = "I cannot evaluate potential drug interactions. Please speak directly to your pharmacist or care team.";
        
        onAddSymptomLog({
          name: patientName,
          symptom: "Query: Drug Interaction",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Active Flag",
          notes: `Query text: "${msg}"`
        });
      }
      
      // Diet / lifestyle checks
      else if (
        lower.includes("diet") || 
        lower.includes("eat") || 
        lower.includes("food") || 
        lower.includes("exercise") || 
        lower.includes("walk") || 
        lower.includes("lifestyle") ||
        lower.includes("stretch") ||
        lower.includes("physio")
      ) {
        reply = `Dr. Eleanor Smith has provided the following suggestions for your care plan: "${carePlan.suggestions || 'Not set'}". Please adhere to these guidelines.`;
      } 
      
      // Care-plan specific meds checks
      else {
        let foundMed = null;
        const allMeds = medications.length > 0 ? medications : [
          { name: "Lisinopril 10mg", schedule: "Once daily · Morning" }
        ];

        for (const m of allMeds) {
          const namePart = m.name.toLowerCase().split(" ")[0];
          if (lower.includes(namePart)) {
            foundMed = m;
            break;
          }
        }

        if (foundMed) {
          reply = `According to your care plan, your instructions for ${foundMed.name} are: "${foundMed.schedule}". Please take/administer it exactly as written.`;
        } else {
          // Fall back to general anxiety reduction + physician prompt override
          if (carePlan.aiPrompt) {
            reply = `Dr. Eleanor Smith's guidance indicates: "${carePlan.aiPrompt}". If you have further doubts, please consult the clinic. I have logged this check-in.`;
          } else {
            reply = "I am your MedKonect assistant. I can only clarify details from your doctor's care plan. I've logged this note. If you feel any anxiety, please let us know or schedule a call.";
          }
        }
      }

      setChatMessages(prev => [...prev, { sender: "user", text: msg }, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  // Report Symptom manual escalation
  const handleReportSymptomSubmit = (e) => {
    e.preventDefault();
    const symText = customSymptomText || selectedSymptom;
    const isCritical = symptomSeverity === "Severe" || symText.toLowerCase().includes("chest") || symText.toLowerCase().includes("breath");

    const newLog = {
      name: "Sarah Montgomery",
      symptom: symText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isCritical ? "Critical" : "Active Flag",
      notes: `Self-reported severity: ${symptomSeverity}. Patient comments: "${customSymptomText || 'None'}"`
    };

    onAddSymptomLog(newLog);

    onAddLog({
      title: `${isCritical ? '🚨 Critical Alert' : '⚠️ Warning'}: Symptom Logged`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      src: "Patient Portal",
      icon: isCritical ? "emergency" : "warning",
      status: `${symText} flagged`,
      variant: isCritical ? "danger" : "danger",
      ref: `#SYM-${Math.floor(10000 + Math.random() * 90000)}`
    });

    if (isCritical) {
      setCallSpeakerText("Clinic Emergency Line");
      setCallState("connected");
      setCallCaption(`ALERT: Severe symptom reported: "${symText}". Dialing physician queue...`);
      setActiveTab("call");
    } else {
      setSymptomSuccessMsg(`Symptom successfully flagged for Dr. Smith. AI Recovery Assistant will reassess you shortly.`);
      setCustomSymptomText("");
      setTimeout(() => setSymptomSuccessMsg(""), 3000);
    }
  };

  // Lifestyle Adherence toggling
  const handleCheckAdherence = (key, label) => {
    setCompletedTasks(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      
      // Log adherence update to Doctor
      onAddLog({
        title: `✅ Adherence Sync: ${label}`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        src: "Patient Tracker Portal",
        icon: "assignment_turned_in",
        status: updated[key] ? "Completed" : "Cleared",
        variant: "success",
        ref: `#ADHER-${Math.floor(10000 + Math.random() * 90000)}`
      });

      return updated;
    });
  };

  // Outbound call reminder simulation
  const startOutboundCall = () => {
    const patientName = pathwayConfig.patientName || "Sarah Montgomery";
    const firstName = patientName.split(" ")[0];
    setCallState("ringing");
    setCallSpeakerText("MedKonect Assistant");
    setCallCaption("Incoming care check-in...");
    
    setTimeout(() => {
      setCallState("connected");
      setCallCaption(`Hi ${firstName}, this is your continuous care assistant from MedKonect. I'm calling to verify your active care plan item: "${pathwayConfig.callReminderTarget || 'medication schedule'}". Did you complete this?`);
    }, 2000);
  };

  const handleCallResponse = (taken) => {
    const patientName = pathwayConfig.patientName || "Sarah Montgomery";
    const firstName = patientName.split(" ")[0];
    const target = pathwayConfig.callReminderTarget || "care schedule";
    if (taken) {
      setCallCaption(`Thank you ${firstName}, I have successfully logged that you completed your ${target}. Have a wonderful rest of your day!`);
      onAddLog({
        title: `✅ Adherence Confirmed: ${target}`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        src: "Outbound Automated Call",
        icon: "check_circle",
        status: "Completed",
        variant: "success",
        ref: `#CONF-${Math.floor(10000 + Math.random() * 90000)}`
      });
    } else {
      setCallCaption(`Understood, ${firstName}. Please make sure to complete it as soon as possible, or call us if you have questions. I will flag this reminder for clinical follow-up.`);
      onAddLog({
        title: `⚠️ Adherence Missed / Delayed: ${target}`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        src: "Outbound Automated Call",
        icon: "warning",
        status: "Delayed Action logged",
        variant: "danger",
        ref: `#WARN-${Math.floor(10000 + Math.random() * 90000)}`
      });
    }

    setTimeout(() => {
      setCallState("idle");
    }, 3000);
  };

  // Booking submit
  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookDate || !bookTime) return;

    const patientName = pathwayConfig.patientName || "Sarah Montgomery";
    const newAppt = {
      name: patientName,
      reason: bookReason,
      time: bookTime,
      date: bookDate,
      status: "Confirmed",
      variant: "success"
    };

    onAddAppointment(newAppt);
    setIsBookingSuccess(true);
    
    onAddLog({
      title: `📅 Appt Booked: ${bookReason}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      src: "Patient Mobile Portal",
      icon: "calendar_today",
      status: `Confirmed with ${bookDoctor.split(" ").slice(-1)[0]}`,
      variant: "info",
      ref: `#APPT-${Math.floor(10000 + Math.random() * 90000)}`
    });

    setTimeout(() => {
      setIsBookingSuccess(false);
      setActiveTab("chat");
    }, 2000);
  };

  return (
    <div className="phone-wrapper" style={{ width: 340, height: 680, background: "#111", borderRadius: 44, padding: 10,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.2)", border: "4px solid #2e2e2e",
      display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      
      {/* Notch / Dynamic Island */}
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 110, height: 22,
        background: "#000", borderRadius: 999, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a", marginRight: 50 }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0a0a0a" }} />
      </div>

      {/* Screen Frame */}
      <div style={{ flex: 1, background: "var(--surface-app)", borderRadius: 36, display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.05)" }}>
        
        {/* Status Bar */}
        <div style={{ height: 38, display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          padding: "0 22px 4px", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", zIndex: 90 }}>
          <span>10:30</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 11 }}>signal_cellular_alt</span>
            <span className="material-symbols-outlined" style={{ fontSize: 11 }}>wifi</span>
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>battery_very_low</span>
          </div>
        </div>

        {/* Tab content wrapper */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          
          {/* Ring/Call Overlay Screen */}
          {callState !== "idle" && (
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, #003057 0%, #001b35 100%)",
              zIndex: 99, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32, color: "#fff" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                <Avatar name={callSpeakerText} size="lg" ring />
                <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 16, color: "#fff" }}>{callSpeakerText}</h3>
                <span style={{ fontSize: 12, color: "var(--mk-blue-100)", marginTop: 6 }}>
                  {callState === "ringing" ? "Ringing..." : formatDuration(callDuration)}
                </span>
              </div>

              {callState === "ringing" ? (
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginBottom: 30 }}>
                  <button onClick={() => setCallState("idle")} style={{ width: 60, height: 60, borderRadius: "50%",
                    background: "var(--mk-red)", border: "none", color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 15px rgba(217,48,37,0.3)" }}>
                    <span className="material-symbols-outlined">call_end</span>
                  </button>
                  <button onClick={() => setCallState("connected")} style={{ width: 60, height: 60, borderRadius: "50%",
                    background: "var(--mk-green)", border: "none", color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 15px rgba(40,167,69,0.3)" }}>
                    <span className="material-symbols-outlined">call</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginBottom: 20 }}>
                  
                  {/* Visual Wave */}
                  <div style={{ display: "flex", gap: 3, alignItems: "center", height: 32 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1].map((h, i) => (
                      <div key={i} className="mk-pulse-dot" style={{ width: 3, height: h * 4, background: "var(--mk-teal-300)",
                        borderRadius: 2, animationDelay: `${i * 0.1}s`, animationDuration: "1.2s" }} />
                    ))}
                  </div>

                  {/* Caption box */}
                  <div className="mk-glass-dark" style={{ padding: 16, borderRadius: 12, fontSize: 13, lineHeight: "18px",
                    textAlign: "center", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", width: "100%", minHeight: 80 }}>
                    {callCaption}
                  </div>

                  {/* Adherence Confirmation Buttons */}
                  {callSpeakerText.includes("Assistant") && callCaption.includes("taken") && (
                    <div style={{ display: "flex", gap: 12, width: "100%" }}>
                      <Button variant="tonal" style={{ flex: 1, background: "rgba(255,255,255,0.12)", color: "#fff" }} onClick={() => handleCallResponse(false)}>No</Button>
                      <Button style={{ flex: 1 }} onClick={() => handleCallResponse(true)}>Yes, Taken</Button>
                    </div>
                  )}

                  <button onClick={() => setCallState("idle")} style={{ width: 56, height: 56, borderRadius: "50%",
                    background: "var(--mk-red)", border: "none", color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", marginTop: 10 }}>
                    <span className="material-symbols-outlined">call_end</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CHAT TAB */}
          {activeTab === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-app)" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
                <Avatar name="MedKonect AI" size="sm" ring status="online" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--mk-blue-700)" }}>MedKonect Assistant</div>
                  <div style={{ fontSize: 10, color: "var(--mk-green)", fontWeight: 600 }}>Sync: Dr. Smith's Care Plan</div>
                </div>
              </div>

              {/* Message List */}
              <div className="mk-scroll" style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {chatMessages.map((m, i) => {
                  const isAi = m.sender === "ai";
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: isAi ? "flex-start" : "flex-end", width: "100%" }}>
                      <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: 16,
                        borderTopLeftRadius: isAi ? 4 : 16, borderTopRightRadius: isAi ? 16 : 4,
                        background: isAi ? "var(--surface-card)" : "var(--mk-teal-500)",
                        color: isAi ? "var(--text-body)" : "#fff", fontSize: 13, lineHeight: "18px",
                        boxShadow: isAi ? "var(--shadow-xs)" : "none", border: isAi ? "1px solid var(--border-subtle)" : "none" }}>
                        {m.text}
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                    <div style={{ padding: "10px 14px", borderRadius: 16, borderTopLeftRadius: 4,
                      background: "var(--surface-card)", border: "1px solid var(--border-subtle)" }}>
                      <span className="material-symbols-outlined mk-pulse-dot" style={{ fontSize: 18, color: "var(--text-muted)" }}>auto_awesome</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions scroll */}
              <div className="mk-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", padding: "6px 12px",
                borderTop: "1px solid var(--border-subtle)", background: "var(--surface-sunken)" }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSendMessage(s.text)} style={{ border: "1px solid var(--mk-teal-200)",
                    background: "var(--surface-card)", padding: "4px 10px", borderRadius: 12, fontSize: 11,
                    whiteSpace: "nowrap", cursor: "pointer", color: "var(--mk-teal-600)", fontWeight: 600 }}>
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Input box */}
              <div style={{ padding: 8, borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)",
                display: "flex", gap: 8, alignItems: "center" }}>
                <input 
                  type="text" 
                  placeholder="Ask about your care plan..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  style={{ flex: 1, border: "1px solid var(--border-subtle)", borderRadius: 20,
                    padding: "8px 12px", fontSize: 13, outline: "none", background: "var(--surface-sunken)", color: "var(--text-body)" }}
                />
                <button onClick={() => handleSendMessage()} style={{ border: "none", background: "var(--mk-teal-500)",
                  color: "#fff", width: 32, height: 32, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                </button>
              </div>
            </div>
          )}

          {/* LIFESTYLE TAB */}
          {activeTab === "lifestyle" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-app)", overflowY: "auto", padding: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--mk-blue-700)", marginBottom: 4 }}>Care Plan Guidelines</h3>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>Deployed by Dr. Smith to optimize your continuous care.</p>
              
              <Card variant="sunken" style={{ padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "var(--mk-teal-600)", textTransform: "uppercase", marginBottom: 8 }}>Doctor's Care Directives</div>
                <div style={{ fontSize: 13, lineHeight: "20px", color: "var(--text-strong)" }}>
                  {carePlan.suggestions || "Follow general clinical guidelines."}
                </div>
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase" }}>Recovery Progress Checker</div>
                
                {pathwayConfig.tasks && Object.keys(pathwayConfig.tasks).map((tKey) => {
                  const task = pathwayConfig.tasks[tKey];
                  return (
                    <label key={task.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "var(--surface-card)",
                      borderRadius: 12, border: "1px solid var(--border-subtle)", cursor: "pointer" }}>
                      <input type="checkbox" checked={!!completedTasks[task.key]} onChange={() => handleCheckAdherence(task.key, task.label)} style={{ accentColor: "var(--mk-teal-500)" }} />
                      <span style={{ fontSize: 13, textDecoration: completedTasks[task.key] ? "line-through" : "none", color: completedTasks[task.key] ? "var(--text-subtle)" : "var(--text-strong)" }}>{task.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* SYMPTOMS ESCALATION TAB */}
          {activeTab === "symptoms" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-app)", overflowY: "auto", padding: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--mk-blue-700)", marginBottom: 4 }}>Report Symptom / Crisis</h3>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>Flag an active symptom to alert Dr. Smith's care team.</p>

              {symptomSuccessMsg ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 24, textAlign: "center", height: "80%" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: "var(--mk-green)" }}>check_circle</span>
                  <h4 style={{ fontWeight: 700, fontSize: 15 }}>Symptom Logged</h4>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: "18px" }}>{symptomSuccessMsg}</p>
                  <Button variant="outline" size="sm" onClick={() => setSymptomSuccessMsg("")}>Report Another</Button>
                </div>
              ) : (
                <form onSubmit={handleReportSymptomSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Select Symptom</label>
                    <select value={selectedSymptom} onChange={(e) => setSelectedSymptom(e.target.value)}
                      style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)" }}>
                      {pathwayConfig.symptomList && pathwayConfig.symptomList.map((sym, idx) => (
                        <option key={idx}>{sym}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Severity Level</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["Mild", "Moderate", "Severe"].map(lvl => (
                        <button key={lvl} type="button" onClick={() => setSymptomSeverity(lvl)}
                          style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid var(--border-subtle)",
                            background: symptomSeverity === lvl ? "var(--mk-blue-700)" : "var(--surface-card)",
                            color: symptomSeverity === lvl ? "#fff" : "var(--text-body)", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Describe Context</label>
                    <textarea rows="3" value={customSymptomText} onChange={(e) => setCustomSymptomText(e.target.value)}
                      placeholder="e.g. Started this morning, feeling a bit anxious."
                      style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)", outline: "none", resize: "none" }} />
                  </div>

                  {symptomSeverity === "Severe" && (
                    <div style={{ background: "var(--mk-error-container)", color: "var(--mk-error-on)", padding: 12, borderRadius: 8, fontSize: 12, lineHeight: "18px" }}>
                      ⚠️ <strong>Severe Escalation:</strong> Submitting will programmatically transfer this simulator to Dr. Smith's Emergency Line.
                    </div>
                  )}

                  <Button block type="submit" variant={symptomSeverity === "Severe" ? "danger" : "primary"}>
                    {symptomSeverity === "Severe" ? "Emergency Triage Call" : "Submit Symptom Log"}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* CALL REMINDERS / DIAL TAB */}
          {activeTab === "call" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 20,
              justifyContent: "center", alignItems: "center", gap: 24, background: "var(--surface-sunken)" }}>
              <div style={{ textAlign: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 56, color: "var(--mk-teal-500)" }}>local_phone</span>
                <h3 className="mk-headline-md" style={{ marginTop: 12 }}>Outbound Care Call</h3>
                <p className="mk-body-md" style={{ color: "var(--text-muted)", marginTop: 6, fontSize: 13 }}>
                  Simulate automated adherence check-ins or direct clinical follow-ups.
                </p>
              </div>
              <Card variant="tactile" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700 }}>Active Care Target</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{pathwayConfig.callReminderTarget || "Daily Adherence Check"}</div>
                <div className="mk-caption" style={{ color: "var(--text-muted)" }}>Outbound call reminder utilizes secure TTS API (Vapi.ai)</div>
              </Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                <Button block className="mk-float" icon="phone_forwarded" onClick={startOutboundCall}>Trigger Adherence Call</Button>
                <Button block variant="outline" icon="videocam" onClick={() => {
                  setCallSpeakerText("Dr. Eleanor Smith");
                  setCallState("connected");
                  setCallCaption("Initializing virtual teleconsultation call... Secure connection active.");
                }}>Call Doctor Directly</Button>
              </div>
            </div>
          )}

          {/* SCHEDULER TAB */}
          {activeTab === "schedule" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface-app)", overflowY: "auto" }}>
              <div style={{ padding: 16, borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--mk-blue-700)" }}>Book Appointment</h3>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Schedule a live follow-up consultation.</p>
              </div>

              {isBookingSuccess ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", gap: 16 }}>
                  <span className="material-symbols-outlined animate-bounce" style={{ fontSize: 48, color: "var(--mk-green)" }}>check_circle</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700 }}>Appointment Booked!</h4>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Synced live to Clinician's Calendar & Dashboard.</p>
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Select Doctor</label>
                    <select value={bookDoctor} onChange={(e) => setBookDoctor(e.target.value)}
                      style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)" }}>
                      <option>Dr. Eleanor Smith</option>
                      <option>Dr. Helena Vane</option>
                      <option>Dr. Sarah Jenkins</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Reason</label>
                    <select value={bookReason} onChange={(e) => setBookReason(e.target.value)}
                      style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)" }}>
                      <option>Routine Follow-up</option>
                      <option>Post-Op Check</option>
                      <option>Annual Care Review</option>
                      <option>Pregnancy Checkup</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Date</label>
                    <input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)}
                      style={{ padding: 8, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--text-subtle)" }}>Time</label>
                    <select value={bookTime} onChange={(e) => setBookTime(e.target.value)}
                      style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--surface-sunken)", color: "var(--text-body)" }}>
                      <option>09:30 AM</option>
                      <option>11:30 AM</option>
                      <option>02:15 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <Button block type="submit" style={{ marginTop: 8 }}>Schedule</Button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Home Indicator Bar */}
        <div style={{ height: 18, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 110, height: 4, background: "#888", borderRadius: 999 }} />
        </div>

        {/* Mobile Navigation bar */}
        <div style={{ height: 50, display: "flex", justifyContent: "space-around", alignItems: "center",
          borderTop: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
          <button onClick={() => setActiveTab("chat")} style={{ border: "none", background: "transparent",
            color: activeTab === "chat" ? "var(--mk-teal-500)" : "var(--text-muted)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span className={"material-symbols-outlined" + (activeTab === "chat" ? " is-filled" : "")} style={{ fontSize: 18 }}>chat</span>
            <span style={{ fontSize: 8, fontWeight: 700 }}>AI Chat</span>
          </button>
          <button onClick={() => setActiveTab("lifestyle")} style={{ border: "none", background: "transparent",
            color: activeTab === "lifestyle" ? "var(--mk-teal-500)" : "var(--text-muted)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span className={"material-symbols-outlined" + (activeTab === "lifestyle" ? " is-filled" : "")} style={{ fontSize: 18 }}>assignment</span>
            <span style={{ fontSize: 8, fontWeight: 700 }}>Diet</span>
          </button>
          <button onClick={() => setActiveTab("symptoms")} style={{ border: "none", background: "transparent",
            color: activeTab === "symptoms" ? "var(--mk-teal-500)" : "var(--text-muted)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span className={"material-symbols-outlined" + (activeTab === "symptoms" ? " is-filled" : "")} style={{ fontSize: 18 }}>health_and_safety</span>
            <span style={{ fontSize: 8, fontWeight: 700 }}>Symptom</span>
          </button>
          <button onClick={() => setActiveTab("call")} style={{ border: "none", background: "transparent",
            color: activeTab === "call" ? "var(--mk-teal-500)" : "var(--text-muted)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span className={"material-symbols-outlined" + (activeTab === "call" ? " is-filled" : "")} style={{ fontSize: 18 }}>call</span>
            <span style={{ fontSize: 8, fontWeight: 700 }}>Call</span>
          </button>
          <button onClick={() => setActiveTab("schedule")} style={{ border: "none", background: "transparent",
            color: activeTab === "schedule" ? "var(--mk-teal-500)" : "var(--text-muted)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span className={"material-symbols-outlined" + (activeTab === "schedule" ? " is-filled" : "")} style={{ fontSize: 18 }}>calendar_today</span>
            <span style={{ fontSize: 8, fontWeight: 700 }}>Book</span>
          </button>
        </div>

      </div>
    </div>
  );
}
export default PatientSimulator;
