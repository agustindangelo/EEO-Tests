import EventEdit from '../support/pageobjects/event-edit.page'
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('verify pageobject', () => {
    const login = new Login();
    const events = new Events();
    const eventEdit = new EventEdit();
    beforeEach(() => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
    })

    it('verify pageobject', () => {
        const eventEdit = new EventEdit();


    }) 
}) 