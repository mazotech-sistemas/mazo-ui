"use client";

import { AppShell, Logo, Sidebar, Topbar, Card, Stat, Badge, Button, Table } from "@mazotech/ui";

const navSections = [
  { title: "Principal", items: [
    { label: "Dashboard", href: "/ui" },
    { label: "Relatórios", href: "/ui/reports" },
  ]},
  { title: "Configurações", items: [
    { label: "Perfil", href: "/ui/profile" },
    { label: "Equipe", href: "/ui/team" },
  ]},
];

const user = { nome: "Demo User" };

const stats = [
  { label: "Usuários Ativos", value: "2.431" },
  { label: "Receita Mensal", value: "R$ 48.200" },
  { label: "Churn Rate", value: "2.1%" },
];

const headers = ["ID", "Nome", "Status", "Valor"];

const rows = [
  { id: "1", nome: "João Silva", status: "pago", valor: "R$ 500" },
  { id: "2", nome: "Maria Santos", status: "aberto", valor: "R$ 1.200" },
  { id: "3", nome: "Pedro Costa", status: "pendente", valor: "R$ 750" },
  { id: "4", nome: "Ana Lima", status: "atrasado", valor: "R$ 300" },
];

export default function UIDemo() {
  return (
    <AppShell
      sidebar={<Sidebar produto="mazo-demo" logo={<Logo nome="mazo-demo" />} sections={navSections} />}
      topbar={<Topbar user={user} />}
    >
      <div className="space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-extrabold tracking-[-0.02em] text-ink">
            Componentes do Design System
          </h1>
          <Button variant="primary">Criar novo</Button>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-4">Stats</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <Card key={s.label} className="p-4">
                <Stat
                  label={s.label}
                  value={s.value}
                  tone="brand"
                />
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-4">Tabela com Badges</h2>
          <Card className="p-4">
            <Table headers={headers}>
              <>
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-ice">
                    <td className="px-4 py-3 text-sm font-mono tabular-nums text-steel">{r.id}</td>
                    <td className="px-4 py-3 text-sm text-ink">{r.nome}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge tone={r.status === "pago" ? "ok" : r.status === "aberto" ? "go" : r.status === "pendente" ? "warn" : "danger"}>
                        {r.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono tabular-nums text-ink">{r.valor}</td>
                  </tr>
                ))}
              </>
            </Table>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-4">Camada shadcn remapeada</h2>
          <div className="flex gap-3">
            <div data-testid="shadcn-primary" className="h-10 w-24 rounded-input bg-primary" />
            <div data-testid="shadcn-destructive" className="h-10 w-24 rounded-input bg-destructive" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-4">Badges por tom</h2>
          <div className="flex flex-wrap gap-2">
            <Badge tone="ok">ok</Badge>
            <Badge tone="go">go</Badge>
            <Badge tone="warn">warn</Badge>
            <Badge tone="danger">danger</Badge>
            <Badge tone="info">info</Badge>
            <Badge tone="neutral">neutral</Badge>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
