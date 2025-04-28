Feature: Checkout Process

  Scenario: Successful checkout with valid information
    Given I am logged in as "standard_user" with password "secret_sauce" and have "Sauce Labs Backpack" in my cart
    When I proceed to checkout
    And I enter checkout information "John", "Doe", and "12345"
    And I continue to the overview
    And I finish the checkout
    Then I should see the order confirmation message "THANK YOU FOR YOUR ORDER"