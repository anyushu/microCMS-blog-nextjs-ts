const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal(config) {
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')]
    config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()]
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
}
