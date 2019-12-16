module.exports = {
  extends: [
    'motley',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'react/prop-types': 0
  },
}
