import { CurrencySelect } from './CurrencySelect';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'entities/CountrySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
