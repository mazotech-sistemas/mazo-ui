Feature: Badge de status com a paleta da marca

  Scenario: Status pago usa o mint, nao outra cor
    Given um Badge com tone "ok" e texto "PAGO"
    Then a classe do badge referencia o token mint

  Scenario: Status aberto usa o verde de status
    Given um Badge com tone "go" e texto "ABERTA"
    Then o badge e um pill arredondado