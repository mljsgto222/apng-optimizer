import { DeflateMethod } from './enum/deflate-method';
import Module, { APNGOptimizerModule, Options } from './wasm/apng-optimizer';


export interface OptimizerOptions {
    // 压缩方式
    deflateMethod?: DeflateMethod;
    // 重复压缩次数
    iter?: number;
    // 最小质量
    minQuality?: number;
    // 最大质量
    maxQuality?: number;
    // 是否禁用 imagequant
    disabledQuant?: boolean;
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

    /**
     * 检查 optimizer 是否准备完成
     */
    checkReady() {
        return this.readyPromise;
    }

    /**
     * 优化 apng 图片
     * @param apngBuffer - apng 图片 buffer
     * @param options - 优化配置
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
        console.log(res.bufferPtr);
        module._free(res.bufferPtr);

        return optAPNG;
    }
}