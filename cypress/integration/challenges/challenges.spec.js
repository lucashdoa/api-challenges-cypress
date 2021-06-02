/// <reference types="cypress"/>

describe('Getting Started', () => {
  it.skip('01 - POST /challenger(201)', () => {
    cy.request({
      method: 'POST',
      url: '/challenger'
    }).then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.headers['x-challenger']).to.exist
    })
  })
})

describe('First Real Challenge', () => {
  it('02 - GET /challenger(200)', () => {
    cy.request({
      method: 'GET',
      url: '/challenges',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      }
    }).then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.challenges).to.have.length(39)
    })
  })
})

describe('GET Challenges', () => {
  it('03 - GET /todos(200)', () => {
    cy.request({
      method: 'GET',
      url: '/todos',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      }
    }).then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.todos).to.have.length(10)
    })
  })
  it('04 - GET /todo(404) not plural)', () => {
    cy.request({
      method: 'GET',
      url: '/todo',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(404)
      expect(res.body).to.be.empty
    })
  })
  //TO DO: Deixar este teste independente
  it.skip('05 - GET /todos/{id} (200)', () => {
    cy.request({
      method: 'GET',
      url: '/todos/75',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.todos[0].id).to.be.equal(65)
      expect(res.body.todos[0].title).to.be.equal('pay invoices')
    })
  })
  it('06 - GET /todos/{id} (404)', () => {
    cy.request({
      method: 'GET',
      url: '/todos/1',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(404)
      expect(res.body.todos).to.not.exist
    })
  })
})

describe('HEAD Challenges', () => {
  it('07 - HEAD /todos(200)', () => {
    cy.request({
      method: 'HEAD',
      url: '/todos',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      }
    }).then(res => {
      expect(res.status).to.be.equal(200)
      console.log(res)
      expect(res.body).to.be.empty
      expect(res.headers).to.exist
    })
  })
})

describe('Creation Challenges with POST', () => {
  it.skip('08 - POST /todos(201)', () => {
    cy.request({
      method: 'POST',
      url: '/todos',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
      body: {
        "title": "new todo",
        "doneStatus": true
      }
    }).then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body.id).to.exist
      expect(res.body.title).to.be.equal('new todo')
    })
  })
  it('09 - GET /todos(200) ?filter', () => {
    cy.request({
      method: 'GET',
      url: '/todos?doneStatus=true',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
    }).then(res => {
      expect(res.status).to.be.equal(200)
      expect(res.body.todos).to.have.length(4)
    })
  })
  it.only('10 - POST /todos(400) doneStatus', () => {
    cy.request({
      method: 'POST',
      url: '/todos',
      headers: {
        "X-CHALLENGER": "10fc9704-a51c-4cdd-bad3-eb226882f129"
      },
      body: {
        "title": "new todo",
        "doneStatus": "true"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.equal(400)
      console.log(res)
      expect(res.body.errorMessages[0]).to.be.equal('Failed Validation: doneStatus should be BOOLEAN')
    })
  })
})
