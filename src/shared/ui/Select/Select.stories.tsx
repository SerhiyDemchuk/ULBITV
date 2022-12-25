import { Select } from './Select';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: [
    { value: '1', content: 'One' },
    { value: '2', content: 'Two' },
    { value: '3', content: 'Three' },
  ],
};
