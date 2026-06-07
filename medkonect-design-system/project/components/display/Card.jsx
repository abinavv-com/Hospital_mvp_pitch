import React from "react";

const STYLE_ID = "mk-card-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-card { border-radius:var(--radius-xl); padding:24px; font-family:var(--font-sans);
    transition:transform var(--dur-slow) var(--ease-bounce), box-shadow var(--dur-slow) var(--ease-standard); }
  .mk-card--tactile { background:var(--surface-card); border:1px solid var(--glass-light-border); box-shadow:var(--shadow-tactile); }
  .mk-card--flat { background:var(--surface-card); border:1px solid var(--border-subtle); box-shadow:var(--shadow-xs); }
  .mk-card--glass { background:var(--glass-light-bg); -webkit-backdrop-filter:var(--glass-blur); backdrop-filter:var(--glass-blur); border:1px solid var(--glass-light-border); box-shadow:var(--shadow-sm); }
  .mk-card--ink { background:var(--surface-inverse); color:#fff; border:1px solid transparent; box-shadow:var(--shadow-md); }
  .mk-card--ink h1,.mk-card--ink h2,.mk-card--ink h3 { color:#fff; }
  .mk-card--sunken { background:var(--surface-sunken); border:1px solid var(--border-subtle); }
  .mk-card--interactive { cursor:pointer; }
  .mk-card--interactive:hover { transform:translateY(-4px); box-shadow:var(--shadow-md); }
  .mk-card--interactive:active { transform:scale(0.99); }
  .mk-card--accent { border-left:4px solid var(--mk-teal-500); }
  `;
  document.head.appendChild(el);
}

/** Surface container — the building block for every panel. */
export function Card({ children, variant = "tactile", interactive = false, accent = false, className = "", ...rest }) {
  ensureStyles();
  const cls = [
    "mk-card",
    `mk-card--${variant}`,
    interactive ? "mk-card--interactive" : "",
    accent ? "mk-card--accent" : "",
    className,
  ].filter(Boolean).join(" ");
  return <div className={cls} {...rest}>{children}</div>;
}
