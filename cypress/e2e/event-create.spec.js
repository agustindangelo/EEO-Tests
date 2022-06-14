/// <reference types="Cypress"/>
import CreateEvent from '../support/pageobjects/events-create.page'
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('verify pageobject', () => {

    it('should create an event', () => {
        const login = new Login();
        const events = new Events();
        const createEvent = new CreateEvent();

        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

        events.createEventBtn.click()

        // time selectors not working
        createEvent.createNewEvent(
            'test name',
            '../resources/screenshot.png',
            'test description',
            'test info',
            '12:00',
            '13:00',
            'America/BuenosAires',
            'localhost:3000'
        )
    }) 
}) 