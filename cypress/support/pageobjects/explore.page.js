/// <reference types="Cypress"/>
const Page = require('./page');

/**
* Methods, properties and selectors for the page in the view of an external user. 
* It contains the page to explore the public events (baseURL/events), 
* the page to expand the details of an event (baseURL/events/:id) where an external user can register an inscription
* and finally the registration form
*/
class Explore extends Page{

    url = ''

    /** Gest the card of the 'nth' event displayed in the explore page
     * @param {string} nth The number of a registered event, which is displayed sorted for the user
     * @returns the DOM element of event's card
     */
    getNthEvent(nth){
        return cy.get('a.eventCard').eq(nth-1);
    }

    /**
     * Takes the a name of an existing event as input in order to select the card related to that event
     * @param {string} name 
     * @returns the DOM element of event's card
     */
    getEventByName = (name) => cy.get('a.eventCard').contains(name)
    
    /**
     * Takes the date of an existing event that matches with the name passed as parameter, as input in order to select the card related to that event
     * @param {string} name 
     * @returns the DOM element of event's card
     */
    getEventCardDateByName(name){
        return cy.contains(name).children('.eventCardDate')
    }

    /**
     * Takes the time of an existing event that matches with the name passed as parameter, as input in order to select the card related to that event
     * @param {string} name 
     * @returns the DOM element of event's card
     */
    getEventCardTimeByName(name){
        return this.getEventCardDateByName(name).siblings('div').eq(1).children('span').eq(4)
    }
    
    /** Gest the state of the 'nth' event displayed in the explore page
     * @param {string} nth The number of a registered event, which is displayed sorted for the user
     * @returns the DOM element of event state label
     */
    getNthEventState(nth){
        return cy.get(`.eventCardBadges:nth-child(${nth}) > span`)
    }

    /**
     * @returns the name of an event in the details view
     */
    get name(){
        return cy.get('[data-testid="event-name"]')
    }

    /**
     * @returns the number of attendees of an event in the details view
     */
    get attendees() {
        return cy.get('[data-testid="attendees-count"]')
    }

    /**
     * @returns the description of an event in the details view
     */
    get about(){
        return cy.get('[data-testid="about-event"]')
    }

    /**
     * @returns the additional information of an event in the details view
     */
    get additionalInformation() {
        return cy.get('[data-testid="additional-information-event"]')
    }

    /**
     * @returns the div element that contains the date and time (with the respective timezone) of an event in the details view
     */
    get eventDate(){
        return cy.get('aside h3').siblings('div').children('div').eq(1)
    }

    /**
     * @returns the time in a specific timezone (Mexican, Colombian or Argentinean/Uruguayan) of an event in the details view
     */
    time = { 
        mexicanTime: () => this.eventDate.children('span').eq(0),
        colombianTime: () => this.eventDate.children('span').eq(1),
        argUruTime: () => this.eventDate.children('span').eq(2)
    }

    /**
     * @returns the link of an online or hybrid event in the details view
     */
    get link() {
        return cy.get('aside a')
    }

    /**
     * @returns the 'Inscribirse' button in the details view
     */
    get inscribirseEventoBtn(){
        return cy.get('[data-testid="register-button"]')
    }

    get dropdownList() {
        return cy.get("ul[role='listbox']")
    }

    /**
     * @returns the string of the number of attendees (Ex. 'x asistentes') of an event in the details view
     */
    get eventAttendees() {
        return this.attendees.invoke('text')
    }

