Feature: Preset remapeia o shadcn para a marca
  Scenario: Cor primaria do shadcn vira o royal
    Given o preset do pacote
    Then a var shadcn "--primary" aponta para "var(--color-royal)"
    And a var shadcn "--destructive" aponta para "var(--color-danger)"
    And a var shadcn "--background" aponta para "var(--color-paper)"
    And a var shadcn "--radius" aponta para "20px"
