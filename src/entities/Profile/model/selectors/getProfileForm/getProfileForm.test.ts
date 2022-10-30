import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileForm.test', () => {
  test('should work with filled state', () => {
    const data = {
      firstname: 'S',
      lastname: 'D',
      age: 28,
      currency: Currency.UAH,
      country: Country.Ukraine,
      city: 'Kyiv',
      username: 'admin',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
