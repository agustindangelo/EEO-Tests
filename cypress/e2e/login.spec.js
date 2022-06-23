///<reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'
import { describe } from 'mocha'
import { getRandomEmail } from '../support/util.js';

describe('Login tests', () => {

    const login = new Login()
    const events = new Events()

    describe(['Login'],'Happy paths for logging in and logging out',()=>{
        it(['HappyPath'],'should log in', () => {
            login.navigate()
            login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
            cy.url().should('include', 'events')
            events.clickUserOption()
            events.userName.should('have.text', Cypress.env('USER_NAME'))
        })
    
        it(['HappyPath'],'should log out', () => {
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
                "query": `
                    mutation LoginMutation($input: LoginInput!) {
                        login(input: $input) {
                            user {
                                name
                                email
                            }
                            authentication {
                                token
                            }
                        }
                    }`
            }).then(res => {
                localStorage.setItem(
                   'authData' , JSON.stringify({
                        "name": res.body.data.login.user.name,
                        "token": res.body.data.login.authentication.token,
                        "email": res.body.data.login.user.email
                    })
                )
            })
            events.navigate()
        })
    })

    describe(['Login'],'Invalid login', ()=>{

        it('should display an error message when leaving fields empty', ()=>{
            login.navigate()
            login.logInButton.click()
            login.errorMessage.should('have.text', 'Please complete the fields')
            cy.url().should('include', '/login')
        })

        it('should display an error message when leaving fields empty', ()=>{
            login.navigate()
            login.login(getRandomEmail(), Cypress.env('USER_PASSWORD'))
            login.errorMessage.should('have.text', 'Email or password are incorrect')
            cy.url().should('include', '/login')
        })
    })

})