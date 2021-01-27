
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

int main() { }

int optAPNG(std::string szInput, std::string szOut, Options options) {
    unsigned int first, loops, coltype;
    std::shared_ptr<APNGOpt> apngOpt = std::make_shared<APNGOpt>();
    std::vector<APNGFrame> frames;

    int res = apngOpt->load_apng(szInput.c_str(), frames, first, loops);
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

        apngOpt->save_apng(szOut.c_str(), frames, first, loops, coltype, options.deflate_method, options.iter);
    }

    for (size_t j = 0; j < frames.size(); j++)
    {
        delete[] frames[j].rows;
        delete[] frames[j].p;
    }
    frames.clear();

    return res;
}


EMSCRIPTEN_BINDINGS(apng_optimizer_module) {
    value_object<Options>("Options")
        .field("deflate_method", &Options::deflate_method)
        .field("iter", &Options::iter)
        .field("min_quality", &Options::min_quality)
        .field("max_quality", &Options::max_quality)
        .field("disabled_quant", &Options::disabled_quant)
        ;


    function("optAPNG", &optAPNG);
}

