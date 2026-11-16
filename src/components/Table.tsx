import { cn } from "../lib/cn";
import type { ReactNode } from "react";

export interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

/**
 * Table do brand. Cabecalho com label uppercase, radius card no container,
 * linha hover ice. Sem cor de marca no header (label, BRAND.md).
 */
export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn("overflow-hidden rounded-card border border-line bg-paper", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-ice text-left">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-label"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}