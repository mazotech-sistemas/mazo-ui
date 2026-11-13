import type { ReactNode } from "react";

export interface AppShellProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
}

/**
 * Esqueleto do produto: grid claro (fundo paper) compondo a sidebar fixa a
 * esquerda, a topbar opcional no topo e o conteudo em `<main>`.
 */
export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  return (
    <div className="grid h-screen grid-cols-[16rem_1fr] bg-paper text-ink">
      <div className="row-span-2">{sidebar}</div>
      <div className="flex min-w-0 flex-col">
        {topbar}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
