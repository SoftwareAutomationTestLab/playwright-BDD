@db @smoke @app3
Feature: App 3 database validation

  Scenario: Order exists in app 3 database
    When I query the app3 test database for order 1001
    Then the app3 database should return order 1001