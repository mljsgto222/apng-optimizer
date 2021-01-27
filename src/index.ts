import { DeflateMethod } from './enum/deflate-method';
import Module, { APNGOptimizerModule, Options } from './wasm/apng-optimizer';

const IN_FILE_PATH = '/in.png';
const OUT_FILE_PATH = '/out.png';

export interface OptimizerOptions {
    deflateMethod?: DeflateMethod;
    iter?: number;
    minQuality?: number;
    maxQuality?: number;
}

const defaultOptions: OptimizerOptions = {
    deflateMethod: DeflateMethod.SevenZip,
    iter: 15,
    minQuality: 0,
    maxQuality: 100
}

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

    async optAPNG(apngBuffer: ArrayBuffer, options?: OptimizerOptions): Promise<Uint8Array> {
        const _options = Object.assign({}, defaultOptions, options) as Required<OptimizerOptions>;

        this.module.FS.writeFile(IN_FILE_PATH, new Uint8Array(apngBuffer));
        const res = this.module.optAPNG(IN_FILE_PATH, OUT_FILE_PATH, {
            deflate_method: _options.deflateMethod,
            iter: _options.iter,
            min_quality: _options.minQuality,
            max_quality: _options.maxQuality,
            disabled_quant: false
        });
        this.module.FS.unlink(IN_FILE_PATH);
        if(res < 0) {
            throw new Error(`opt APNG failed`);
        }

        const optAPNG = this.module.FS.readFile(OUT_FILE_PATH, { encoding: 'binary' }) as Uint8Array;
        this.module.FS.unlink(OUT_FILE_PATH);
        return optAPNG;
    }
}