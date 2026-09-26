@db @smoke @app2
Feature: App 2 database validation

  Scenario: Order exists in app 2 database
    When I query the app2 test database for order 1001
    Then the app2 database should return order 1001