Feature: Add and remove items from the cart

  Scenario: Add an item to the cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add the item "Sauce Labs Backpack" to the cart
    Then I should see "Sauce Labs Backpack" in the cart

  Scenario: Remove item from cart
    Given I have "Sauce Labs Backpack" in my cart
    When I remove the item "Sauce Labs Backpack" from the cart
    Then I should not see "Sauce Labs Backpack" in the cart