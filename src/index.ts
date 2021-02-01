import { DeflateMethod } from './enum/deflate-method';
import Module, { APNGOptimizerModule } from './wasm/apng-optimizer';


export interface OptimizerOptions {
    // compression method
    deflateMethod?: DeflateMethod;
    // number of compression iterations 
    iter?: number;
    // min quality for imagequant
    minQuality?: number;
    // max quality for imagequant
    maxQuality?: number;
    // disable imagequant
    disabledQuant?: boolean;
    // callback in process
    processCallback?: (progress: number) => void;
}

const defaultOptions: OptimizerOptions = {
    deflateMethod: DeflateMethod.SevenZip,
    iter: 15,
    minQuality: 0,
    maxQuality: 100,
    disabledQuant: false
}

export class APNGOptimizer {
    private modulePath: string;
    private readyPromise: Promise<APNGOptimizerModule>;
    private module!: APNGOptimizerModule;

    private constructor(modulePath: string) {
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

    /**
     * 创建一个新的压缩器实例
     * @param modulePath - WebAssembly 文件路径
     */
    static async createOptimizer(modulePath: string): Promise<APNGOptimizer> {
        const optimizer = new APNGOptimizer(modulePath);
        await optimizer.checkReady();
        return optimizer;
    }

    /**
     * check optimizer is ready
     */
    checkReady() {
        return this.readyPromise;
    }

    /**
     * optimize apng image
     * @param apngBuffer - apng image buffer
     * @param options - optimized options
     */
    async optAPNG(apngBuffer: Uint8Array, options?: OptimizerOptions): Promise<Uint8Array> {
        const { module } = this;
        const _options = Object.assign({}, defaultOptions, options) as Required<OptimizerOptions>;
        const pngBufferPtr = module._malloc(apngBuffer.byteLength);
        module.HEAPU8.set(apngBuffer, pngBufferPtr);
        const funcPtr = module.addFunction((progress: number) => {
            _options.processCallback && _options.processCallback(progress);
        }, 'vf');

        const res = this.module.optAPNG(pngBufferPtr, apngBuffer.byteLength, {
            deflate_method: _options.deflateMethod,
            iter: _options.iter,
            min_quality: _options.minQuality,
            max_quality: _options.maxQuality,
            disabled_quant: _options.disabledQuant
        }, funcPtr);

        module.removeFunction(funcPtr);
        module._free(pngBufferPtr);
        if(res.size <= 0) {
            throw new Error(`opt APNG failed`);
        }
        const optedBuffer = module.HEAPU8.subarray(res.bufferPtr, res.bufferPtr + res.size);
        const optAPNG = new Uint8Array(optedBuffer);
        module._free(res.bufferPtr);

        return optAPNG;
    }
}