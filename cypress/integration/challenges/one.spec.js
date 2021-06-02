/// <reference types="cypress"/>

describe('Getting Started', () => {
  it.skip('POST /challenger(201)', () => {
    cy.request({
      method: 'POST',
      url: '/challenger'
    }).then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.headers['x-challenger']).to.exist
    })
  })
})
