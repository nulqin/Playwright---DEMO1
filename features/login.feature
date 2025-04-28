Feature: Login to SauceDemo
  Scenario: Valid Login
    Given I am on the SauceDemo login page
    When I login with valid credentials "standard_user" and "secret_sauce"
    Then I should see the products page

  Scenario: Invalid Login
    Given I am on the SauceDemo login page
    When I login with invalid credentials "invalid_user" and "wrong_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
