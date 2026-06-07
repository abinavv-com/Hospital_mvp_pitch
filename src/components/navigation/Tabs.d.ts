import * as React from "react";

export interface TabItem { value: string; label: string; }

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Tabs as strings or {value,label}. */
  tabs?: (string | TabItem)[];
  /** Active tab value. */
  value?: string;
  onChange?: (value: string) => void;
  /** `underline` (teal underline) or `segmented` (blue pill group). */
  variant?: "underline" | "segmented";
}

/** Tab switcher — teal underline for in-page filters (All/Active/Completed) or segmented pill for view toggles (Day/Week/Month). */
export function Tabs(props: TabsProps): React.JSX.Element;
