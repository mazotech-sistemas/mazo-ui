# Componentes

Todos saem de `@mazotech/ui`. Cada seção traz a assinatura, um exemplo e a regra de marca que o componente carrega.

## Logo

```tsx
<Logo nome="mazo-cobranca" />               // símbolo + nome
<Logo nome="mazo-cobranca" variant="symbol" /> // só o símbolo
```

- `nome: string` é obrigatório e é o nome do produto, nunca o título genérico "Mazotech".
- Com `nome=""` o símbolo continua aparecendo. A marca não some.

## Sidebar

```tsx
<Sidebar
  produto="mazo-cobranca"
  logo={<Logo nome="mazo-cobranca" />}
  sections={[{ title: "GERAL", items: [{ href: "/", label: "Painel" }] }]}
  activeHref="/"
  footer={<span>v1.0</span>}
/>
```

- `logo` é obrigatório no tipo. Sem logo o código não compila.
- `NavItem = { href; label; icon? }` e `NavSection = { title?; items }`.
- O item cujo `href` bate com `activeHref` ganha `aria-current="page"` e o texto royal.
- Com `sections={[]}` a logo continua no topo.

## Topbar

```tsx
<Topbar breadcrumb="Painel / Contratos" user={{ nome: "Ana" }} notifications={3} onSearch={(q) => buscar(q)} />
```

- `user.nome` é obrigatório. O avatar mostra a inicial, ou `?` quando o nome vem em branco.
- O contador só aparece com `notifications` maior que zero.
- O avatar abre um menu com a ação "Sair".

## AppShell

```tsx
<AppShell sidebar={<Sidebar ... />} topbar={<Topbar ... />}>
  conteúdo
</AppShell>
```

- Monta o grid claro: sidebar de 16rem, topbar opcional e `<main>` para o conteúdo.
- O `AppShell` já renderiza o `<main>`. Não coloque outro `<main>` dentro dele.

## Card

```tsx
<Card>conteúdo</Card>
<Card variant="hero">bloco navy</Card>
```

- Padrão: fundo paper, borda line, raio 20px.
- `hero` é o único lugar onde o navy aparece como bloco.

## Stat

```tsx
<Stat label="RECEBIDO" value="R$ 5.799,00" tone="go" icon={<Icone />} />
```

- `value` sai em JetBrains Mono tabular. `tone`: `brand` (royal, padrão), `go`, `warn`, `danger`.

## Badge

```tsx
<Badge tone="ok">pago</Badge>
```

| tone | Cor | Use para |
|------|-----|----------|
| `ok` | mint | pago, concluído |
| `go` | verde | ativo, aberto |
| `warn` | âmbar | pendente |
| `danger` | vermelho | atrasado, erro |
| `info` | royal | informativo |
| `neutral` | steel sobre ice | rascunho, inativo |

- `tone` é obrigatório. Um valor fora da lista (forçado com `as`) cai no estilo neutral.

## Button

```tsx
<Button>Criar contrato</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Ver mais</Button>
```

- `primary` (padrão) é o pill royal. Use um por tela, é o CTA.
- `secondary` tem borda e fundo paper. `ghost` é só texto royal.
- Aceita todos os atributos de `<button>` e encaminha o `ref`.

## Input e Select

```tsx
<Input placeholder="Nome" />
<Select><option>Mensal</option></Select>
```

- Raio 12px, borda line, foco com anel royal. Aceitam os atributos nativos e o `ref`.

## Table

```tsx
<Table headers={["ID", "Nome"]}>
  <tr><td>1</td><td>Ana</td></tr>
</Table>
```

- A `Table` já renderiza `<thead>` e `<tbody>`. Passe só as `<tr>` como filhos.
- Passar um `<tbody>` próprio aninha dois `tbody`, quebra a hidratação do React e o browser reclama no console.
- O cabeçalho usa a cor `label` em caixa alta.
