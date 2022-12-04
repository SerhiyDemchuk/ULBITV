import { NotificationItem } from './NotificationItem';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
