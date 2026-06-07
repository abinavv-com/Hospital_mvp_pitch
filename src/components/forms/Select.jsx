import React from "react";

const STYLE_ID = "mk-select-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-selfield { display:flex; flex-direction:column; gap:6px; font-family: var(--font-sans); }
  .mk-selfield__label { font-size:12px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; color:var(--text-strong); }
  .mk-selwrap { position:relative; display:flex; align-items:center; }
  .mk-select {
    width:100%; height:48px; padding:0 44px 0 16px;
    font-family:var(--font-sans); font-size:15px; color:var(--text-body);
    background:var(--surface-sunken); border:1px solid var(--border-subtle);
    border-radius:var(--radius-md); outline:none; cursor:pointer;
    -webkit-appearance:none; appearance:none;
    transition:border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard);
  }
  .mk-select:hover:not(:disabled) { border-color:var(--border-strong); }
  .mk-select:focus { border-color:var(--border-focus); box-shadow:0 0 0 3px color-mix(in srgb, var(--mk-teal-500) 18%, transparent); background:var(--surface-card); }
  .mk-select:disabled { opacity:0.6; cursor:not-allowed; }
  .mk-selwrap__chev { position:absolute; right:14px; color:var(--text-subtle); pointer-events:none; font-size:22px; }
  `;
  document.head.appendChild(el);
}

/** Native select styled to match MedKonect inputs. */
export function Select({ label, options = [], placeholder, id, className = "", children, ...rest }) {
  ensureStyles();
  const fieldId = id || (label ? `mk-sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div className="mk-selfield">
      {label && <label className="mk-selfield__label" htmlFor={fieldId}>{label}</label>}
      <div className="mk-selwrap">
        <select id={fieldId} className={"mk-select " + className} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
          {children}
        </select>
        <span className="material-symbols-outlined mk-selwrap__chev" aria-hidden="true">expand_more</span>
      </div>
    </div>
  );
}
