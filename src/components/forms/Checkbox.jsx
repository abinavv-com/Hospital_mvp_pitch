import React from "react";

const STYLE_ID = "mk-checkbox-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-check { display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sans); cursor:pointer; user-select:none; }
  .mk-check input { position:absolute; opacity:0; width:0; height:0; }
  .mk-check__box {
    width:20px; height:20px; border-radius:6px; flex:none;
    border:2px solid var(--border-strong); background:var(--surface-card);
    display:flex; align-items:center; justify-content:center;
    transition:background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
  }
  .mk-check__box .material-symbols-outlined { font-size:16px; color:#fff; transform:scale(0); transition:transform var(--dur-fast) var(--ease-bounce); }
  .mk-check input:checked + .mk-check__box { background:var(--mk-teal-500); border-color:var(--mk-teal-500); }
  .mk-check input:checked + .mk-check__box .material-symbols-outlined { transform:scale(1); }
  .mk-check input:focus-visible + .mk-check__box { outline:2px solid var(--border-focus); outline-offset:2px; }
  .mk-check input:disabled + .mk-check__box { opacity:0.5; }
  .mk-check__label { font-size:14px; color:var(--text-body); }
  `;
  document.head.appendChild(el);
}

/** Checkbox with bouncy check-in animation. */
export function Checkbox({ checked, defaultChecked, onChange, label, disabled = false, ...rest }) {
  ensureStyles();
  return (
    <label className="mk-check">
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="mk-check__box"><span className="material-symbols-outlined" aria-hidden="true">check</span></span>
      {label && <span className="mk-check__label">{label}</span>}
    </label>
  );
}
