module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    'no-underscore-dangle': ['error', { 'allow': ['__DEV__'] }],
    'curly': ['error', 'all'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',    
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'react/prop-types': 0,
    'import/extensions': [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
  },
}
