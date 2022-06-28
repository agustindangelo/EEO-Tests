import { should } from 'chai'
import EventDetail from '../support/pageobjects/event-detail.page'
import EventEdit from '../support/pageobjects/event-edit.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm } from '../support/util'

describe('Happy path when editing an event', () => {
    const events = new Events();
    const eventDetails = new EventDetail();
    const eventEdit = new EventEdit();
    var nameOfNewEvent = 'Event to be edited';
    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
        cy.createEventByApi(nameOfNewEvent, false)
        events.navigate()
    })

    it(['HappyPath'],'should change the end time of the first event', () => {
        let today = (new Date).getDate()
        const newDate = today >= 30 ? today : parseInt(getInteger(today, 30)) //to choose a new day only if the current is < 30 to simplify
        const startHour = getInteger(0,23)
        const startMinute= getInteger(0,59)
        
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.openEditForm()
        eventEdit.setStartTime(`${startHour}:${startMinute}`)
        eventEdit.selectTimezone('ARG/URU')
        eventEdit.clickSaveButton()
        events.navigate()
        events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
    })

    it(['HappyPath'],'should make public a draft event', () => {
        
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.shareLinkedIn.should('be.disabled')
        eventDetails.copyUrl.should('be.disabled')

        eventDetails.visibilitySwitch.click()
        eventDetails.warnings.makeEventPublic.description().should('be.visible')
        eventDetails.warnings.makeEventPublic.message().should('be.visible')
        eventDetails.warnings.makeEventPublic.yesButton().should('be.visible')
        eventDetails.warnings.makeEventPublic.noButton().should('be.visible')

        eventDetails.warnings.makeEventPublic.yesButton().click()
        cy.contains('Changes saved succesfully')
        eventDetails.shareLinkedIn.should('be.enabled')
        eventDetails.copyUrl.should('be.enabled')

        events.navigate()
        events.getEventStateByEventName(nameOfNewEvent).should('not.contain.text', 'DRAFT')
    })

    afterEach(function() {
        cy.deleteEventThroughAPI(nameOfNewEvent)
    })
})
