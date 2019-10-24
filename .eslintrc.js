const base = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
  ],
  plugins: [
    "react-hooks",
  ],
  rules: {
    "no-underscore-dangle": ["error", { "allow": ["__DEV__"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "curly": ["error", "all"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
}

module.exports = {
  ...base,
  overrides: [
    {
      ...base,
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        ...base.extends,
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
      },
    },
  ]
}