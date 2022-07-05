/// <reference types="Cypress"/>

import { find } from 'cypress/types/lodash';

const Page = require('./page');

/**
* Methods, properties and selectors for the main page in the view of a comms user, where the draft and public events are listed
*/
class Events extends Page{

    url = 'events'

    /**
     * Gets the '+ Create New Event' button
     */
    get createEventBtn(){
        return cy.get('[data-testid="create-event"]')
    }
    
    /**
     * Gets the user button in the navbar
     */
    get userBtn(){
        return cy.get('button.initials')
    }

    /**
     * Gets the user name displayed after clicking the user button in the navbar
     */
    get userName(){
        return cy.get('.actions > span.actionsHeader')
    }

    /**
     * Gets the 'Log Out' displayed after clicking the user button in the navbar
     */
    get logOutBtn(){
        return cy.get('div.actions > button').first()
    }

    /**
     * Receives as a parameter the name of an existing event in order to return the card of that selected event
     * @param {string} name 
     * @returns the DOM element of event's card
     */
     getEventByName = (name) => cy.contains(name).parent('div').parent('div')

     /**
      * Receives as a parameter the name of an existing event in order to return the state of that selected event
      * @param {string} name 
      * @returns the DOM element of the event's state
      */
     getEventStateByEventName(name){
         return this.getEventByName(name).children('div').eq(3).children('div')
     }
 
     /**
      * Receives as a parameter the name of an existing event in order to return the date of that selected event
      * @param {string} name 
      * @returns the DOM element of the event's date
      */
     getEventDateByEventName(name){
         return this.getEventByName(name).children('div').eq(1).children('div')
     }
 
     /**
      * Receives as a parameter the name of an existing event in order to return the number of attendees of that selected event
      * @param {string} name 
      * @returns the DOM element of the event's attendees
      */
     getEventAttendeesByEventName(name){
         return this.getEventByName(name).children('div').eq(5).children('div')
     }

    /**
     * Receives as a parameter the number of the event in order to get the card related to that event. DRAFT events are displayed first sorted by creating date
     * @param {number} nth 
     * @returns the DOM element of event's card
     */
    getNthEventName = (nth) => cy.get('div .eventCardTitle').eq(nth-1)

    /**
     * Receives as a parameter the number of the event in order to get the name of the selected event. DRAFT events are displayed first sorted by creation date
     * @param {number} nth 
     * @returns the DOM element of the event's name
     */
    getNthEvent = (nth) => cy.get('div.maxContainer').eq(1).children('div').eq(nth-1)

    /**
     * Receives as a parameter the number of the event in order to get the state of the selected event. DRAFT events are displayed first sorted by creating date
     * @param {number} nth 
     * @returns the DOM element of the event's state
     */
    getNthEventState(nth){
        return cy.get(`div.maxContainer .eventCardBadge`).eq(nth-1)
    }

    /**
     * Receives as a parameter the number of the date in order to get the state of the selected event. DRAFT events are displayed first sorted by creating date
     * @param {number} nth 
     * @returns the DOM element of the event's date
     */
    getNthEventDate(nth){
        return cy.get(`.eventCardDate > span`).eq((nth))
    }

    /**
     * opens the options menu of the Nth event
     * @param {number} nth 
     * @returns the DOM element of the event's options
     */
    openNthEventOptions(nth){
        this.getNthEvent().find('[data-testid="open-options-button"]').click()
    }

    openEventOptions(event) {
        event.find('[data-testid="open-options-button"]').click()
    }

    /**
     * Receives as a parameter the number of the date in order to get the title of the selected event. DRAFT events are displayed first sorted by creating date
     * @param {number} nth 
     * @returns the DOM element of the event's title
     */
    getTitleOfNthEvent(nth) {
        return this.getNthEvent(nth).find('.eventCardTitle')
    }

    /**
     * It searches for the 'Export attendee list' when the event options are expanded 
     * @returns the DOM element the export option
     */
    get exportEventOption(){
        return cy.get('[data-testid="export-option"]')
    }

    /**
     * It searches for the 'Delete' when the event options are expanded 
     * @returns the DOM element the delete option
     */
    get deleteEventOption(){
        return cy.get('[data-testid="delete-option"]')
    }

    /**
     * The prompt and its fields and elements referred to the deletion of a chosen event
     */
    deletePrompt = { //Add an ID
        message: () => cy.get('[data-testid="modal-title"]'),
        label: () => cy.get('[data-testid="modal-description"]'),
        yesOption: () => cy.get('[data-testid="modal-accept"]'),
        noOption: () => cy.get('[data-testid="modal-cancel"]')
    }

    /**
     * Opens a sub page of the page
     */
    navigate(){
        super.navigate(this.url)
    }

    /**
     * It clicks the '+ Create New Event' button
     */
    createNewEvent(){
        this.createEventBtn.click()
    }

    /**
     * It clicks the user button
     */
    clickUserOption(){
        this.userBtn.click()
    }

    /**
     * It clicks the 'Log Out' button
     */
    clickLogOut(){
        this.logOutBtn.click()
    }

    /**
     * It opens the user options and then the 'Log Out' is clicked in order to logout an user
     */
    logOut(){
        this.clickUserOption()
        this.clickLogOut()
    }
    
    /**
     * It gets the nth event and the its opened in order to explore its details
     * @param {number} event number of the event. DRAFT events are displayed first sorted by creating date
     */
    openEventDetails(event){
        this.getNthEvent(event).click()
    }

    /**
     * It clicks the export option in order to export the attendee list of a chosen event
     * @param {number} event number of the event. 
     */
    exportAtendeeList(){
        this.exportEventOption.click()
    }

    /**
     * It clicks the delete option in order to delete a DRAFT event
     * @param {number} event number of the event. 
     */
    clickDeleteEventOption(event){
        this.openNthEventOptions(event)
        this.deleteEventOption.click()
    }
}

export default Events;