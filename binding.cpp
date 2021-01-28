
#include <stdlib.h>
#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include <emscripten/wire.h>
#include <emscripten/bind.h>
#include "apngopt.hpp"

using namespace emscripten;

struct Options {
    int deflate_method = 1;
    int iter = 15;
    int min_quality = 0;
    int max_quality = 100;
    bool disabled_quant = false;
};

struct OptimizerResult {
    long bufferPtr;
    long size;
};

int main() { }

OptimizerResult optAPNG(long pngBufferPtr, long size, Options options, long callbackPtr) {
    unsigned int first, loops, coltype;
    std::shared_ptr<APNGOpt> apngOpt = std::make_shared<APNGOpt>(reinterpret_cast<void (*)(float)>(callbackPtr));
    std::vector<APNGFrame> frames;
    OptimizerResult result = OptimizerResult({ 0, 0 });

    int res = apngOpt->load_apng(reinterpret_cast<void *>(pngBufferPtr), size, frames, first, loops);
    if (res >= 0)
    {
        apngOpt->optim_dirty(frames);
        apngOpt->optim_duplicates(frames, first);
        if(!options.disabled_quant) {
            apngOpt->optim_image(frames, coltype, options.min_quality, options.max_quality);
        }
        else {
            apngOpt->optim_downconvert(frames, coltype);
        }

        long bufferPtr;
        result.size = (long) apngOpt->save_apng(bufferPtr, frames, first, loops, coltype, options.deflate_method, options.iter);
        result.bufferPtr = bufferPtr;
    }

    for (size_t j = 0; j < frames.size(); j++)
    {
        delete[] frames[j].rows;
        delete[] frames[j].p;
    }
    frames.clear();

    return result;
}


EMSCRIPTEN_BINDINGS(apng_optimizer_module) {
    value_object<Options>("Options")
        .field("deflate_method", &Options::deflate_method)
        .field("iter", &Options::iter)
        .field("min_quality", &Options::min_quality)
        .field("max_quality", &Options::max_quality)
        .field("disabled_quant", &Options::disabled_quant)
        ;
    
    value_object<OptimizerResult>("OptimizerResult")
        .field("bufferPtr", &OptimizerResult::bufferPtr)
        .field("size", &OptimizerResult::size)
        ;


    function("optAPNG", &optAPNG);
}

