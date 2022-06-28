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
        return cy.get('.ql-editor').eq(0)
    }

    get eventAdditionalInformationField() {
        return cy.get('.ql-editor').eq(1)
    }

    eventInformation = {
        date:{
            toggler: () => cy.get('button.toggler'),
            calendarBody: () => cy.get('div.calendarBody'),
            calendarFooter: () => cy.get('footer.calendarFooter'),
            day: (day) => cy.get(`button[data-day="${day}"]`),//cy.get('.sc-dmRaPn.lbgGuQ'),
            selectBtn: () => this.eventInformation.date.calendarFooter().contains('select'),
            clearBtn: () => this.eventInformation.date.calendarFooter().contains('clear')
        },
        time:{
            start: () => cy.get('.MuiBox-root > .MuiFormControl-root > .MuiOutlinedInput-root')
        },
        timezone:{
            ddl: () => cy.get('div[aria-labelledby="timezone select-options"]'),
            option: (zone) => cy.get('li[role="option"]').contains(zone)
        },
        eventTypeOption:{
            online: () => cy.get('input[type="radio"]').eq(0),
            inplace: () => cy.get('input[type="radio"]').eq(1),
            hybrid: () => cy.get('input[type="radio"]').eq(2),
        },
        link: () => cy.get('input[name="link"]'),
        location: {
            ddl: () => cy.get('div[aria-labelledby="location select-options"]'),
            option: (city) => cy.contains(city)
        },
        address: () => cy.get('input[name="address"]'),
        makeItVisibleOption: () => cy.get('input[name="published"]'),
        cancelButton: () => cy.contains('Cancel'),
        saveButton: () => cy.contains('Save'),
    }

    warnings = {
        missingFields: {
            errorMessage: () => cy.contains('Missing fields'),
            okButton: () => cy.contains('OK')
        },
        mandatoyFieldsBlank: {
            errorMessage: () => cy.contains('Some mandatory fields are blank'),
            name: () => cy.get('ul > li').contains('Name'),
            description: () => cy.get('ul > li').contains('Description'),
            time: () => cy.get('ul > li').contains('Start Time'),
            link: () => cy.get('ul > li').contains('Link'),
            location: () => cy.get('ul > li').contains('Location'),
            date: () => cy.get('ul > li').contains('Date'),
            okButton: () => cy.get('button > span').contains('Got it!')
        },
        discardChanges: {
            message: () => cy.contains('Discard changes?'),
            yesButton: () => cy.contains('Yes, discard'),
            cancelButton: () => cy.contains('No, cancel'),
        }
    }

    editEventName(name){
        this.nameField.click().clear().type(name)
    }

    editEventDescription(description){
        this.eventDescriptionField.click().clear().type(description)
    }

    editAdditionalInfo(info){
        this.eventAdditionalInformationField.click().clear().type(info)
    }

    /**
     * 
     * @param {string} imgPath event's image file path
     */
    uploadNewEventImage(imgPath){
        this.browseFileField.selectFile(imgPath)
    }

    setNewDate(day) {
        this.eventInformation.date.toggler().click()
        this.eventInformation.date.day(day).click()
        this.eventInformation.date.selectBtn().click()
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
     * @param {string} timezone Accepted values: 'ARG/URU', 'COL', 'MEX'
     */
     selectTimezone(timezone){
        this.eventInformation.timezone.ddl().click()
        this.eventInformation.timezone.option(timezone).click()
    }

    /**
     * 
     * @param {string} timezone Accepted values: 'online', 'inplace', 'hybrid'
     */
     selectEventType(eventType){
        switch(eventType.toLowerCase()){
            case 'online': {
                this.eventInformation.eventTypeOption.online().click()
                break;
            }
            case 'inplace': {
                this.eventInformation.eventTypeOption.inplace().click()
                break;
            }
            case 'hybrid': {
                this.eventInformation.eventTypeOption.hybrid().click()
                break;
            }
            default: break;
        }    
    }
    
    /**
     * 
     * @param {string} link url of the online/hybrid event
     */
    editEventLink(link){
        this.eventInformation.link().type(link)
    }

    /**
     * 
     * @param {string} city Accepted values:  'Bogotá', 'Buenos Aires', 'Medellin', 'Monterrey', 'Montevideo', 'Rosario', 'Other'
     */
    selectLocation(city){
        this.eventInformation.location.ddl().click()
        this.eventInformation.location.option(city).click()
    }

    editEventAddress(address){
        this.eventInformation.address().click().clear().type(address)
    }

    makeEventVisible(){
        this.eventInformation.makeItVisibleOption().click()
    }

    clickCancelButton(){
        this.eventInformation.cancelButton().click()
    }

    clickSaveButton(){
        this.eventInformation.saveButton().click()
    }
}

export default EventEdit