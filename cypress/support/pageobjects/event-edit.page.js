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
            toggler: () => { return cy.get('button.toggler') },
            calendarBody: () => { return cy.get('div.calendarBody') }
        },
        time:{
            start: () => { return cy.get('.sc-hTtwUo > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root') },
            end: () => { return cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root')}
        },
        timezone:null,
        eventTypeOption:{

        },
        location:null,
        link:null,
        address:null,
        makeItVisibleOption:null,
        cancelButton: () => { return cy.contains('Cancel') },
        saveButton: () => { return cy.contains('Save') },
    }

    /**
     * 
     * @param {string} hour 'HH:MM' format
     */
     setStartTime(hour){
        this.eventInformation.time.start().click().clear().type(hour)
    }

    /**
     * 
     * @param {string} hour 'HH:MM' format
     */
    setEndTime(hour){
        this.eventInformation.time.end().click().clear().type(hour)
    }

    clickCancelButton(){
        this.eventInformation.cancelButton().click()
    }

    clickSaveButton(){
        this.eventInformation.saveButton().click()
    }
}

export default EventEdit