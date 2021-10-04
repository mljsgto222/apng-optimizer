
import { APNGOptimizer } from '../src/index';
// @ts-ignore
import assembly from '../src/wasm/apng-optimizer.wasm?url';
// @ts-ignore
import demoImage from './demo_image.png';

const defaultImage = demoImage;

const originImage = document.getElementById('originImage') as HTMLImageElement;
const originSize = document.getElementById('originSize')!;
const optImage = document.getElementById('optImage') as HTMLImageElement;
const optSize = document.getElementById('optSize')!;
const optTime = document.getElementById('optTime')!;
const optRate = document.getElementById('optRate')!;
const changeImageInput = document.getElementById('changeImage')! as HTMLInputElement;

async function readOriginImage(url: string) {
    originImage.src = url;
    const buffer = await (await fetch(url)).arrayBuffer();
    const size = buffer.byteLength;
    originSize.innerText = `大小: ${Math.round(size / 1024 * 100000) / 100000}kb`;
    return buffer;
}

function setOptImage(uint8Array: Uint8Array) {
    const blob = new Blob([uint8Array.buffer], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    optImage.src = url;
    optSize.innerText = `大小: ${Math.round(uint8Array.length / 1024 * 100000) / 100000}kb`;
};


APNGOptimizer.createOptimizer(assembly)
    .then(async(optimizer) => {
        const buffer = await readOriginImage(defaultImage);

        const now = Date.now();
        const optAPNG = optimizer.optAPNG(new Uint8Array(buffer), {
            minQuality: 50,
            maxQuality: 100,
            processCallback: (progress: number) => {
                console.log(Math.round(progress * 100));
            }
        });
        optRate.innerText = `压缩率: ${Math.round((1 - optAPNG.byteLength / buffer.byteLength) * 1000) / 10}%`;
        optTime.innerText = `耗时: ${Date.now() - now}ms`
        setOptImage(optAPNG);

        changeImageInput.addEventListener('change', async (v: Event) => {
            const files = changeImageInput.files;
            if(files.length > 0) {
                const file = files[0]!;
                const originUrl = URL.createObjectURL(file);
                const buffer = await readOriginImage(originUrl);
                const now = Date.now();
                const optAPNG = await optimizer.optAPNG(new Uint8Array(buffer), {
                    minQuality: 50,
                    maxQuality: 100,
                    processCallback: (progress: number) => {
                        console.log(Math.round(progress * 100));
                    }
                });
                optRate.innerText = `压缩率: ${Math.round((1 - optAPNG.byteLength / buffer.byteLength) * 1000) / 10}%`;
                optTime.innerText = `耗时: ${Date.now() - now}ms`
                setOptImage(optAPNG);
            }
        });
    })