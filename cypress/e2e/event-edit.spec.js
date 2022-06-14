import EventDetail from '../support/pageobjects/event-detail.page'
import EventEdit from '../support/pageobjects/event-edit.page'
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('Happy path when editing an event', () => {
    const login = new Login();
    const events = new Events();
    const eventDetails = new EventDetail();
    const eventEdit = new EventEdit();
    beforeEach(() => {
        login.navigate()
        login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
    })

    it('should change the end time of the first event', () => {
        events.openEventDetails(1)
        eventDetails.editButton.click()
        eventEdit.setStartTime('15:35')
        eventEdit.setEndTime('18:35')
        eventEdit.clickSaveButton()
        events.getNthEventDate(1).should('contain.text', '15:35').and('contain.text', '18:35')

    }) 
}) 