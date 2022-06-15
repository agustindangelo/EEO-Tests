/// <reference types="Cypress"/>
import CreateEvent from '../support/pageobjects/events-create.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm } from '../support/util'

describe('Happy path when creating a new event', () => {

    const events = new Events();
    const createEvent = new CreateEvent();

    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    })

    it('should create a public event', () => {
        const startHour = getInteger(0,23)
        const endHour = getInteger(parseInt(startHour),23)
        const startMinute= getInteger(0,59)
        const endMinute= getInteger(0,59)
        
        events.createEventBtn.click()

        createEvent.createNewEvent(
            'new event [AUT]',
            './cypress/support/resources/newEvent.png',
            'test description',
            'test info',
            `${startHour}:${startMinute}`,
            `${endHour}:${endMinute}`,
            'ARG/URU',
            'newevent-automation.com',
            true //set the event as public
        )
        events.navigate() //the new event shoud be added to the events page
        events.getEventByName('new event [AUT]').should('be.visible')
        let eventDate = new Date().toDateString().split(' ') //the event was created with today's date. Ex. of eventDate: ['Wed', 'Jun', '15', '2022']
        events.getEventDateByEventName('new event [AUT]').should('contain.text', eventDate[1]).and('contain.text', eventDate[2]).and('contain.text', eventDate[3]) //validating the Month, day and year
        events.getEventDateByEventName('new event [AUT]').should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`).and('contain.text', `${hourToAmPm(endHour)}:${endMinute}`) //validating the start and end time
        events.getEventStateByEventName('new event [AUT]').should('not.contain.text', 'DRAFT')
    })
    
    it.only('should create a draft event', () => {
        const startHour = getInteger(0,23)
        const endHour = getInteger(parseInt(startHour),23)
        const startMinute= getInteger(0,59)
        const endMinute= getInteger(0,59)
        
        events.createEventBtn.click()

        createEvent.createNewEvent(
            'new draft event [AUT]',
            './cypress/support/resources/newEvent.png',
            'test description',
            'test info',
            `${startHour}:${startMinute}`,
            `${endHour}:${endMinute}`,
            'ARG/URU',
            'newevent-automation-draft.com',
            false //set the event as draft
        )
        events.navigate() //the new event shoud be added to the events page
        let eventDate = new Date().toDateString().split(' ') //the event was created with today's date. Ex. of eventDate: ['Wed', 'Jun', '15', '2022']
        events.getNthEventDate(0).should('contain.text', eventDate[1]).and('contain.text', eventDate[2]).and('contain.text', eventDate[3]) //validating the Month, day and year
        events.getNthEventDate(1).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`).and('contain.text', `${hourToAmPm(endHour)}:${endMinute}`) //validating the start and end time
        events.getNthEventName(1).should('contain.text', 'new draft event [AUT]')
        events.getNthEventState(1).should('contain.text', 'DRAFT')
    }) 

    //add AfterEach() and delete the events created with the tests
}) 