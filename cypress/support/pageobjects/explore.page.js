/// <reference types="Cypress"/>
const Page = require('./page');

class Explore extends Page{

    url = ''

    /** Gest the card of the 'nth' event displayed in the explore page
     * @param {string} nth The number of a registered event, which is displayed sorted for the user
     * @returns the DOM element of event's card
     */
    getNthEvent(nth){
        return cy.get('a.eventCard').eq(nth-1);
    }
    
    /** Gest the state of the 'nth' event displayed in the explore page
     * @param {string} nth The number of a registered event, which is displayed sorted for the user
     * @returns the DOM element of event state label
     */
    getNthEventState(nth){
        return cy.get(`.sc-kDTinF:nth-child(${nth}) .eventCardBadges > span`)
    }

    get inscribirseEventoBtn(){
        return cy.contains('Inscribirse').first() //cy.get('button > span:nth-child(1)')
    }

    get dropdownList() {
        return cy.get("ul[role='listbox']")
    }

    formularioInscripcion = {
        "nombre": {
            "field": () => cy.get("input[name='name']"),
            "errorMessage": () => this.nombre.field().parent().siblings('p')
        },
        "email": {
            "field": () => cy.get("input[name='email']"),
            "errorMessage": () => this.email.field().parent().siblings('p')
        },
        "pais": {
            "field": () => cy.get("input[name='country']").siblings('div'),
            "errorMessage": () => this.pais.field().parent().siblings('p')
        },
        "ciudad": {
            "field": () => cy.get("input[name='city']").siblings('div'),
            "errorMessage": () => this.ciudad.field().parent().siblings('p')
        },
        "empresa": {
            "field": () => cy.get("[name='company']"),
            "errorMessage": () => this.empresa.field().parent().siblings('p')
        },
        "profesion": {
            "field": () => cy.get("input[name='profession']").siblings('div'),
            "errorMessage": () => this.profesion.field().parent().siblings('p')
        },
        "experiencia": {
            "field": () => cy.get("input[name='experience']").siblings('div'),
            "errorMessage": () => this.experiencia.field().parent().siblings('p')
        },
        "nivelDeIngles": {
            "field": () => cy.get("input[name='englishLevel']").siblings('div'),
            "errorMessage": () => this.nivelDeIngles.field().parent().siblings('p')
        },
        "conocesEndava": {
            "field": () => cy.get("input[name='knowsEndava']").siblings('div'),
            "errorMessage": () => this.conocesEndava.field().parent().siblings('p')
        },
        "comoTeEnteraste": {
            "field": () => cy.get("input[name='hearFromEvent']").siblings('div'),
            "errorMessage": () => this.nivelDeIngles.field().parent().siblings('p')
        },
        "termsCheckbox": () => cy.get('input[name="terms"]'),
        "personalDataCheckbox": () => cy.get('input[name="personalData"]'),
        "inscribirseBtn": () => cy.get('button[type="submit"]'),
        "successInscriptionMessage": () => cy.contains('¡Nos vemos allí!'),
        "addToCalendarBtn": () => cy.contains('Añadir al calendario'),
        "googleCalendarOption": () => cy.contains('Google'),
        "outlookCalendarOption": () => cy.contains('Outlook')
    }

    /**
     *Opens a sub page of the page
     */
    navigate(){
        super.navigate(this.url)
    }

    /**
     * Receives a name as a parameter and then it is entered in the 'Nombre' text field 
     * @param {string} nombre The name of the person who is interested in the event
     */
    enterNombre(nombre){
        this.formularioInscripcion.nombre.field().type(nombre)
    }

    /**
     * Receives an email as a parameter and then it is entered in the 'Email' text field 
     * @param {string} email The email of the person who is interested in the event
     */
    enterEmail(email){
        this.formularioInscripcion.email.field().type(email)
    }

   selectPais(pais) {
        this.formularioInscripcion.pais.field().click()
        this.dropdownList.contains(pais).click()
    }

    selectCiudad(ciudad) {
        this.formularioInscripcion.ciudad.field().click()
        cy.contains(ciudad).click()
    }
    
    enterEmpresa(empresa) {
        this.formularioInscripcion.empresa.field().type(empresa)
    }

    selectProfesion(profesion) {
        this.formularioInscripcion.profesion.field().click()
        this.dropdownList.contains(profesion).click()
    }

    selectExperiencia(experiencia) {
        this.formularioInscripcion.experiencia.field().click()
        this.dropdownList.contains(experiencia).click()
    }

    selectNivelDeIngles(nivel) {
        this.formularioInscripcion.nivelDeIngles.field().click()
        this.dropdownList.contains(nivel).click()
    }

    selectConoceEndava(conoce) {
        this.formularioInscripcion.conocesEndava.field().click()
        this.dropdownList.contains(conoce).click()
    }

    selectComoTeEnteraste(comoSeEntero) {
        this.formularioInscripcion.comoTeEnteraste.field().click()
        this.dropdownList.contains(comoSeEntero).click({ force: true })
    }

    acceptPolicies() {
        this.formularioInscripcion.termsCheckbox().click()
    }

    acceptPersonalDataCondition() {
        this.formularioInscripcion.personalDataCheckbox().click()
    }

    /**
     * Gets a name, an email, a country and a profession in order to fulfill the required fields to register an user to an event. Then, the 'Inscribirse' button is clicked.
     * @param {string} nombre The name of the user interested in the event
     * @param {string} email The email of the user interested in the event
     * @param {string} pais The country of the user interested in the event. Accepted values: 'Argentina', 'Uruguay' and 'Chile'.
     * @param {string} ciudad The number of the city of the user interested in the event.
     * @param {string} profession The profession of the user interested in the event. Accepted values: 'developer', 'tester' and 'ceo'.
     */
    inscribirse(nombre, email, pais, ciudad, profession){
        ciudad = '1' //por ahora pruebo con la primer ciudad
        this.clickInscribirseEvento()
        this.enterNombre(nombre)
        this.enterEmail(email)
        this.selectPais(pais)
        this.selectCiudad(ciudad)
        this.selectProfesion(profession)
        this.clickInscribirseEventoForm()
    }

    /**
     * Gets the calendar option as an input in order to select it with the 'Añadir al calendario' field * @param {string} option The calendar option selected. Accepted values: 'Google' and 'Outlook' */
    clickCalendarOpcion(option){
        switch(option.toLowerCase()){
            case 'google': {
                this.formularioInscripcion.googleCalendarOption().click()
                break;
            }
            case 'outlook': {
                this.formularioInscripcion.outlookCalendarOption().click()
                break;
            }
            default: break;
        }
    }
}

export default Explore