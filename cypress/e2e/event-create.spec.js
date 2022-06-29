/// <reference types="Cypress"/>
import CreateEvent from '../support/pageobjects/events-create.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm } from '../support/util'

describe('Create-event tests', () => {

    const events = new Events();
    const createEvent = new CreateEvent();
    var nameOfNewEvent;

    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        events.createEventBtn.click()
    })

    describe('Happy path when creating a new event', () => {

        const events = new Events();
        const createEvent = new CreateEvent();
        var nameOfNewEvent;
    
        beforeEach(() => {
            cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
            events.createEventBtn.click()
        })
    
        it(['HappyPath'],'should create a public event', () => {
            const startHour = getInteger(0,23)
            const startMinute = getInteger(0,59)
            let date = new Date()
            date = date.getDate()
    
            nameOfNewEvent = 'new event [AUT]';
    
            createEvent.createNewEvent(
                nameOfNewEvent,
                './cypress/support/resources/newEvent.png',
                'test description',
                'test info',
                date,
                `${startHour}:${startMinute}`,
                'newevent-automation.com',
                true //set the event as public
            )
            events.navigate() //the new event shoud be added to the events page
            events.getEventByName(nameOfNewEvent).should('be.visible')
            let eventDate = new Date().toDateString().split(' ') //the event was created with today's date. Ex. of eventDate: ['Wed', 'Jun', '15', '2022']
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', eventDate[1]).and('contain.text', eventDate[2]).and('contain.text', eventDate[3]) //validating the Month, day and year
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
            events.getEventStateByEventName(nameOfNewEvent).should('not.contain.text', 'DRAFT')
            events.getEventAttendeesByEventName(nameOfNewEvent).should('contain.text', '0 attendees')
    
        })
        
        it(['HappyPath'],'should create a draft event', function () {
            const startHour = getInteger(0,23)
            const startMinute = getInteger(0,59)
            let date = new Date()
            date = date.getDate()
            nameOfNewEvent = 'new draft event [AUT]';
    
            createEvent.createNewEvent(
                nameOfNewEvent,
                './cypress/support/resources/newEvent.png',
                'test description',
                'test info',
                date,
                `${startHour}:${startMinute}`,
                'newevent-automation-draft.com',
                false //set the event as draft
            )
            events.navigate() //the new event shoud be added to the events page
            let eventDate = new Date().toDateString().split(' ') //the event was created with today's date. Ex. of eventDate: ['Wed', 'Jun', '15', '2022']
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', eventDate[1]).and('contain.text', eventDate[2]).and('contain.text', eventDate[3]) //validating the Month, day and year
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
            //events.getNthEventName(1).should('contain.text', nameOfNewEvent)
            events.getEventStateByEventName(nameOfNewEvent).should('contain.text', 'DRAFT')
            events.getEventAttendeesByEventName(nameOfNewEvent).should('contain.text', '0 attendees')
        })
    
        afterEach(function () {
            cy.deleteEventThroughAPI(nameOfNewEvent)
        })
    })
    
    it('Event type radio buttons should work properly', ()=>{
        createEvent.eventInformation.eventTypeOption.online().should('be.checked')
        createEvent.eventInformation.location.ddl().should('not.exist')
        createEvent.eventInformation.address().should('not.exist')

        createEvent.eventInformation.eventTypeOption.inplace().click()
        createEvent.eventInformation.link().should('not.exist')
        createEvent.eventInformation.location.ddl().should('be.visible')
        createEvent.eventInformation.address().should('be.visible')

        createEvent.eventInformation.eventTypeOption.hybrid().click()
        createEvent.eventInformation.link().should('be.visible')
        createEvent.eventInformation.location.ddl().should('be.visible')
        createEvent.eventInformation.address().should('be.visible')
    })

    it('verify default behaviour of timezone field', ()=>{
        createEvent.eventInformation.timezone.ddl().should('have.attr', 'aria-disabled', 'true')
        createEvent.eventInformation.timezone.ddl().should('have.text', '(GMT -3) ARG/URU')
    })

    it('verify behaviour of address field', ()=>{
        createEvent.eventInformation.eventTypeOption.inplace().click()
        
        createEvent.eventInformation.address().should('have.attr', 'disabled')

        createEvent.selectLocation('Buenos Aires')
        createEvent.eventInformation.address().should('have.value', 'Carlos M. Della Paolera 261, C1001 CABA')

        createEvent.selectLocation('Other')
        createEvent.eventInformation.address().should('have.attr', 'autocomplete', 'off')
        createEvent.eventInformation.address().should('not.have.attr', 'disabled')
    })

    describe('Error messages and warnings', ()=>{
        it('shoud not be able to create a new draft event with an empty name', () =>{
            createEvent.clickSaveButton()
            createEvent.warnings.missingFields.errorMessage().should('be.visible')
            createEvent.warnings.missingFields.okButton().should('be.visible')
        })
        it('shoud not be able to create a new public event with empty fields', () =>{
            cy.log('For an online event')
            createEvent.makeEventVisible()
            createEvent.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.date().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.name().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.time().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.link().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.description().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.okButton().should('be.visible')

            cy.log('For an inplace event')
            createEvent.warnings.mandatoyFieldsBlank.okButton().click()
            createEvent.selectEventType('inplace')
            createEvent.makeEventVisible()
            createEvent.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.date().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.name().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.time().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.location().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.description().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.okButton().should('be.visible')

            cy.log('For an hybrid event')
            createEvent.warnings.mandatoyFieldsBlank.okButton().click()
            createEvent.selectEventType('hybrid')
            createEvent.makeEventVisible()
            createEvent.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.date().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.name().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.time().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.link().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.location().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.description().should('be.visible')
            createEvent.warnings.mandatoyFieldsBlank.okButton().should('be.visible')
        })

        it('should be able to cancel an event creation', () => {
            createEvent.eventInformation.cancelButton().click()
            createEvent.warnings.deleteEvent.message().should('be.visible')
            createEvent.warnings.deleteEvent.yesButton().should('be.visible')
            createEvent.warnings.deleteEvent.cancelButton().should('be.visible')
            createEvent.warnings.deleteEvent.yesButton().click()
            cy.url().should('include', 'events').and('not.include', 'create')
        })
    })

})