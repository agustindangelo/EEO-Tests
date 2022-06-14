/// <reference types="Cypress"/>
const Page = require('./page');

class CreateEvent extends Page {

    url = 'events/create'

    navigate() {
        super.navigate(this.url)
    }

    get userInitialsButton(){
        return cy.get('button.initials')
    }

    get logOutBtn(){
        return cy.contains('Log out')
    }

    get nameField(){
        return cy.get('#name')
    }

    get browseFileField(){
        return cy.contains('Browse files')
    }

    get eventDescriptionField(){
        return cy.get('#description')
    }

    get eventAdditionalInformationField(){
        return cy.get('#aditionalInformation')
    }

    eventInformation={
        date:{
            toggler: () => { return cy.get('button.toggler') },
            calendarBody: () => { return cy.get('div.calendarBody') },
            calendarFooter: () => { return cy.get('footer.calendarFooter') },
            selectBtn: () => { return this.calendarFooter().find('select') },
            clearBtn: () => { return this.calendarFooter().find('clear') }
        },
        time:{
            start: () => { return cy.get('.sc-hTtwUo > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root') },
            end: () => { return cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root')}
        },
        timezone: {
            ddl: () => { return cy.get('div[aria-labelledby="timezone select-options"]') },
            option: (zone) => { return cy.contains(zone) }
        },
        eventTypeOption:{
            online: () => { return cy.get('input[type="radio"]').eq(0) },
            inplace: () => { return cy.get('input[type="radio"]').eq(1) },
            hybrid: () => { return cy.get('input[type="radio"]').eq(2) },
        },
        link: () => { return cy.get('input[name="link"]') },
        location: {
            ddl: () => { return cy.get('div[aria-labelledby="location select-options"]') },
            option: (city) => { return cy.contains('city') }
        },
        address: () => { return cy.get('input[name="address"]') },
        makeItVisibleOption: () => { return cy.get('input[name="published"]') },
        cancelButton: () => { return cy.contains('Save') },
        saveButton: () => { return cy.contains('Cancel') },
    }

    warnings={
        missingFields:{
            errorMessage: () => { return cy.contains('Missing fields') },
            okButton: () => { return cy.contains('OK') }
        },
        saveAsDraft: {
            message: () => { return cy.contains('Save as draft') },
            okButton: () => { return cy.contains('Ok, save as draft') },
            cancelButton: () => { return cy.contains('No, cancel') },
        },
        deleteEvent: {
            message: () => { return cy.contains('Delete this event?') },
            yesButton: () => { return cy.contains('Yes, delete') },
            cancelButton: () => { return cy.contains('No, cancel') },
        }
    }

    navigate(){
        super.navigate(this.url)
    }

    enterEventName(name){
        this.nameField.type(name)
    }

    enterEventDescription(description){
        this.eventDescriptionField.type(description)
    }

    enterAdditionalInfo(info){
        this.eventAdditionalInformationField.type(info)
    }

    /**
     * 
     * @param {string} imgPath event's image file path
     */
    uploadEventImage(imgPath){
        this.browseFileField.selectFile(imgPath)
    }

    /**
     * 
     * @param {string} time 'HH:MM' format
     */
    setStartTime(time){
        this.eventInformation.time.start().click().type(time)
    }

    /**
     * 
     * @param {string} time 'HH:MM' format
     */
    setEndTime(time){
        this.eventInformation.time.end().click().type(time)
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
    enterEventLink(link){
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

    enterEventAddress(address){
        this.eventInformation.address().type(address)
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

    saveEventAsDraft(){
        this.warnings.saveAsDraft.okButton().click()
    }

    /**
     * It creates a new event using the current date (MM/DD/YYYY)
     * @param {string} name 
     * @param {string} image 
     * @param {string} description 
     * @param {string} additionalInfo 
     * @param {string} startTime 'HH:MM' format
     * @param {string} endTime 'HH:MM' format
     * @param {string} timezone Accepted values: 'ARG/URU', 'COL', 'MEX'
     * @param {string} link 
     * @param {boolean} makeItVisible 
     */
    createNewEvent(name, image, description, additionalInfo, startTime, endTime, timezone, link, makeItVisible){
        this.enterEventName(name)
        if (image) {
            this.uploadEventImage(image)
        }
        this.enterEventDescription(description)
        this.enterAdditionalInfo(additionalInfo)
        this.setStartTime(startTime)
        this.setEndTime(endTime)
        this.selectTimezone(timezone)
        this.enterEventLink(link)
        if (makeItVisible) { this.makeEventVisible() }
        this.clickSaveButton()
        this.saveEventAsDraft()
    }

    cancelEventCreation(){
        this.cancelButton().click()
        this.warnings.deleteEvent.yesButton().click()
    }

    openNthEvent(nth) {
        this.getNthEvent(nth)
    }
}

export default CreateEvent