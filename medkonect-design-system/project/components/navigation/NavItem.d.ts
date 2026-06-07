import * as React from "react";

export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Leading Material Symbols icon name. */
  icon?: string;
  /** Active/current state — tonal teal fill + filled icon. */
  active?: boolean;
  /** Element to render (`a` default, or `button`). */
  as?: "a" | "button";
  href?: string;
  children?: React.ReactNode;
}

/** Left-rail navigation row — icon + label with a tonal-teal active state. */
export function NavItem(props: NavItemProps): React.JSX.Element;
