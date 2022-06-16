/// <reference types="Cypress"/>
import Explore from '../support/pageobjects/explore.page'
import { getRandomEmail } from '../support/util.js';

describe('Event registration functionality', () => {
    it('should register as an attendee for the first event on the explore page', function () {
        // arrange
        const explore = new Explore();
        explore.navigate();
        explore.getNthEvent(1).click()
        explore.inscribirseEventoBtn.click()

        // act
        explore.enterNombre('agustin')
        explore.enterEmail(getRandomEmail())
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

    // it('should not be able to register twice to an event', () => {
        // arrange
        // const explore = new Explore();
        // explore.navigate();
        // explore.getNthEvent(1).click()
        // explore.inscribirseEventoBtn.click()

        // // act
        // explore.enterNombre('agustin')
        // explore.enterEmail(getRandomEmail())
        // explore.selectPais('Argentina')
        // explore.selectCiudad('Paraná')
        // explore.enterEmpresa('en la fortaleza')
        // explore.selectProfesion('Tester')
        // explore.selectExperiencia('Sin experiencia')
        // explore.selectNivelDeIngles('Principiante')

        // // assert
        // cy.contains('¡Nos vemos allí!')
        // cy.contains('Aceptar').click()

    // })
})