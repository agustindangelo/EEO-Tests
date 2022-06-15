///<reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('Happy paths for loging in and loging out', () => {
    const login = new Login()
    const events = new Events()

    it('should log in', () => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        cy.url().should('include', 'events')
        events.clickUserOption()
        events.userName.should('have.text', Cypress.env('USER_NAME'))
    })

    it('should log out', () => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        events.logOut()
        cy.url().should('include', 'login')
    })

    it('login using the API', () => {
        cy.request('POST', 'http://localhost:4000/', {
            "operationName": "LoginMutation",
            "variables": {
                "input": {
                    "email": Cypress.env('USER_EMAIL'),
                    "password": Cypress.env('USER_PASSWORD')
                }
            },
            "query": "mutation LoginMutation($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      name\n      email\n      __typename\n    }\n    authentication {\n      token\n      __typename\n    }\n    __typename\n  }\n}\n"
        }).then(res => {
            localStorage.setItem(
               'authData' , JSON.stringify({"name": res.body.data.login.user.name,"token": res.body.data.login.authentication.token,"email": res.body.data.login.user.email})
            )
        })
        events.navigate()
    })

})