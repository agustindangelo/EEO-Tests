///<reference types="Cypress"/>
import Login from '../support/pageobjects/login.page'
import Events from '../support/pageobjects/events.page'

describe('Happy paths', () => {
    const login = new Login()
    const events = new Events()

    beforeEach(() => {
        
    });

    it('user should be logged in', () => {
        
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