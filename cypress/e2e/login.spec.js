///<reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('Happy paths', () => {
    const login = new Login()
    const events = new Events()

    it('should log in', () => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        cy.url().should('include', 'events')
        events.clickUserOption()
        events.userName.should('have.text', 'Manuel Losada Clua')
    })

    it('should log out', () => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        events.logOut()
        cy.url().should('include', 'login')
    })
})