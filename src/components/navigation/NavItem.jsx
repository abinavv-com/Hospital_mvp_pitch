import React from "react";

const STYLE_ID = "mk-navitem-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-nav { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:var(--radius-md);
    font-family:var(--font-sans); font-size:14px; font-weight:500; letter-spacing:0.02em;
    color:var(--text-muted); text-decoration:none; cursor:pointer; border:none; background:none; width:100%;
    transition:background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard); }
  .mk-nav:hover { background:var(--surface-variant); color:var(--mk-teal-500); text-decoration:none; }
  .mk-nav .material-symbols-outlined { font-size:22px; }
  .mk-nav--active { background:var(--mk-teal-200); color:var(--mk-teal-600); font-weight:700; box-shadow:var(--shadow-xs); }
  .mk-nav--active:hover { background:var(--mk-teal-200); color:var(--mk-teal-600); }
  `;
  document.head.appendChild(el);
}

/** Sidebar navigation item — icon + label, tonal-teal active state. */
export function NavItem({ icon, children, active = false, as = "a", className = "", ...rest }) {
  ensureStyles();
  const Tag = as;
  return (
    <Tag className={["mk-nav", active ? "mk-nav--active" : "", className].filter(Boolean).join(" ")} aria-current={active ? "page" : undefined} {...rest}>
      {icon && <span className={"material-symbols-outlined" + (active ? " is-filled" : "")} aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </Tag>
  );
}
