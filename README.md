# eslint-config-motley

[Motley's](motley.fi) JavaScript styleguide, using `eslint` and `prettier`.
Based on `eslint-config-airbnb`.

Supports the following features out of the box:

- Prettier autoformatting on precommit stage via `husky`.
- ES2015
- Imports and exports
- React
- a11y
- `__DEV__` is a valid underscore-dangle value

with following changes to the base config:

## Installation

> Note that currently the script will override your `.eslintrc.js` file and override your `precommit` and `lint-staged` scripts in `package.json` if there's one.

Run the following command:

``` bash
(
  PKG=eslint-config-motley

  # Default to installing using npm
  INSTALL="npm install --save-dev"

  # Is this a yarn project and yarn is found in PATH, then install using yarn
  if [[ -f $(PWD)/yarn.lock && -x $(which yarn) ]]
  then
    INSTALL="yarn add --dev"
  fi

  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs $INSTALL
)
```

Windows users can use [`install-peerdeps`](https://github.com/nathanhleung/install-peerdeps) tool:

``` bash
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb
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
      "prettier --write",
      "git add"
    ]
  }
}
```