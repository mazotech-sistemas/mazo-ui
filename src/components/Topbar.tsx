import { useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface TopbarProps {
  breadcrumb?: ReactNode;
  onSearch?: (q: string) => void;
  notifications?: number;
  user: { nome: string };
}

/**
 * Barra superior do shell: breadcrumb a esquerda, campo de busca, sino de
 * notificacoes e avatar do usuario com dropdown. `h-14` com borda inferior.
 */
export function Topbar({ breadcrumb, onSearch, notifications, user }: TopbarProps) {
  const [aberto, setAberto] = useState(false);
  const iniciais = user.nome.trim().charAt(0).toUpperCase() || "?";

  return (
    <header className="flex h-14 items-center gap-4 border-b border-line bg-paper px-4">
      <div className="min-w-0 flex-1 truncate text-sm text-ink">{breadcrumb}</div>

      <input
        type="search"
        aria-label="Busca"
        placeholder="Buscar..."
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-9 w-56 rounded-input border border-line bg-paper px-3 text-sm text-ink placeholder:text-steel"
      />

      <button
        type="button"
        aria-label="Notificacoes"
        className="relative rounded-input p-2 text-ink hover:bg-ice"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {typeof notifications === "number" && notifications > 0 && (
          <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-pill bg-royal px-1 text-center text-[10px] font-bold text-paper">
            {notifications}
          </span>
        )}
      </button>

      <div className="relative">
        <button
          type="button"
          aria-label={user.nome}
          aria-haspopup="menu"
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-pill bg-navy text-sm font-semibold text-paper"
        >
          {iniciais}
        </button>
        {aberto && (
          <div
            role="menu"
            className={cn(
              "absolute right-0 top-11 z-10 w-44 rounded-card border border-line bg-paper p-1 shadow-lg",
            )}
          >
            <p className="px-3 py-2 text-sm font-semibold text-ink">{user.nome}</p>
            <button
              type="button"
              role="menuitem"
              className="w-full rounded-input px-3 py-2 text-left text-sm text-ink hover:bg-ice"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
