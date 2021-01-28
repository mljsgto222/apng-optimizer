
export interface Options {
    deflate_method: number;
    iter: number;
    min_quality: number;
    max_quality: number;
    disabled_quant: boolean
}

export interface OptimizerResult {
    bufferPtr: number;
    size: number;
}


export class APNGOptimizerModule {
    HEAP8: Buffer;
    HEAP16: Buffer;
    HEAP32: Buffer;
    HEAPU8: Buffer;
    HEAPU16: Buffer;
    HEAPU32: Buffer;
    HEAPF32: Buffer;
    HEAPF64: Buffer;
    /**
     * 申请内存
     * @param size - 申请的内存大小(byte)
     * @returns 头指针地址
     */
    _malloc(size: number): number;

    /**
     * 释放内存
     * @param ptr - 内存的头指针地址
     */
    _free(ptr: number): void;

    addFunction(callback: Function, signature: string): number;

    removeFunction(callbackPtr: number): void;

    /**
     * 优化 apng 文件
     * @param pngBufferPtr - png 文件指针地址
     * @param pngBufferSize - png 文件大小
     * @param options - 优化参数
     * @param callbackPtr - 进度回调函数指针
     */
    optAPNG(pngBufferPtr: number, pngBufferSize: number, options: Options, callbackPtr: number): OptimizerResult;
}

interface IFantasyModule {
    (options: any): Promise<FantasyModule>
}

export default {} as IFantasyModule;
