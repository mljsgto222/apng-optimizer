
export interface Options {
    deflate_method: number;
    iter: number;
    min_quality: number;
    max_quality: number;
}

export interface ReadFileOptions {
    // 文件编码格式
    encoding?: 'utf8' | 'binary';
    // 标识
    flags?:  'r' | 'r+' | 'wx' | 'w' | 'rw' | 'wx+'| 'w+' | 'a' | 'ax' | 'a+' | 'ax+';
}

export interface WriteFileOptions {
    flags?: 'r' | 'r+' | 'wx' | 'w' | 'rw' | 'wx+'| 'w+' | 'a' | 'ax' | 'a+' | 'ax+';
}

class FileSystem {
    /**
     * 创建文件目录
     * @param path - 目录地址
     */
    mkdir(path: string): void;

    /**
     * 创建文件
     * @param parent - 路径
     * @param name - 文件名
     * @param canRead - 是否可读
     * @param canWrite - 是否可写
     */
    createPath(parent: string, name: string, canRead: boolean, canWrite: boolean): void;

    /**
     * 将数据写入文件
     * @param filePath - 文件路径
     * @param text - 数据
     */
    writeFile(filePath: string, text: string | ArrayBuffer, opts?: WriteFileOptions): void;

    /**
     * 删除文件
     * @param filePath - 文件路径
     */
    unlink(filePath: string): void;

    /**
     * 读取文件内容
     * @param filePath - 文件路径
     * @param options
     * @param options.encoding - 编码方式
     * @param options.flags - 读取标识
     */
    readFile(filePath: string, options: ReadFileOptions = { encoding: 'utf8', flags: 'r' }): String | Uint8Array;
}


export class APNGOptimizerModule {
    FS: FileSystem;
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

    /**
     * 优化 apng
     * @param inPath - 输入 apng 文件地址
     * @param outPath - 输出 apng 文件地址
     */
    optAPNG(inPath: string, outPath: string, options: Options): number;
}

interface IFantasyModule {
    (options: any): Promise<FantasyModule>
}

export default {} as IFantasyModule;
