# @mazotech/ui

Design system compartilhado da Mazotech. Reúne os tokens de marca e os componentes React usados pelos produtos e sites do monorepo hub.

## O que é

O pacote `@mazotech/ui` publica dois tipos de artefato:

- Tokens de design (cores, tipografia, espaçamento, raio) expostos como CSS em `tokens.css` e `theme.css`.
- Componentes React prontos para consumo, exportados a partir de `dist/index.js`.

Os valores dos tokens vêm do `BRAND.md` verbatim. O `BRAND.md` é a fonte única da marca; este pacote só transcreve esses valores para CSS e TypeScript. Quando a marca mudar, o ajuste começa no `BRAND.md` e depois é refletido aqui, nunca o contrário.

## Como consumir

O consumo é por git mais hash, do mesmo jeito que o `mazo-core`. Você não instala de um registry npm público. No `package.json` do produto, aponte a dependência para o repositório e fixe um commit:

```json
{
  "dependencies": {
    "@mazotech/ui": "git+https://github.com/mazotech-sistemas/mazo-ui.git#<hash-do-commit>"
  }
}
```

Fixar o hash garante build reprodutível. Para subir de versão, troque o hash pelo commit novo depois que ele estiver no remote.

## Regra de ouro: todo conteúdo vive neste repositório

Este pacote entra no hub como submódulo em `libs/mazo-ui`. O diretório `libs/mazo-ui` dentro do hub é só o ponteiro do submódulo. Todo código, token e componente mora aqui, no repositório `mazotech-sistemas/mazo-ui`.

Nunca crie arquivo solto dentro de `libs/mazo-ui` no hub. Arquivo fora do submódulo quebra o modelo do monorepo e o gate (`bash tools/gates.sh`) reprova. O fluxo correto é: commitar e dar push aqui, e depois registrar o bump do ponteiro no hub.

## Scripts

- `npm run build`: gera o `dist/` com tsup (JS, tipos e CSS).
- `npm test`: roda a suíte com vitest.
- `npm run test:watch`: roda o vitest em modo watch.
