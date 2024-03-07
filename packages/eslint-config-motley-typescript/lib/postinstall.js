#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');

function checkFileExists(file) {
  return fs.access(file, fs.constants.F_OK)
           .then(() => true)
           .catch(() => false)
}

// get the path to the host project.
const projectPath = path.resolve(process.cwd(), '..', '..');
console.log(`Configuring eslint-config-motley-typescript`, projectPath, '\n');

/**
 * Updates package.json if there's no existing config. Warns if there is.
 */
const writeToPackageJson = async () => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  const content = await fs.readFile(packageJsonPath, 'utf-8').catch(err => {
    console.log('🤔  package.json not found, have you run `npm init`?');
    return Promise.reject(err);
  });
  
  const packageJson = JSON.parse(content);
  // Husky upgrade from 0.14.0 to ^1
  // Remove old scripts.precommit
  if ((packageJson.scripts || {}).precommit === 'lint-staged') {
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
    '*.{js,json,graphql,md,css,scss,less,ts,tsx}': ['prettier --write'],
  };

  // Set or update lint-staged configuration
  if (packageJson['lint-staged']) {
    console.warn(`⚠️  A 'lint-staged' configuration already exists in package.json.
We won't overwrite it since it may include some of your own customizations.
We would have added the following rules, so check your configuration and modify it if needed:

${JSON.stringify(lintStaged, null, 2)}\n`);
  } else {
    packageJson['lint-staged'] = lintStaged;
  }

  // Stringify package.json and write to file
  const jsonString = JSON.stringify(packageJson, null, 2);

  await fs.writeFile(packageJsonPath, jsonString, 'utf-8');
};

/**
 * Writes .eslintrc.js if it doesn't exist. Warns if it exists.
 */
const writeEslintRc = async () => {
  const eslintPath = path.join(projectPath, '.eslintrc.js');
  const content = `module.exports = {
  extends: "motley-typescript"
};
`;

  if (await checkFileExists(eslintPath)) {
    console.warn(`⚠️  .eslintrc.js already exists;
Make sure that it includes the following for 'eslint-config-motley-typescript'
to work as it should:

${content}`);

    return Promise.resolve();
  }

  return fs.writeFile(eslintPath, content, 'utf-8');
};

/**
 * Writes .prettierrc if it doesn't exist. Warns if it exists.
 */
const writePrettierRc = async () => {
  const prettierPath = path.join(projectPath, '.prettierrc');
  const content = {
    singleQuote: true,
    trailingComma: 'all',
  };

  if (await checkFileExists(prettierPath)) {
    console.warn(`⚠️  .prettierrc already exists;
Make sure that it includes the following for  'eslint-config-motley-typescript'
to work as it should:

${JSON.stringify(content, null, 2)}\n`);

    return Promise.resolve();
  }

  return fs.writeFile(
    prettierPath,
    `${JSON.stringify(content, null, 2)}\n`,
    'utf-8',
  );
};

(async () => {
  try {
    await writeToPackageJson();
    await Promise.all([writeEslintRc(), writePrettierRc()]);
    console.log('😎  Everything went well, have fun!');
    process.exit();
  } catch (err) {
    console.log('😬  something went wrong:');
    console.error(err.message);
    process.exit(1);
  }
})();
