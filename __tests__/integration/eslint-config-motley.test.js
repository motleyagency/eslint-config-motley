const { expect } = require('@jest/globals');
const path = require('path');
const { ESLint } = require("../../__fixtures__/js/node_modules/eslint");
const fs = require('fs/promises');
const projectPath = path.resolve(process.cwd(), '__fixtures__', 'js');

describe('eslint-config-motley', () => {
  let resultJSON;
  beforeAll(async () => {
    const eslint = new ESLint({
      cwd: path.resolve(projectPath),
    });
    const results = await eslint.lintFiles(["index.js"]);
    const formatter = await eslint.loadFormatter("json");
    resultJSON = JSON.parse(formatter.format(results));
  });

  it('catches the errors in the .js files', () => {
    const noConsoleError = {
      ruleId: 'no-console',
      severity: 1,
      message: 'Unexpected console statement.',
      line: 2,
      column: 1 
    }

    expect(resultJSON[0].messages[0]).toMatchObject(noConsoleError);

    const noUndefError = {
      ruleId: 'no-undef',
      severity: 2,
      message: "'x' is not defined.",
      line: 5,
      column: 1 
    }

    expect(resultJSON[0].messages[1]).toMatchObject(noUndefError);
  });

  it('extends from eslint-config-motley', async () => {
    const config = require(path.resolve(projectPath, '.eslintrc.js'));
    expect(config.extends).toEqual('motley');
  })

  it('adds the lint-staged config to package.json', async() => {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    expect(JSON.parse(content)['lint-staged']).toBeDefined();
  });
})

