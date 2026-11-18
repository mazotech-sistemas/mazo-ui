Feature: Tokens da marca no CSS publicado
  Scenario: O tema publicado traz as cores exatas do BRAND
    Given o CSS publicado "theme.css"
    Then ele define "--color-navy" como "#021D44"
    And ele define "--color-royal" como "#0052FA"
    And ele define "--color-mint" como "#00DEB2"
    And ele define "--radius-card" como "20px"

  Scenario: Os tokens publicados declaram base clara, sem dark total
    Given o CSS publicado "tokens.css"
    Then ele declara "color-scheme: light"
    And ele nao declara "prefers-color-scheme: dark"

  Scenario: A entrada unica reune tokens, tema, shadcn e fontes
    Given o CSS publicado "styles.css"
    Then ele importa "./tokens.css"
    And ele importa "./theme.css"
    And ele importa "./shadcn.css"
    And ele importa "./fonts.css"
