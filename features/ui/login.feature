@ui @smoke
Feature: Login

  Scenario: Valid user can login
    Given I open the Sauce Demo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  @regression
  Scenario: Invalid user cannot login
    Given I open the Sauce Demo login page
    When I login with username "standard_user" and password "wrong_password"
    Then I should see a login error