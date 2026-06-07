import * as React from "react";

/**
 * Props for Card — the core surface container. Composes every panel, queue item and bento tile.
 *
 * @startingPoint section="Components" subtitle="Card — surface variants" viewport="700x300"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `tactile` (default, soft raised), `flat`, `glass` (frosted),
   * `ink` (dark brand-blue, white text — AI/teleconsult panels), `sunken`.
   */
  variant?: "tactile" | "flat" | "glass" | "ink" | "sunken";
  /** Adds pointer cursor + hover lift. */
  interactive?: boolean;
  /** Teal left-border accent (e.g. "up next" / summary cards). */
  accent?: boolean;
  children?: React.ReactNode;
}

/** The core surface container. Composes every panel, queue item and bento tile. */
export function Card(props: CardProps): React.JSX.Element;
