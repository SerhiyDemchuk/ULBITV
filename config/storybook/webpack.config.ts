import path from 'path';
import { BuildPaths } from '../build/types/config';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };
  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.extensions!.push('.ts', '.tsx');
  config!.module!.rules!.push(buildCssLoader(true));
  // eslint-disable-next-line no-param-reassign
  // @ts-ignore
  config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });
  config!.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('https://testapi.ua'),
    __PROJECT__: JSON.stringify('storybook'),
  }));
  return config;
};
