Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName'). type('Ana Clara')
    cy.get('#lastName').type('Cordeiro')
    cy.get('#email').type('email@email,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})