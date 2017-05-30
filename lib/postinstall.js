#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const writeEslintRc = (new Promise((resolve, reject) => {
  const eslintPath = path.join(path.resolve('..', '..'), '.eslintrc.js');
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
    console.warn(`⚠️ .eslintrc.js already exists;
Make sure that it includes the following for 'eslint-config-motley'
to work as it should:

${content}
`)

    return resolve();
  };
  

  return fs.writeFile(eslintPath, content, 'utf-8', (err) => {
    if (err) {
      return reject(err); 
    }
    
    return resolve();
  });
}));

const writeToPackageJson = (new Promise((resolve, reject) => {
  const packageJsonPath = path.join(path.resolve('..', '..'), 'package.json');
  
  fs.readFile(packageJsonPath, 'utf-8', (err, content) => {
    if (err) {
      console.log('🤔 package.json not found, have you ran `npm init`?');
      return reject(err); 
    }

    const packageJson = JSON.parse(content);

    const lintStaged = {
      '*.js': [
        'prettier --single-quote --trailing-comma all --write',
        'git add'
      ]
    };

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts.precommit = 'lint-staged';

    if (!packageJson['lint-staged']) {
      packageJson['lint-staged'] = {}; 
    }

    packageJson['lint-staged'] = lintStaged;

    const jsonString = JSON.stringify(packageJson, null, 2);

    return fs.writeFile(packageJsonPath, jsonString, 'utf-8', (err) => {
      if (err) {
        return reject(err); 
      }

      return resolve();
    });
  });
}));

Promise.all([writeEslintRc, writeToPackageJson]).then(() => {
  console.log('😎 motley-styleguide was configured');
  process.exit();
}).catch((err) => {
  console.log('😬 something went wrong:');
  console.error(err.message);
  
  process.exit(1);
});