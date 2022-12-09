import { RatingCard } from './RatingCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
