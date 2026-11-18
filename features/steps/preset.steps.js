import { Given, Then } from "@cucumber/cucumber";
import preset from "../../dist/tailwind-preset.js";

Given("o preset do pacote", function () {
  this.preset = preset;
});

Then("a var shadcn {string} aponta para {string}", function (chave, valor) {
  const atual = this.preset.shadcnVars[chave];
  if (atual !== valor) throw new Error(chave + " e " + atual + ", esperado " + valor);
});
