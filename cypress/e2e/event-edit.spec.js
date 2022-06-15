import EventDetail from '../support/pageobjects/event-detail.page'
import EventEdit from '../support/pageobjects/event-edit.page'
import Events from '../support/pageobjects/events.page'
import { getInteger, hourToAmPm } from '../support/util'

describe('Happy path when editing an event', () => {
    const events = new Events();
    const eventDetails = new EventDetail();
    const eventEdit = new EventEdit();
    beforeEach(() => {
        cy.loginByApi(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'))
    })

    it('should change the end time of the first event', () => {
        
        
        const startHour = getInteger(0,23)
        const endHour = getInteger(parseInt(startHour),23)
        const startMinute= getInteger(0,59)
        const endMinute= getInteger(0,59)
        
        events.openEventDetails(1)
        eventDetails.openEditForm()
        eventEdit.setStartTime(`${startHour}:${startMinute}`)
        eventEdit.setEndTime(`${endHour}:${endMinute}`)
        eventEdit.selectTimezone('ARG/URU')
        eventEdit.clickSaveButton()
        events.navigate()
        events.getNthEventDate(1).should('contain.text', `${hourToAmPm(startHour)}:${startMinute}`).and('contain.text', `${hourToAmPm(endHour)}:${endMinute}`)
    }) 
}) 