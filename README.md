# eslint-config-motley

[Motley's](motley.fi) JavaScript styleguide, using `eslint` and `prettier` with zero configuration.
Based on `eslint-config-airbnb`.

Supports the following features out of the box:

- Prettier autoformatting on precommit stage via `husky`.
- ES2015+
- Imports and exports
- React
- a11y
- `__DEV__` is a valid underscore-dangle value
- `js` is a valid filename for `JSX` files

## Installation

> Note that currently the script will override your `precommit` and `lint-staged` scripts in `package.json` if there's one.

Run the following command:

``` bash
npx install-peerdeps --dev eslint-config-motley
```

If all went well, you should see the following in your `.eslintrc.js`:

``` js
module.exports = {
  extends: "motley",
}
```

and the following in your `.prettierrc`;

``` json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

and the following in your `package.json`:

``` json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,json,graphql,md,css,scss,less,ts}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## Acknowledgements

We would like to thank the creators, maintainers and contributors of following libraries for making this possible:

- [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for being the base and providing a handy way to install `peerDependencies` from a package.
- [`prettier`](https://github.com/prettier/prettier) for being :dark_sunglasses: and providing [a way to disable some eslint configurations from above](https://github.com/prettier/eslint-config-prettier)
- [`husky`](https://github.com/typicode/husky) and [`lint-staged`](https://github.com/okonet/lint-staged) for making precommit hooks easy
