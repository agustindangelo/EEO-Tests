/// <reference types="Cypress"/>
const Page = require('./page');

/**
* Methods, properties and selectors for the Create Event page
*/
class CreateEvent extends Page {

    url = 'events/create'

    /**
     *Opens a sub page of the page
     */
    navigate() {
        super.navigate(this.url)
    }

    /**
     * @returns the Name field of the event
     */
    get nameField() {
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
    get eventDescriptionField() {
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
        date: {
            toggler: () => cy.get('button.toggler'),
            calendarBody: () => cy.get('div.calendarBody'),
            calendarFooter: () => cy.get('footer.calendarFooter'),
            currentDate: (day) => cy.get(`button[data-day="${day}"]`),
            selectBtn: () => this.eventInformation.date.calendarFooter().contains('select'),
            clearBtn: () => this.eventInformation.date.calendarFooter().contains('clear')
        },
        time: () => cy.get('[data-testid="time-picker"]'),
        timezone: {
            ddl: () => cy.get('#select-options'),
        },
        eventTypeOption: {
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
        cancelButton: () => cy.get('[data-testid="form-cancel"]'),
        saveButton: () => cy.get('[data-testid="form-submit"]')
    }

    modal = {
        title: () => cy.get('[data-testid="modal-title"]'),
        description: () => cy.get('[data-testid="modal-description"]'),
        blankFieldsList: () => cy.get('[data-testid="modal-description"]').siblings('ul').find('li'),
        cancelButton: () => cy.get('[data-testid="modal-cancel"]'),
        acceptButton: () => cy.get('[data-testid="modal-accept"]')
    }

    /**
     * It receives as a parameter the name of the new event
     * @param {string} name 
     */
    enterEventName(name) {
        this.nameField.type(name)
    }

    /**
     * It receives as a parameter the description of the new event
     * @param {string} description 
     */
    enterEventDescription(description) {
        this.eventDescriptionField.type(description)
    }

    /**
     * It receives as a parameter the aditional information of the new event
     * @param {string} info 
     */
    enterAdditionalInfo(info) {
        this.eventAdditionalInformationField.type(info)
    }

    /**
     * It puts an image for the new event
     * @param {string} imgPath event's image file path
     */
    uploadEventImage(imgPath) {
        this.browseFileField.selectFile(imgPath)
    }

    /**
     * It sets an hour for the start time of the new event
     * @param {string} time 'HH:MM' format
     */
    setStartTime(time) {
        this.eventInformation.time().click().type(time)
    }

    /**
     * It sets the event type
     * @param {string} timezone Accepted values: 'online', 'inplace', 'hybrid'
     */
    selectEventType(eventType) {
        switch (eventType.toLowerCase()) {
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
     * It sets the url of an online/hybrid event
     * @param {string} link url of the online/hybrid event
     */
    enterEventLink(link) {
        this.eventInformation.link().type(link)
    }

    /**
     * It sets the city for the new event
     * @param {string} city Accepted values:  'Bogotá', 'Buenos Aires', 'Medellin', 'Monterrey', 'Montevideo', 'Rosario'
     */
    selectLocation(city) {
        this.eventInformation.location.ddl().click()
        this.eventInformation.location.option(city).click()
    }

    /**
     * It sets the address of an in place/hybrid event
     * @param {string} link url of the online/hybrid event
     */
    enterEventAddress(address) {
        this.eventInformation.address().type(address)
    }

    /**
     * It makes public the new event
     */
    makeEventVisible() {
        this.eventInformation.makeItVisibleOption().click()
    }

    /**
     * It clicks the 'Cancel' button
     */
    clickCancelButton() {
        this.eventInformation.cancelButton().click()
    }

    /**
     * It saves the created event
     */
    clickSaveButton() {
        this.eventInformation.saveButton().click()
    }

    /**
     * It accepts saving the new event as a Draft
     */
    saveEventAsDraft() {
        this.modal.acceptButton().click()
    }

    /**
     * It select the day of the event interacting with a calendar. The date of the event is set with the current month to simplify
     * @param {number} day The day of the event date. It must be greater that today's date
     */
    selectCurrentDate(day) {
        this.eventInformation.date.toggler().click()
        this.eventInformation.date.currentDate(day).click()
        this.eventInformation.date.selectBtn().click()
    }

    /**
     * It creates a new event with the passed values as parameters
     * @param {string} name
     * @param {string} image event's image file path
     * @param {string} description 
     * @param {string} additionalInfo 
     * @param {number} day The number of the day to set the event date. The current month is chosen.
     * @param {string} startTime 'HH:MM' format
     * @param {string} endTime 'HH:MM' format
     * @param {string} timezone Accepted values: 'ARG/URU', 'COL', 'MEX'
     * @param {string} link the link for a virtual or hybrid event
     * @param {boolean} makeItVisible To make pulic the event or publish it as a Draft
     */
    createNewEvent(name, image, description, additionalInfo, day, startTime, link, makeItVisible) {
        this.enterEventName(name)
        if (image) {
            this.uploadEventImage(image)
        }
        this.selectCurrentDate(day)
        this.enterEventDescription(description)
        this.enterAdditionalInfo(additionalInfo)
        this.setStartTime(startTime)
        // this.selectTimezone(timezone) //It is selected with ARG/URU value by default
        this.enterEventLink(link)
        if (makeItVisible) {
            this.makeEventVisible()
            this.clickSaveButton()
            this.modal.acceptButton().click()
        }
        else {
            this.clickSaveButton()
            this.saveEventAsDraft()
        }

    }

    /**
     * It cancels the creation of the event
     */
    cancelEventCreation() {
        this.cancelButton().click()
        this.modal.acceptButton().click()
    }
}

export default CreateEvent
