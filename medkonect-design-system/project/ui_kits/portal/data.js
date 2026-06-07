/* Shared mock data for the MedKonect portal UI kit.
   Avatars use initials (brand-tinted) so the kit is fully self-contained
   — no external image dependencies. */
window.MK_DATA = {
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
