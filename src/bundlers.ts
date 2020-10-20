import * as path from 'path';
import * as fs from 'fs';
import { spawnSync, SpawnSyncOptions } from 'child_process';
// import * as shell from 'shelljs';
import { BundlingOptions, ILocalBundling } from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';

const ESBUILD_VERSION = '0.7.17';

export interface LocalBundlerOptions {
  readonly rootdir: string;
  readonly entry: string;
  readonly runtime: Runtime;
  readonly sourcemap: boolean;
  readonly minify: boolean;
  readonly esbuildVersion?: string;
  readonly externals: string[];
  readonly dependencies?: { [key: string]: string };
}

export class LocalBundler implements ILocalBundling {
  private readonly localOptions: LocalBundlerOptions;
  private esbuildBinaryPath!: string;

  constructor(options: LocalBundlerOptions) {
    this.localOptions = options;
  }

  hasEsbuild() {
    try {
      const esbuildPath = require.resolve('esbuild', { paths: [this.localOptions.entry] });

      this.esbuildBinaryPath = path.resolve(esbuildPath, '../../../.bin/esbuild');

      const buff = exec(this.esbuildBinaryPath, ['--version']);
      const version = buff.stdout.toString().trim();

      return new RegExp(`^${this.localOptions.esbuildVersion ?? ESBUILD_VERSION}`).test(version);
    } catch (_err) {
      return false;
    }
  }

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    if (this.hasEsbuild() === false) {
      return false;
    }

    const relativeEntryPath = path.relative(this.localOptions.rootdir, path.resolve(this.localOptions.entry));

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

    const esbuildArgs: string[] = [
      relativeEntryPath,
      `--outdir=${outputDir}`,
      `--target=${target}`,
      `--platform=node`,
      `--format=cjs`,
      `--bundle`,
      this.localOptions.sourcemap ? `--sourcemap` : '',
      this.localOptions.minify ? `--minify` : '',
      ...this.localOptions.externals.map((external) => ` --external:${external}`),
    ].filter((a) => a.length > 0);

    console.log(esbuildArgs);

    if (Object.keys(this.localOptions.dependencies ?? {}).length > 0) {
      fs.writeFileSync(
        path.resolve(outputDir, 'package.json'),
        JSON.stringify({ dependencies: this.localOptions.dependencies ?? {} })
      );

      exec(`npm`, ['i'], {
        env: { ...process.env },
        stdio: ['ignore', process.stderr, 'inherit'],
        cwd: outputDir,
      });
    }

    exec(this.esbuildBinaryPath, esbuildArgs, {
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
        }] stdout: ${buff.stdout?.toString().trim()}\n\n\nstderr: ${buff.stderr?.toString().trim()}`
      );
    }

    throw new Error(`${binary} exited with status ${buff.status}`);
  }

  return buff;
}
