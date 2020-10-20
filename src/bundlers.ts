import * as path from 'path';
import { spawnSync, SpawnSyncOptions } from 'child_process';
import { BundlingOptions, ILocalBundling } from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';

interface LocalBundlerOptions {
  rootdir: string;
  entry: string;
  runtime: Runtime;
  sourcemap: boolean;
  minify: boolean;
}

export class LocalBundler implements ILocalBundling {
  constructor(private readonly localOptions: LocalBundlerOptions) {}

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    const relativeEntryPath = path.relative(
      this.localOptions.rootdir,
      path.resolve(this.localOptions.entry)
    );
    const target = (() => {
      switch (this.localOptions.runtime) {
        case Runtime.NODEJS_10_X:
          return 'node10';
        case Runtime.NODEJS_12_X:
          return 'node12';
        default:
          return 'es2016';
      }
    })();

    const command = [
      'esbuild`',
      relativeEntryPath,
      `--outdir=${outputDir}`,
      `--target=${target}`,
      `--platform=node`,
      `--format=cjs`,
      `--bundle`,
      this.localOptions.sourcemap && `--sourcemap`,
      this.localOptions.minify && `--minify`,
    ]
      .filter(Boolean)
      .join(' ');

    console.log(
      `$(node -p "require.resolve(\'esbuild\', { paths: ['${this.localOptions.entry}'] })")`
    );
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
