

Cypress.Commands.add("loginByApi", (username, password = Cypress.env("defaultPassword")) => {
//   return cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
//     username,
//     password,
//   });
    cy.request('POST', Cypress.env('LOCAL_API_URL'), {
        "operationName": "LoginMutation",
        "variables": {
            "input": {
                "email": username,
                "password": password
            }
        },
        "query": `
            mutation LoginMutation($input: LoginInput!) {
                login(input: $input) {
                    user {
                        name
                        email
                        __typename
                    }
                    authentication {
                        token
                        __typename
                    }
                    __typename
                }
            }`
    }).then(res => {
        localStorage.setItem(
        'authData' , JSON.stringify({"name": res.body.data.login.user.name,"token": res.body.data.login.authentication.token,"email": res.body.data.login.user.email})
        )
    })
    cy.visit('/events')
});

/**
 * Register an user to an event always with harcoded data, just changing the email.
 * @param {String} eventId The id is in the URL when selecting an event
 * @param {String} email
 */
Cypress.Commands.add("registerToEventByApi", (eventId, email) => {
    cy.request('POST', Cypress.env('LOCAL_API_URL'), {
            "operationName": "addEventAttendee",
            "variables": {
                "addEventAttendeeInput": {
                    "eventId": eventId,
                    "name": "Julián Martín Lostumbo",
                    "email": email,
                    "country": "Argentina",
                    "city": "Rosario",
                    "profession": "tester",
                    "company": "Endava Argentina SRL",
                    "experience": "3",
                    "englishLevel": "B2",
                    "knowsEndava": "yes",
                    "hearFromEvent": "employee",
                    "terms": true,
                    "personalData": true
                }
            },
            "query": "mutation addEventAttendee($addEventAttendeeInput: AddEventAttendeeInput!) {\n  addEventAttendee(input: $addEventAttendeeInput) {\n    recordId\n    __typename\n  }\n}\n"
        }).as('register')
        cy.get('@register').its('status').should('be.eq', 200)
        /* 
        cy.get('@register').its('body').then(body => {
            expect(body.data.addEventAttendee).to.have.property(recordId)
        })
        */
})

/**
 * Create an event using harcoded data
 * @param {String} eventName
 * @param {boolean} isPublic
 */
 Cypress.Commands.add("createEventByApi", (eventName, isPublic) => {
    let date = new Date();
    date.setDate(date.getDate() + parseInt((Math.random() * 100), 10)) //get a date x days after today
    let dateArray = date.toLocaleDateString().split('/') //[MM,DD,YYYY]

    //to follow the format the API uses
    let day =  (dateArray[1].length == 1) ? ('0' + dateArray[1]) : dateArray[1] 
    let month = (dateArray[0].length == 1) ? ('0'+ dateArray[0]) : dateArray[0]
    let year = dateArray[2]
    let eventDate = year + '-' + month + '-' + day + "T16:50:10.274Z" 
    let eventDateStarts = year + '-' + month + '-' + day + "T09:00:00.245-03:00"
    let eventDateEnds = year + '-' + month + '-' + day + "T11:00:00.066-03:00" 

    return cy.request('POST', Cypress.env('LOCAL_API_URL'), {
        "operationName": "createEvent",
        "variables": {
            "input": {
                "name": eventName,
                "organizer": "",
                "location": "",
                "modality": "virtual",
                "address": "",
                "link": "event-api.com",
                "date": {
                    "start": eventDate,
                    "end": eventDate
                },
                "startTime": eventDateStarts,
                "endTime": eventDateEnds,
                "timezone": "America/Buenos_Aires",
                "creator": "julian.lostumbo@endava.com",
                "description": "description",
                "aditionalInformation": "bla",
                "contactInformation": "",
                "banner": "",
                "published": isPublic
            }
        },
        "query": "mutation createEvent($input: CreateEventInput!) {\n  createEvent(input: $input) {\n    recordId\n    __typename\n  }\n}\n"
    })/*.as('create')
        cy.get('@create').its('status').should('be.eq', 200) 
        cy.get('@create').its('body').then(body => {
            expect(body.data.createEvent).to.have.property(recordId)
        })
        */
        
})

