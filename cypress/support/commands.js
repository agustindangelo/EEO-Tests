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

