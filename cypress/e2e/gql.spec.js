///<reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'
import Explore from '../support/pageobjects/explore.page'
import { getRandomEmail } from '../support/util.js';

describe('Happy paths', () => {
    const login = new Login()
    const events = new Events()

    beforeEach(() => {
        
    });

    it('an event must be published', () => {
        cy.createEventByApi('Event API', false).its('body').then(body => {
            let eventId = body.data.createEvent.recordId
            cy.log(eventId)
            })
        })

    it.only('user should be registered to an event', () => {

        //to get the Id of an existing event using the UI
        /*const explore = new Explore();
        explore.navigate();
        explore.getNthEvent(1).click()
        cy.url().then(url => {
            let endpointArray = url.split('/')
            let endpoint = endpointArray[endpointArray.length-1]
            cy.log(endpoint)
            cy.registerToEventByApi(getRandomEmail(), endpoint)
        })*/

        //first I create an event and then I use its id to register an attendant
        cy.createEventByApi('Event API', true).its('body').then(body => {
            let eventId = body.data.createEvent.recordId
            cy.log(eventId)
            cy.registerToEventByApi(getRandomEmail(), eventId)
            })
        })
})
// # mutation login($input: LoginInput!) {
// #   login(input: $input) {
// #     authentication {
// #       token
// #     }
// #   }
// # }

// mutation CreateEvent($input: CreateEventInput!) {
//   createEvent(input: $input) {
//     record {
//       address
//       aditionalInformation
//       creator
//       description
//     }
//   }
// }

// variables 
// {
//   "input": {
//     "email": "agustin.dangelo@endava.com",
//     "password": "123456aA!" 
//   }
// }

// {
//   "input": {
//     "name": "test api"
//   }
// }