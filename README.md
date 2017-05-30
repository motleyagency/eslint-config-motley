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
(
  export PKG=eslint-config-motley
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)

# or with yarn

(
  export PKG=eslint-config-motley
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG@latest"
)

```

Windows users can use [`install-peerdeps`](https://github.com/nathanhleung/install-peerdeps) tool:

``` bash
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-motley
```

If all went well, you should see the following in your `.eslintrc.js`:

``` js
module.exports = {
  extends: "motley",
}
```

and the following in your `package.json`:

``` json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "prettier --single-quote --trailing-comma all --write",
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

