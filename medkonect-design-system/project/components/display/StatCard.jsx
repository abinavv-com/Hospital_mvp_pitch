import React from "react";

const STYLE_ID = "mk-statcard-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-stat { display:flex; justify-content:space-between; align-items:center; gap:16px;
    background:var(--surface-card); border:1px solid var(--border-subtle);
    border-radius:var(--radius-lg); padding:24px; box-shadow:var(--shadow-sm); font-family:var(--font-sans);
    transition:transform var(--dur-base) var(--ease-bounce), box-shadow var(--dur-base) var(--ease-standard); }
  .mk-stat--interactive { cursor:pointer; }
  .mk-stat--interactive:hover { transform:translateY(-2px); box-shadow:var(--shadow-md); }
  .mk-stat__label { font-size:12px; font-weight:500; letter-spacing:0.05em; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px; }
  .mk-stat__value { font-size:48px; line-height:1; font-weight:700; letter-spacing:-0.02em; }
  .mk-stat__value--blue { color:var(--mk-blue-700); }
  .mk-stat__value--teal { color:var(--mk-teal-500); }
  .mk-stat__value--red  { color:var(--mk-red); }
  .mk-stat__trend { display:inline-flex; align-items:center; gap:4px; font-size:14px; font-weight:500; margin-top:10px; }
  .mk-stat__trend--up { color:var(--mk-green); } .mk-stat__trend--down { color:var(--mk-green); }
  .mk-stat__trend .material-symbols-outlined { font-size:16px; }
  .mk-stat__icon { width:64px; height:64px; flex:none; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    background:var(--mk-teal-200); color:var(--mk-teal-600); }
  .mk-stat__icon .material-symbols-outlined { font-size:32px; }
  `;
  document.head.appendChild(el);
}

/** Bento metric tile — big number + label, optional trend and icon. */
export function StatCard({ label, value, tone = "blue", trend, trendDir = "up", icon, interactive = false, className = "", ...rest }) {
  ensureStyles();
  return (
    <div className={["mk-stat", interactive ? "mk-stat--interactive" : "", className].filter(Boolean).join(" ")} {...rest}>
      <div>
        <div className="mk-stat__label">{label}</div>
        <div className={`mk-stat__value mk-stat__value--${tone}`}>{value}</div>
        {trend && (
          <div className={`mk-stat__trend mk-stat__trend--${trendDir}`}>
            <span className="material-symbols-outlined" aria-hidden="true">{trendDir === "up" ? "trending_up" : "trending_down"}</span>
            {trend}
          </div>
        )}
      </div>
      {icon && <div className="mk-stat__icon"><span className="material-symbols-outlined" aria-hidden="true">{icon}</span></div>}
    </div>
  );
}
