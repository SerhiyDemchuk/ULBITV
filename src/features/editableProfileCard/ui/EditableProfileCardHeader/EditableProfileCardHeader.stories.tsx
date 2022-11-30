import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'features/ArticleDetailsPage/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => <EditableProfileCardHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
