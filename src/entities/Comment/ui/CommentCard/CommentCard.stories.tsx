import { CommentCard } from './CommentCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    avatar: '',
    text: 'Wow',
    user: {
      id: '1',
      username: 'Tronald Dump',
      avatar: 'https://surl.li/dklgk',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
