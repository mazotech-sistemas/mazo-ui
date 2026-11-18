// Steps de tokens e preset. Leem o CSS PUBLICADO em dist/ (rode `npm run build`
// antes), nao o fonte, para provar o que o consumidor realmente recebe.
import { Given, Then } from "@cucumber/cucumber";
import { readFileSync } from "node:fs";

Given("o CSS publicado {string}", function (arquivo) {
  this.css = readFileSync("dist/" + arquivo, "utf8");
});

Then("ele define {string} como {string}", function (token, valor) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(esc(token) + ":\\s*" + esc(valor), "i").test(this.css)) {
    throw new Error(token + " nao e " + valor + " no CSS publicado");
  }
});

Then("ele declara {string}", function (trecho) {
  if (!this.css.includes(trecho)) throw new Error('faltou "' + trecho + '"');
});

Then("ele nao declara {string}", function (trecho) {
  if (this.css.includes(trecho)) throw new Error('nao devia conter "' + trecho + '"');
});

Then("ele importa {string}", function (arquivo) {
  if (!this.css.includes('@import "' + arquivo + '"')) throw new Error("nao importa " + arquivo);
});
