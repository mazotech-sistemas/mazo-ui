// Steps do cenario "Badge de status com a paleta da marca".
//
// O Badge e montado no DOM jsdom do BeforeAll do shell.steps.js (mesmo
// global). Como o Badge e um elemento span, o render e feito diretamente
// em document.body, sem AppShell. O BDD exerce o pacote publicado
// (dist/index.js): roda `npm run build` antes do `npm run test:bdd`.
import { Given, Then } from "@cucumber/cucumber";
import React from "react";
import { render } from "@testing-library/react";
import { Badge } from "../../dist/index.js";

Given("um Badge com tone {string} e texto {string}", function (tone, texto) {
  this.badgeTone = tone;
  this.badgeTexto = texto;
  render(React.createElement(Badge, { tone }, texto));
});

Then("a classe do badge referencia o token mint", function () {
  const span = document.body.querySelector("span");
  if (!span) throw new Error("badge nao foi montado");
  const cls = span.className || "";
  if (!cls.includes("mint")) {
    throw new Error('classe do badge nao referencia o token mint: "' + cls + '"');
  }
});

Then("o badge e um pill arredondado", function () {
  const span = document.body.querySelector("span");
  if (!span) throw new Error("badge nao foi montado");
  const cls = span.className || "";
  if (!cls.includes("rounded-full")) {
    throw new Error('badge nao e um pill arredondado: "' + cls + '"');
  }
});