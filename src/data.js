/* Shared mock data for the MedKonect portal UI kit.
   Avatars use initials (brand-tinted) so the kit is fully self-contained
   — no external image dependencies. */
export const MK_DATA = {
  clinician: { name: "Dr. Eleanor Smith", role: "Senior Consultant" },
  queue: [
    { id: "AM-9022", name: "Sarah Montgomery", reason: "Hypertension", time: "10:30 AM", note: "Arrived", up: true, dur: "15 min" },
    { id: "MC-4481", name: "Michael Chen", reason: "Post-Op Check", time: "11:00 AM", wait: "Waiting 8 mins" },
    { id: "ER-1239", name: "Elena Rodriguez", reason: "Consultation", time: "11:30 AM", wait: "Pre-filling intake…", dim: true },
  ],
  appointments: [
    { name: "Johnathan Miller", reason: "Routine Checkup", time: "09:30 AM", status: "Confirmed", variant: "success" },
    { name: "Elena Rodriguez", reason: "Consultation", time: "11:45 AM", status: "Pending", variant: "neutral" },
    { name: "Sarah Jenkins", reason: "Annual Cardiac Review", time: "02:15 PM", status: "Confirmed", variant: "success" },
  ],
  records: [
    { title: "Comprehensive Metabolic Panel", date: "24 Sept 2023", src: "LabCorp Diagnostics", icon: "labs", status: "Normal", variant: "success", ref: "#44012" },
    { title: "Cardiovascular Stress Test", date: "12 Aug 2023", src: "Apollo Cardiology", icon: "ecg_heart", status: "Reviewed", variant: "info", ref: "#39110" },
    { title: "Annual Physical Summary", date: "05 Jan 2023", src: "General Medicine Unit", icon: "description", status: "Archived", variant: "neutral", ref: "#10292" },
  ],
  prescriptions: [
    { name: "Jameson, David R.", id: "RX-99210", age: 42, drug: "Atorvastatin Calcium", form: "20mg Oral Tablet", sig: "1 tablet daily at bedtime", qty: "Qty 90 · 3 Refills", status: "Active", variant: "info", date: "Prescribed Oct 12, 2023" },
    { name: "Waters, Sarah L.", id: "RX-88432", age: 68, drug: "Lisinopril-HCTZ", form: "20-12.5mg Oral Tablet", sig: "1 tablet daily in morning", qty: "Qty 30 · 0 Refills", status: "Refill Ready", variant: "danger", date: "Expiring Nov 15, 2023" },
    { name: "Chen, Michael", id: "RX-77612", age: 29, drug: "Amoxicillin", form: "500mg Capsule", sig: "1 capsule 3× daily", qty: "Course 10 days", status: "Completed", variant: "neutral", date: "Finished Sept 30, 2023", done: true },
  ],
  meds: [
    { name: "Amoxicillin 500mg", schedule: "Twice daily · After meals", refill: "Refill Ready", refillTone: "success" },
    { name: "Lisinopril 10mg", schedule: "Once daily · Morning", refill: "12 Days Left", refillTone: "muted" },
  ],
};

