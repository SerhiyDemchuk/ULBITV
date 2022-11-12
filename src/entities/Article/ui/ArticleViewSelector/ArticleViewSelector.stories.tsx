import { ArticleViewSelector } from './ArticleViewSelector';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
