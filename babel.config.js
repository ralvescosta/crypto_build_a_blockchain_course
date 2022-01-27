module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'), {
        alias: {
          '@': './src/'
        }
      }
    ],
    '@babel/proposal-object-rest-spread'
  ],
  ignore: [
    'test/'
  ]
}
