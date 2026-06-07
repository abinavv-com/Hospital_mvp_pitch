import * as React from "react";

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. `info` = teal (active/live), `success`, `danger`, `neutral`, `solid` = brand blue. */
  variant?: "success" | "danger" | "info" | "neutral" | "solid";
  /** Show a leading status dot. */
  dot?: boolean;
  /** Leading Material Symbols icon (alternative to a dot). */
  icon?: string;
  children?: React.ReactNode;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

/** Colored status chip for record/appointment/prescription states (Active, Refill Ready, Normal…). */
export function StatusPill(props: StatusPillProps): React.JSX.Element;

/** Small count badge — notification counts, "3 Patients", etc. */
export function Badge(props: BadgeProps): React.JSX.Element;
