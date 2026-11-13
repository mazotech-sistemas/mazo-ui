Feature: Shell com marca Mazotech
  Scenario: Todo produto mostra a marca na sidebar
    Given um AppShell do produto "mazo-cobranca"
    When a tela monta
    Then o simbolo Mazotech aparece na sidebar
    And o nome do produto "mazo-cobranca" aparece
