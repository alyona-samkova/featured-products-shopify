/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,

  plugins: ['@shopify/prettier-plugin-liquid'],

  overrides: [
    {
      files: '*.liquid',
      options: {},
    },
    {
      files: ['*.js'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.scss', '*.css'],
      options: {
        parser: 'scss',
      },
    },
  ],
};
