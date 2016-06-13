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

Install with `npm`:

``` bash
npm install -g eslint-config-motley
```

and add it to your projects `.eslintrc.js`:

``` javascript
module.exports = {
  "extends": "motley",
}
```
