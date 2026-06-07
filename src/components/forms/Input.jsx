import React from "react";

const STYLE_ID = "mk-input-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
  .mk-field__label { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-strong); }
  .mk-field__wrap { position: relative; display: flex; align-items: center; }
  .mk-field__icon { position: absolute; left: 14px; color: var(--text-subtle); font-size: 20px; pointer-events: none; transition: color var(--dur-base) var(--ease-standard); }
  .mk-input {
    width: 100%; height: 48px; padding: 0 16px;
    font-family: var(--font-sans); font-size: 15px; color: var(--text-body);
    background: var(--surface-sunken); border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md); outline: none;
    transition: border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard);
  }
  .mk-input::placeholder { color: var(--text-subtle); }
  .mk-input--icon { padding-left: 44px; }
  .mk-input--pill { border-radius: var(--radius-pill); }
  .mk-input:hover:not(:disabled) { border-color: var(--border-strong); }
  .mk-input:focus { border-color: var(--border-focus); box-shadow: 0 0 0 3px color-mix(in srgb, var(--mk-teal-500) 18%, transparent); background: var(--surface-card); }
  .mk-field__wrap:focus-within .mk-field__icon { color: var(--border-focus); }
  .mk-input:disabled { opacity: 0.6; cursor: not-allowed; }
  .mk-input--invalid { border-color: var(--mk-error); }
  .mk-input--invalid:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--mk-error) 18%, transparent); }
  .mk-field__hint { font-size: 12px; color: var(--text-muted); }
  .mk-field__hint--err { color: var(--mk-error); }
  `;
  document.head.appendChild(el);
}

/** Text input with optional label, leading icon, and hint/error. */
export function Input({ label, icon, hint, error, pill = false, id, className = "", ...rest }) {
  ensureStyles();
  const fieldId = id || (label ? `mk-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const inputCls = [
    "mk-input",
    icon ? "mk-input--icon" : "",
    pill ? "mk-input--pill" : "",
    error ? "mk-input--invalid" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className="mk-field">
      {label && <label className="mk-field__label" htmlFor={fieldId}>{label}</label>}
      <div className="mk-field__wrap">
        {icon && <span className="material-symbols-outlined mk-field__icon" aria-hidden="true">{icon}</span>}
        <input id={fieldId} className={inputCls} aria-invalid={!!error} {...rest} />
      </div>
      {(hint || error) && <span className={"mk-field__hint" + (error ? " mk-field__hint--err" : "")}>{error || hint}</span>}
    </div>
  );
}
