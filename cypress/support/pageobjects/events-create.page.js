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
        return cy.get('input[type="file"]')
    }

    get eventDescriptionField(){
        return cy.get('#description')
    }

    get eventAdditionalInformationField(){
        return cy.get('#aditionalInformation')
    }

    eventInformation={
        date:{
            toggler: () => cy.get('button.toggler'),
            calendarBody: () => cy.get('div.calendarBody'),
            calendarFooter: () => cy.get('footer.calendarFooter'),
            selectBtn: () => this.calendarFooter().find('select'),
            clearBtn: () => this.calendarFooter().find('clear')
        },
        time:{
            start: () => cy.get('.sc-hTtwUo > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root'),
            end: () => cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root')
        },
        timezone: {
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
            option: (city) => cy.contains('city')
        },
        address: () => cy.get('input[name="address"]'),
        makeItVisibleOption: () => cy.get('input[name="published"]'),
        cancelButton: () => cy.contains('Cancel'),
        saveButton: () => cy.contains('Save'),
    }

    warnings={
        missingFields:{
            errorMessage: () => cy.contains('Missing fields'),
            okButton: () => cy.contains('OK')
        },
        eventPublished:{
            message: () => cy.contains('Event published successfully!'),
            okButton: () => cy.contains('OK, got it!')
        },
        saveAsDraft: {
            message: () => cy.contains('Save as draft'),
            okButton: () => cy.contains('Ok, save as draft'),
            cancelButton: () => cy.contains('No, cancel'),
        },
        deleteEvent: {
            message: () => cy.contains('Delete this event?'),
            yesButton: () => cy.contains('Yes, delete'),
            cancelButton: () => cy.contains('No, cancel'),
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
        if (makeItVisible) { 
            this.makeEventVisible() 
            this.clickSaveButton()
            this.warnings.eventPublished.okButton().click()
        }
        else{
            this.clickSaveButton()
            this.saveEventAsDraft() 
        }
        
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