export const MK_PATHWAYS = {
  chronic: {
    patientName: "Sarah Montgomery",
    diagnosis: "Chronic Multimorbidity Care Plan (Type-2 Diabetes & Hypertension & Osteoarthritis)",
    suggestions: "Monitor blood glucose 2x daily (fasting & post-meal). Limit daily sodium to 1500mg. Complete daily 15-min physiotherapy knee flexion stretches. Walk 15-20 min daily.",
    aiPrompt: "Sarah is managing Diabetes, Hypertension, and Osteoarthritis. Reassure her that mild joint stiffness after morning stretches is normal. If she reports headache or blood glucose levels, ask her to rest, drink water, and remind her to check her levels. Advise her to contact the doctor if glucose is above 250 mg/dL or blood pressure exceeds 160/95. Do not advise dose changes.",
    meds: [
      { name: "Insulin Glargine 100 U/mL", schedule: "10 units subcutaneously at bedtime", refill: "Active", refillTone: "success" },
      { name: "Metformin 500mg", schedule: "1 tablet twice daily with meals", refill: "2 Refills Left", refillTone: "muted" },
      { name: "Lisinopril 10mg", schedule: "1 tablet daily in the morning", refill: "12 Days Left", refillTone: "muted" }
    ],
    symptomList: [
      "Mild Headache",
      "Joint Stiffness",
      "Blood Glucose Spike (>250 mg/dL)",
      "Knee Pain (Physiotherapy Strain)",
      "Dizziness after Morning Dose"
    ],
    suggestionChips: [
      { label: "My diet/sodium rules?", text: "What are my sodium and lifestyle limits?" },
      { label: "Glucose target range?", text: "What are my fasting and post-meal glucose target ranges?" },
      { label: "Knee pain after stretches?", text: "I feel knee stiffness after my physiotherapy stretches." },
      { label: "Can I skip a metformin dose?", text: "I missed a metformin dose. Can I double it tonight?" }
    ],
    records: [
      { title: "HbA1c Lab Report", date: "02 Jun 2026", src: "LabCorp Diagnostics", icon: "labs", status: "Normal (5.8%)", variant: "success", ref: "#A1C-9921" },
      { title: "Physiotherapy Knee Assessment", date: "28 May 2026", src: "Apex Physical Therapy", icon: "description", status: "Reviewed", variant: "info", ref: "#PHY-8201" },
      { title: "Annual Lipid Panel", date: "15 Jan 2026", src: "General Medicine Unit", icon: "labs", status: "Controlled", variant: "success", ref: "#LIP-1029" }
    ],
    callReminderTarget: "Insulin & Metformin adherence check",
    tasks: {
      check1: { key: "glucose", label: "Logged Blood Glucose levels" },
      check2: { key: "physio", label: "Completed Knee Stretches (Physiotherapy)" },
      check3: { key: "sodium", label: "Adhered to Low-Sodium Diet" }
    }
  },
  pregnancy: {
    patientName: "Jessica Davis",
    diagnosis: "Maternity Wellness Care Plan (Gestation: 24 Weeks - Second Trimester)",
    suggestions: "Hydrate at least 3.0L water daily. Sleep on the left side to optimize blood flow. Track fetal kick counts (expect 10 kicks in 2 hours). Perform daily pelvic tilt pregnancy exercises.",
    aiPrompt: "Jessica is at 24 weeks gestation. Reassure her that mild backaches, round ligament pain, and mild fatigue are common in the second trimester. If she reports headache or swelling, advise her to rest and check her blood pressure. If she mentions severe cramping, bleeding, or reduced kick counts, immediately advise emergency triage. Never prescribe medication.",
    meds: [
      { name: "Prenatal Multivitamins", schedule: "1 capsule daily with food", refill: "Active", refillTone: "success" },
      { name: "Iron Supplement 325mg", schedule: "1 tablet daily with Vitamin C", refill: "3 Refills Left", refillTone: "muted" }
    ],
    symptomList: [
      "Mild Backache",
      "Round Ligament Pain",
      "Decreased Fetal Movement",
      "Sudden Foot/Hand Swelling",
      "Severe Abdominal Cramps"
    ],
    suggestionChips: [
      { label: "How to track kick counts?", text: "How do I perform fetal kick counts?" },
      { label: "Round ligament pain?", text: "I'm having sharp side pains when standing up." },
      { label: "Pelvic tilt exercises?", text: "Can you guide me on pelvic tilt physiotherapy exercises?" },
      { label: "Can I take Ibuprofen?", text: "I have a headache. Can I take Ibuprofen?" }
    ],
    records: [
      { title: "Gestational Glucose Tolerance", date: "01 Jun 2026", src: "Maternity Labs", icon: "labs", status: "Normal", variant: "success", ref: "#GTT-4401" },
      { title: "Fetal Anatomy Ultrasound (20w)", date: "05 May 2026", src: "Obstetric Imaging", icon: "description", status: "Normal Anatomy", variant: "success", ref: "#US-3911" },
      { title: "Maternal CBC & Iron Panel", date: "12 Apr 2026", src: "Maternity Labs", icon: "labs", status: "Mild Anemia", variant: "danger", ref: "#CBC-1029" }
    ],
    callReminderTarget: "Daily Prenatal & Iron compliance check",
    tasks: {
      check1: { key: "water", label: "Drank 3.0L of water" },
      check2: { key: "kicks", label: "Logged fetal kick counts" },
      check3: { key: "pelvic", label: "Completed Pelvic Tilt exercises" }
    }
  },
  pediatric: {
    patientName: "Emily Watson & Baby Leo",
    diagnosis: "Post-Birth Infant Pediatrics & Maternal Recovery Plan (Baby Leo: 4 Weeks Old)",
    suggestions: "Track feeds (every 2-3 hours) and wet diapers (expect 6-8 wet diapers/day). Tummy time 3-5 mins, 3x daily. Mother to walk 15 mins daily. Perform daily infant neck stretches for torticollis.",
    aiPrompt: "Emily is monitoring 4-week-old infant Leo. Reassure that infant colic, mild dry skin, and gas are normal. If baby has a rectal temperature of 100.4°F (38°C) or higher, flag it as a critical infant emergency and prompt immediate pediatrician transfer. If diaper count is under 4, alert the care team. Provide soothing postpartum recovery tips for Emily.",
    meds: [
      { name: "Vitamin D Infant Drops", schedule: "400 IU (1 drop) daily on breast or pacifier", refill: "Active", refillTone: "success" },
      { name: "Postpartum Iron (Mother)", schedule: "1 tablet daily with meals", refill: "Active", refillTone: "success" }
    ],
    symptomList: [
      "Infant Colic / Fussy Spells",
      "Newborn Fever (Rectal >= 100.4°F)",
      "Low Wet Diaper Count (<4 wet diapers)",
      "Mild Infant Dry Skin / Rash",
      "Postpartum Maternal Fatigue"
    ],
    suggestionChips: [
      { label: "Baby is very fussy/colic?", text: "Baby Leo is crying constantly in the evening." },
      { label: "How much tummy time?", text: "How long should tummy time last for a 4-week-old?" },
      { label: "Infant fever guidelines?", text: "What do I do if Baby Leo's temperature is 100.5°F?" },
      { label: "Neck stretches for torticollis?", text: "How do I perform baby Leo's neck stretches (physiotherapy)?" }
    ],
    records: [
      { title: "1-Month Well-Child Growth Chart", date: "03 Jun 2026", src: "Pediatric Clinic", icon: "description", status: "75th Percentile", variant: "success", ref: "#PEDS-882" },
      { title: "Infant HepB Immunization", date: "20 May 2026", src: "Pediatric Clinic", icon: "vaccines", status: "Administered", variant: "success", ref: "#IM-771" },
      { title: "Maternal Postpartum Screening", date: "20 May 2026", src: "Women's Health Unit", icon: "description", status: "Reviewed", variant: "info", ref: "#EPDS-612" }
    ],
    callReminderTarget: "Vitamin D drops and diaper count check",
    tasks: {
      check1: { key: "diapers", label: "Logged 6+ wet diapers today" },
      check2: { key: "tummy", label: "Completed 3 sessions of tummy time" },
      check3: { key: "neck", label: "Performed infant neck stretches" }
    }
  },
  postop: {
    patientName: "Michael Chen",
    diagnosis: "Post-Op Inguinal Hernia Repair Recovery Care Plan",
    suggestions: "Keep surgical wound incision site clean and dry. No lifting > 10 lbs for 6 weeks. Complete daily deep breathing exercises and 10-min flat walks to prevent DVT.",
    aiPrompt: "Michael is recovering from hernia surgery. Reassure him that mild bruising, soreness, and moderate swelling around the incision are expected for the first 10 days. If he reports fever > 101°F, drainage/pus, or expanding redness, warn him of infection risk and flag it. If he reports calf swelling/pain or shortness of breath, advise immediate emergency care.",
    meds: [
      { name: "Acetaminophen 500mg", schedule: "1-2 tablets every 6 hours as needed for pain", refill: "Active", refillTone: "success" },
      { name: "Docusate Sodium 100mg", schedule: "1 capsule daily at bedtime (stool softener)", refill: "Active", refillTone: "success" }
    ],
    symptomList: [
      "Mild Incision Soreness",
      "Fever > 101°F or Incision Pus",
      "Calf Pain / Swelling (DVT risk)",
      "Difficulty Urinating",
      "Constipation / Abdominal Bloat"
    ],
    suggestionChips: [
      { label: "Is wound bruising normal?", text: "My hernia incision has some dark purple bruising." },
      { label: "How to clean the incision?", text: "When can I shower and how do I clean my incision?" },
      { label: "Lifting constraints?", text: "Can I lift a bag of groceries (about 12 lbs)?" },
      { label: "Severe calf pain?", text: "I have sudden pain and swelling in my right calf." }
    ],
    records: [
      { title: "Hernia Repair Operative Note", date: "30 May 2026", src: "General Surgery Unit", icon: "description", status: "Archived", variant: "neutral", ref: "#OP-992" },
      { title: "Post-Op Wound Progress Photo", date: "04 Jun 2026", src: "Patient Upload", icon: "image", status: "Approved", variant: "success", ref: "#IMG-884" },
      { title: "Surgical Recovery Guidelines", date: "30 May 2026", src: "General Surgery Unit", icon: "description", status: "Active", variant: "info", ref: "#GD-776" }
    ],
    callReminderTarget: "Surgical pain level & stool softener check",
    tasks: {
      check1: { key: "incision", label: "Checked incision (clean & dry)" },
      check2: { key: "breathing", label: "Completed deep breathing exercises" },
      check3: { key: "walk", label: "Walked 10 minutes on flat surface" }
    }
  }
};

