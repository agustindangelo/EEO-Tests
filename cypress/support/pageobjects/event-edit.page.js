/// <reference types="Cypress"/>
const Page = require('./page');

class EventEdit extends Page {

    get nameField(){
        return cy.get('#name')
    }

    get browseFileField() {
        return cy.get('input[type="file"]')
    }

    get eventDescriptionField(){
        return cy.get('#description')
    }

    get eventAdditionalInformationField() {
        return cy.get('#additionalInformation')
    }

    eventInformation = {
        date:{
            toggler: () => { cy.get('button.toggler') },
            calendarBody: () => { cy.get('div.calendarBody') }
        },
        time:{
            start: () => { cy.get('input[type="tel"]').eq(0) }, //set a time value with cy.invoke('attr', 'value', 'HH:MM')
            end: () => { cy.get('input[type="tel"]').eq(1) } //set a time value with cy.invoke('attr', 'value', 'HH:MM')
        },
        timezone:null,
        eventTypeOption:{

        },
        location:null,
        link:null,
        address:null,
        makeItVisibleOption:null,
        cancelButton:null,
        saveButton:null
    }
}

export default EventEdit