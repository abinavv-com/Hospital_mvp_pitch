import React from "react";

const STYLE_ID = "mk-avatar-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-avatar { position:relative; display:inline-flex; align-items:center; justify-content:center; flex:none;
    border-radius:var(--radius-full); overflow:hidden; background:var(--mk-blue-100); color:var(--mk-blue-700);
    font-family:var(--font-sans); font-weight:700; }
  .mk-avatar--rounded { border-radius:var(--radius-md); }
  .mk-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
  .mk-avatar--ring { box-shadow:0 0 0 2px var(--surface-card), 0 0 0 4px var(--mk-teal-500); }
  .mk-avatar--xs { width:28px; height:28px; font-size:11px; }
  .mk-avatar--sm { width:36px; height:36px; font-size:13px; }
  .mk-avatar--md { width:48px; height:48px; font-size:16px; }
  .mk-avatar--lg { width:64px; height:64px; font-size:22px; }
  .mk-avatar__status { position:absolute; right:-1px; bottom:-1px; width:30%; height:30%; min-width:8px; min-height:8px;
    border-radius:50%; border:2px solid var(--surface-card); }
  .mk-avatar__status--online { background:var(--mk-green); }
  .mk-avatar__status--busy { background:var(--mk-red); }
  .mk-avatar__status--away { background:var(--mk-amber); }
  `;
  document.head.appendChild(el);
}

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/** Patient/clinician avatar — image or initials, optional presence dot. */
export function Avatar({ src, name = "", size = "md", shape = "circle", ring = false, status, className = "", ...rest }) {
  ensureStyles();
  const cls = [
    "mk-avatar",
    `mk-avatar--${size}`,
    shape === "rounded" ? "mk-avatar--rounded" : "",
    ring ? "mk-avatar--ring" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {src ? <img src={src} alt={name} /> : <span>{initials(name)}</span>}
      {status && <span className={`mk-avatar__status mk-avatar__status--${status}`} />}
    </span>
  );
}
