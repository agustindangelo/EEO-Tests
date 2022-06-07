/// <reference types="Cypress"/>
const Page = require('./page');

class Explore extends Page{
    url = ''
    getNthEvent(nth){
        return cy.get(`.sc-kDTinF:nth-child(${nth})`)
    }
    
    getNthEventState(nth){
        return cy.get(`.sc-kDTinF:nth-child(${nth}) .eventCardBadges > span`)
    }

    get inscribirseEventoBtn(){
        return cy.contains('Inscribirse').first() //cy.get('button > span:nth-child(1)')
    }

    formularioIncripcion={
        nombre:{
            field: () => { return cy.contains('Nombre').first() },
            errorMessage: () => { return cy.contains('Por favor, ingresa un Nombre válido') }   
        },
        email:{
            field: () => { return cy.contains('Email').first() },
            errorMessage: () => { return cy.contains('Por favor, ingresa un Email válido') }   
        },
        pais: {
            ddl: () => { return cy.get("input[name='country']") },
            option: (nth) => { return cy.get(`#menu-country li:nth-child(${nth})`) },
            errorMessage: () => { cy.contains('Por favor, ingresa un País válido') }
        },
        ciudad: {
            ddl: () => { return cy.get("input[name='city']") },
            option: (nth) => { return cy.get(`#menu-city li:nth-child(${nth})`) },
            errorMessage: () => { cy.contains('Por favor, ingresa una Ciudad válida') }
        },
        profession: {
            ddl: () => { return cy.get("input[name='profession']") },
            option: (nth) => { return cy.get(`#menu-profession li:nth-child(${nth})`) },
            errorMessage: () => { cy.contains('Por favor, ingresa una profesión válida') }
        },
        inscribirseBtn: () => { return cy.contains('Inscribirse').last() }, //cy.get('button > span:nth-child(2)')
        successInscriptionMessage: () => { return cy.contains('¡Nos vemos allí!') },
        addToCalendarBtn: () => { return cy.contains('Añadir al calendario') },
        googleCalendarOption: () => { return cy.contains('Google') },
        outlookCalendarOption: () => { return cy.contains('Outlook') }
    }

    navigate(){
        super.navigate(this.url)
    }

    enterNombre(nombre){
        this.formularioIncripcion.nombre.field().type(nombre)
    }

    enterEmail(email){
        this.formularioIncripcion.email.field().type(email)
    }

    /**
     * 
     * @param {string} pais 
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

    selectCiudad(){
        this.formularioIncripcion.ciudad.option('1').click()
    }

    /**
     * 
     * @param {string} profession 
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

    clickInscribirseEvento(){
        this.inscribirseEventoBtn.click()
    }

    clickInscribirseEventoForm(){
        this.formularioIncripcion.inscribirseBtn().click()
    }

    /**
     * 
     * @param {string} nombre
     * @param {string} email 
     * @param {string} pais 
     * @param {string} ciudad 
     * @param {string} profession  
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

module.exports = new Explore