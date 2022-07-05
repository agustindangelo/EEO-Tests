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

    it(['HappyPath'],'should change the date of an event', () => {
        let today = (new Date).getDate()
        const newDay = today >= 30 ? today : parseInt(getInteger(today, 30)) //to choose a new day only if the current is < 30 to simplify
        const startHour = getInteger(0,23)
        const startMinute= getInteger(0,59)
        
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.openEditForm()
        eventEdit.setNewDate(newDay)
        eventEdit.setStartTime(`${startHour}:${startMinute}`)
        eventEdit.selectTimezone('ARG/URU')
        eventEdit.clickSaveButton()
        events.navigate()
        events.getEventDateByEventName(nameOfNewEvent).should('contain.text', ''+newDay)
        events.getEventDateByEventName(nameOfNewEvent).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`)
    })

    it.only(['HappyPath'],'should make public a draft event', () => {
        
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

    it('should not be able to make public a draft event with empty mandatory fields', () => {
        
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.openEditForm()
        cy.log('For an online event')
            eventEdit.eventInformation.time.start().click().clear()
            eventEdit.nameField.clear()
            eventEdit.eventDescriptionField.clear()
            eventEdit.eventInformation.link().clear()

            eventEdit.makeEventVisible()
            
            eventEdit.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            eventEdit.warnings.mandatoyFieldsBlank.fieldsList().should('have.not.length', 0)
            eventEdit.warnings.mandatoyFieldsBlank.okButton().should('be.visible')

        cy.log('For an inplace event')
            eventEdit.warnings.mandatoyFieldsBlank.okButton().click()
            eventEdit.selectEventType('inplace')
            
            eventEdit.makeEventVisible()
            
            eventEdit.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            eventEdit.warnings.mandatoyFieldsBlank.fieldsList().should('have.not.length', 0)
            eventEdit.warnings.mandatoyFieldsBlank.okButton().should('be.visible')

        cy.log('For an hybrid event')
            eventEdit.warnings.mandatoyFieldsBlank.okButton().click()
            eventEdit.selectEventType('hybrid')
            
            eventEdit.makeEventVisible()
            
            eventEdit.warnings.mandatoyFieldsBlank.errorMessage().should('be.visible')
            eventEdit.warnings.mandatoyFieldsBlank.fieldsList().should('have.not.length', 0)
            eventEdit.warnings.mandatoyFieldsBlank.okButton().should('be.visible')
    })

    //BUG
    it('shoud not be able to delete the name of an event', () =>{
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.openEditForm()
        eventEdit.nameField.clear()
        eventEdit.clickSaveButton()
        eventEdit.warnings.missingFields.errorMessage().should('be.visible')
        eventEdit.warnings.missingFields.okButton().should('be.visible')
    })

    it('should be able to discard all changes to an event', () => {
        events.getEventByName(nameOfNewEvent).click()
        eventDetails.openEditForm()
        
        eventEdit.nameField.clear()
        eventEdit.clickCancelButton()

        eventEdit.warnings.discardChanges.message().should('be.visible')
        eventEdit.warnings.discardChanges.yesButton().should('be.visible')
        eventEdit.warnings.discardChanges.cancelButton().should('be.visible')
        eventEdit.warnings.discardChanges.yesButton().click()
        eventDetails.name.should('not.be.empty')
    })

    afterEach(function() {
        cy.deleteEventThroughAPI(nameOfNewEvent)
    })
})
