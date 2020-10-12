import * as path from 'path';
import { Code, Function as AwsFunction, FunctionOptions, Runtime, RuntimeFamily } from '@aws-cdk/aws-lambda';
import { Construct, BundlingDockerImage } from '@aws-cdk/core';

const ESBUILD_VERSION = '0.7.14';

export interface EsbuildFunctionProps extends FunctionOptions {
  readonly projectRoot: string;
  readonly entryPoints: string[];
  readonly runtime?: Runtime;
  readonly handler?: string;
  readonly outdir?: string;
  readonly target?: string;
  readonly bundle?: boolean;
  readonly sourcemap?: boolean;
  readonly minify?: boolean;
  readonly awsSdkConnectionReuse?: boolean;
}

export class EsbuildFunction extends AwsFunction {

  constructor(scope: Construct, id: string, props: EsbuildFunctionProps) {

    if (props.runtime && props.runtime.family !== RuntimeFamily.NODEJS) {
      throw new Error('\'runtime\' must be NodeJS family');
    }

    const runtime = props.runtime ?? Runtime.NODEJS_12_X;
    const handler = props.handler ?? 'handler';
    const code = Code.fromAsset(props.projectRoot, {
      bundling: {
        image: BundlingDockerImage.fromAsset(path.join(__dirname, '../esbuild'), {
          buildArgs: {
            IMAGE: runtime.bundlingDockerImage.image,
            ESBUILD_VERSION,
          },
        }),
        command: ['bash', '-c', 'touch /asset-output/hello.txt'],
      },
    });

    super(scope, id, {
      ...props,
      runtime,
      handler: `index.${handler}`,
      code,
    });
  }

}
