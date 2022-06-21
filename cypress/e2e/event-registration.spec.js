/// <reference types="Cypress"/>
import Explore from '../support/pageobjects/explore.page'
import { getRandomEmail } from '../support/util.js';

describe('Event registration functionality', () => {
    var nameOfNewEvent = 'Event for inscription';
    const explore = new Explore();
    var email = getRandomEmail()

    it('should register as an attendee for the first event on the explore page', function () {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        explore.inscribirseEventoBtn.click()

        // act
        explore.enterNombre('agustin')
        explore.enterEmail(email)
        explore.selectPais('Argentina')
        explore.selectCiudad('Paraná')
        explore.enterEmpresa('en la fortaleza')
        explore.selectProfesion('Tester')
        explore.selectExperiencia('Sin experiencia')
        explore.selectNivelDeIngles('Principiante')
        explore.selectConoceEndava('Si')
        explore.selectComoTeEnteraste('Soy Endavan')

        explore.acceptPolicies()
        explore.acceptPersonalDataCondition()
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        cy.contains('¡Nos vemos allí!')
        cy.contains('Aceptar').click()
    })

    it('should not be able to register twice to an event', () => {
        //An event is created and an inscription is registered for this event
        cy.createEventByApi(nameOfNewEvent, true).its('body').then(body => {
            let eventId = body.data.createEvent.recordId
            cy.registerToEventByApi(eventId, email)
            })
        
        //Now, an user using the same email tries to register to the same event 
        const explore = new Explore();
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        explore.inscribirseEventoBtn.click()

        // event registration
        explore.enterNombre('agustin')
        explore.enterEmail(email)
        explore.selectPais('Argentina')
        explore.selectCiudad('Paraná')
        explore.enterEmpresa('en la fortaleza')
        explore.selectProfesion('Tester')
        explore.selectExperiencia('Sin experiencia')
        explore.selectNivelDeIngles('Principiante')
        explore.selectConoceEndava('Si')
        explore.selectComoTeEnteraste('Soy Endavan')
        explore.acceptPolicies()
        explore.acceptPersonalDataCondition()
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.duplicatedInscription().should('contain.text', email).and('contain.text', ' ya esta registrado para este evento.')


    })

    afterEach(function () {
        cy.deleteEventThroughAPI(nameOfNewEvent)
    })
})