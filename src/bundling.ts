import * as path from 'path';
import * as fs from 'fs';
import { AssetCode, Code, Runtime } from '@aws-cdk/aws-lambda';
import { LocalBundler, DockerBundler } from './bundlers';

export interface EsbuildBaseOptions {
  /**
   * Bundle all dependencies into the output files
   *
   * @default true
   */

  /**
   * Bundle all dependencies into the output files
   *
   * @default false
   */
  readonly minify?: boolean;

  /**
   * Emit a source map
   *
   * @default false
   */
  readonly sourcemap?: boolean;

  /**
   * Excludes modules from the bundle
   *
   * @default ['aws-sdk']
   */
  readonly externals?: string[];

  /**
   * Includes these modules alongside bundled file. These must be defined in rootdir 'package.json'
   *
   * @default []
   */
  readonly bundled?: string[];
}

export interface EsbuildOptions extends EsbuildBaseOptions {
  /**
   * The directory which contains necessary files and dependencies
   */
  readonly rootdir: string;

  /**
   * The file to build
   */
  readonly entry: string;

  /**
   * The runtime that will run the file
   */
  readonly runtime: Runtime;
}

export class Bundle {
  public static esbuild(options: EsbuildOptions): AssetCode {
    if (options.rootdir == null) {
      throw new Error("Please specify 'rootDir'");
    }

    const pkgPath = path.resolve(options.rootdir, 'package.json');
    const bundled = options.bundled ?? [];

    let dependencies: { [key: string]: string } | undefined;

    if (bundled.length > 0) {
      if (fs.existsSync(pkgPath) === false) {
        throw new Error('Unable to determine versions because package json could not be found at root');
      }

      const pkg = fs.readFileSync(pkgPath, 'utf8');
      const pkgJson = JSON.parse(pkg);
      const pkgJsonDependencies = {
        ...(pkgJson.dependencies ?? {}),
        ...(pkgJson.devDependencies ?? {}),
        ...(pkgJson.peerDependencies ?? {}),
      };

      console.log(pkgJsonDependencies);

      dependencies = bundled.reduce((prev, dep) => {
        let next: { [key: string]: string } = prev;

        if (pkgJsonDependencies[dep] == null) {
          throw new Error(`Unable to resolve dependency of '${dep}'. Please ensure it is in 'rootdir' package json`);
        }

        next[dep] = pkgJsonDependencies[dep];
        return next;
      }, {});

      console.log(dependencies);
    }

    const localBundler = new LocalBundler({
      rootdir: path.resolve(options.rootdir),
      entry: path.resolve(options.entry),
      runtime: options.runtime,
      minify: options.minify ?? false,
      sourcemap: options.sourcemap ?? false,
      externals: options.externals ?? ['aws-sdk'],
      dependencies,
    });

    const dockerBundler = new DockerBundler();

    return Code.fromAsset(options.rootdir, {
      bundling: {
        local: localBundler,
        ...dockerBundler.bundlingOptions,
      },
    });
  }
}
