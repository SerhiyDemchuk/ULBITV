import { CommentList } from './CommentList';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'Hello',
      user: { id: '1', username: 'Ge' },
    },
    {
      id: '2',
      text: 'Wow',
      user: { id: '2', username: 'Donald Trump' },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
