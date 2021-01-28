# APNG-Optimizer

Optimizes APNG animations on web browser. Base on WebAssembly

## Quick Start

```js
import { APNGOptimizer } from 'apng-optimizer';

const optimizer = new APNGOptimizer();
await optimizer.checkReady();

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
```

## Demo

```sh
npm run demo
```