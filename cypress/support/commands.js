<<<<<<< HEAD
///<reference types="Cypress" />

Cypress.Commands.add('login', (email, password) => {
    cy.request("POST", `http://localhost:4000/login`, {
        "operationName": "LoginMutation",
        "variables": {
            "input": {
                "email": email,
                "password": password
            }
        },
        "query": "mutation LoginMutation($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      name\n      email\n      __typename\n    }\n    authentication {\n      token\n      __typename\n    }\n    __typename\n  }\n}\n"
    });
    cy.visit('/events')
})

=======
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginByApi", (username, password = Cypress.env("defaultPassword")) => {
  return cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
    username,
    password,
  });
});
>>>>>>> bbc8d8b9700906976741a512385e8e43ebe2e848
