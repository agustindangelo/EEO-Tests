/// <reference types="Cypress"/>
import Explore from '../support/pageobjects/explore.page'
import { getRandomEmail, invalidEmail, changeDateESFormatToMMDDYYY } from '../support/util.js';

describe('Event registration functionality', () => {
    var nameOfNewEvent = 'Event for inscription';
    const explore = new Explore();
    var email = getRandomEmail()

    it(['HappyPath'], 'should be able to expand the details of an event in order to register to it', function() {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
       
        explore.getEventCardDateByName(nameOfNewEvent).then(date =>{
            
            explore.getEventCardTimeByName(nameOfNewEvent).then(time => {
                
                explore.getEventByName(nameOfNewEvent).click()
                
                // validating event info and page content
                explore.eventDate.should('contain.text', changeDateESFormatToMMDDYYY(date.text()))
                explore.eventDate.should('contain.text', time.text())
                explore.name.should('have.text', nameOfNewEvent);
                explore.attendees.should('contain.text', '0');
                explore.about.should('have.text', 'description');
                explore.link.should('have.text', 'event-api.com');
                explore.additionalInformation.should('have.text', 'bla');

                explore.time.argUruTime().should('be.visible')
                explore.time.colombianTime().should('be.visible')
                explore.time.mexicanTime().should('be.visible')
                
                explore.inscribirseEventoBtn.should('be.visible') 
            })
        })
    })

    it(['HappyPath'], 'should register as an attendee for the first event on the explore page', function() {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        cy.contains('asistente').first().invoke('text').as('prevAttendees')
        explore.inscribirseEventoBtn.click()

        // act
        explore.enterNombre('agustin')
        explore.enterEmail(getRandomEmail())
        explore.selectPais('Argentina')
        explore.selectCiudad('Paraná')
        explore.enterEmpresa('en la fortaleza')
        explore.selectProfesion('Tester')
        explore.selectExperiencia('2')
        explore.selectNivelDeIngles('0') 
        explore.selectConoceEndava(0) //0 equals to affirmative
        explore.selectComoTeEnteraste('Email')
        explore.acceptPolicies()
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.addToCalendarBtn().should('be.visible')
        explore.formularioInscripcion.addToCalendarBtn().click()
        explore.formularioInscripcion.googleCalendarOption().should('be.visible')
        explore.formularioInscripcion.outlookCalendarOption().should('be.visible')
        cy.reload()
        cy.get('@prevAttendees').then(val => {
            cy.log(val)
            let attendees = parseInt((val.split(' '))[0]) + 1
            cy.log(attendees)
            cy.contains('asistente').first().invoke('text').should('contains', '' + attendees)
        })
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
        explore.selectExperiencia('2')
        explore.selectNivelDeIngles('0') 
        explore.selectConoceEndava(0) //0 equals to affirmative
        explore.selectComoTeEnteraste('Email')
        explore.acceptPolicies()
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.duplicatedInscription().should('contain.text', email).and('contain.text', ' ya esta registrado para este evento.')
    })

    it('should not be able to register to an event when leaving the fields empty', function() {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        explore.inscribirseEventoBtn.click()

        // act
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.emptyTermsErrorMessage()
            .should('contain.text', 'Es necesario que aceptes los Términos y condiciones para poder inscribirte.')
        explore.formularioInscripcion.nombre.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.email.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.pais.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.ciudad.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.profesion.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.experiencia.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.nivelDeIngles.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.conocesEndava.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')
        explore.formularioInscripcion.comoTeEnteraste.errorMessage()
            .should('be.visible')
            .and('have.text', 'Completá este campo')

    })

    it('should not be able to register when entering an invalid email', () => {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        explore.inscribirseEventoBtn.click()

        // event registration
        explore.enterNombre('agustin')
        explore.enterEmail(invalidEmail())
        explore.selectPais('Argentina')
        explore.selectCiudad('Paraná')
        explore.enterEmpresa('en la fortaleza')
        explore.selectProfesion('Tester')
        explore.selectExperiencia('2')
        explore.selectNivelDeIngles('0') 
        explore.selectConoceEndava(0) //0 equals to affirmative
        explore.selectComoTeEnteraste('Email')
        explore.acceptPolicies()
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.email.errorMessage()
            .should('be.visible')
                .and('have.text', 'Ingresá un email válido')
    })

    it('should not be able to register when leaving the checkboxes unchecked', () => {
        //An event is created
        cy.createEventByApi(nameOfNewEvent, true)

        //Now the user navigates to the inscription form of the created event
        explore.navigate();
        explore.getEventByName(nameOfNewEvent).click()
        explore.inscribirseEventoBtn.click()

        // event registration
        explore.enterNombre('agustin')
        explore.enterEmail(getRandomEmail())
        explore.selectPais('Argentina')
        explore.selectCiudad('Paraná')
        explore.enterEmpresa('en la fortaleza')
        explore.selectProfesion('Tester')
        explore.selectExperiencia('2')
        explore.selectNivelDeIngles('0') 
        explore.selectConoceEndava(0) //0 equals to affirmative
        explore.selectComoTeEnteraste('Email')
        explore.formularioInscripcion.inscribirseBtn().click()

        // assert
        explore.formularioInscripcion.emptyTermsErrorMessage()
            .should('contain.text', 'Es necesario que aceptes los Términos y condiciones para poder inscribirte.')
    })

    afterEach(function() {
        cy.deleteEventThroughAPI(nameOfNewEvent)
    })

})