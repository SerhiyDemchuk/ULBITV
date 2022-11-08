import { CommentList } from './CommentList';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
