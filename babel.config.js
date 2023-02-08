module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['babel-plugin-transform-scss'],
};
