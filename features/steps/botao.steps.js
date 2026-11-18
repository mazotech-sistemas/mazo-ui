import { Given, Then } from "@cucumber/cucumber";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Button, Logo } from "../../dist/index.js";

Given("um Button primario com texto {string}", function (texto) {
  cleanup();
  render(React.createElement(Button, { variant: "primary" }, texto));
  this.botao = document.body.querySelector("button");
});

Then("o botao e um pill", function () {
  if (!this.botao.className.includes("rounded-full")) throw new Error("botao nao e pill: " + this.botao.className);
});

Then("o botao usa o royal", function () {
  if (!/\bbg-royal\b/.test(this.botao.className)) throw new Error("botao nao usa royal: " + this.botao.className);
});

Given("uma Logo com nome {string}", function (nome) {
  cleanup();
  render(React.createElement(Logo, { nome }));
});

Then("o simbolo Mazotech aparece na logo", function () {
  if (!document.body.querySelector('svg[aria-label="Mazotech"]')) throw new Error("simbolo ausente");
});
