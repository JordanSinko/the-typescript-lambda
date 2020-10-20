import { AssetCode, Code, Runtime } from "@aws-cdk/aws-lambda";
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

    /**
     * The directory to build to
     */
    readonly outdir: string;

}

export class Bundle {

    public static esbuild(options: EsbuildOptions): AssetCode {

        if (options.rootdir == null) {
            throw new Error("Please specify 'rootDir'");
        }

        //const relativeEntryPath = path.relative(options.rootdir, path.resolve(options.entry));

        const localBundler = new LocalBundler();
        const dockerBundler = new DockerBundler();

        return Code.fromAsset(options.rootdir, {
            bundling: {
                local: localBundler,
                ...dockerBundler.bundlingOptions
            }
        });

    }

}