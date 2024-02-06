module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient'
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
