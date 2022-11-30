import { ArticleInfiniteList } from './ArticleInfiniteList';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'pages/ArticleDetailsPageArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => <ArticleInfiniteList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
