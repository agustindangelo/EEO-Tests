/// <reference types="Cypress"/>
const Page = require('./page');

/**
* Methods, properties and selectors for the Edit Event page
*/
class EventEdit extends Page {

    /**
     * @returns the Name field of the event
     */
    get nameField(){
        return cy.get('#name')
    }

    /**
     * @returns the Browse Files field of the event
     */
    get browseFileField() {
        return cy.get('input[type="file"]')
    }

    /**
     * @returns the 'About this event' field of the event
     */
    get eventDescriptionField(){
        return cy.get('.ql-editor').eq(0)
    }

    /**
     * @returns the 'Additional Information' field of the event
     */
    get eventAdditionalInformationField() {
        return cy.get('.ql-editor').eq(1)
    }

    /**
     * Fields to set the event information, related to the Date, Start time, Timezone, Event Type and link and/or location
     */
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
        saveButton: () => cy.contains('Save')
    }

    /**
     * Warning and error messages when editing the event information with invalid values and when the changes made will be discarded
     */
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

    /**
     * It receives as a parameter the new name of the event
     * @param {string} name 
     */
    editEventName(name){
        this.nameField.click().clear().type(name)
    }

    /**
     * It receives as a parameter the new description of the event
     * @param {string} name 
     */
    editEventDescription(description){
        this.eventDescriptionField.click().clear().type(description)
    }

    /**
     * It receives as a parameter the new aditional information of the event
     * @param {string} name 
     */
    editAdditionalInfo(info){
        this.eventAdditionalInformationField.click().clear().type(info)
    }

    /**
     * It puts a new image for the event
     * @param {string} imgPath event's image file path
     */
    uploadNewEventImage(imgPath){
        this.browseFileField.selectFile(imgPath)
    }

    /**
     * Receives as a parameter the number of a day to be selected in order to set a new date with the same month
     * @param {number} day 
     */
    setNewDate(day) {
        this.eventInformation.date.toggler().click()
        this.eventInformation.date.day(day).click()
        this.eventInformation.date.selectBtn().click()
    }
    

    /**
     * It sets a new hour for the start time of the event
     * @param {string} hour 'HH:MM' format
     */
     setStartTime(hour){
        this.eventInformation.time.start().click().clear().type(hour)
    }

    /**
     * It sets a new timezone for the start time of the event
     * @param {string} timezone Accepted values: 'ARG/URU', 'COL', 'MEX'
     */
     selectTimezone(timezone){
        this.eventInformation.timezone.ddl().click()
        this.eventInformation.timezone.option(timezone).click()
    }

    /**
     * It changes the event type
     * @param {string} eventType Accepted values: 'online', 'inplace', 'hybrid'
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
     * It sets a new url of an online/hybrid event
     * @param {string} link url of the online/hybrid event
     */
    editEventLink(link){
        this.eventInformation.link().type(link)
    }

    /**
     * It sets a new city for the event
     * @param {string} city Accepted values:  'Bogotá', 'Buenos Aires', 'Medellin', 'Monterrey', 'Montevideo', 'Rosario', 'Other'
     */
    selectLocation(city){
        this.eventInformation.location.ddl().click()
        this.eventInformation.location.option(city).click()
    }

    /**
     * It sets a new address of an in place/hybrid event
     * @param {string} link url of the online/hybrid event
     */
    editEventAddress(address){
        this.eventInformation.address().click().clear().type(address)
    }

    /**
     * It makes public a DRAFT event
     */
    makeEventVisible(){
        this.eventInformation.makeItVisibleOption().click()
    }

    /**
     * It discards all changes made to the event
     */
    clickCancelButton(){
        this.eventInformation.cancelButton().click()
    }

    /**
     * It saves all changes made to the event
     */
    clickSaveButton(){
        this.eventInformation.saveButton().click()
    }
}

export default EventEdit