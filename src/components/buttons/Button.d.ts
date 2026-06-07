import * as React from "react";

/**
 * Props for the MedKonect Button.
 *
 * @startingPoint section="Components" subtitle="Button — all variants & sizes" viewport="700x320"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = teal CTA, `ink` = solid brand blue, `tonal` = soft teal, `outline`, `ghost`, `danger` = emergency red. */
  variant?: "primary" | "ink" | "tonal" | "outline" | "ghost" | "danger";
  /** Height/padding preset. */
  size?: "sm" | "md" | "lg";
  /** Leading Material Symbols icon name (e.g. "add", "videocam"). */
  icon?: string;
  /** Trailing Material Symbols icon name. */
  iconTrailing?: string;
  /** Fill the container width. */
  block?: boolean;
  /** Render as a different element, e.g. "a" for a link button. */
  as?: "button" | "a";
  children?: React.ReactNode;
}

/**
 * Primary interactive control for MedKonect. Teal `primary` is the default CTA;
 * `ink` (brand blue) for high-emphasis confirmations; `danger` reserved for Emergency.
 */
export function Button(props: ButtonProps): React.JSX.Element;
