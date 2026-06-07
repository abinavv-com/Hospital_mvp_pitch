import React from "react";

const STYLE_ID = "mk-tabs-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-tabs { display:inline-flex; gap:24px; font-family:var(--font-sans); }
  .mk-tab { position:relative; background:none; border:none; cursor:pointer; padding:0 0 6px;
    font-size:14px; font-weight:700; letter-spacing:0.02em; color:var(--text-muted);
    transition:color var(--dur-base) var(--ease-standard); }
  .mk-tab:hover { color:var(--mk-teal-500); }
  .mk-tab--active { color:var(--mk-teal-500); }
  .mk-tab--active::after { content:""; position:absolute; left:0; right:0; bottom:0; height:2px;
    background:var(--mk-teal-500); border-radius:2px; }

  /* segmented (pill) variant */
  .mk-tabs--seg { gap:4px; background:var(--surface-sunken); padding:4px; border-radius:var(--radius-pill);
    border:1px solid var(--border-subtle); }
  .mk-tabs--seg .mk-tab { padding:8px 18px; border-radius:var(--radius-pill); color:var(--text-muted); }
  .mk-tabs--seg .mk-tab::after { display:none; }
  .mk-tabs--seg .mk-tab--active { background:var(--mk-blue-700); color:#fff; }
  .mk-tabs--seg .mk-tab:hover:not(.mk-tab--active) { color:var(--text-strong); }
  `;
  document.head.appendChild(el);
}

/** Tab bar — underline (default) or segmented pill group. */
export function Tabs({ tabs = [], value, onChange, variant = "underline", className = "", ...rest }) {
  ensureStyles();
  const cls = ["mk-tabs", variant === "segmented" ? "mk-tabs--seg" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="tablist" {...rest}>
      {tabs.map((t) => {
        const id = typeof t === "string" ? t : t.value;
        const label = typeof t === "string" ? t : t.label;
        const active = id === value;
        return (
          <button key={id} role="tab" aria-selected={active}
            className={"mk-tab" + (active ? " mk-tab--active" : "")}
            onClick={() => onChange && onChange(id)}>
            {label}
          </button>
        );
      })}
    </div>
  );
}
