module.exports = {
  "extends": "airbnb",
  "rules": {
    "indent": ["error", 2],
    "quotes": [1, "double"],
    "no-underscore-dangle": ["error", { "allow": ["__DEV__"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}