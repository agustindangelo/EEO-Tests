/// <reference types="Cypress"/>

class CreateEvent{

    url= 'events/create'

    get nameField(){
        return cy.get('#name')
    }

    get browseFileField(){
        return cy.contains('Browse files')
    }

    get eventDescriptionField(){
        return cy.get('#description')
    }

    get eventAditionalInformationField(){
        return cy.get('#aditionalInformation')
    }
    //not finished or implemented yet
    eventInformation={
        date:{
            toggler: () => { cy.get('button.toggler') },
            calendarBody: () => { cy.get('div.calendarBody') }
        },
        time:{
            start: () => { cy.get('#mui-8') }, //set a time value with cy.invoke('attr', 'value', 'HH:MM')
            end: () => { cy.get('#mui-20') } //set a time value with cy.invoke('attr', 'value', 'HH:MM')
        },
        timezone:null,
        eventTypeOption:{

        },
        location:null,
        link:null,
        address:null,
        makeItVisibleOption:null,
        cancelButton:null,
        saveButton:null
    }

}

module.exports = new CreateEvent