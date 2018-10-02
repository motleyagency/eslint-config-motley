#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

// get the path to the host project.
// process.env.PWD doesn't resolve symlinks, e.g. when developing using npm link
const projectPath = path.resolve(process.env.PWD, '..', '..');
console.log('Checking configuration of ', projectPath);

/**
 * Writes .eslintrc.js if it doesn't exist. Warns if it exists.
 */
const writeEslintRc = async () => {
  const eslintPath = path.join(projectPath, '.eslintrc.js');
  console.log(eslintPath);
  const content = `module.exports = {
  extends: 'motley',
  env: {
    browser: true,
    node: true,
    jest: true,
  }
};
`

  if (fs.existsSync(eslintPath)) {
    console.warn(`⚠️  .eslintrc.js already exists;
Make sure that it includes the following for 'eslint-config-motley'
to work as it should:

${content}`);

   return Promise.resolve();
  };

  return writeFileAsync(eslintPath, content, 'utf-8');
};

/**
 * Writes .prettierrc if it doesn't exist. Warns if it exists.
 */
const writePrettierRc = async () => {
  const prettierPath = path.join(projectPath, '.prettierrc');
  const content = {
    singleQuote: true,
    trailingComma: 'all'
  };

  if (fs.existsSync(prettierPath)) {
    console.warn(`⚠️  .prettierrc already exists;
Make sure that it includes the following for 'eslint-config-motley'
to work as it should:

${JSON.stringify(content, null, 2)}\n`);

   return Promise.resolve();
  };

  return writeFileAsync(prettierPath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
};

/**
 * Updates package.json if there's no existing config. Warns if there is.
 */
const writeToPackageJson = async () => {
  const packageJsonPath = path.join(projectPath, 'package.json');

  const content = await readFileAsync(packageJsonPath, 'utf-8').catch(err => {
    console.log('🤔  package.json not found, have you run `npm init`?');
    return Promise.reject(err);
  });

  const packageJson = JSON.parse(content);

  // Husky upgrade from 0.14.0 to ^1
  // Remove old scripts.precommit
  if ((packageJson.scripts || {}).precommit === 'lint-staged') {
    delete packageJson.scripts.precommit;
  }

  // Set new husky hook
  if (!packageJson.husky) {
    packageJson.husky = {};
  }
  if (!packageJson.husky.hooks) {
    packageJson.husky.hooks = {};
  }
  packageJson.husky.hooks['pre-commit'] = 'lint-staged';


  // Default configuration for lint-staged
  const lintStaged = {
    '*.{js,json,graphql,md,css,scss,less,ts}': [
      'prettier --write',
      'git add'
    ]
  };

  // Set or update lint-staged configuration
  if (packageJson['lint-staged']) {
    console.warn(`⚠️  A 'lint-staged' configuration already exists in package.json.
We won't overwrite it since it may include some of your own customizations.
We would have added the following rules, so check your configuration and modify it if needed:

${JSON.stringify(lintStaged, null, 2)}`);
  } else {
    packageJson['lint-staged'] = lintStaged;
  }

  // Stringify package.json and write to file
  const jsonString = JSON.stringify(packageJson, null, 2);

  return writeFileAsync(packageJsonPath, jsonString, 'utf-8');
};

Promise.all([writeEslintRc(), writePrettierRc(), writeToPackageJson()]).then(() => {
  console.log('😎  motley-styleguide was configured');
  process.exit();
}).catch((err) => {
  console.log('😬  something went wrong:');
  console.error(err.message);

  process.exit(1);
});
