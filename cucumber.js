// Config do cucumber-js. O profile `default` roda os cenarios de comportamento
// dos componentes do @mazotech/ui a partir de `features/`, com os steps e o
// suporte carregados de `features/steps` e `features/support`. Formato pretty
// via @cucumber/pretty-formatter. Os cenarios chegam nas proximas tasks; por
// ora a estrutura existe para a fiacao nao achar 0 cenarios por falta de config.

export default {
  require: ["features/steps/**/*.js", "features/support/**/*.js"],
  paths: ["features/**/*.feature"],
  format: ["@cucumber/pretty-formatter"],
};
