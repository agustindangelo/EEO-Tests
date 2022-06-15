/// <reference types="Cypress"/>
const Page = require('./page');

class Explore extends Page{

    url = ''

    /** Gest the card of the 'nth' event displayed in the explore page
     * @param {string} nth The number of a registered event, which is displayed sorted for the user
     * @returns the DOM element of event's card
     */
    getNthEvent(nth){
        return cy.get(`.sc-kDTinF:nth-child(${nth})`)
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

    formularioIncripcion={
        nombre:{
            field: () => cy.contains('Nombre').first(),
            errorMessage: () => cy.contains('Por favor, ingresa un Nombre válido')   
        },
        email:{
            field: () => cy.contains('Email').first(),
            errorMessage: () => cy.contains('Por favor, ingresa un Email válido') 
        },
        pais: {
            ddl: () => cy.get("input[name='country']"),
            option: (nth) => cy.get(`#menu-country li:nth-child(${nth})`),
            errorMessage: () => cy.contains('Por favor, ingresa un País válido')
        },
        ciudad: {
            ddl: () => cy.get("input[name='city']"),
            option: (nth) => cy.get(`#menu-city li:nth-child(${nth})`),
            errorMessage: () => cy.contains('Por favor, ingresa una Ciudad válida')
        },
        profession: {
            ddl: () => cy.get("input[name='profession']"),
            option: (nth) => cy.get(`#menu-profession li:nth-child(${nth})`),
            errorMessage: () => cy.contains('Por favor, ingresa una profesión válida')
        },
        inscribirseBtn: () => cy.contains('Inscribirse').last(), //cy.get('button > span:nth-child(2)')
        successInscriptionMessage: () => cy.contains('¡Nos vemos allí!'),
        addToCalendarBtn: () => cy.contains('Añadir al calendario'),
        googleCalendarOption: () => cy.contains('Google'),
        outlookCalendarOption: () => cy.contains('Outlook')
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
        this.formularioIncripcion.nombre.field().type(nombre)
    }

    /**
     * Receives an email as a parameter and then it is entered in the 'Email' text field 
     * @param {string} email The email of the person who is interested in the event
     */
    enterEmail(email){
        this.formularioIncripcion.email.field().type(email)
    }

    /**
     * Receives the name of a country as a parameter and then it is selected with the 'Pais' dropdownlist in the inscription form
     * @param {string} pais the name of a country. Accepted values: 'Argentina', 'Uruguay' and 'Chile'
     */
    selectPais(pais){
        switch(pais.toLowerCase()){
            case 'argentina': {
                this.formularioIncripcion.pais.option('1').click()
                break;
            }
            case 'uruguay': {
                this.formularioIncripcion.pais.option('2').click()
                break;
            }
            case 'ireland': {
                this.formularioIncripcion.pais.option('3').click()
                break;
            }
            default: break;
        }
    }

    /**
     * The first city of the 'Ciudad' dropdownlist is selected in the inscription form
     */
    selectCiudad(){
        this.formularioIncripcion.ciudad.option('1').click()
    }

    /**
     * Receives the profession's name as a parameter and then it is selected with the 'Profesion / Ocupación' dropdownlist in the inscription form
     * @param {string} profession The profession of the user interested in the event. Accepted values: 'developer', 'tester' and 'ceo'.
     */
    selectProfesion(profession){
        switch(profession.toLowerCase()){
            case 'developer': {
                this.formularioIncripcion.profession.option('1').click()
                break;
            }
            case 'tester': {
                this.formularioIncripcion.profession.option('2').click()
                break;
            }
            case 'ceo': {
                this.formularioIncripcion.profession.option('3').click()
                break;
            }
            default: break;
        }
    }

    /**
     * The 'Inscribirse' button is clicked in the inscription page
     */
    clickInscribirseEvento(){
        this.inscribirseEventoBtn.click()
    }

    /**
     * The 'Inscribirse' button is clicked in the inscription form
     */
    clickInscribirseEventoForm(){
        this.formularioIncripcion.inscribirseBtn().click()
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
     * Gets the calendar option as an input in order to select it with the 'Añadir al calendario' field
     * @param {string} option The calendar option selected. Accepted values: 'Google' and 'Outlook' 
     */
    clickCalendarOpcion(option){
        switch(option.toLowerCase()){
            case 'google': {
                this.formularioIncripcion.googleCalendarOption().click()
                break;
            }
            case 'outlook': {
                this.formularioIncripcion.outlookCalendarOption().click()
                break;
            }
            default: break;
        }
    }
}

export default Explore