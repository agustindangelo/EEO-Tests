/// <reference types="Cypress"/>

class Login {
    url = 'login'
    get emailField(){
        return cy.get("input[name='email']")
    }
    get passwordField(){
        return cy.get("input[name='password']")
    }

    get logInButton(){
        return cy.get("button[type='submit']")
    }

    get errorMessage(){
        return cy.get("span.loginError")
    }

    login(email, password){
        this.emailField.type(email)
        this.passwordField.type(password)
        this.logInButton.click()
    }
}

module.exports = new Login