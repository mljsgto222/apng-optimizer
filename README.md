# APNG-Optimizer

基于 WebAssembly 的 APNG 图片压缩工具。

底层基于 [libimagequant](https://github.com/ImageOptim/libimagequant) 与 [APNG Optimizer](https://sourceforge.net/projects/apng/files/APNG_Optimizer/)

## 运行 demo

```sh
npm run demo
```

![demo](https://st0.dancf.com/csc/208/configs/system/20210101-113557-8d27.png)

## 如何使用

在开始使用前，我们需要配置我们的打包工具(如 webpack)来支持加载 WebAssembly:

```js
module.exports = {
    module: {
        rules: [{
            test: /\.wasm$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    }
}
```


```js
import { APNGOptimizer } from 'apng-optimizer';
import assemblyPath from 'apng-optimizer/dist/wasm/apng-optimizer.wasm';

APNGOptimizer.createOptimizer(assemblyPath)
    .then(optimizer => {
        // ... load your apng image as buffer
        const uint8Array = new Uint8Array(buffer);
        const optAPNGArray = optimizer.optAPNG(uint8Array, {

            minQuality: 0,
            maxQuality: 100,
            processCallback: function(progerss) {
                console.log(progress); // 0.1231111
            }
        });
        const blob = new Blob([optAPNGArray.buffer], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        img.src = url;
    });
```

## API

### APNGOptimizer.createOptimizer(modulePath: string): Promise<APNGOptimizer>

通过加载 `modulePath` 路径上的 WebAssembly 来创建一个新的压缩器实例

### APNGOptimizer.#optAPNG(apngBuffer: Uint8Array, options?: OptimizerOptions): Uint8Array

压缩 apng 图片
+ apngBuffer: apng 图像文件的 buffer 数据
+ options: 优化配置
    + deflateMethod(number): 选择压缩算法 0: zlib, 1: 7zip, 2: zopfli，默认为 `1`
    + iter(number): 使用压缩算法的迭代次数，默认为 `15`
    + minQuality(number): 使用 `imagequant` 进行色板取色的最小质量，默认为 `0`
    + maxQuality(number): 使用 `imagequant` 进行色斑取色的最大质量，默认为 `100`
    + disabledQuant(boolean): 禁用 `imagequant`，禁用后 `minQuality` 与 `maxQuality` 将会无效
    + processCallback((progress: number) => void): 压缩进度回调，`progress` 为当前压缩进度( 0 ~ 1)

