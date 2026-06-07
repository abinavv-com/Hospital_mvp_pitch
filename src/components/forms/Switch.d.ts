import * as React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Inline label to the right of the toggle. */
  label?: string;
}

/** Binary on/off toggle. Teal when on; thumb eases with a slight bounce. */
export function Switch(props: SwitchProps): React.JSX.Element;
