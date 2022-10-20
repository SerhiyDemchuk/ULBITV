import { Country, Currency } from 'shared/const/common';

export interface Profile {
  name: string;
  surname: string;
  age: string;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface ProfileSchema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
