import { AvatarDropdown } from './AvatarDropdown';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
