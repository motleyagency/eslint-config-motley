module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'prettier',
  ],
  plugins: [
    'react-hooks',
  ],
  rules: {
    'no-underscore-dangle': ['error', { 'allow': ['__DEV__'] }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'curly': ['error', 'all'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
};