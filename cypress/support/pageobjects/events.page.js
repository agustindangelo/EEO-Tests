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

    getNthEventName = (nth) => cy.get('div .eventCardTitle').eq(nth-1)
    
    getNthEvent = (nth) => cy.get('div.maxContainer').eq(1).children('div').eq(nth-1)

    getNthEventState(nth){
        return cy.get(`div.maxContainer .eventCardBadge`).eq(nth-1)
    }

    getNthEventDate(nth){
        return cy.get(`.eventCardDate > span`).eq((nth))
    }

    getEventByName = (name) => cy.contains(name).parent('div').parent('div')

    getEventStateByEventName(name){
        return this.getEventByName(name).children('div').eq(3).children('div')
    }

    getEventDateByEventName(name){
        return this.getEventByName(name).children('div').eq(1).children('div')
    }

    getNthEventOptions(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth}) svg`).last()
    }

    getTitleOfNthEvent(nth) {
        return this.getNthEvent(nth).find('.eventCardTitle')
    }

    get exportEventOption(){
        return cy.contains('Export attendee list')
    }

    get deleteEventOption(){
        return cy.contains('Delete')
    }

    deletePrompt = {
        message: () => cy.contains('Delete this event?'),
        label: () => cy.contains('This action cannot be restored'),
        yesOption: () => cy.contains('Yes, delete'),
        noOption: () => cy.contains('No, cancel'),
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
        this.exportEventOption.click()
    }

    clickDeleteEventOption(event){
        this.openEventOptions(event)
        this.deleteEventOption.click()
    }

}

export default Events;