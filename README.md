# eslint-config-motley(-typescript)

[Motley's](https://www.motley.fi/) JavaScript/TypeScript styleguide, using `eslint` and `prettier` with zero configuration.
Based on `eslint-config-airbnb`.

Supports the following features out of the box:

- Prettier autoformatting on precommit stage via `husky`.
- ES2015+
- Imports and exports
- React
- a11y
- Full TypeScript support via the `-typescript` package
- `__DEV__` is a valid underscore-dangle value
- `js` is a valid filename for `JSX` files (in JavaScript)

**Note**: Support for Node 6 dropped since version 10. Old projects should install `eslint-config-motley@^9`.

## Installation

### JavaScript

Run the following command:

```bash
npx install-peerdeps --dev eslint-config-motley
```

If you get prompted that do you want to use Yarn and nothing gets installed after that try following command:
```bash
npx install-peerdeps --dev eslint-config-motley --yarn
```

If all went well, you should see the following in your `.eslintrc.js`:

```js
module.exports = {
  extends: 'motley',
};
```

### TypeScript

Run the following command:

```bash
npx install-peerdeps --dev eslint-config-motley-typescript
```

If you get prompted that do you want to use Yarn and nothing gets installed after that try following command:
```bash
npx install-peerdeps --dev eslint-config-motley-typescript --yarn
```

If all went well, you should see the following in your `.eslintrc.js`:

```js
module.exports = {
  extends: 'motley-typescript',
};
```

### Post-install:

You should have the following set in `.prettierrc`;

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

and the following in your `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,json,graphql,md,css,scss,less,ts,tsx}": ["prettier --write", "git add"]
  }
}
```

## Using experimental JavaScript features with `eslint-config-motley`

If you are using experimental features such as class fields with **JavaScript** files you should install `babel-eslint` and add it as a parser to your `.eslintrc.js`:

```bash
npm install --save-dev babel-eslint

# or

yarn add babel-eslint -D
```

```js
module.exports = {
  extends: 'motley',
  parser: 'babel-eslint',
};
```

> **NOTE**: The TypeScript packages automatically uses `@typescript-eslint/parser`

## Running tests

Tests use `verdaccio` as a local repository and `jest` for testing. The tests itself can be found under
`__tests__` and fixtures under `__fixtures__`. For local testing, you'll need Docker. Run the tests with

```bash
npm run test:local
```

The tests are also run in CI with GitHub Actions, as defined in `.github/workflows`.

## Acknowledgements

We would like to thank the creators, maintainers and contributors of following libraries for making this possible:

- [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for being the base and providing a handy way to install `peerDependencies` from a package.
- [`prettier`](https://github.com/prettier/prettier) for being :dark_sunglasses: and providing [a way to disable some eslint configurations from above](https://github.com/prettier/eslint-config-prettier)
- [`husky`](https://github.com/typicode/husky) and [`lint-staged`](https://github.com/okonet/lint-staged) for making precommit hooks easy
