import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Material Symbols icon name. */
  icon: string;
  size?: "sm" | "md" | "lg";
  /** `plain` (transparent), `solid` (brand blue), `glass` (dark overlay for media). */
  variant?: "plain" | "solid" | "glass";
  /** Use the filled icon axis. */
  filled?: boolean;
  /** Accessible label (also the tooltip). */
  label?: string;
}

/** Circular icon-only control — header actions (notifications, settings) and media overlays. */
export function IconButton(props: IconButtonProps): React.JSX.Element;
