module.exports = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-mock',
    '@storybook/addon-links',
    'storybook-addon-themes',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
