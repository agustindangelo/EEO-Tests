/// <reference types="Cypress"/>
const Page = require('./page');

/**
* Methods, properties and selectors for the details page for an specific event (baseURL/events/:id)
*/
class EventDetail extends Page {

    /**
     * @returns the name of an event in the details view
     */
    get name(){
        return cy.get('h1')
    }

    /**
     * @returns the number of attendees of an event in the details view
     */
    get attendees() {
        return cy.get('[data-testid="attendees-count"]')
    }

    /**
     * @returns the description of an event in the details view
     */
    get about(){
        return cy.get('[data-testid="about-event"]')
    }

    /**
     * @returns the additional information of an event in the details view
     */
    get additionalInformation() {
        return cy.get('[data-testid="additional-information-event"]')
    }

    /**
     * @returns the div element that contains the date and time (with the respective timezone) of an event in the details view
     */
     get eventDate(){
        return cy.get('aside h3').first().siblings('div').children('div').eq(1)
    }

    /**
     * Each method the time in a specific timezone (Mexican, Colombian or Argentinean/Uruguayan) of an event in the details view
     */
    time = { 
        mexicanTime: () => this.eventDay().get('span').eq(0),
        colombianTime: () => this.eventDay().get('span').eq(1),
        argUruTime: () => this.eventDay().get('span').eq(2)
    }

    /**
     * @returns the edit button in order to modify the event information
     */
    get editButton() {
        return cy.get('[data-testid="edit-button"]')
    }

    /**
     * @returns visibilty switch button in order to make public a draft event or viseeversa
     */
    get visibilitySwitch() {
        return cy.get('input[name="published"]')
    }

    /**
     * The labels and buttons displayed to proceed with making public a DRAFT event
     */
    warnings = {
        makeEventPublic:{
            message: () => cy.contains('Make this event public?'),
            description: () => cy.contains('Making this event public means it will be visible to anyone outside Endava who visits eeo.com or has the event URL.'),
            yesButton: () => cy.get('button > span').contains('Yes, make public'),
            noButton: () => cy.get('button > span').contains('No, cancel')
        }
    }

    /**
     * @returns the link of an online or hybrid event in the details view
     */
    get link() {
        return cy.contains('virtual').find('a')
    }

    /**
     * @returns the 'Share LinkedIn' button
     */
    get shareLinkedIn() {
        return cy.contains('Visibility & Sharing').siblings('button').eq(0)
    }

    /**
     * @returns the 'Copy URL' button
     */
    get copyUrl() {
        return cy.contains('Visibility & Sharing').siblings('button').eq(1)
    }

    /**
     * It searches for the 'Edit' button and then clicks it it order to open the Edit event page
     */
    openEditForm(){
        this.editButton.click()
    }
}

export default EventDetail;