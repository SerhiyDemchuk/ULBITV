import { Popover } from './Popover';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
