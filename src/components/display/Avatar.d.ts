import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. If omitted, initials from `name` are shown. */
  src?: string;
  /** Full name — used for the alt text and initials fallback. */
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
  /** `circle` (default) or `rounded` square (used in compact lists). */
  shape?: "circle" | "rounded";
  /** Teal focus ring (e.g. the signed-in clinician). */
  ring?: boolean;
  /** Presence indicator dot. */
  status?: "online" | "busy" | "away";
}

/** Avatar for patients and clinicians — image with initials fallback and optional presence dot. */
export function Avatar(props: AvatarProps): React.JSX.Element;
