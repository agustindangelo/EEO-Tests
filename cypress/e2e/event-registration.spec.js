/// <reference types="Cypress"/>
import Explore from '../support/pageobjects/explore.page'

describe('Event registration functionality', () => {
    it('should register as an attendee for the first event on the explore page', function () {
        const explore = new Explore();

        explore.navigate();
        explore.getNthEvent(1).click()
        explore.inscribirseEventoBtn.click()

        // fill form fields
        explore.enterNombre('agustin')
        explore.enterEmail('agustin@agustin.com')
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

        cy.contains('¡Nos vemos allí!')
        cy.contains('Aceptar').click()
    })
})