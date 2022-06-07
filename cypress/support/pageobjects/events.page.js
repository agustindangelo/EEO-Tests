/// <reference types="Cypress"/>
const Page = require('./page');

class Events extends Page{

    url = 'events'

    get createEventBtn(){
        return 
    }
    
    get userBtn(){
        return cy.contains('+ Create New Event')
    }

    get userNameBtn(){
        return cy.get('.actions > span.actionsHeader')
    }

    get logOutBtn(){
        return cy.contains('Log out')
    }

    getNthEvent(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth})`)
    }
    
    getNthEventState(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth}) .eventCardBadge`)
    }

    getNthEventOptions(nth){
        return cy.get(`div.maxContainer .sc-jIkXHa.RvbSq:nth-child(${nth}) svg`).first()
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

}

module.exports = new Events