Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Suzana')
    cy.get('#lastName').type('Buiate')
    cy.get('#email').type('suzana@teste.com.br')
    cy.get('#open-text-area').type('Teste Cypress')
    cy.contains('.button', 'Enviar').click()
})
