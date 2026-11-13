// Steps do cenario "Shell com marca Mazotech".
//
// O cucumber roda em Node puro (sem o ambiente jsdom do vitest), entao um hook
// BeforeAll monta um DOM com jsdom e o expoe como global antes de qualquer
// cenario. So assim o `render` da Testing Library tem um `document` de verdade
// para montar o AppShell. Os componentes vem do build (`dist/index.js`): o BDD
// exerce o pacote publicado, nao o fonte. Rode `npm run build` antes do
// `npm run test:bdd`.
import { Given, When, Then, BeforeAll } from "@cucumber/cucumber";
import { JSDOM } from "jsdom";
import React from "react";
import { render } from "@testing-library/react";
import { AppShell, Sidebar, Logo } from "../../dist/index.js";

BeforeAll(function () {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost/",
    pretendToBeVisual: true,
  });
  global.window = dom.window;
  global.document = dom.window.document;
  // global.navigator e um getter read-only no Node 22; define via descriptor.
  Object.defineProperty(global, "navigator", {
    value: dom.window.navigator,
    configurable: true,
    writable: true,
  });
  global.HTMLElement = dom.window.HTMLElement;
  global.Node = dom.window.Node;
  global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

Given("um AppShell do produto {string}", function (produto) {
  this.produto = produto;
  this.sidebar = React.createElement(Sidebar, {
    produto,
    logo: React.createElement(Logo, { nome: produto }),
    sections: [
      { title: "GERAL", items: [{ href: "/", label: "Painel", icon: null }] },
    ],
    activeHref: "/",
  });
});

When("a tela monta", function () {
  render(
    React.createElement(AppShell, { sidebar: this.sidebar }, "conteudo"),
  );
});

Then("o simbolo Mazotech aparece na sidebar", function () {
  const sidebar = document.querySelector('aside[aria-label="' + this.produto + '"]');
  if (!sidebar) throw new Error("sidebar nao encontrada no shell");
  const svg = sidebar.querySelector('svg[aria-label="Mazotech"]');
  if (!svg) throw new Error("o simbolo Mazotech nao aparece na sidebar");
});

Then("o nome do produto {string} aparece", function (produto) {
  // Procura o texto no DOM montado. `screen` do testing-library liga em
  // document.body no import (antes do jsdom existir), entao consultamos o
  // document global diretamente.
  const nos = Array.from(document.body.querySelectorAll("*"));
  const achou = nos.some((el) =>
    Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && n.textContent.trim() === produto,
    ),
  );
  if (!achou) throw new Error('o nome do produto "' + produto + '" nao aparece');
});
