let currentArticleId: string;

describe('User goes to article page and...', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${currentArticleId}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('sees the article"s content', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('sees recommendations list', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('leaves comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('rates the article', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.setRate(4, 'good');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
