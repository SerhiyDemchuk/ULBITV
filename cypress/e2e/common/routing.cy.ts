import { selectByTestId } from '../helpers/selectByTestId';

describe('Routing', () => {
  describe('User is not authorized', () => {
    it('Open main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Open profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Open wrong link', () => {
      cy.visit('/profileasdf');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
  describe('User authorized', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Open profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    it('Open articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
