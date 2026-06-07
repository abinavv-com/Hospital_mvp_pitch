import React from "react";

const STYLE_ID = "mk-badge-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-pill { display:inline-flex; align-items:center; gap:6px; font-family:var(--font-sans);
    font-weight:700; font-size:12px; line-height:1; padding:5px 12px; border-radius:var(--radius-pill); white-space:nowrap; }
  .mk-pill .material-symbols-outlined { font-size:14px; }
  .mk-pill__dot { width:8px; height:8px; border-radius:50%; }
  .mk-pill--success { background:var(--status-success-bg); color:var(--status-success-fg); }
  .mk-pill--success .mk-pill__dot { background:var(--mk-green); }
  .mk-pill--danger { background:var(--status-danger-bg); color:var(--status-danger-fg); }
  .mk-pill--danger .mk-pill__dot { background:var(--mk-red); }
  .mk-pill--info { background:var(--status-info-bg); color:var(--status-info-fg); }
  .mk-pill--info .mk-pill__dot { background:var(--mk-teal-500); }
  .mk-pill--neutral { background:var(--status-neutral-bg); color:var(--status-neutral-fg); }
  .mk-pill--neutral .mk-pill__dot { background:var(--mk-outline); }
  .mk-pill--solid { background:var(--mk-blue-700); color:#fff; }

  .mk-badge { display:inline-flex; align-items:center; justify-content:center; min-width:20px; height:20px;
    padding:0 6px; border-radius:var(--radius-pill); background:var(--mk-red); color:#fff;
    font-family:var(--font-sans); font-weight:700; font-size:11px; line-height:1; }
  `;
  document.head.appendChild(el);
}

/** Status pill — colored chip with optional leading dot or icon. */
export function StatusPill({ children, variant = "neutral", dot = false, icon, className = "", ...rest }) {
  ensureStyles();
  return (
    <span className={["mk-pill", `mk-pill--${variant}`, className].filter(Boolean).join(" ")} {...rest}>
      {dot && <span className="mk-pill__dot" />}
      {icon && <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

/** Count badge — small numeric/short-text badge (e.g. notification counts). */
export function Badge({ children, className = "", ...rest }) {
  ensureStyles();
  return <span className={["mk-badge", className].filter(Boolean).join(" ")} {...rest}>{children}</span>;
}
