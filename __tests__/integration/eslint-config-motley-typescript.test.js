const { expect } = require('@jest/globals');
const path = require('path');
const { ESLint } = require("../../__fixtures__/ts/node_modules/eslint");

describe('eslint-config-motley', () => {
  let resultJSON;
  beforeAll(async () => {
    const eslint = new ESLint({
      cwd: path.resolve(process.cwd(), '__fixtures__', 'ts'),
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
})

