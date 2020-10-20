import * as path from 'path';
import { Function as AwsFunction, FunctionOptions, Runtime, RuntimeFamily } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';
import { Bundle, EsbuildBaseOptions } from './bundling';

export interface EsbuildFunctionProps extends FunctionOptions, EsbuildBaseOptions {
  /**
   * The directory which contains necessary files and dependencies
   */
  readonly rootdir: string;

  /**
   * The file to build relative to `rootdir`
   */
  readonly entry: string;

  /**
   * The runtime that will run the file
   *
   * @default @default - `NODEJS_12_X`
   */
  readonly runtime?: Runtime;

  /**
   * The exported handler function name
   *
   * @default 'handler'
   */
  readonly handler?: string;
}

export class EsbuildFunction extends AwsFunction {
  constructor(scope: Construct, id: string, props: EsbuildFunctionProps) {
    if (props.runtime && props.runtime.family !== RuntimeFamily.NODEJS) {
      throw new Error("'runtime' must be NodeJS family");
    }

    const runtime = props.runtime ?? Runtime.NODEJS_12_X;
    const handler = props.handler ?? 'handler';

    const code = Bundle.esbuild({
      rootdir: props.rootdir,
      entry: path.resolve(props.entry),
      externals: props.externals,
      runtime,
    });

    super(scope, id, {
      ...props,
      runtime,
      handler: `index.${handler}`,
      code,
    });
  }
}
