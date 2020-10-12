import '@aws-cdk/assert/jest';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SynthUtils } from '@aws-cdk/assert';
import { Runtime } from '@aws-cdk/aws-lambda';
import { App, Stack } from '@aws-cdk/core';

import { EsbuildFunction } from '../src';

test('sets global tags on stack and resources', () => {

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'the-typescript-lambda-test-'));
  const tmpFile = 'handler.ts';
  const tmpEntrypoint = path.join(tmpDir, tmpFile);

  console.log(tmpDir);

  fs.writeFileSync(tmpEntrypoint, 'export const handler = async () => \'Hello, world\';');

  const app = new App();
  const stack = new Stack(app, 'Stack', {});

  new EsbuildFunction(stack, 'Function', {
    entryPoints: [tmpFile],
    projectRoot: tmpDir,
    runtime: Runtime.NODEJS_12_X,
  });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
