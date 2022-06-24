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

    warnings = {
        makeEventPublic:{
            message: () => cy.contains('Make this event public?'),
            description: () => cy.contains('Making this event public means it will be visible to anyone outside Endava who visits eeo.com or has the event URL.'),
            yesButton: () => cy.get('button > span').contains('Yes, make public'),
            noButton: () => cy.get('button > span').contains('No, cancel')
        }
    }

    get link() {
        return cy.contains('virtual').find('a')
    }

    get shareLinkedIn() {
        return cy.contains('Visibility & Sharing').siblings('button').eq(0)
    }

    get copyUrl() {
        return cy.contains('Visibility & Sharing').siblings('button').eq(1)
    }

    openEditForm(){
        this.editButton.click()
    }
}

export default EventDetail;