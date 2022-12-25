import { Country } from '@/entities/Country';
import { ProfileCard } from './ProfileCard';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/avatar.jpg';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    firstname: 'S',
    lastname: 'D',
    age: 28,
    currency: Currency.UAH,
    country: Country.Ukraine,
    city: 'Kyiv',
    username: 'admin',
    avatar,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};
