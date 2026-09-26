@api @smoke @API-Group2
Feature: API Group 2 validation

  Scenario: Get a post from API Group 2
    When I send an API Group 2 GET request for post 1
    Then the API Group 2 response status should be 200
    And the API Group 2 response should contain title "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"