# Versions

## 15.0.1

- Removed unneccessary `git add`, 

## 15.0.0

- *BREAKING* only shipping the `typescript` package from now on. If you want to use the old plain JavaScript version, install `eslint-config-motley@14.1.1`
- Updated dependencies

## 14.1.1

- Added README-files for each of the packages

## 14.1.0

- Updated dependencies
- Added tests and automatic publishing via GitHub Actions 🚀

## 14.0.0

- Updated dependencies

## 13.1.0

- Fix Windows compatibility for postinstall scripts.

## 13.0.0

- Updated dependencies

## 12.0.1
- Added rule configuration which handles missing file extension errors better with TypeScript


## 12.0.0

- Updated dependencies
- Added TypeScript support
- Split the configuration in two different packages, base and `-typescript` variants

## 11.1.1

- Updated eslint version to ^5.6.0

## 11.1.0

- Added new plugin eslint-plugin-react-hooks

## 11.0.0

- Upgrade lint-staged to ^8.0.0 to support partially staged files

## 10.0.2

- Fix bug with promises
- Change callback functions to promisified versions
- Facilitate local development with `npm link`
- Add newline to end of `.prettierrc`
- Fail fast if package.json doesn't exist

## 10.0.1

- It actually looks for `husky.hooks.precommit`

## 10.0.0

- Update deps
- BREAKING: `husky` now looks for `pre-commit` script instead of `precommit`

## 9.2.0

- Fix indentation in .prettierrc
- Don't overwrite existing `lint-staged` configuration in `package.json`

## 9.1.0

- Use .prettierrc instead of inline options in package.json

## 9.0.0

- Update all the deps
- Now supports other files than `.js` too, like `JSON`, `GraphQL`, `CSS/LESS/SCSS` and TypeScript!
- New install instructions

## 8.0.1

- Upgrade peer dependencies (e.g. eslint v4)
- Probably nothing braking, but major version bump just to make sure

## 7.3.0

- Add `curly` rule disabled by [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#curly) (#42)

## 7.2.0

- Update `prettier` dependency

## 7.1.1

- Remove unneccesary "indent" option from `.eslintrc.js`

## 7.1.0

- Add `env` parameters to `.eslintrc.js` template (#36)
- Only update `.eslintrc.js` if it doesn't exists, otherwise it returns a warning (#37)

## 7.0.1 - 7.0.2

- Dummy releases for 7.0.0 because of version conflicts in `npm`, whoops.

## 7.0.0

- New version with Prettier, Husky and automatic installation process

## 6.0.1

- README.md update

## 6.0.0

- Due to composition issues, use an installation script. See `README.md` for more information.

## 5.0.0

- Due to composition issues, we can't use Greenkeeper. Syncing with `airbnb` config instead manually.

## 4.0.1

- New dependencies
- Added `.js` as valid `react/jsx-filename-extension`.

## 4.0.0

- Dependency bump to `eslint-config-airbnb@12.0.0`

## 3.0.0

- Bump dependencies to match `eslint-config-airbnb@11.0.0`

## 2.0.0

- Bump dependencies to match `eslint-config-airbnb@10.0.0`

## 1.0.1

- Minor README.md updates

## 1.0.1

- Added new rules for allowed underscore dangles (`__DEV__`), changed indent to two spaces, changed from single spaces to double

## 1.0.0

- Initial version
