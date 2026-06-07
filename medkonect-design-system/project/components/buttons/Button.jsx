import React from "react";

/* Inject component CSS once. Styling hooks into the global design tokens
   from styles.css, so consumers get the real MedKonect look for free. */
const STYLE_ID = "mk-button-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font-sans); font-weight: 700; letter-spacing: 0.02em;
    border: 1.5px solid transparent; border-radius: var(--radius-md);
    cursor: pointer; white-space: nowrap; text-decoration: none;
    transition: transform var(--dur-fast) var(--ease-standard),
                box-shadow var(--dur-base) var(--ease-standard),
                background var(--dur-base) var(--ease-standard),
                filter var(--dur-base) var(--ease-standard);
  }
  .mk-btn:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
  .mk-btn:active { transform: scale(0.96); }
  .mk-btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  /* sizes */
  .mk-btn--sm { height: 36px; padding: 0 16px; font-size: 13px; }
  .mk-btn--md { height: 44px; padding: 0 22px; font-size: 14px; }
  .mk-btn--lg { height: 56px; padding: 0 28px; font-size: 16px; border-radius: var(--radius-lg); }

  /* variants */
  .mk-btn--primary { background: var(--action-primary); color: var(--action-primary-text); box-shadow: var(--shadow-sm); }
  .mk-btn--primary:hover:not([disabled]) { filter: brightness(1.08); box-shadow: var(--shadow-md); }

  .mk-btn--ink { background: var(--action-ink); color: #fff; box-shadow: var(--shadow-sm); }
  .mk-btn--ink:hover:not([disabled]) { filter: brightness(1.12); box-shadow: var(--shadow-md); }

  .mk-btn--tonal { background: var(--action-secondary); color: var(--action-secondary-text); }
  .mk-btn--tonal:hover:not([disabled]) { filter: brightness(1.04); box-shadow: var(--shadow-xs); }

  .mk-btn--outline { background: transparent; color: var(--action-ink); border-color: var(--action-ink); }
  .mk-btn--outline:hover:not([disabled]) { background: color-mix(in srgb, var(--action-ink) 6%, transparent); }

  .mk-btn--ghost { background: transparent; color: var(--text-muted); border-color: transparent; }
  .mk-btn--ghost:hover:not([disabled]) { background: var(--surface-raised); color: var(--text-strong); }

  .mk-btn--danger { background: var(--action-danger); color: #fff; box-shadow: var(--shadow-sm); }
  .mk-btn--danger:hover:not([disabled]) { filter: brightness(1.08); box-shadow: var(--shadow-md); }

  .mk-btn--block { width: 100%; }
  .mk-btn .material-symbols-outlined { font-size: 1.25em; }
  `;
  document.head.appendChild(el);
}

/**
 * MedKonect primary action button.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconTrailing,
  block = false,
  disabled = false,
  as = "button",
  className = "",
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  const cls = [
    "mk-btn",
    `mk-btn--${variant}`,
    `mk-btn--${size}`,
    block ? "mk-btn--block" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <Tag className={cls} disabled={Tag === "button" ? disabled : undefined} aria-disabled={disabled} {...rest}>
      {icon && <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>}
      {children}
      {iconTrailing && <span className="material-symbols-outlined" aria-hidden="true">{iconTrailing}</span>}
    </Tag>
  );
}
