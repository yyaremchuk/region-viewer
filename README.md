# RegionViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

1. Style guide
   I kept some styling provided by Angular CLI.
   For layout I used flex-box to make the page responsive.

2. CSS coding standard
   I used Google HTML/CSS Style Guide

3. Installation instructions
   To install and run the app follow these steps:

   - Clone the GitHub repo
   - In the project folder run 'npm install'
   - Run 'ng serve'
   - Use 'ng test' command to run unit tests

4. How the application works
   When the page is loaded there are 2 drop downs: one for region with 2 options (Europe and Asia)
   and another one for selecting country (initially disabled).

When user selects a region the API call is triggered to fetch the list of countries.
If countries have been loaded already then API call is skipped.

When user selects the country from the second dropdown country related information displayed below in a simple table format.

5. What else I would have done
   If I have enough time I would:
   - add more unit tests to cover NGRX and components;
   - add proper error handling (extract useful information from the error object, set in to the store and then display on the page)
