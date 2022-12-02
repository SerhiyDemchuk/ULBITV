import { $api } from 'shared/api/api';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableProfileCard } from './editableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

const profile: Profile = {
  id: '1',
  firstname: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.EUR,
  country: Country.Poland,
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1', username: 'admin' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Read only mode should toggle', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('If cancel, values should delete', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.LastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.LastName'), 'user');

    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('admin');
  });

  test('An error should appear', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('If no validation errors, the PUT request should be sent', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
