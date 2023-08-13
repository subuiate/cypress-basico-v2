/// <reference types="Cypress"  />
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
  })

    it('verifica o título da aplicação', function() {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

    it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Suzana')
        cy.get('#lastName').type('Buiate')
        cy.get('#email').type('suzana@teste.com.br')
        cy.get('#phone').type('34990000000')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
  })
    
    it.only('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação incorreta', function() {
        cy.get('#firstName').type('Suzana')
        cy.get('#lastName').type('Buiate')
        cy.get('#email').type('suzanateste@br')
        cy.get('#phone').type('34990000000')
        cy.get('#open-text-area').type('Teste com erro')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
  })

    it('campo telefone continua vazio quando preenchido com  valor não-numérico', function() {
        cy.get('#phone')
          .type('abcd')
          .should('have.value', '') 
  })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Suzana')
        cy.get('#lastName').type('Buiate')
        cy.get('#email').type('suzana@teste.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste com erro')
        cy.contains('.button', 'Enviar').click()  
        cy.get('.error').should('be.visible')
  })

    it('Preenche e limpa os campo: nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type ('Suzana')
          .should('have.value', 'Suzana')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .type ('Buiate')
          .should('have.value', 'Buiate')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type ('suzana@teste.com.br')
          .should('have.value', 'suzana@teste.com.br')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type ('3499999999')
          .should('have.value', '3499999999')
          .clear()
          .should('have.value', '')
  })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('.button', 'Enviar').click()   
        cy.get('.error').should('be.visible')
  })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
  })

    it('Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
  })

    it('Seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
  })

    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
  })

    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
  })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
  })
  })

    it('Marca checkbox', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')   
  })

    it('Exibe mensagem de erro', function() {
        cy.get('#firstName').type('Suzana')
        cy.get('#lastName').type('Buiate')
        cy.get('#email').type('suzana@teste.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste com erro')
        cy.contains('.button', 'Enviar').click()  
        cy.get('.error').should('be.visible')
  })

    it('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
  })
  })
    it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
          .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
  })
  })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')              
  })
  })

    it('Verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        
        cy.contains('Talking About Testing').should('be.visible')
  })

  
  })
      
