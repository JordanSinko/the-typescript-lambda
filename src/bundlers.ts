import { spawnSync, SpawnSyncOptions } from 'child_process';
import { BundlingOptions, ILocalBundling } from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';

export class LocalBundler implements ILocalBundling {
  //constructor(private readonly props: any) { }
  constructor() {}

  tryBundle(_outputDir: string, _options: BundlingOptions): boolean {
    const command = [
      'esbuild`',
      `index.ts`,
      `--outdir=/asset-output`,
      `--platform=node`,
      `--target=node10`,
      `--format=cjs`,
      `--bundle`,
      `--sourcemap`,
      `--minify`,
    ].join(' ');

    console.log(command);

    exec('bash', ['-c', command], {
      env: { ...process.env },
      stdio: ['ignore', process.stderr, 'inherit'],
    });

    return true;
  }
}

export class DockerBundler {
  public readonly bundlingOptions: BundlingOptions;

  //constructor(options: any) {
  constructor() {
    this.bundlingOptions = {
      image: Runtime.NODEJS_12_X.bundlingDockerImage,
    };
  }
}

function exec(binary: string, args: string[], options?: SpawnSyncOptions) {
  const buff = spawnSync(binary, args, options);

  if (buff.error) {
    throw buff.error;
  }

  if (buff.status !== 0) {
    if (buff.stdout || buff.stderr) {
      throw new Error(
        `[Status ${
          buff.status
        }] stdout: ${buff.stdout
          ?.toString()
          .trim()}\n\n\nstderr: ${buff.stderr?.toString().trim()}`
      );
    }

    throw new Error(`${binary} exited with status ${buff.status}`);
  }

  return buff;
}
