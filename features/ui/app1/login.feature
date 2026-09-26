@ui @smoke @app1
Feature: App 1 login

  Scenario: Valid user can login
    Given I open the app1 login page
    When I login to app1 with username "standard_user" and password "secret_sauce"
    Then I should see the app1 products page

  @regression
  Scenario: Invalid user cannot login
    Given I open the app1 login page
    When I login to app1 with username "standard_user" and password "wrong_password"
    Then I should see an app1 login error