/* eslint-env node */
const common = require('./webpack.common');

module.exports = (env, argv) => {
  argv.mode = 'production';

  let config = common(env, argv);

  return {
    ...config,
    mode: 'production',
    devtool: 'source-map',
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: 'production',
            },
          },
        },
      ],
    },
  };
};