/// <reference types="Cypress"/>
import Events from '../support/pageobjects/events.page'

describe('Event deletion related tests', () => {
    const events = new Events();
    var nameOfNewEvent = 'Event to be deleted';
    beforeEach(()=>{
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    })

    describe('Draft event', ()=>{
        beforeEach(() => {
            cy.createEventByApi(nameOfNewEvent, false)
            events.navigate()
        });
        
        it('should cancel event deletion', function () { // make sure to use traditional function here
    
            events.getEventByName(nameOfNewEvent).find('button').click()
            events.deleteEventOption.click()
            events.deletePrompt.message().should('be.visible')
            events.deletePrompt.noOption().click()
    
            events.getEventByName(nameOfNewEvent).should('be.visible')
    
            //delete the created event
            cy.deleteEventThroughAPI(nameOfNewEvent)
            events.navigate()
        })
    
        it('should delete an draft event', function () { // make sure to use traditional function here
    
            events.getEventByName(nameOfNewEvent).find('button').click()
            events.deleteEventOption.click()
            events.deletePrompt.message().should('be.visible')
            events.deletePrompt.yesOption().click()
            cy.contains('Changes saved succesfully')
    
        })
    })

    describe('Public event', ()=>{
        
        beforeEach(() => {
            cy.createEventByApi(nameOfNewEvent, true)
            events.navigate()
        });

        it('should not be able to delete a public event', function () { // make sure to use traditional function here
            events.getEventByName(nameOfNewEvent).find('button').click()
            events.deleteEventOption.should('not.exist')
            
            //delete the created event
            cy.deleteEventThroughAPI(nameOfNewEvent)
            events.navigate()
        })    
       
    })
})