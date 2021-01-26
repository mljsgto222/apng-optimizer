import Module, { APNGOptimizerModule, Options } from './wasm/apng-optimizer';

const defaultOptions: Options = {
    deflate_method: 1,
    iter: 15
};

const IN_FILE_PATH = '/in.png';
const OUT_FILE_PATH = '/out.png';

export class APNGOptimizer {
    private modulePath: string;
    private readyPromise: Promise<APNGOptimizerModule>;
    private module!: APNGOptimizerModule;

    constructor(modulePath: string) {
        this.modulePath = modulePath;
        this.readyPromise = Module({
            locateFile: () => {
                return this.modulePath;
            }
        })
            .then(module => {
                this.module = module;
                return module;
            });
    }

    checkReady() {
        return this.readyPromise;
    }

    async optAPNG(url: string): Promise<Uint8Array> {
        const apngFile = await (await fetch(url)).arrayBuffer();
        this.module.FS.writeFile(IN_FILE_PATH, new Uint8Array(apngFile));
        const res = this.module.optAPNG(IN_FILE_PATH, OUT_FILE_PATH, defaultOptions);
        this.module.FS.unlink(IN_FILE_PATH);
        if(res < 0) {
            throw new Error(`opt APNG failed: ${url}`);
        }

        const optAPNG = this.module.FS.readFile(OUT_FILE_PATH, { encoding: 'binary' }) as Uint8Array;
        this.module.FS.unlink(OUT_FILE_PATH);
        return optAPNG;
    }
}