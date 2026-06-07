import * as React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Options as strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  /** Disabled first option shown when nothing is chosen. */
  placeholder?: string;
}

/** Native dropdown styled to match Input — sunken fill, teal focus ring, chevron affordance. */
export function Select(props: SelectProps): React.JSX.Element;
