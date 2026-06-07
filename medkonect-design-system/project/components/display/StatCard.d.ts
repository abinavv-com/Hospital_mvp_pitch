import * as React from "react";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase metric label. */
  label: string;
  /** The big number/value. */
  value: React.ReactNode;
  /** Value color. */
  tone?: "blue" | "teal" | "red";
  /** Optional trend caption (e.g. "4% from last week"). */
  trend?: string;
  trendDir?: "up" | "down";
  /** Optional Material Symbols icon shown in a teal circle. */
  icon?: string;
  interactive?: boolean;
}

/** Dashboard bento metric tile — large numeral with label, optional trend + icon. */
export function StatCard(props: StatCardProps): React.JSX.Element;
