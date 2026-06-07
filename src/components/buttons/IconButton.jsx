import React from "react";

const STYLE_ID = "mk-iconbutton-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-iconbtn {
    display: inline-flex; align-items: center; justify-content: center;
    border: none; cursor: pointer; border-radius: var(--radius-full);
    color: var(--text-muted); background: transparent;
    transition: background var(--dur-base) var(--ease-standard),
                color var(--dur-base) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
  }
  .mk-iconbtn:hover:not([disabled]) { background: var(--surface-variant); color: var(--text-strong); }
  .mk-iconbtn:active:not([disabled]) { transform: scale(0.9); }
  .mk-iconbtn:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
  .mk-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; }
  .mk-iconbtn--sm { width: 32px; height: 32px; } .mk-iconbtn--sm .material-symbols-outlined { font-size: 18px; }
  .mk-iconbtn--md { width: 40px; height: 40px; } .mk-iconbtn--md .material-symbols-outlined { font-size: 22px; }
  .mk-iconbtn--lg { width: 48px; height: 48px; } .mk-iconbtn--lg .material-symbols-outlined { font-size: 26px; }
  .mk-iconbtn--solid { background: var(--action-ink); color: #fff; }
  .mk-iconbtn--solid:hover:not([disabled]) { filter: brightness(1.12); background: var(--action-ink); }
  .mk-iconbtn--glass { background: var(--glass-dark-bg); color: #fff; -webkit-backdrop-filter: var(--glass-blur); backdrop-filter: var(--glass-blur); }
  .mk-iconbtn--glass:hover:not([disabled]) { background: rgba(255,255,255,0.2); }
  `;
  document.head.appendChild(el);
}

/** Circular icon-only control for toolbars and overlays. */
export function IconButton({ icon, size = "md", variant = "plain", filled = false, label, className = "", ...rest }) {
  ensureStyles();
  const cls = ["mk-iconbtn", `mk-iconbtn--${size}`, variant !== "plain" ? `mk-iconbtn--${variant}` : "", className].filter(Boolean).join(" ");
  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      <span className={"material-symbols-outlined" + (filled ? " is-filled" : "")} aria-hidden="true">{icon}</span>
    </button>
  );
}