    /**
     * The different fields required to register an event inscription in th Registration form, along with the respectives error warnings and messages.
     */
    formularioInscripcion = {
        nombre: {
            field: () => cy.get("input[name='name']"),
            errorMessage: () => this.formularioInscripcion.nombre.field().parent().siblings('p')
        },
        email: {
            field: () => cy.get("input[name='email']"),
            errorMessage: () => this.formularioInscripcion.email.field().parent().siblings('p')
        },
        pais: {
            field: () => cy.get("input[name='country']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.pais.field().parent().siblings('p')
        },
        ciudad: {
            field: () => cy.get("input[name='city']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.ciudad.field().parent().siblings('p')
        },
        empresa: {
            field: () => cy.get("[name='company']"),
            errorMessage: () => this.formularioInscripcion.empresa.field().parent().siblings('p')
        },
        profesion: {
            field: () => cy.get("input[name='profession']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.profesion.field().parent().siblings('p')
        },
        experiencia: {
            field: () => cy.get("input[name='experience']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.experiencia.field().parent().siblings('p')
        },
        nivelDeIngles: {
            field: () => cy.get("input[name='englishLevel']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.nivelDeIngles.field().parent().siblings('p')
        },
        conocesEndava: {
            field: () => cy.get("input[name='knowsEndava']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.conocesEndava.field().parent().siblings('p')
        },
        comoTeEnteraste: {
            field: () => cy.get("input[name='hearFromEvent']").siblings('div'),
            errorMessage: () => this.formularioInscripcion.nivelDeIngles.field().parent().siblings('p')
        },
        termsCheckbox: () => cy.get('input[name="terms"]'),
        inscribirseBtn: () => cy.get('button[type="submit"]'),
        successInscriptionMessage: () => cy.contains('¡Nos vemos allí!'), //fix selector adding an ID
        addToCalendarBtn: () => cy.contains('Añadir al calendario'), //fix selector adding an ID
        googleCalendarOption: () => cy.contains('Google'),
        outlookCalendarOption: () => cy.contains('Outlook'),
        duplicatedInscription: () => cy.get('div#duplicated'),
        emptyTermsErrorMessage: () =>  cy.get('.termsAndConditions')
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

    /**
     * It receives as a parameter the name of a country to be chosen in the dropdown-list
     * @param {string} pais Accepted values: 'Argentina', 'Uruguay', 'Ireland'
     */
    selectPais(pais) {
        this.formularioInscripcion.pais.field().click()
        this.dropdownList.contains(pais).click()
    }

    /**
     * It receives as a parameter the name of a city of the chosen country in order to select it with the dropdown-list
     * @param {string} ciudad Accepted values: For Argentina: 'Buenos Aires', 'Rosario', 'Paraná' and 'Tucumán'; for Uruguay; 'Montevideo'; for Ireland: 'Dublin'
     */
    selectCiudad(ciudad) {
        this.formularioInscripcion.ciudad.field().click()
        cy.contains(ciudad).click()
    }
    
    /**
     * It receives as a parameter the name of a company
     * @param {string} empresa
     */
    enterEmpresa(empresa) {
        this.formularioInscripcion.empresa.field().type(empresa)
    }

    /**
     * It receives as a parameter the name of a profession to be chosen in the dropdown-list
     * @param {string} profesion Accepted values: 'Developer', 'Tester', 'CEO'
     */
    selectProfesion(profesion) {
        this.formularioInscripcion.profesion.field().click()
        this.dropdownList.contains(profesion).click()
    }

    /**
     * It receives as a parameter the years of experience in the profession chosen, in order to select it with the dropdown-list
     * @param {string} experiencia Accepted values: '1 año', '2-3 años', '4-8 años', '8+ años', '10+ años'
     */
    selectExperiencia(experiencia) {
        this.formularioInscripcion.experiencia.field().click()
        this.dropdownList.contains(experiencia).click()
    }

    /**
     * It receives as a parameter the english level of the exteral user, in order to select it with the dropdown-list
     * @param {string} nivel Accepted values: 'O - Principiante', 'A1 - Básico', 'A2 - Pre-intermedio', 'B1 - Intermedio', 'B2 - Intermedio-alto', 'C1 - Avanzado', 'C2 - Bilingue'
     */
    selectNivelDeIngles(nivel) {
        this.formularioInscripcion.nivelDeIngles.field().click()
        this.dropdownList.contains(nivel).click()
    }

    /**
     * It receives as a parameter a string to answer the question : Do you know Endava?, in order to select it with the dropdown-list
     * @param {number} conoce Accepted values: 0 for Affirmative and 1 for Negative
     */
    selectConoceEndava(conoce) {
        this.formularioInscripcion.conocesEndava.field().click()
        this.dropdownList.find('li').eq(conoce).click()
    }

    /**
     * It receives as a parameter a string to answer the question : How did you find out about the event?, in order to select it with the dropdown-list
     * @param {string} comoSeEntero Accepted values: 'Redes Sociales', 'MeetUp', 'Email', 'Soy Endavan', 'Me invitó un conocido'
     */
    selectComoTeEnteraste(comoSeEntero) {
        this.formularioInscripcion.comoTeEnteraste.field().click()
        this.dropdownList.contains(comoSeEntero).click({ force: true })
    }

    /**
     * It clicks the Endava's privacy policies checkbox
     */
    acceptPolicies() {
        this.formularioInscripcion.termsCheckbox().click()
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