import ArticleDetailsPage from './ArticleDetailsPage';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
