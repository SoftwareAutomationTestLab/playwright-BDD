@db @smoke
Feature: Database validation

  Scenario: Order exists in the test database
    When I query the test database for order 1001
    Then the database should return order 1001