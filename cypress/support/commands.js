Cypress.Commands.add("loginByApi", (username, password = Cypress.env("defaultPassword")) => {
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
                    }
                    authentication {
                        token
                    }
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
            "query": `
                mutation addEventAttendee($addEventAttendeeInput: AddEventAttendeeInput!) {
                    addEventAttendee(input: $addEventAttendeeInput) {
                        recordId
                    }
                }`
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
                "timezone": "America/Buenos_Aires",
                "creator": "julian.lostumbo@endava.com",
                "description": "description",
                "aditionalInformation": "bla",
                "contactInformation": "",
                "banner": "",
                "published": isPublic
            }
        },
        "query": `
            mutation createEvent($input: CreateEventInput!) {
                createEvent(input: $input) {
                    recordId 
                }
            }`
    })/*.as('create')
        cy.get('@create').its('status').should('be.eq', 200) 
        cy.get('@create').its('body').then(body => {
            expect(body.data.createEvent).to.have.property(recordId)
        })
        */
        
})

Cypress.Commands.add('deleteEventThroughAPI', (eventName) => {
    var eventId;
    // get event ID by event name
    cy.request('POST', Cypress.env('LOCAL_API_URL'), {
        "query": `{
            getEvents {
                records {
                    id
                    name
                }
            }
        }`
    }).then(res => {
        const eventsArray = res.body.data.getEvents.records
        const newEvent = eventsArray.filter(event => event.name == eventName)[0]
        eventId = newEvent.id

        // use the id found to delete the event
        cy.request('POST', Cypress.env('LOCAL_API_URL'), {
            "operationName": "deleteEvent",
            "variables": {
                "input": {
                    "id": eventId
                }
            },
            "query": `
                mutation deleteEvent($input: DeleteEventInput!) {
                    deleteEvent(input: $input) {
                        deletedCount
                    }
                }
            `
        })
    });
});