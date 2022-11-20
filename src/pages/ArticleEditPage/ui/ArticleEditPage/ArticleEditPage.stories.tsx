import ArticleEditPage from './ArticleEditPage';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'pages/Article/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
