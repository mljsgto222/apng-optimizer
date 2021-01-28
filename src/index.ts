import { DeflateMethod } from './enum/deflate-method';
import Module, { APNGOptimizerModule, Options } from './wasm/apng-optimizer';


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

    async optAPNG(apngBuffer: Uint8Array, options?: OptimizerOptions): Promise<Uint8Array> {
        const { module } = this;
        const _options = Object.assign({}, defaultOptions, options) as Required<OptimizerOptions>;
        const pngBufferPtr = module._malloc(apngBuffer.byteLength);
        module.HEAPU8.set(apngBuffer, pngBufferPtr);
        const funcPtr = module.addFunction((num: number) => {
            console.log(num);
        }, 'vf');

        const res = this.module.optAPNG(pngBufferPtr, apngBuffer.byteLength, {
            deflate_method: _options.deflateMethod,
            iter: _options.iter,
            min_quality: _options.minQuality,
            max_quality: _options.maxQuality,
            disabled_quant: false
        }, funcPtr);

        module.removeFunction(funcPtr);
        module._free(pngBufferPtr);
        if(res.size <= 0) {
            throw new Error(`opt APNG failed`);
        }
        const optedBuffer = module.HEAPU8.subarray(res.bufferPtr, res.bufferPtr + res.size);
        const optAPNG = new Uint8Array(optedBuffer);
        console.log(res.bufferPtr);
        module._free(res.bufferPtr);

        return optAPNG;
    }
}