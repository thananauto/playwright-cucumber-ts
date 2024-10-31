@catalog
Feature: Verify the Udacity catalog scenarios

Background: Launch the application
    Given the application is loaded successfully  

@positive
Scenario: Validate Search Functionality   
    And user search for "Testing"  
    And user clicks on "Skill" Dropdown  
    When user search for "Automation testing" in "Skill" Dropdown  
    Then user sees results matching the search term in the UI  
    And user fetch search results from the UI
    Then the UI results should match the API results 
@negative
Scenario: Invalid Search with No Results 
    When user search for "NonExistentTerm" 
    Then user should see a "No results found" message