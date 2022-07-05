/// <reference types="Cypress"/>
import EventDetail from '../support/pageobjects/event-detail.page'
import Events from '../support/pageobjects/events.page'

describe('Verify data displayed on the event details page', () => {
  let eventName = 'event for event details test'

  before(() => {
    // precondition: the user is logged in
    cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))

    // precondition: at least one event has been registered
    cy.createEventByApi(eventName, false)
  })

  it(['HappyPath'],'should display correct event data', () => {
    const events = new Events();
    const eventDetail = new EventDetail();
    events.navigate();
    events.getEventByName(eventName).click();

    eventDetail.name.should('have.text', eventName);
    eventDetail.attendees.should('contain.text', '0');
    eventDetail.about.should('have.text', 'description');
    eventDetail.link.should('have.text', 'event-api.com');
    eventDetail.additionalInformation.should('contain.text', 'bla');
    eventDetail.visibilitySwitch.should('not.be.checked');
  })

  after(() => {
    cy.deleteEventThroughAPI(eventName);
  })
})