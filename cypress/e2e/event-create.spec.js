/// <reference types="Cypress"/>
import { create } from 'cypress/types/lodash';
import CreateEvent from '../support/pageobjects/events-create.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm, getTodayDateArray } from '../support/util'

describe('Create-event tests', () => {

    const events = new Events();
    const createEvent = new CreateEvent();

    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        events.navigate()
        events.createEventBtn.click()
    })

    describe('Happy path when creating a new event', () => {

        const events = new Events();
        const createEvent = new CreateEvent();
        var nameOfNewEvent;

        it(['HappyPath'], 'should create a public event', () => {
            const startHour = getInteger(0, 23)
            const startMinute = getInteger(0, 59)
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
                true // set the event as public
            )
            events.navigate() // the new event shoud be added to the events page
            events.getEventByName(nameOfNewEvent).should('be.visible')

            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', getTodayDateArray()[0]).and('contain.text',  getTodayDateArray()[1]).and('contain.text',  getTodayDateArray()[2]) //validating the Month, day and year
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
            events.getEventStateByEventName(nameOfNewEvent).should('not.contain.text', 'DRAFT')
            events.getEventAttendeesByEventName(nameOfNewEvent).should('contain.text', '0 attendees')

        })

        it.only(['HappyPath'], 'should create a draft event', () => {
            const startHour = getInteger(0, 23)
            const startMinute = getInteger(0, 59)
            let currentDate = new Date().getDate()
            nameOfNewEvent = 'new draft event [AUT]';

            createEvent.createNewEvent(
                nameOfNewEvent,
                './cypress/support/resources/newEvent.png',
                'test description',
                'test info',
                currentDate,
                `${startHour}:${startMinute}`,
                'newevent-automation-draft.com',
                false // set the event as draft
            )
            events.navigate() // the new event shoud be added to the events page

            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', getTodayDateArray()[0]).and('contain.text',  getTodayDateArray()[1]).and('contain.text',  getTodayDateArray()[2]) //validating the Month, day and year
            events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
            events.getEventStateByEventName(nameOfNewEvent).should('contain.text', 'DRAFT')
            events.getEventAttendeesByEventName(nameOfNewEvent).should('contain.text', '0 attendees')
        })

        afterEach(function() {
            cy.deleteEventThroughAPI(nameOfNewEvent)
        })
    })

    it('Event type radio buttons should work properly', () => {
        // When online is selected, Location and Address field should not be shown
        createEvent.eventInformation.eventTypeOption.online().should('be.checked')
        createEvent.eventInformation.location.ddl().should('not.exist')
        createEvent.eventInformation.address().should('not.exist')

        // When In-place is selected, the Link field should not be shown but Location and Address fields should
        createEvent.eventInformation.eventTypeOption.inplace().click()
        createEvent.eventInformation.link().should('not.exist')
        createEvent.eventInformation.location.ddl().should('be.visible')
        createEvent.eventInformation.address().should('be.visible')

        // When Hybrid is selected, Link, Location and Address fields should be shown
        createEvent.eventInformation.eventTypeOption.hybrid().click()
        createEvent.eventInformation.link().should('be.visible')
        createEvent.eventInformation.location.ddl().should('be.visible')
        createEvent.eventInformation.address().should('be.visible')
    })

    it('Verify default behaviour of timezone field', () => {
        createEvent.eventInformation.timezone.ddl().should('have.attr', 'aria-disabled', 'true')
        createEvent.eventInformation.timezone.ddl().should('have.text', '(GMT -3) ARG/URU')
    })

    it('Verify behaviour of address field', () => {
        // When a Location is selected from the dropdown list, the Address should be autocompleted with the corresponding address
        createEvent.eventInformation.eventTypeOption.inplace().click()

        createEvent.eventInformation.address().should('have.attr', 'disabled')

        createEvent.selectLocation('Buenos Aires')
        createEvent.eventInformation.address().should('have.value', 'Carlos M. Della Paolera 261, C1001 CABA')
    })

    describe('Error messages and warnings', () => {

        it('shoud not be able to create a new draft event with an empty name', () => {
            createEvent.clickSaveButton()
            createEvent.modal.description().should('be.visible')
            createEvent.modal.description().should('be.visible')
        })

        it('shoud not be able to create a new public event with empty fields', () => {
            // This test ensures all error messages are displayed as expected
            cy.log('For an online event')
            createEvent.makeEventVisible()
            createEvent.modal.title().should('be.visible')
            createEvent.modal.description().should('be.visible')
            createEvent.modal.acceptButton()
            createEvent.modal.blankFieldsList().should('have.length', 5)
            createEvent.modal.acceptButton().click()

            cy.log('For an inplace event')
            createEvent.selectEventType('inplace')
            createEvent.makeEventVisible()
            createEvent.modal.title().should('be.visible')
            createEvent.modal.description().should('be.visible')
            createEvent.modal.acceptButton()
            createEvent.modal.blankFieldsList().should('have.length', 5)
            createEvent.modal.acceptButton().click()


            cy.log('For an hybrid event')
            createEvent.selectEventType('hybrid')
            createEvent.makeEventVisible()
            createEvent.modal.title().should('be.visible')
            createEvent.modal.description().should('be.visible')
            createEvent.modal.acceptButton()
            createEvent.modal.blankFieldsList().should('have.length', 6)
            createEvent.modal.acceptButton().click()
        })

        it('should be able to cancel an event creation', () => {
            createEvent.eventInformation.cancelButton().click()
            createEvent.modal.acceptButton().click()
            cy.url().should('include', 'events').and('not.include', 'create')
        })
    })
})
