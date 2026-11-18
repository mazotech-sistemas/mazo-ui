Feature: Botao e logo seguem a marca
  Scenario: Botao primario e um pill royal
    Given um Button primario com texto "Criar contrato"
    Then o botao e um pill
    And o botao usa o royal

  Scenario: A logo mostra o simbolo mesmo com nome vazio
    Given uma Logo com nome ""
    Then o simbolo Mazotech aparece na logo
