# @mazotech/ui

Design system compartilhado da Mazotech. Reúne os tokens da marca e os componentes React que os frontends do hub usam.

Os valores vêm do `kit/mazo-kit-comercial/BRAND.md`, que é a fonte única da marca. Quando a marca mudar, o ajuste começa no BRAND.md e depois é copiado para cá.

## Como consumir

O pacote não está em registry npm. Cada produto fixa um commit por git, igual ao pin do `mazo-core`:

```json
{
  "dependencies": {
    "@mazotech/ui": "git+https://github.com/mazotech-sistemas/mazo-ui.git#<hash>"
  }
}
```

O script `prepare` roda o tsup na instalação, porque `dist/` não é versionado. Para subir de versão, troque o hash depois que o commit estiver no remote.

No CSS do produto (Tailwind 4), duas linhas bastam:

```css
@import "tailwindcss";
@import "@mazotech/ui/styles.css";
```

O `styles.css` traz tokens, tema e camada shadcn, e manda o Tailwind escanear as classes dos componentes do pacote. Sem ele, `rounded-full` e `bg-royal` não entram no CSS do consumidor. O teste `tests/system/consumo.test.ts` monta um projeto isolado para provar isso.

As fontes são opt-in. Quem não carrega as próprias adiciona `@import "@mazotech/ui/fonts.css";`, que declara Inter e JetBrains Mono e define `--font-inter` e `--font-jet`. Quem usa `next/font` (como o mazo-site) não importa esse arquivo, senão o pacote sobrescreve as variáveis do Next e o Inter é baixado duas vezes.

Requisitos do consumidor: React 19 e Tailwind 4.

## O que o pacote exporta

- Componentes: `AppShell`, `Sidebar`, `Topbar`, `Logo`, `Card`, `Stat`, `Badge`, `Button`, `Input`, `Select`, `Table`. A assinatura de cada um está em `docs/components.md`.
- CSS: `styles.css` (entrada única, sem fontes), `tokens.css`, `theme.css`, `shadcn.css`, `fonts.css` (opt-in).
- `tailwind-preset`: objeto `shadcnVars` com o remapeamento do shadcn para a marca.
- `assets/`: lockup e símbolo em SVG, mais os TTF de Inter e JetBrains Mono.

## Regras de marca que o código impõe

- Base clara. O navy só aparece em bloco (`Card variant="hero"`). Não existe tema escuro.
- O royal é o único acento de cada tela. O mint é raro e marca status ok ou pago.
- A logo é obrigatória. `Sidebar` exige a prop `logo`, e o `Logo` mostra o símbolo mesmo com `nome=""`.
- Raio: card 20px, input 12px, pill 9999px (só no botão primário).
- Nenhum hex fora dos tokens. Use as classes (`bg-royal`, `text-ink`) e nunca o valor.

## Scripts

| Script | O que roda |
|--------|-----------|
| `npm run build` | tsup: ESM, tipos e cópia dos CSS para `dist/` |
| `npm run test:unit` | vitest com Testing Library, um arquivo por componente |
| `npm run test:bdd` | cucumber-js, lê o `dist/` publicado (rode o build antes) |
| `npm run test:system` | vitest em `tests/system`, consome o pacote como um projeto externo |
| `npm run test:e2e` | Playwright contra o `demo/`, que sobe sozinho na porta 3100 |

Para conferir o visual, rode `npm --prefix demo run dev -- -p 3100` e abra `/ui`.

## Onde o código mora

O repositório é `mazotech-sistemas/mazo-ui`. No hub, `libs/mazo-ui` é só o ponteiro do submódulo. Todo arquivo novo nasce aqui. Arquivo versionado dentro de `libs/mazo-ui` pelo lado do hub reprova o gate. A ordem é: commit e push aqui, depois o bump do ponteiro no hub.
