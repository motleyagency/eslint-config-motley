module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "indent": ["error", 2],
    "no-underscore-dangle": ["error", { "allow": ["__DEV__"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}