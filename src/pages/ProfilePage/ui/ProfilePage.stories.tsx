import ProfilePage from './ProfilePage';
import { Theme } from 'app/providers/ThemeProvider';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import avatar from 'shared/assets/tests/avatar.jpg';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
  profile: {
    form: {
      firstname: 'S',
      lastname: 'D',
      age: 28,
      currency: Currency.UAH,
      country: Country.Ukraine,
      city: 'Kyiv',
      username: 'admin',
      avatar,
    },
  },
}, {})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      firstname: 'S',
      lastname: 'D',
      age: 28,
      currency: Currency.UAH,
      country: Country.Ukraine,
      city: 'Kyiv',
      username: 'admin',
      avatar,
    },
  },
}, {})];
