/// <reference types="Cypress"/>
const Page = require('./page');

class Login extends Page{
    url = 'login'

    /**
     *Opens a sub page of the page
     */
    navigate(){
        super.navigate(this.url)
    }

    /**
     * Gets the email text box for the Login page
     * @returns the DOM element of the email field
     */
    get emailField(){
        return cy.get("input[name='email']")
    }

    /**
     * Gets the password text box for the Login page
     * @returns the DOM element of the password field
     */
    get passwordField(){
        return cy.get("input[name='password']")
    }

    /**
     * Gets the Log In button for the Login page
     * @returns the DOM element of the Log In button
     */
    get logInButton(){
        return cy.get("button[type='submit']")
    }
    
    /**
     * Gets the label of the error message for the Login page
     * @returns the DOM element of the error message
     */
    get errorMessage(){
        return cy.get("span.loginError")
    }

    /**
     * It receives the email and the password as parameters in order to fulfill the required field to Log In. Then, the Log In button is clicked.
     * @param {string} email 
     * @param {string} password 
     */
    login(email, password){
        this.emailField.type(email)
        this.passwordField.type(password)
        this.logInButton.click()
    }
}

module.exports = new Login