/// <reference types="Cypress"/>
import EventDetail from '../../support/pageobjects/event-detail.page'
import Events from '../../support/pageobjects/events.page'
import Login from '../../support/pageobjects/login.page'

describe('verify', () => {

  it('should display values', () => {
    const Login = new Login();
    Login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

    const events = new Events();
    const eventDetail = new EventDetail();

    events.navigate()
    events.getNthEvent(1).click()

    console.log(eventDetail.name)
    console.log(eventDetail.attendees)
    console.log(eventDetail.about)
    console.log(eventDetail.additionalInformation)
    console.log(eventDetail.eventDay)
    console.log(eventDetail.time.mexicanTime)

    eventDetail.visibilitySwitch().should('be', 'checked')
    eventDetail.editButton().click()
  })
})