import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label rendered above the control (uppercase eyebrow style). */
  label?: string;
  /** Leading Material Symbols icon name (e.g. "search", "person_search"). */
  icon?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; turns the field red and overrides `hint`. */
  error?: string;
  /** Fully-rounded pill shape — used for inline search fields in the top bar. */
  pill?: boolean;
}

/** Single-line text input. Sunken fill, teal focus ring; supports leading icon, hint and error states. */
export function Input(props: InputProps): React.JSX.Element;
