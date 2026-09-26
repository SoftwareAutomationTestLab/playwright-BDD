@api @smoke
Feature: API validation

  Scenario: Get a post
    When I send a GET request for post 1
    Then the API response status should be 200
    And the API response should contain title "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"