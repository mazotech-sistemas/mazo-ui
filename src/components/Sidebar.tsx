import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  produto: string;
  /** Logo da marca. Obrigatorio no tipo: sem logo = erro de tipo, a marca nunca some do shell. */
  logo: ReactNode;
  sections: NavSection[];
  activeHref?: string;
  footer?: ReactNode;
}

/**
 * Barra lateral do shell. Fixa em `w-64`, com a logo no topo e a navegacao por
 * `sections`. O item cujo `href` bate com `activeHref` ganha o acento royal.
 * `logo` e obrigatorio no tipo; com `sections=[]` a logo continua visivel.
 */
export function Sidebar({ produto, logo, sections, activeHref, footer }: SidebarProps) {
  return (
    <aside
      aria-label={produto}
      className="flex h-full w-64 flex-col border-r border-line bg-paper"
    >
      <div className="flex h-14 items-center border-b border-line px-4">{logo}</div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {sections.map((section, s) => (
          <div key={section.title ?? s} className="mb-4">
            {section.title && (
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-steel">
                {section.title}
              </p>
            )}
            <ul>
              {section.items.map((item) => {
                const ativo = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={ativo ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-input px-2 py-2 text-sm text-ink",
                        ativo ? "bg-ice font-semibold text-royal" : "hover:bg-ice",
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="border-t border-line p-3">{footer}</div>}
    </aside>
  );
}
