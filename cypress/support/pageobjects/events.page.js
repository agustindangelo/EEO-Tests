/// <reference types="Cypress"/>
const Page = require('./page');

class Events extends Page{

    url = 'events'

    get createEventBtn(){
        return cy.get('main .maxContainer').eq(0).find('button')
    }
    
    get userBtn(){
        return cy.get('button.initials')
    }

    get userName(){
        return cy.get('.actions > span.actionsHeader')
    }

    get logOutBtn(){
        return cy.contains('Log out')
    }

    get eventsList() {
        return cy.get('div.maxContainer').eq(1)
    }

    getNthEvent(nth){
        return this.eventsList.find('div').eq(nth-1)
    }
    
    getNthEventState(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth}) .eventCardBadge`)
    }

    getNthEventDate(nth){
        return cy.get(`.eventCardDate > span`).eq((nth))
    }

    getNthEventOptions(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth}) svg`).last()
    }

    get exportEventOption(){
        return cy.contains('Export attendee list')
    }

    get deleteEventOption(){
        return cy.contains('Delete')
    }

    deleteForm = {
        message: () => { return cy.contains('Delete this event?') },
        label: () => { return cy.contains('This action cannot be restored') },
        yesOption: () => { return cy.contains('Yes, delete') },
        noOption: () => { return cy.contains('No, cancel') },
    }

    navigate(){
        super.navigate(this.url)
    }

    createNewEvent(){
        this.createEventBtn.click()
    }

    clickUserOption(){
        this.userBtn.click()
    }

    clickLogOut(){
        this.logOutBtn.click()
    }

    logOut(){
        this.clickUserOption()
        this.clickLogOut()
    }
    
    openEventDetails(event){
        this.getNthEvent(event).click()
    }

    openEventOptions(event){
        this.getNthEventOptions(event).click()
    }

    exportAtendeeList(){
        this.exportEventOption().click()
    }

    clickDeleteEventOption(event){
        this.openEventOptions(event)
        this.deleteEventOption().click()
    }

    cancelEventDeletion(event){
        this.openEventOptions(event)
        this.deleteEventOption().click()
        this.deteteform.noOption().click()
    }

    deleteEvent(event){
        this.openEventOptions(event)
        this.deleteEventOption().click()
        this.deteteform.yesOption().click()
    }

}

export default Events;