/* eslint-env node */

const {
    env: { NODE_ENV },
  } = process;
  
module.exports = require(`./configuration/webpack.${NODE_ENV}.js`);
