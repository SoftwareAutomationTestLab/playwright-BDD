@ui @smoke @app2
Feature: App 2 login

  Scenario: Valid user can login to app 2
    Given I open the app2 login page
    When I login to app2 with username "standard_user" and password "secret_sauce"
    Then I should see the app2 products page

  @regression
  Scenario: Invalid user cannot login to app 2
    Given I open the app2 login page
    When I login to app2 with username "standard_user" and password "wrong_password"
    Then I should see an app2 login error