/// <reference types="Cypress"/>
import EventDetail from '../../support/pageobjects/event-detail.page'
import Events from '../../support/pageobjects/events.page'
import Login from '../../support/pageobjects/login.page'

describe('verify', () => {

  it('should display values', () => {
    // these are just preliminary tests to verify the page object

    const login = new Login();
    login.navigate()
    login.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

    const events = new Events();
    const eventDetail = new EventDetail();

    events.getNthEvent(1).click()

    eventDetail.name.should('be', 'TEST11')
    eventDetail.name.should('be', 'TEST11')
    console.log(eventDetail.attendees)
    console.log(eventDetail.about)
    // console.log(eventDetail.additionalInformation)
    console.log(eventDetail.eventDay)
    console.log(eventDetail.time.mexicanTime)

    eventDetail.visibilitySwitch.should('not.be.checked')
  })
})