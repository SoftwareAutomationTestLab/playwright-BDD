@db @smoke @app1
Feature: App 1 database validation

  Scenario: Order exists in app 1 database
    When I query the app1 test database for order 1001
    Then the app1 database should return order 1001