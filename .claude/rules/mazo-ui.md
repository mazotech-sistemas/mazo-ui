---
paths:
  - "**"
---

# Regras do repositório mazo-ui

Pacote `@mazotech/ui`: tokens da marca e componentes React. Lido por agente barato, então as regras são literais.

## Teste primeiro, sempre

Nenhuma linha de produção sem teste que você viu falhar antes. Rode as quatro camadas e cite a linha de sumário de cada uma:

```bash
npm run build && npm run test:unit && npm run test:bdd && npm run test:system && npm run test:e2e
```

- O BDD e o system test leem `dist/`. Rode o build antes.
- Componente novo ganha teste unit e cenário `.feature`. Os steps ficam em pt-BR e as palavras-chave do Gherkin em inglês.
- O e2e sobe o `demo/` na porta 3100. Não use a 3000, outros projetos ocupam.
- Alegar verde sem a linha `N passed` ou `N scenarios` não vale.

## Anti-padrões que o gate do dono reprova

- Hex solto em componente, demo ou teste de componente. Use os tokens. Os hex ficam só em `src/theme.css`.
- Shell sem logo. `Sidebar` exige `logo` e o `Logo` nunca esconde o símbolo.
- Fundo escuro total, gradiente roxo e rosa, brilho, vidro sobre cor chapada. O BRAND.md proíbe.
- Mais de um acento royal por tela, ou mint em decoração. Mint marca status.
- `<main>` dentro do `AppShell`, ou `<tbody>` dentro da `Table`. Os dois já existem por dentro.
- Copiar tokens para o `tailwind.config` de um consumidor. O consumidor importa `@mazotech/ui/styles.css`.
- Mexer em `libs/mazo-ui` pelo hub. Todo código nasce neste repositório.

## Arquivos que andam juntos

`src/tailwind-preset.ts` (objeto `shadcnVars`) e `src/shadcn.css` espelham o mesmo remapeamento. O teste `src/shadcn.test.ts` falha se um mudar sem o outro. Cor nova entra em `src/theme.css` e ganha linha em `src/tokens.test.ts`.

Todo CSS novo precisa de uma linha em `tsup.config.ts` (cópia para `dist/`) e uma entrada em `exports` do `package.json`.

## Publicar

1. Suíte inteira verde.
2. `npm audit --omit=dev` com 0 vulnerabilidades (é o que chega ao consumidor). O audit completo ainda acusa 7 altas em tsup, vite e vitest, todas pelo `picomatch@4.0.7` (ReDoS, advisory GHSA-fc5q-39xc-vjpf), que é a última versão publicada e não tem correção. O `mazo-site` carrega o mesmo vite. Reavalie quando sair `picomatch` novo.
3. Commit pt-BR, uma linha, imperativo, sem prefixo, sem emoji, sem atribuição de IA.
4. Push no repositório mazo-ui.
5. Só depois, no hub: bump do ponteiro de `libs/mazo-ui`, `docs/products/mazo-ui.md` e linha em `docs/HANDOFF.md`.

Nunca `git add -A`. Liste os caminhos. Não versione `dist/`, `node_modules`, `demo/.next`, `playwright-report` nem `test-results`.
