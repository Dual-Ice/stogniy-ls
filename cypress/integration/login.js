beforeEach(() => {
  cy.visit("http://localhost:8080/admin")
})
it("На странице есть кнопка “Отправить”", () => {
  cy.get('.login__btn').then($el => {
    const text = $el.text()
    cy.wrap(text).should("not.be.empty")
    cy.wrap(text).should("not.contain", null)
    cy.wrap(text).should("not.contain", undefined)
    cy.wrap(text).should("contain", 'Отправить')
  })
});

it("Форма имеет все необходимые поля", () => {
  cy.get('input[name="login"]')
  cy.get('input[name="password"]')
  cy.get('.login__btn')
});

it("Кнопка “Отправить” заблокирована", () => {
  cy.get('.login__btn').should('have.class', 'blocked')
  cy.get('input[name="login"]').type('login')

  cy.get('input[name="password"]').type('password')
  cy.get('.login__btn').should('not.have.class', 'blocked')
});