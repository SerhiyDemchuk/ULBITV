let profileId: string;

describe('User goes to profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${profileId}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('and profile loads successfully', () => {
    cy.getByTestId('ProfileCard.FirstName').should('have.value', 'Serh');
  });
  it('and redacts it', () => {
    const newFirstName = 'new';
    const newLastName = 'lastname';
    cy.updateProfile(newFirstName, newLastName);
    cy.getByTestId('ProfileCard.FirstName').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.LastName').should('have.value', newLastName);
  });
});
