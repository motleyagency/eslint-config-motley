# eslint-config-motley

Motley Agency's `.eslintrc.js`, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

Supports the following features out of the box:

- ES2015
- Imports and exports
- React
- a11y

with following changes to the base config:

- `__DEV__` is a valid underscore-dangle value
- Double quotes are preferred over single quotes
- 2 spaces instead of 4

## Installation

Install with `npm` (or `yarn`:

``` bash
npm install eslint-config-motley

# or

yarn add eslint-config-motley
```

Then add the installation script to your `package.json`:

```
{
  "scripts": {
    "motley-eslint-init": "motley-eslint-init"
  }
}
```

and run it:

```
npm run motley-eslint-init

# or

yarn run motley-eslint-init
```

Then add it to your projects `.eslintrc.js`:

``` javascript
module.exports = {
  "extends": "motley",
}
```
