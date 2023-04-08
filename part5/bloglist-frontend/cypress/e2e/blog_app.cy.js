describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Valentina Londoño Marin',
      username: 'vlondono',
      password: 'supersecure'
    }
    const user2 = {
      name: 'Miriam Marin Arias',
      username: 'mmarin',
      password: 'supersecure'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login to application')
      cy.contains('Valentina Londoño Marin').should('not.exist')

      cy.get('#username').type('vlondono')
      cy.get('#password').type('supersecure')
      cy.get('#login-button').click()

      cy.contains('Valentina Londoño Marin')
      cy.contains('Login to application').should('not.exist')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vlondono')
      cy.get('#password').type('incorrectPassword')
      cy.get('#login-button').click()
      cy.get('.alert').contains('Wrong username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'vlondono', password: 'supersecure' })
    })

    it('A blog can be created', () => {
      cy.get('#create').contains('new blog').click()
      cy.get('#title').type('A new blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.com')
      cy.get('.createButton').click()
      cy.get('.alert-success').contains('added')
      cy.contains('A new blog created by cypress')
    })

    it('A blog can be liked', () => {
      cy.createBlog({
        title: 'A second blog created by cypress',
        author: 'Cypress',
        url: 'https://www.cypress.com',
      })

      cy.contains('A second blog created by cypress')
        .contains('View')
        .click()
      cy.contains('like').click()
    })

    it('A blog can be deleted', () => {
      cy.createBlog({
        title: 'A third blog created by cypress',
        author: 'Cypress',
        url: 'https://www.cypress.com',
      })

      cy.contains('A third blog created by cypress')
        .contains('View')
        .click()
      cy.contains('remove').click()

      cy.contains('A third blog created by cypress').should('not.exist')
    })

    it('A blog cant be deleted only but his owner', () => {
      cy.createBlog({
        title: 'A fourth blog created by cypress',
        author: 'Cypress',
        url: 'https://www.cypress.com',
      })

      cy.contains('Logout').click()

      cy.login({ username: 'mmarin', password: 'supersecure' })

      cy.contains('A fourth blog created by cypress')
        .contains('View')
        .click()

      cy.contains('remove').should('not.be.visible')
    })

    it('Blogs are ordered by likes', () => {
      cy.createBlog({
        title: 'The title with most likes',
        author: 'Cypress',
        url: 'https://www.cypress.com',
      })

      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Cypress',
        url: 'https://www.cypress.com',
      })

      cy.contains('The title with most likes').contains('View').click()
      cy.get('button').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'The title with most likes')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'The title with the second most likes')
    })
  })
})