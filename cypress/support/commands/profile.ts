import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.FirstName').clear().type(firstname);
  cy.getByTestId('ProfileCard.LastName').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asdfas' },
    body: {
      id: '2',
      firstname: 'Serh',
      lastname: 'D',
      age: 2,
      currency: 'ZLT',
      country: 'Poland',
      city: 'Warsaw',
      username: 'user',
      avatar: 'https://img.freepik.com/free-vector/cute-cat-holding-fish-cartoon-icon-illustration-animal-food-'
        + 'icon-concept-isolated-flat-cartoon-style_138676-2171.jpg?w=740&t=st=1666271498~exp=1666272098~hmac=051c224'
        + '0ad8fa26af2ae17776db57f52cd6a598dbacad7c03a35970f94779a81',
    },
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
    return body;
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
