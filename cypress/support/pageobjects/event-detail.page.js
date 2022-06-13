/// <reference types="Cypress"/>
import Page from './page'

class EventDetail extends Page {

    // url=`events/${eventId}`

    name(){
        return cy.get('h1')
    }

    attendees() {
        return cy.contains('asistentes')
    }

    about(){
        return cy.get('h3').contains('Acerca del evento').next()
    }

    additionalInformation() {
        return cy.get('h3').contains('Información adicional').next()
    }

    eventDay(){
        return cy.get('.sc-iAvgwm.lkxBiu')
    }

    time = { 
        mexicanTime: () => { this.eventDay().get('span').eq(0) },
        colombianTime: () => { this.eventDay().get('span').eq(1) },
        argUruTime: () => { this.eventDay().get('span').eq(2) }
    }

    editButton() {
        return cy.get('button').contains('Edit')
    }

    visibilitySwitch() {
        return cy.get('input[name="published"]')
    }
}

export default EventDetail;