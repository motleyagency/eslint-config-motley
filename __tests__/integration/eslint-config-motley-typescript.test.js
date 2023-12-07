const { expect } = require('@jest/globals');
const path = require('path');
const fs = require('fs/promises')
const { ESLint } = require("../../__fixtures__/ts/node_modules/eslint");
const projectPath = path.resolve(process.cwd(), '__fixtures__', 'ts');

describe('eslint-config-motley-typescript', () => {
  let resultJSON;
  beforeAll(async () => {
    const eslint = new ESLint({
      cwd: path.resolve(projectPath),
    });
    const results = await eslint.lintFiles(["index.ts"]);
    const formatter = await eslint.loadFormatter("json");
    resultJSON = JSON.parse(formatter.format(results));
  });

  it('catches the errors in the .ts files', () => {
    const noConsoleError = {
      ruleId: 'no-console',
      severity: 1,
      message: 'Unexpected console statement.',
      line: 2,
      column: 1 
    }

    expect(resultJSON[0].messages[0]).toMatchObject(noConsoleError);
  });

  it('extends from eslint-config-motley-typescript', async () => {
    const config = require(path.resolve(projectPath, '.eslintrc.js'));

    expect(config.extends).toEqual('motley-typescript');
  });

  it('adds the lint-staged config to package.json', async() => {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    expect(JSON.parse(content)['lint-staged']).toBeDefined();
  });
})

