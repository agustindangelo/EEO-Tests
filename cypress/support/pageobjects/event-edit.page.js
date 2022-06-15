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
            toggler: () => cy.get('button.toggler'),
            calendarBody: () => cy.get('div.calendarBody')
        },
        time:{
            start: () => cy.get('.sc-hTtwUo > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root'),
            end: () => cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root')
        },
        timezone:{
            ddl: () => cy.get('div[aria-labelledby="timezone select-options"]'),
            option: (zone) => cy.get('li[role="option"]').contains(zone)
        },
        eventTypeOption:{

        },
        location:null,
        link:null,
        address:null,
        makeItVisibleOption:null,
        cancelButton: () => cy.contains('Cancel'),
        saveButton: () => cy.contains('Save'),
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

    /**
     * 
     * @param {string} timezone Accepted values: 'ARG/URU', 'COL', 'MEX'
     */
     selectTimezone(timezone){
        this.eventInformation.timezone.ddl().click()
        this.eventInformation.timezone.option(timezone).click()
    }

    clickCancelButton(){
        this.eventInformation.cancelButton().click()
    }

    clickSaveButton(){
        this.eventInformation.saveButton().click()
    }
}

export default EventEdit