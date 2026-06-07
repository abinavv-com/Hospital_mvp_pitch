import React from "react";

const STYLE_ID = "mk-switch-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-switch { display:inline-flex; align-items:center; gap:10px; font-family:var(--font-sans); cursor:pointer; user-select:none; }
  .mk-switch input { position:absolute; opacity:0; width:0; height:0; }
  .mk-switch__track {
    width:44px; height:26px; border-radius:var(--radius-pill);
    background:var(--mk-outline-variant); position:relative; flex:none;
    transition:background var(--dur-base) var(--ease-standard);
  }
  .mk-switch__thumb {
    position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:50%;
    background:#fff; box-shadow:var(--shadow-xs);
    transition:transform var(--dur-base) var(--ease-bounce);
  }
  .mk-switch input:checked + .mk-switch__track { background:var(--mk-teal-500); }
  .mk-switch input:checked + .mk-switch__track .mk-switch__thumb { transform:translateX(18px); }
  .mk-switch input:focus-visible + .mk-switch__track { outline:2px solid var(--border-focus); outline-offset:2px; }
  .mk-switch input:disabled + .mk-switch__track { opacity:0.5; }
  .mk-switch__label { font-size:14px; color:var(--text-body); }
  `;
  document.head.appendChild(el);
}

/** On/off toggle. */
export function Switch({ checked, defaultChecked, onChange, label, disabled = false, ...rest }) {
  ensureStyles();
  return (
    <label className="mk-switch">
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="mk-switch__track"><span className="mk-switch__thumb" /></span>
      {label && <span className="mk-switch__label">{label}</span>}
    </label>
  );
}
