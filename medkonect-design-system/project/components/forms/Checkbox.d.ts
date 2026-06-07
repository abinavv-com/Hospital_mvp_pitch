import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Inline label to the right of the box. */
  label?: string;
}

/** Square checkbox; fills teal with a bouncy checkmark when selected. */
export function Checkbox(props: CheckboxProps): React.JSX.Element;
