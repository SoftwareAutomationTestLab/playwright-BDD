@ui @smoke @app3
Feature: App 3 login

  Scenario: Valid user can login to app 3
    Given I open the app3 login page
    When I login to app3 with username "standard_user" and password "secret_sauce"
    Then I should see the app3 products page

  @regression
  Scenario: Invalid user cannot login to app 3
    Given I open the app3 login page
    When I login to app3 with username "standard_user" and password "wrong_password"
    Then I should see an app3 login error