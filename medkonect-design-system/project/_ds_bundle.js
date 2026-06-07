/* @ds-bundle: {"format":3,"namespace":"MedKonectDesignSystem_4460c8","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"StatusPill","sourcePath":"components/display/StatusPill.jsx"},{"name":"Badge","sourcePath":"components/display/StatusPill.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"78302ad1106f","components/buttons/IconButton.jsx":"f659d2cda115","components/display/Avatar.jsx":"16eff7388025","components/display/Card.jsx":"e766b8a7a83a","components/display/StatCard.jsx":"e322abebeb4b","components/display/StatusPill.jsx":"e8a04df3e636","components/forms/Checkbox.jsx":"80bef7f4c706","components/forms/Input.jsx":"dcc19ec8b62b","components/forms/Select.jsx":"69edee64ff63","components/forms/Switch.jsx":"3674792fb326","components/navigation/NavItem.jsx":"ff2840b4e545","components/navigation/Tabs.jsx":"0a00cc79a692","ui_kits/portal/Dashboard.jsx":"34a23d499ea1","ui_kits/portal/Prescriptions.jsx":"2e6482d456da","ui_kits/portal/Records.jsx":"6846899f5318","ui_kits/portal/Schedule.jsx":"f33d852550b0","ui_kits/portal/Shell.jsx":"4b74e65c9e38","ui_kits/portal/Teleconsult.jsx":"7e1c3a3b2574","ui_kits/portal/data.js":"4ee2f71faf9b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MedKonectDesignSystem_4460c8 = window.MedKonectDesignSystem_4460c8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["mk-btn", `mk-btn--${variant}`, `mk-btn--${size}`, block ? "mk-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    disabled: Tag === "button" ? disabled : undefined,
    "aria-disabled": disabled
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, icon), children, iconTrailing && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, iconTrailing));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function IconButton({
  icon,
  size = "md",
  variant = "plain",
  filled = false,
  label,
  className = "",
  ...rest
}) {
  ensureStyles();
  const cls = ["mk-iconbtn", `mk-iconbtn--${size}`, variant !== "plain" ? `mk-iconbtn--${variant}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined" + (filled ? " is-filled" : ""),
    "aria-hidden": "true"
  }, icon));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

/** Patient/clinician avatar — image or initials, optional presence dot. */
function Avatar({
  src,
  name = "",
  size = "md",
  shape = "circle",
  ring = false,
  status,
  className = "",
  ...rest
}) {
  ensureStyles();
  const cls = ["mk-avatar", `mk-avatar--${size}`, shape === "rounded" ? "mk-avatar--rounded" : "", ring ? "mk-avatar--ring" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", null, initials(name)), status && /*#__PURE__*/React.createElement("span", {
    className: `mk-avatar__status mk-avatar__status--${status}`
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
  children,
  variant = "tactile",
  interactive = false,
  accent = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  const cls = ["mk-card", `mk-card--${variant}`, interactive ? "mk-card--interactive" : "", accent ? "mk-card--accent" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "mk-statcard-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-stat { display:flex; justify-content:space-between; align-items:center; gap:16px;
    background:var(--surface-card); border:1px solid var(--border-subtle);
    border-radius:var(--radius-lg); padding:24px; box-shadow:var(--shadow-sm); font-family:var(--font-sans);
    transition:transform var(--dur-base) var(--ease-bounce), box-shadow var(--dur-base) var(--ease-standard); }
  .mk-stat--interactive { cursor:pointer; }
  .mk-stat--interactive:hover { transform:translateY(-2px); box-shadow:var(--shadow-md); }
  .mk-stat__label { font-size:12px; font-weight:500; letter-spacing:0.05em; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px; }
  .mk-stat__value { font-size:48px; line-height:1; font-weight:700; letter-spacing:-0.02em; }
  .mk-stat__value--blue { color:var(--mk-blue-700); }
  .mk-stat__value--teal { color:var(--mk-teal-500); }
  .mk-stat__value--red  { color:var(--mk-red); }
  .mk-stat__trend { display:inline-flex; align-items:center; gap:4px; font-size:14px; font-weight:500; margin-top:10px; }
  .mk-stat__trend--up { color:var(--mk-green); } .mk-stat__trend--down { color:var(--mk-green); }
  .mk-stat__trend .material-symbols-outlined { font-size:16px; }
  .mk-stat__icon { width:64px; height:64px; flex:none; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    background:var(--mk-teal-200); color:var(--mk-teal-600); }
  .mk-stat__icon .material-symbols-outlined { font-size:32px; }
  `;
  document.head.appendChild(el);
}

/** Bento metric tile — big number + label, optional trend and icon. */
function StatCard({
  label,
  value,
  tone = "blue",
  trend,
  trendDir = "up",
  icon,
  interactive = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mk-stat", interactive ? "mk-stat--interactive" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mk-stat__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: `mk-stat__value mk-stat__value--${tone}`
  }, value), trend && /*#__PURE__*/React.createElement("div", {
    className: `mk-stat__trend mk-stat__trend--${trendDir}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, trendDir === "up" ? "trending_up" : "trending_down"), trend)), icon && /*#__PURE__*/React.createElement("div", {
    className: "mk-stat__icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, icon)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/display/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "mk-badge-styles";
function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .mk-pill { display:inline-flex; align-items:center; gap:6px; font-family:var(--font-sans);
    font-weight:700; font-size:12px; line-height:1; padding:5px 12px; border-radius:var(--radius-pill); white-space:nowrap; }
  .mk-pill .material-symbols-outlined { font-size:14px; }
  .mk-pill__dot { width:8px; height:8px; border-radius:50%; }
  .mk-pill--success { background:var(--status-success-bg); color:var(--status-success-fg); }
  .mk-pill--success .mk-pill__dot { background:var(--mk-green); }
  .mk-pill--danger { background:var(--status-danger-bg); color:var(--status-danger-fg); }
  .mk-pill--danger .mk-pill__dot { background:var(--mk-red); }
  .mk-pill--info { background:var(--status-info-bg); color:var(--status-info-fg); }
  .mk-pill--info .mk-pill__dot { background:var(--mk-teal-500); }
  .mk-pill--neutral { background:var(--status-neutral-bg); color:var(--status-neutral-fg); }
  .mk-pill--neutral .mk-pill__dot { background:var(--mk-outline); }
  .mk-pill--solid { background:var(--mk-blue-700); color:#fff; }

  .mk-badge { display:inline-flex; align-items:center; justify-content:center; min-width:20px; height:20px;
    padding:0 6px; border-radius:var(--radius-pill); background:var(--mk-red); color:#fff;
    font-family:var(--font-sans); font-weight:700; font-size:11px; line-height:1; }
  `;
  document.head.appendChild(el);
}

/** Status pill — colored chip with optional leading dot or icon. */
function StatusPill({
  children,
  variant = "neutral",
  dot = false,
  icon,
  className = "",
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["mk-pill", `mk-pill--${variant}`, className].filter(Boolean).join(" ")
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "mk-pill__dot"
  }), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, icon), children);
}

/** Count badge — small numeric/short-text badge (e.g. notification counts). */
function Badge({
  children,
  className = "",
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["mk-badge", className].filter(Boolean).join(" ")
  }, rest), children);
}
Object.assign(__ds_scope, { StatusPill, Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: "mk-check"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "mk-check__box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    "aria-hidden": "true"
  }, "check")), label && /*#__PURE__*/React.createElement("span", {
    className: "mk-check__label"
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Input({
  label,
  icon,
  hint,
  error,
  pill = false,
  id,
  className = "",
  ...rest
}) {
  ensureStyles();
  const fieldId = id || (label ? `mk-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const inputCls = ["mk-input", icon ? "mk-input--icon" : "", pill ? "mk-input--pill" : "", error ? "mk-input--invalid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "mk-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "mk-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "mk-field__wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined mk-field__icon",
    "aria-hidden": "true"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: "mk-field__hint" + (error ? " mk-field__hint--err" : "")
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Select({
  label,
  options = [],
  placeholder,
  id,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const fieldId = id || (label ? `mk-sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "mk-selfield"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "mk-selfield__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "mk-selwrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "mk-select " + className
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const text = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  }), children), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined mk-selwrap__chev",
    "aria-hidden": "true"
  }, "expand_more")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: "mk-switch"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "mk-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "mk-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function NavItem({
  icon,
  children,
  active = false,
  as = "a",
  className = "",
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: ["mk-nav", active ? "mk-nav--active" : "", className].filter(Boolean).join(" "),
    "aria-current": active ? "page" : undefined
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined" + (active ? " is-filled" : ""),
    "aria-hidden": "true"
  }, icon), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "underline",
  className = "",
  ...rest
}) {
  ensureStyles();
  const cls = ["mk-tabs", variant === "segmented" ? "mk-tabs--seg" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "tablist"
  }, rest), tabs.map(t => {
    const id = typeof t === "string" ? t : t.value;
    const label = typeof t === "string" ? t : t.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": active,
      className: "mk-tab" + (active ? " mk-tab--active" : ""),
      onClick: () => onChange && onChange(id)
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Dashboard.jsx
try { (() => {
/* Overview / dashboard screen */
const {
  Card,
  Button,
  Avatar,
  StatusPill
} = window.MedKonectDesignSystem_4460c8;
function HealthIndex() {
  const pct = 82,
    r = 28,
    c = 2 * Math.PI * r,
    off = c * (1 - pct / 100);
  return /*#__PURE__*/React.createElement(Card, {
    variant: "tactile",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      minWidth: 260,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 64,
      height: 64
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "64",
    height: "64",
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: r,
    fill: "none",
    stroke: "var(--mk-container-high)",
    strokeWidth: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: r,
    fill: "none",
    stroke: "var(--mk-teal-500)",
    strokeWidth: "6",
    strokeDasharray: c,
    strokeDashoffset: off,
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      color: "var(--mk-blue-700)",
      fontSize: 14
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--text-subtle)"
    }
  }, "Health Index"), /*#__PURE__*/React.createElement("div", {
    className: "mk-headline-md",
    style: {
      color: "var(--mk-teal-500)",
      fontWeight: 700
    }
  }, "Optimal Range")));
}
function ApptRow({
  a
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, a.reason, " \u2022 ", a.time))), /*#__PURE__*/React.createElement(StatusPill, {
    variant: a.variant
  }, a.status));
}
function Dashboard({
  onNavigate
}) {
  const d = window.MK_DATA;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      marginBottom: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "mk-headline-lg"
  }, "Welcome back, Eleanor"), /*#__PURE__*/React.createElement("p", {
    className: "mk-body-md",
    style: {
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Your clinical overview for today, October 24th.")), /*#__PURE__*/React.createElement(HealthIndex, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 24
    },
    className: "mk-dashgrid"
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "tactile"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-500)"
    }
  }, "event_available"), "Quick Appointments"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("schedule");
    },
    style: {
      color: "var(--text-link)",
      fontWeight: 600,
      fontSize: 14
    }
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, d.appointments.map((a, i) => /*#__PURE__*/React.createElement(ApptRow, {
    key: i,
    a: a
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "ink",
    style: {
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(145deg, var(--mk-blue-700), var(--mk-blue-900))"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-200)"
    }
  }, "videocam"), "Teleconsult"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "16px 0"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--mk-blue-100)",
      marginBottom: 8,
      fontSize: 14
    }
  }, "Next virtual call in 14 mins"), /*#__PURE__*/React.createElement("p", {
    className: "mk-headline-md",
    style: {
      color: "#fff",
      fontWeight: 700,
      marginBottom: 24
    }
  }, "Sarah Montgomery"), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    icon: "play_circle",
    className: "mk-float",
    onClick: () => onNavigate("teleconsult")
  }, "Start Consultation")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(210,228,255,0.6)",
      fontSize: 12,
      textAlign: "center",
      marginTop: 8
    }
  }, "Secure encrypted connection active")), /*#__PURE__*/React.createElement(Card, {
    variant: "tactile"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-500)"
    }
  }, "folder_open"), "Recent Records"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, d.records.map((r, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("records");
    },
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: 12,
      borderRadius: "var(--radius-sm)",
      textDecoration: "none"
    },
    className: "mk-hover-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--text-subtle)"
    }
  }, r.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-body)"
    }
  }, r.title), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, r.date, " \u2022 ", r.src))))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    style: {
      marginTop: 16
    },
    onClick: () => onNavigate("records")
  }, "Access Vault")), /*#__PURE__*/React.createElement(Card, {
    variant: "tactile"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-500)"
    }
  }, "medication"), "Current Medications"), /*#__PURE__*/React.createElement(StatusPill, {
    variant: "info"
  }, "3 Active")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, d.meds.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 16,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-subtle)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)",
      marginBottom: 16
    }
  }, m.schedule), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: m.refillTone === "success" ? "var(--mk-green)" : "var(--text-subtle)"
    }
  }, m.refill)))))));
}
window.MK_Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Prescriptions.jsx
try { (() => {
/* E-Prescription Management + New Rx drawer */
const {
  Card,
  Button,
  IconButton,
  StatCard,
  Avatar,
  StatusPill,
  Tabs,
  Input,
  Select,
  Checkbox
} = window.MedKonectDesignSystem_4460c8;
function RxCard({
  p
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: p.done ? "sunken" : "flat",
    style: {
      display: "flex",
      gap: 24,
      alignItems: "center",
      padding: 24,
      borderRadius: "var(--radius-lg)",
      opacity: p.done ? 0.75 : 1,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name.split(",")[0],
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mk-headline-md",
    style: {
      fontSize: 18,
      color: p.done ? "var(--text-muted)" : "var(--mk-blue-700)"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, "ID: #", p.id, " \u2022 ", p.age, " yrs"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      minWidth: 280
    },
    className: "mk-rx3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--text-subtle)",
      fontSize: 11,
      marginBottom: 4
    }
  }, "Medication"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, p.drug), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, p.form)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--text-subtle)",
      fontSize: 11,
      marginBottom: 4
    }
  }, "Dosage"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15
    }
  }, p.sig), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, p.qty)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    variant: p.variant,
    dot: p.variant !== "neutral"
  }, p.status), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, p.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "history",
    label: "History"
  }), p.variant === "danger" ? /*#__PURE__*/React.createElement(Button, null, "Approve Refill") : p.done ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    disabled: true
  }, "Re-issue") : /*#__PURE__*/React.createElement(Button, {
    variant: "ink"
  }, "Edit Rx")));
}
function NewRxDrawer({
  open,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      background: "var(--scrim-blue)",
      backdropFilter: "blur(4px)",
      display: open ? "flex" : "none",
      justifyContent: "flex-end",
      opacity: open ? 1 : 0,
      transition: "opacity .3s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 600,
      maxWidth: "100%",
      height: "100%",
      background: "var(--surface-app)",
      boxShadow: "var(--shadow-xl)",
      display: "flex",
      flexDirection: "column",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform .4s var(--ease-standard)",
      borderTopLeftRadius: "var(--radius-2xl)",
      borderBottomLeftRadius: "var(--radius-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-lg"
  }, "New E-Prescription"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Initialize a new digital medication order.")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "close",
    label: "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "mk-scroll",
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Patient search",
    icon: "person_search",
    placeholder: "Start typing patient name or ID\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Drug name",
    placeholder: "e.g. Atorvastatin"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Strength / Form",
    placeholder: "Select\u2026",
    options: ["5mg Tablet", "10mg Tablet", "20mg Capsule", "50mg/ml Solution"]
  })), /*#__PURE__*/React.createElement("div", {
    className: "mk-field",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "mk-field__label",
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, "Instructions (SIG)"), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    placeholder: "e.g. Take one tablet by mouth once daily in the evening with food.",
    style: {
      width: "100%",
      padding: 16,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-body)",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      outline: "none",
      resize: "vertical"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Quantity",
    type: "number",
    defaultValue: "30"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Refills",
    type: "number",
    defaultValue: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Dispense as written"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    style: {
      border: "2px dashed color-mix(in srgb, var(--mk-teal-500) 30%, transparent)",
      background: "color-mix(in srgb, var(--mk-teal-200) 20%, transparent)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-500)",
      fontSize: 32
    }
  }, "local_pharmacy"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, "CVS Pharmacy #4921"), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, "1200 Healthcare Ave, City Center"))), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--text-subtle)"
    }
  }, "chevron_right"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-card)",
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    style: {
      flex: 1
    },
    onClick: onClose
  }, "Discard Draft"), /*#__PURE__*/React.createElement(Button, {
    icon: "send",
    style: {
      flex: 2
    },
    onClick: onClose
  }, "Transmit to Pharmacy"))));
}
function Prescriptions() {
  const d = window.MK_DATA;
  const [tab, setTab] = React.useState("All");
  const [open, setOpen] = React.useState(false);
  const list = d.prescriptions.filter(p => tab === "All" ? true : tab === "Active" ? !p.done : p.done);
  return /*#__PURE__*/React.createElement(React.Fragment, null, window.MK_PageHead({
    title: "E-Prescription Management",
    subtitle: "Streamlined digital pharmacy. Manage medications, authorize refills, track compliance.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      icon: "filter_list"
    }, "Filters"), /*#__PURE__*/React.createElement(Button, {
      icon: "add",
      className: "mk-float",
      onClick: () => setOpen(true)
    }, "New Prescription"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gap: 24,
      marginBottom: 40
    },
    className: "mk-stat3"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Refills Pending Approval",
    value: "14",
    trend: "4% from last week",
    trendDir: "down",
    icon: "assignment_turned_in",
    interactive: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Active Scripts",
    value: "142",
    tone: "teal",
    interactive: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pharmacy Delays",
    value: "02",
    tone: "red",
    interactive: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md"
  }, "Recent Prescriptions"), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ["All", "Active", "Completed"],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, list.map(p => /*#__PURE__*/React.createElement(RxCard, {
    key: p.id,
    p: p
  }))), /*#__PURE__*/React.createElement(NewRxDrawer, {
    open: open,
    onClose: () => setOpen(false)
  }));
}
window.MK_Prescriptions = Prescriptions;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Prescriptions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Records.jsx
try { (() => {
/* Medical Records Vault */
const {
  Card,
  Button,
  Input,
  Avatar,
  StatusPill
} = window.MedKonectDesignSystem_4460c8;
function Category({
  icon,
  label,
  bg,
  fg
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    interactive: true,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      padding: 24,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: bg,
      color: fg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "var(--mk-blue-700)"
    }
  }, label));
}
function DocRow({
  r
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    interactive: true,
    accent: false,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-raised)",
      color: "var(--mk-blue-700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, r.icon)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      color: "var(--mk-blue-700)"
    }
  }, r.title), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)",
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 14
    }
  }, "event"), r.date, " \u2022 ", r.src))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    },
    className: "mk-hide-sm"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    variant: r.variant
  }, r.status), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)",
      marginTop: 4
    }
  }, "Ref ", r.ref)), /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--text-subtle)"
    }
  }, "chevron_right")));
}
function Records() {
  const d = window.MK_DATA;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 24,
      marginBottom: 40,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "mk-headline-lg"
  }, "Medical Records Vault"), /*#__PURE__*/React.createElement("p", {
    className: "mk-body-lg",
    style: {
      color: "var(--text-muted)",
      marginTop: 8,
      maxWidth: 460
    }
  }, "A secure, encrypted environment for patient diagnostic history and longitudinal wellness data.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-end",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Search records, dates, results\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    icon: "cloud_upload",
    className: "mk-float"
  }, "Upload Record"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16,
      marginBottom: 40
    },
    className: "mk-cat4"
  }, /*#__PURE__*/React.createElement(Category, {
    icon: "bloodtype",
    label: "Blood Work",
    bg: "var(--mk-blue-100)",
    fg: "var(--mk-blue-700)"
  }), /*#__PURE__*/React.createElement(Category, {
    icon: "radiology",
    label: "Radiology",
    bg: "var(--mk-teal-200)",
    fg: "var(--mk-teal-600)"
  }), /*#__PURE__*/React.createElement(Category, {
    icon: "vaccines",
    label: "Immunizations",
    bg: "var(--mk-tertiary-fixed)",
    fg: "var(--mk-tertiary)"
  }), /*#__PURE__*/React.createElement(Category, {
    icon: "more_horiz",
    label: "View All",
    bg: "var(--surface-variant)",
    fg: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 24,
      marginBottom: 40
    },
    className: "mk-dashgrid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      minHeight: 360,
      display: "flex",
      alignItems: "flex-end",
      background: "radial-gradient(circle at 70% 20%, rgba(0,139,139,0.5), transparent 50%), linear-gradient(160deg, var(--mk-blue-800), #000)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, var(--mk-blue-900), transparent 70%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--mk-teal-500)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 12px",
      borderRadius: 999,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, "Latest Scan"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 12
    }
  }, "Oct 12, 2023")), /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      color: "#fff",
      marginBottom: 8
    }
  }, "High-Resolution Lumbar MRI"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.75)",
      maxWidth: 460,
      marginBottom: 24
    }
  }, "Full diagnostic sequence including T1/T2 weighted images. Radiologist summary indicates optimal structural alignment."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: "visibility",
    style: {
      background: "#fff",
      color: "var(--mk-blue-700)"
    }
  }, "View Full Scan"), /*#__PURE__*/React.createElement(IconBtnWhite, null)))), /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    accent: true
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mk-headline-md",
    style: {
      marginBottom: 16
    }
  }, "Quick Summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, [["Blood Type", "A− Positive"], ["Chronic Conditions", "None Identified"], ["Last Full Panel", "Sept 2023"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--text-subtle)",
      marginBottom: 8
    }
  }, "Primary Practitioner"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Helena Vane",
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, "Dr. Helena Vane")))))), /*#__PURE__*/React.createElement("h3", {
    className: "mk-headline-md",
    style: {
      marginBottom: 16
    }
  }, "Recent Documents"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, d.records.map((r, i) => /*#__PURE__*/React.createElement(DocRow, {
    key: i,
    r: r
  }))));
}
function IconBtnWhite() {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "var(--radius-md)",
      padding: "0 16px",
      height: 44,
      cursor: "pointer",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, "download"));
}
window.MK_Records = Records;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Records.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Schedule.jsx
try { (() => {
/* Schedule / clinical calendar */
const {
  Card,
  Button,
  Avatar,
  StatusPill,
  Tabs
} = window.MedKonectDesignSystem_4460c8;
const CAL = (() => {
  const cells = [];
  for (let i = 29; i <= 31; i++) cells.push({
    n: i,
    muted: true
  });
  for (let i = 1; i <= 18; i++) cells.push({
    n: i
  });
  return cells;
})();
const EVENTS = {
  1: [{
    t: "9:00 Sarah J.",
    tone: "info"
  }, {
    t: "2:30 Mark T.",
    tone: "tertiary"
  }],
  3: [{
    t: "Surgery",
    tone: "danger"
  }],
  6: [{
    t: "3 Ongoing Appts",
    tone: "solid"
  }]
};
function DayCell({
  c,
  today
}) {
  const ev = EVENTS[c.n] || [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 110,
      padding: 8,
      borderRadius: "var(--radius-sm)",
      border: today ? "2px solid var(--mk-teal-500)" : "1px solid var(--border-subtle)",
      background: today ? "color-mix(in srgb, var(--mk-teal-500) 6%, transparent)" : c.muted ? "var(--surface-sunken)" : "transparent",
      opacity: c.muted ? 0.4 : 1,
      cursor: "pointer",
      transition: "border-color .2s, box-shadow .2s"
    },
    className: "mk-daycell"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: today ? "var(--mk-teal-500)" : "var(--text-body)"
    }
  }, c.n, today ? " ·" : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, ev.map((e, i) => {
    const map = {
      info: ["var(--mk-teal-200)", "var(--mk-teal-600)"],
      tertiary: ["var(--mk-tertiary-fixed)", "var(--mk-tertiary)"],
      danger: ["var(--mk-error-container)", "var(--mk-error-on)"],
      solid: ["var(--mk-teal-500)", "#fff"]
    }[e.tone];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        fontSize: 10,
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: 6,
        background: map[0],
        color: map[1],
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }, e.t);
  })));
}
function UpcomingItem({
  a,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "flat",
    interactive: true,
    style: {
      padding: 16,
      borderRadius: "var(--radius-md)"
    },
    onClick: () => onNavigate("teleconsult")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.name,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, a.reason))), /*#__PURE__*/React.createElement(StatusPill, {
    variant: a.variant === "success" ? "info" : "neutral"
  }, a.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      color: "var(--text-muted)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18
    }
  }, "history"), "15 min"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 18
    }
  }, "videocam"), "Remote")));
}
function Schedule({
  onNavigate
}) {
  const d = window.MK_DATA;
  const [view, setView] = React.useState("Month");
  return /*#__PURE__*/React.createElement(React.Fragment, null, window.MK_PageHead({
    eyebrow: "Clinical Calendar",
    title: "Schedule Management",
    subtitle: "Manage consultations and patient availability for November 2023.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      icon: "print"
    }, "Export Daily PDF"), /*#__PURE__*/React.createElement(Button, {
      icon: "add_circle",
      className: "mk-float"
    }, "Schedule New"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 24
    },
    className: "mk-dashgrid"
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md"
  }, "November 2023"), /*#__PURE__*/React.createElement(Tabs, {
    variant: "segmented",
    tabs: ["Day", "Week", "Month"],
    value: view,
    onChange: setView
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 8,
      marginBottom: 8
    }
  }, ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d2 => /*#__PURE__*/React.createElement("div", {
    key: d2,
    style: {
      textAlign: "center",
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-muted)",
      paddingBottom: 8
    }
  }, d2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 8
    }
  }, CAL.map((c, i) => /*#__PURE__*/React.createElement(DayCell, {
    key: i,
    c: c,
    today: c.n === 6 && !c.muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md"
  }, "Upcoming"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "var(--text-link)",
      fontWeight: 600,
      fontSize: 14
    }
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, d.appointments.map((a, i) => /*#__PURE__*/React.createElement(UpcomingItem, {
    key: i,
    a: a,
    onNavigate: onNavigate
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "ink",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--mk-blue-100)",
      opacity: 0.8,
      marginBottom: 4
    }
  }, "Today's Capacity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      color: "#fff"
    }
  }, "84% Full"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      height: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,0.2)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: "84%",
      background: "var(--mk-teal-200)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      marginTop: 12,
      color: "var(--mk-blue-100)",
      opacity: 0.7
    }
  }, "2 emergency slots available in the afternoon.")))));
}
window.MK_Schedule = Schedule;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Schedule.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Shell.jsx
try { (() => {
/* App shell: top bar, left rail, mobile bottom bar + page frame.
   Reads design-system primitives off window.<Namespace>. */
const {
  Button,
  IconButton,
  NavItem,
  Avatar,
  StatusPill,
  Badge
} = window.MedKonectDesignSystem_4460c8;
const NAV = [{
  key: "dashboard",
  label: "Overview",
  icon: "dashboard"
}, {
  key: "schedule",
  label: "Appointments",
  icon: "calendar_today"
}, {
  key: "records",
  label: "Medical Records",
  icon: "folder_shared"
}, {
  key: "prescriptions",
  label: "E-Prescriptions",
  icon: "medication"
}, {
  key: "teleconsult",
  label: "Teleconsult",
  icon: "videocam"
}, {
  key: "analytics",
  label: "Analytics",
  icon: "monitoring"
}];
const TOP = [{
  key: "dashboard",
  label: "Dashboard"
}, {
  key: "records",
  label: "Patients"
}, {
  key: "schedule",
  label: "Schedule"
}, {
  key: "prescriptions",
  label: "Pharmacy"
}];
function TopBar({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      background: "var(--glass-nav-bg)",
      backdropFilter: "var(--glass-blur-strong)",
      WebkitBackdropFilter: "var(--glass-blur-strong)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/medkonect-logo.svg",
    alt: "MedKonect",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 24
    },
    className: "mk-topnav"
  }, TOP.map(t => {
    const on = t.key === active;
    return /*#__PURE__*/React.createElement("a", {
      key: t.key,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate(t.key);
      },
      style: {
        fontSize: 14,
        fontWeight: on ? 700 : 500,
        letterSpacing: "0.02em",
        color: on ? "var(--mk-teal-500)" : "var(--text-muted)",
        paddingBottom: 4,
        borderBottom: on ? "2px solid var(--mk-teal-500)" : "2px solid transparent",
        textDecoration: "none",
        transition: "color .2s"
      }
    }, t.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-topsearch",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--surface-variant)",
      borderRadius: 999,
      padding: "8px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 20,
      color: "var(--text-subtle)"
    }
  }, "search"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search records\u2026",
    style: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      width: 150,
      color: "var(--text-body)"
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm",
    icon: "emergency",
    className: "mk-float"
  }, "Emergency"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "notifications",
    label: "Notifications"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "settings",
    label: "Settings"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Eleanor Smith",
    size: "sm",
    ring: true,
    status: "online"
  })));
}
function SideNav({
  active,
  onNavigate
}) {
  const d = window.MK_DATA;
  return /*#__PURE__*/React.createElement("aside", {
    className: "mk-side",
    style: {
      width: 256,
      flex: "none",
      background: "var(--surface-sunken)",
      borderRight: "1px solid var(--border-subtle)",
      padding: 8,
      position: "sticky",
      top: 64,
      height: "calc(100vh - 64px)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--mk-blue-700)"
    }
  }, d.clinician.name.replace("Dr. ", "Dr. "), "'s Portal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, d.clinician.role)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 8px 16px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    block: true,
    icon: "add_circle",
    variant: "tonal",
    onClick: () => onNavigate("teleconsult")
  }, "New Consultation")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      flex: 1
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement(NavItem, {
    key: n.key,
    icon: n.icon,
    active: n.key === active,
    as: "button",
    onClick: () => onNavigate(n.key)
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: "help",
    as: "button"
  }, "Help Center"), /*#__PURE__*/React.createElement(NavItem, {
    icon: "logout",
    as: "button"
  }, "Logout")));
}
function BottomBar({
  active,
  onNavigate
}) {
  const items = [{
    key: "dashboard",
    label: "Home",
    icon: "home"
  }, {
    key: "records",
    label: "Records",
    icon: "medical_services"
  }, {
    key: "teleconsult",
    label: "Consult",
    icon: "chat"
  }, {
    key: "prescriptions",
    label: "E-Rx",
    icon: "medication"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "mk-bottom",
    style: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      display: "none",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "8px 16px",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-lg)"
    }
  }, items.map(i => {
    const on = i.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: i.key,
      onClick: () => onNavigate(i.key),
      style: {
        border: "none",
        background: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        color: on ? "var(--mk-teal-500)" : "var(--text-muted)",
        fontWeight: on ? 700 : 500
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-outlined" + (on ? " is-filled" : "")
    }, i.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontFamily: "var(--font-sans)"
      }
    }, i.label));
  }));
}
function Shell({
  active,
  onNavigate,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-app)"
    },
    className: "mk-page-in"
  }, /*#__PURE__*/React.createElement(TopBar, {
    active: active,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(SideNav, {
    active: active,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("main", {
    className: "mk-main",
    style: {
      flex: 1,
      padding: 32,
      paddingBottom: 96,
      maxWidth: 1280,
      margin: "0 auto",
      width: "100%"
    }
  }, children)), /*#__PURE__*/React.createElement(BottomBar, {
    active: active,
    onNavigate: onNavigate
  }));
}

/* Page header used across screens */
function PageHead({
  eyebrow,
  title,
  subtitle,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 16,
      marginBottom: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--text-link)",
      marginBottom: 8
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "mk-headline-lg"
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "mk-body-md",
    style: {
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, actions));
}
Object.assign(window, {
  MK_Shell: Shell,
  MK_PageHead: PageHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Teleconsult.jsx
try { (() => {
/* Teleconsult / virtual consultation center */
const {
  Card,
  Button,
  IconButton,
  Avatar,
  StatusPill,
  Badge
} = window.MedKonectDesignSystem_4460c8;
function VideoHero({
  joined,
  onJoin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      boxShadow: "var(--shadow-xl)",
      background: "radial-gradient(circle at 25% 20%, rgba(0,139,139,0.45), transparent 45%), linear-gradient(160deg, var(--mk-blue-700), var(--mk-blue-900))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 32,
      background: "var(--scrim-video)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-glass-dark",
    style: {
      padding: "8px 16px",
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "var(--mk-green)"
    },
    className: "mk-pulse-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mk-eyebrow",
    style: {
      color: "#fff",
      fontSize: 12
    }
  }, joined ? "Connected · 00:14" : "Live: Connection Ready")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "more_vert",
    variant: "glass",
    label: "More"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-glass-dark",
    style: {
      padding: 24,
      borderRadius: "var(--radius-xl)",
      borderLeft: "4px solid var(--mk-teal-500)",
      maxWidth: 460,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-eyebrow",
    style: {
      color: "var(--mk-teal-200)",
      marginBottom: 6
    }
  }, "Upcoming Consultation"), /*#__PURE__*/React.createElement("h2", {
    className: "mk-headline-md",
    style: {
      color: "#fff",
      marginBottom: 12
    }
  }, "Patient: Sarah Montgomery"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      marginBottom: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "rgba(255,255,255,0.85)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-300)",
      fontSize: 18
    }
  }, "schedule"), "10:30 AM (In 4 mins)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "rgba(255,255,255,0.85)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-300)",
      fontSize: 18
    }
  }, "clinical_notes"), "Routine Follow-up")), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    icon: "videocam",
    className: joined ? "" : "mk-float",
    variant: joined ? "danger" : "primary",
    onClick: onJoin
  }, joined ? "End Call" : "Join Video Call")), /*#__PURE__*/React.createElement("div", {
    className: "mk-glass-dark mk-selfprev",
    style: {
      width: 150,
      aspectRatio: "4/5",
      borderRadius: "var(--radius-lg)",
      border: "2px solid rgba(255,255,255,0.2)",
      position: "relative",
      display: "flex",
      alignItems: "flex-end",
      padding: 8,
      background: "linear-gradient(160deg, var(--mk-teal-700), var(--mk-blue-800))"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      color: "#fff",
      background: "rgba(0,0,0,0.5)",
      padding: "2px 8px",
      borderRadius: 6
    }
  }, "You")))));
}
function TechTile({
  icon,
  label,
  value,
  tone
}) {
  const bg = {
    green: "var(--status-success-bg)",
    blue: "var(--mk-blue-100)",
    teal: "var(--mk-teal-200)"
  }[tone];
  const fg = {
    green: "var(--mk-green)",
    blue: "var(--mk-blue-700)",
    teal: "var(--mk-teal-600)"
  }[tone];
  return /*#__PURE__*/React.createElement(Card, {
    variant: "flat",
    interactive: true,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: 20,
      borderRadius: "var(--radius-xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "var(--radius-md)",
      background: bg,
      color: fg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, icon)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, value)));
}
function QueueItem({
  p
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "flat",
    interactive: true,
    accent: p.up,
    style: {
      padding: 16,
      borderRadius: "var(--radius-lg)",
      opacity: p.dim ? 0.6 : 1,
      position: "relative",
      overflow: "hidden",
      border: p.up ? "2px solid var(--mk-teal-500)" : "1px solid var(--border-subtle)"
    }
  }, p.up && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      background: "var(--mk-teal-500)",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 12px",
      borderBottomLeftRadius: 8
    }
  }, "UP NEXT"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    shape: "rounded",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "mk-caption",
    style: {
      color: "var(--text-subtle)"
    }
  }, "ID: #", p.id, " \u2022 ", p.reason))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: "var(--surface-raised)",
      padding: "4px 8px",
      borderRadius: "var(--radius-sm)"
    }
  }, p.dur ? `Est. ${p.dur}` : p.time), p.note ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--mk-teal-500)",
      fontWeight: 700,
      fontSize: 12,
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: 14
    }
  }, "bolt"), p.note) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)",
      fontSize: 12,
      fontStyle: p.dim ? "italic" : "normal"
    }
  }, p.wait)));
}
function Teleconsult({
  onNavigate
}) {
  const d = window.MK_DATA;
  const [joined, setJoined] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, window.MK_PageHead({
    title: "Virtual Consultation Center",
    subtitle: "Manage your remote patient care and video appointments.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "tonal",
      icon: "settings_suggest"
    }, "Technical Check"), /*#__PURE__*/React.createElement(Button, {
      icon: "add",
      className: "mk-float"
    }, "New Consultation"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 32
    },
    className: "mk-dashgrid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(VideoHero, {
    joined: joined,
    onJoin: () => setJoined(v => !v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16
    },
    className: "mk-tech3"
  }, /*#__PURE__*/React.createElement(TechTile, {
    icon: "wifi",
    label: "Network Status",
    value: "Stable (45ms)",
    tone: "green"
  }), /*#__PURE__*/React.createElement(TechTile, {
    icon: "mic",
    label: "Audio Source",
    value: "Logitech Headset",
    tone: "blue"
  }), /*#__PURE__*/React.createElement(TechTile, {
    icon: "screen_share",
    label: "Sharing Mode",
    value: "Records View",
    tone: "teal"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "glass",
    style: {
      background: "color-mix(in srgb, var(--mk-container-highest) 30%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mk-headline-md"
  }, "Waiting Queue"), /*#__PURE__*/React.createElement(StatusPill, {
    variant: "solid"
  }, "3 Patients")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, d.queue.map(p => /*#__PURE__*/React.createElement(QueueItem, {
    key: p.id,
    p: p
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    style: {
      marginTop: 20,
      border: "2px dashed var(--border-subtle)"
    },
    onClick: () => onNavigate("schedule")
  }, "View Full Schedule")), /*#__PURE__*/React.createElement(Card, {
    variant: "ink",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mk-eyebrow",
    style: {
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      color: "var(--mk-teal-200)"
    }
  }, "auto_awesome"), "Patient Context (AI)"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      lineHeight: "20px",
      color: "var(--mk-blue-100)"
    }
  }, "Sarah reported increased morning headaches and blurred vision in yesterday's health-kit sync. BP logged at 155/95. Prioritize blood pressure medication review.")))));
}
window.MK_Teleconsult = Teleconsult;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Teleconsult.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/data.js
try { (() => {
/* Shared mock data for the MedKonect portal UI kit.
   Avatars use initials (brand-tinted) so the kit is fully self-contained
   — no external image dependencies. */
window.MK_DATA = {
  clinician: {
    name: "Dr. Eleanor Smith",
    role: "Senior Consultant"
  },
  queue: [{
    id: "AM-9022",
    name: "Sarah Montgomery",
    reason: "Hypertension",
    time: "10:30 AM",
    note: "Arrived",
    up: true,
    dur: "15 min"
  }, {
    id: "MC-4481",
    name: "Michael Chen",
    reason: "Post-Op Check",
    time: "11:00 AM",
    wait: "Waiting 8 mins"
  }, {
    id: "ER-1239",
    name: "Elena Rodriguez",
    reason: "Consultation",
    time: "11:30 AM",
    wait: "Pre-filling intake…",
    dim: true
  }],
  appointments: [{
    name: "Johnathan Miller",
    reason: "Routine Checkup",
    time: "09:30 AM",
    status: "Confirmed",
    variant: "success"
  }, {
    name: "Elena Rodriguez",
    reason: "Consultation",
    time: "11:45 AM",
    status: "Pending",
    variant: "neutral"
  }, {
    name: "Sarah Jenkins",
    reason: "Annual Cardiac Review",
    time: "02:15 PM",
    status: "Confirmed",
    variant: "success"
  }],
  records: [{
    title: "Comprehensive Metabolic Panel",
    date: "24 Sept 2023",
    src: "LabCorp Diagnostics",
    icon: "labs",
    status: "Normal",
    variant: "success",
    ref: "#44012"
  }, {
    title: "Cardiovascular Stress Test",
    date: "12 Aug 2023",
    src: "Apollo Cardiology",
    icon: "ecg_heart",
    status: "Reviewed",
    variant: "info",
    ref: "#39110"
  }, {
    title: "Annual Physical Summary",
    date: "05 Jan 2023",
    src: "General Medicine Unit",
    icon: "description",
    status: "Archived",
    variant: "neutral",
    ref: "#10292"
  }],
  prescriptions: [{
    name: "Jameson, David R.",
    id: "RX-99210",
    age: 42,
    drug: "Atorvastatin Calcium",
    form: "20mg Oral Tablet",
    sig: "1 tablet daily at bedtime",
    qty: "Qty 90 · 3 Refills",
    status: "Active",
    variant: "info",
    date: "Prescribed Oct 12, 2023"
  }, {
    name: "Waters, Sarah L.",
    id: "RX-88432",
    age: 68,
    drug: "Lisinopril-HCTZ",
    form: "20-12.5mg Oral Tablet",
    sig: "1 tablet daily in morning",
    qty: "Qty 30 · 0 Refills",
    status: "Refill Ready",
    variant: "danger",
    date: "Expiring Nov 15, 2023"
  }, {
    name: "Chen, Michael",
    id: "RX-77612",
    age: 29,
    drug: "Amoxicillin",
    form: "500mg Capsule",
    sig: "1 capsule 3× daily",
    qty: "Course 10 days",
    status: "Completed",
    variant: "neutral",
    date: "Finished Sept 30, 2023",
    done: true
  }],
  meds: [{
    name: "Amoxicillin 500mg",
    schedule: "Twice daily · After meals",
    refill: "Refill Ready",
    refillTone: "success"
  }, {
    name: "Lisinopril 10mg",
    schedule: "Once daily · Morning",
    refill: "12 Days Left",
    refillTone: "muted"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
