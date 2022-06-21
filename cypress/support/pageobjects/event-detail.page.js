/// <reference types="Cypress"/>
const Page = require('./page');

class EventDetail extends Page {

    get name(){
        return cy.get('h1')
    }

    get attendees() {
        return cy.contains('asistentes')
    }

    get about(){
        return cy.get('h3').contains('Acerca del evento').next()
    }

    get additionalInformation() {
        return cy.get('h3').contains('Información adicional').next()
    }

    get eventDay(){
        return cy.get('.sc-iAvgwm.lkxBiu')
    }

    time = { 
        mexicanTime: () => this.eventDay().get('span').eq(0),
        colombianTime: () => this.eventDay().get('span').eq(1),
        argUruTime: () => this.eventDay().get('span').eq(2)
    }

    get editButton() {
        return cy.get('.MuiButton-root').contains('Edit')
    }

    get visibilitySwitch() {
        return cy.get('input[name="published"]')
    }

    get link() {
        return cy.contains('virtual').find('a')
    }

    openEditForm(){
        this.editButton.click()
    }
}

export default EventDetail;