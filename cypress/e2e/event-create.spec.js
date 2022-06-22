/// <reference types="Cypress"/>
import CreateEvent from '../support/pageobjects/events-create.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm } from '../support/util'

describe('Happy path when creating a new event', () => {

    const events = new Events();
    const createEvent = new CreateEvent();
    var nameOfNewEvent;

    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    })

    it('should create a public event', () => {
        const startHour = getInteger(0,23)
        const startMinute = getInteger(0,59)

        nameOfNewEvent = 'new event [AUT]';
        
        events.createEventBtn.click()

        createEvent.createNewEvent(
            nameOfNewEvent,
            './cypress/support/resources/newEvent.png',
            'test description',
            'test info',
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
    })
    
    it('should create a draft event', function () {
        const startHour = getInteger(0,23)
        const startMinute = getInteger(0,59)

        nameOfNewEvent = 'new draft event [AUT]';
        
        events.createEventBtn.click()

        createEvent.createNewEvent(
            nameOfNewEvent,
            './cypress/support/resources/newEvent.png',
            'test description',
            'test info',
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
    })

    afterEach(function () {
        cy.deleteEventThroughAPI(nameOfNewEvent)
    })
}) 