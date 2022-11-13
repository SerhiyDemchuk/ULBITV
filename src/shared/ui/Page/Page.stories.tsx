import { Page } from './Page';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
