// CAC-TAC.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName'). type('Ana Clara')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()
    })    

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName'). type('Ana Clara')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('email@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo de telefone continua vazio quando preenchido com ovalor não-numérico', function(){
        cy.get('#phone')
          .type('aaaaaaaaaaaaaaaa')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName'). type('Ana Clara')
        cy.get('#lastName').type('Cordeiro')
        cy.get('#email').type('email@email,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Ana Clara')
          .should('have.value', 'Ana Clara')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Cordeiro')
          .should('have.value', 'Cordeiro')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('email@email.com')
          .should('have.value', 'email@email.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('88888888888')
          .should('have.value', '88888888888')
          .clear()
          .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    // it('envia o formuário com sucesso usando um comando customizado', function(){
    //   cy.fillMandatoryFieldsAndSubmit()

    //   cy.get('.success').should('be.visible')
    // })

    it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio)
            .check()
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('#check input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('#phone-checkbox')
        .check()
        .should('be.checked')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop - arrastar e soltar', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    //   cy.fixture('example.json').as('sampleFile')
    //   cy.get('input[type="file"]')
    //     .selectFile('@sampleFile')
    //     .should(function($input){
    //       expect($input[0].files[0].name).to.equal('example.json')
    //     })
    // })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      // não abrir em outra aba
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){ 
      
    })
  })
  