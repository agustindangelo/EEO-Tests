/// <reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('Event deletion related tests', () => {
    beforeEach(() => {
        const login = new Login();
        const events = new Events();

        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

        events.getTitleOfNthEvent(1).invoke('text').as('titleOfEventToDelete')
    });
    
    it('should cancel event deletion', function () { // make sure to use traditional function here
        const events = new Events();

        events.getNthEvent(1).find('button').click()
        events.deleteEventOption.click()
        events.deletePrompt.message().should('be.visible')
        events.deletePrompt.noOption().click()

        events.getTitleOfNthEvent(1).should('have.text', this.titleOfEventToDelete)
    })

    it('should delete the first event', function () { // make sure to use traditional function here
        const events = new Events();

        events.getNthEvent(1).find('button').click()
        events.deleteEventOption.click()
        events.deletePrompt.message().should('be.visible')
        events.deletePrompt.yesOption().click()
        cy.contains('Changes saved succesfully')

    })
})