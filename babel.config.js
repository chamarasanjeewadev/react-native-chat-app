module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          src: './src',
          assets: './src/assets',
          screens: './src/screens',
          components: './src/components',
          navigators: './src/navigators',
          services: './src/services',
          utils: './src/utils',
          store: './src/store',
          configs: './src/configs'
        }
      }
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        importSource: 'nativewind'
      }
    ]
  ]
}
