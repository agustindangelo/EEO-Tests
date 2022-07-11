/// <reference types="Cypress"/>
import Events from '../support/pageobjects/events.page'

describe('Event deletion related tests', () => {
    const events = new Events();
    var nameOfNewEvent = 'Event to be deleted';

    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    })

    describe('Draft event', () => {
        beforeEach(() => {
            cy.createEventByApi(nameOfNewEvent, false)
            events.navigate()
        });

        it(['HappyPath'],'should delete a draft event', () => {
            let event = events.getEventByName(nameOfNewEvent)

            events.openEventOptions(event)
            events.deleteEventOption.click()
            events.deletePrompt.message().should('be.visible')
            events.deletePrompt.yesOption().click()

            event.should('not.be', 'visible')
        })
 
        
        it('should cancel event deletion', () => {
            let event = events.getEventByName(nameOfNewEvent)

            events.openEventOptions(event)
            events.deleteEventOption.click()
            events.deletePrompt.message().should('be.visible')
            events.deletePrompt.noOption().click()
    
            events.getEventByName(nameOfNewEvent).should('be.visible')
    
            //delete the created event
            cy.deleteEventThroughAPI(nameOfNewEvent)
            events.navigate()
        })
        
   })

    describe('Public event', () => {
        beforeEach(() => {
            cy.createEventByApi(nameOfNewEvent, true)
            events.navigate()
        });

        it('should not be able to delete a public event', function () {
            let event = events.getEventByName(nameOfNewEvent)

            events.openEventOptions(event)
            events.deleteEventOption.should('not.exist')
        })    

        afterEach(function() {
            cy.deleteEventThroughAPI(nameOfNewEvent)
        })
    })
})