import { CommentCard } from './CommentCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    avatar: '',
    text: 'Wow',
    user: {
      id: '1',
      username: 'Tronald Dump',
      avatar:
        'https://img.freepik.com/free-vector/cute-cat-holding-fish-cartoon-icon-illustration-animal-food-icon-concept-isolated-flat-cartoon-style_138676-2171.jpg?w=740&t=st=1666271498~exp=1666272098~hmac=051c2240ad8fa26af2ae17776db57f52cd6a598dbacad7c03a35970f94779a81',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
